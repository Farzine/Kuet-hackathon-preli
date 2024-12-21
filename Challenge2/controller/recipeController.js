exports.saveRecipe = (req, res) => {
    // Implementation for saving a recipe
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
        const title = lines.find((line) => line.startsWith('Title:')).replace('Title: ', '');
        const ingredientsLine = lines.find((line) => line.startsWith('Ingredients:')).replace('Ingredients: ', '');
        const instructions = lines.find((line) => line.startsWith('Instructions:')).replace('Instructions: ', '');
        const image = lines.find((line) => line.startsWith('Image:')).replace('Image: ', '');
  
        const ingredients = ingredientsLine.split(', ').map((ing) => {
          const match = ing.match(/(.*) \((\d+) (.*)\)/);
          return { name: match[1], quantity: parseInt(match[2], 10), unit: match[3] };
        });
  
        recipes.push({ title, ingredients, instructions, image: `/recipe_images/${image}` });
      });
  
      res.json(recipes);
    });
  };
  