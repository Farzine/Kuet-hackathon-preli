const express = require('express');
const { chatbotSuggestRecipes } = require('../controller/chatbotController');
const router = express.Router();

router.post('/', chatbotSuggestRecipes);

module.exports = router;
