const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Ingredient = require('../model/Ingredient');

const recipesFilePath = path.join(__dirname, '../my_fav_recipes.txt');

function parseRecipesFromFile() {
  const data = fs.readFileSync(recipesFilePath, 'utf-8');
  const recipes = [];

  const recipeBlocks = data.split('\n\n'); // Assuming recipes are separated by a blank line
  recipeBlocks.forEach((block) => {
    const lines = block.split('\n');
    const title = lines.find((line) => line.startsWith('Title:')).replace('Title: ', '');
    const ingredientsLine = lines.find((line) => line.startsWith('Ingredients:')).replace('Ingredients: ', '');
    const instructions = lines.find((line) => line.startsWith('Instructions:')).replace('Instructions: ', '');

    const ingredients = ingredientsLine.split(', ').map((ing) => {
      const match = ing.match(/(.*) \((\d+) (.*)\)/);
      return { name: match[1], quantity: parseInt(match[2], 10), unit: match[3] };
    });

    recipes.push({ title, ingredients, instructions });
  });

  return recipes;
}

exports.chatbotSuggestRecipes = async (req, res) => {
  const { prompt } = req.body;

  try {
    const availableIngredients = await Ingredient.find();
    const availableNames = availableIngredients.map((i) => i.name);

    const recipes = parseRecipesFromFile();

    const availableRecipes = recipes.filter((recipe) =>
      recipe.ingredients.every((ing) =>
        availableNames.includes(ing.name) &&
        ing.quantity <= availableIngredients.find((ai) => ai.name === ing.name).quantity
      )
    );

    const suggestions = {
      favorites: recipes.map((r) => r.title),
      available: availableRecipes.map((r) => r.title),
    };

    const response = await axios.post('https://geminiapi.example.com/chat', { prompt });
    const botReply = response.data;

    res.json({ suggestions, botReply });
  } catch (error) {
    res.status(500).send('Failed to process chatbot request');
  }
};
