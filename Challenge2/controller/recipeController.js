const fs = require('fs');
const path = require('path');

// Define the path to the file where recipes will be stored
const recipesFilePath = path.join(__dirname, 'my_fav_recipes.txt');

exports.saveRecipe = (req, res) => {
    const { title, ingredients, instructions, image } = req.body;

    // Validate the data
    if (!title || !ingredients || !instructions || !image) {
        return res.status(400).send('Missing required fields');
    }

    // Format the ingredients into a string
    const ingredientsLine = ingredients
        .map(ingredient => `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`)
        .join(', ');

    // Create the recipe block to append to the file
    const recipeBlock = `
Title: ${title}
Ingredients: ${ingredientsLine}
Instructions: ${instructions}
Image (Base64): ${image}
`;

    // Append the recipe block to the file (my_fav_recipes.txt)
    fs.appendFile(recipesFilePath, recipeBlock + '\n\n', (err) => {
        if (err) {
            return res.status(500).send('Failed to save recipe');
        }
        res.status(201).send('Recipe saved successfully');
    });
};





exports.getAllRecipes = (req, res) => {
    fs.readFile(recipesFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to retrieve recipes');
        }

        const recipes = [];
        const recipeBlocks = data.split('\n\n'); // Assuming recipes are separated by blank lines

        recipeBlocks.forEach((block) => {
            const lines = block.split('\n');
            
            // Extracting title, ingredients, instructions, and image (with checks for undefined)
            const title = lines.find((line) => line.startsWith('Title:'))?.replace('Title: ', '') || '';
            const ingredientsLine = lines.find((line) => line.startsWith('Ingredients:'))?.replace('Ingredients: ', '') || '';
            const instructions = lines.find((line) => line.startsWith('Instructions:'))?.replace('Instructions: ', '') || '';
            const image = lines.find((line) => line.startsWith('Image:'))?.replace('Image: ', '') || '';

            // Parsing ingredients into a structured format
            const ingredients = ingredientsLine.split(', ').map((ing) => {
                const match = ing.match(/(.*) \((\d+) (\w+)\)/); // Matching ingredient format like "Tomato (5 pieces)"
                if (match) {
                    return { name: match[1], quantity: parseInt(match[2], 10), unit: match[3] };
                } else {
                    return null; // Return null if match fails
                }
            }).filter(Boolean); // Remove null entries if any ingredient line didn't match

            // Add recipe to the list
            recipes.push({ title, ingredients, instructions, image: image ? `/recipe_images/${image}` : '' });
        });

        res.json(recipes);
    });
};
