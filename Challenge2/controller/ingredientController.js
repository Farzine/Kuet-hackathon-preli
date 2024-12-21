const Ingredient = require('../model/Ingredient');

// Add or update ingredient
exports.addOrUpdateIngredient = async (req, res) => {
  const { name, quantity, unit } = req.body;
  try {
    const ingredient = await Ingredient.findOneAndUpdate(
      { name },
      { $set: { unit }, $inc: { quantity }, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    res.json(ingredient);
  } catch (error) {
    res.status(500).send('Error adding or updating ingredient');
  }
};

// Reduce ingredient quantity
exports.updateIngredientQuantity = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const ingredient = await Ingredient.findOneAndUpdate(
      { name },
      { $inc: { quantity: -quantity } },
      { new: true }
    );
    if (!ingredient || ingredient.quantity < 0) {
      return res.status(400).send('Not enough ingredients');
    }
    res.json(ingredient);
  } catch (error) {
    res.status(500).send('Error updating ingredient');
  }
};
