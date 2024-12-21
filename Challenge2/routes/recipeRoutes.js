const express = require('express');
const { saveRecipe, getAllRecipes } = require('../controller/recipeController');

const router = express.Router();

router.post('/', saveRecipe); // POST route to save a recipe
router.get('/', getAllRecipes); // GET route to retrieve all recipes

module.exports = router;
