const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., grams, liters, pieces
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
