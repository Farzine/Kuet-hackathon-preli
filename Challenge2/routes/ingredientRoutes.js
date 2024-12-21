const express = require('express');
const { addOrUpdateIngredient, updateIngredientQuantity } = require('../controller/ingredientController');
const router = express.Router();

router.post('/', addOrUpdateIngredient);
router.patch('/', updateIngredientQuantity);

module.exports = router;
