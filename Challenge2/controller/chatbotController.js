// services/recipeService.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Ingredient = require('../model/Ingredient');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');  // Import Gemini API

const apiKey = process.env.GEMINI_API_KEY; // Ensure that the Gemini API key is in .env
const recipesFilePath = path.join(__dirname, 'my_fav_recipes.txt');

// Initialize the Gemini AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey || "YOUR_API_KEY");  // Replace with your actual API key

// Function to parse recipes from file
function parseRecipesFromFile() {
  const data = fs.readFileSync(recipesFilePath, 'utf-8');
  const recipes = [];

  const recipeBlocks = data.split('\n\n'); // Assuming recipes are separated by a blank line
  recipeBlocks.forEach((block) => {
    const lines = block.split('\n');
    
    const titleLine = lines.find((line) => line.startsWith('Title:'));
    const ingredientsLine = lines.find((line) => line.startsWith('Ingredients:'));
    const instructionsLine = lines.find((line) => line.startsWith('Instructions:'));
    
    if (!titleLine || !ingredientsLine || !instructionsLine) {
      // If any part of the recipe is missing, skip it
      return;
    }

    const title = titleLine.replace('Title: ', '').trim();
    const ingredientsStr = ingredientsLine.replace('Ingredients: ', '').trim();
    const instructions = instructionsLine.replace('Instructions: ', '').trim();

    const ingredients = ingredientsStr.split(', ').map((ing) => {
      const match = ing.match(/(.*) \((\d+) (.*)\)/);
      if (match) {
        return { name: match[1], quantity: parseInt(match[2], 10), unit: match[3] };
      }
      return null; // Return null if the format doesn't match
    }).filter(Boolean); // Remove null entries if any ingredient line didn't match the format

    recipes.push({ title, ingredients, instructions });
  });

  return recipes;
}

// Chatbot recipe suggestion based on available ingredients
exports.chatbotSuggestRecipes = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch available ingredients from the database
    const availableIngredients = await Ingredient.find();
    const availableNames = availableIngredients.map((i) => i.name);

    // Parse recipes from the file
    const recipes = parseRecipesFromFile();

    // Filter recipes based on available ingredients and their quantities
    const availableRecipes = recipes.filter((recipe) =>
      recipe.ingredients.every((ing) => {
        const availableIngredient = availableIngredients.find((ai) => ai.name === ing.name);
        return availableIngredient && ing.quantity <= availableIngredient.quantity;
      })
    );

    // Prepare suggestions for the response
    const suggestions = {
      favorites: recipes.map((r) => r.title),
      available: availableRecipes.map((r) => r.title),
    };

    // Integrate Gemini API for generating bot responses based on the prompt
    const response = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).generateContent(`${prompt}`, {
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    const botReply = response.response.text().trim();  // Process the response

    res.json({ suggestions, botReply });
  } catch (error) {
    console.error('Error during chatbot suggestion:', error);
    res.status(500).send('Failed to process chatbot request');
  }
};
