Recipe API Documentation
This API allows users to interact with a recipe and ingredient management system. It includes functionality to get recipes, save favorites, and manage ingredients.

API Endpoints
1. Chatbot Recipe Suggestions
Endpoint: POST /chatbot/
Description: This endpoint allows you to send a prompt to the chatbot, which will provide recipe suggestions based on the prompt.

Request Body:

json
Copy code
{
  "prompt": "want to taste something sweet"
}
Response: The chatbot will provide a response with a list of favorite recipes and available recipes based on the provided prompt.

Example Response:

json
Copy code
{
  "suggestions": {
    "favorites": ["Chocolate Cake", "Cookies"],
    "available": ["Chocolate Cake", "Ice Cream"]
  },
  "botReply": "Here are some sweet recipes you can try: Chocolate Cake, Cookies."
}
2. Get All Favorite Recipes
Endpoint: GET /recipes/
Description: This endpoint allows you to get all the favorite recipes stored in the system.

Response: Returns a list of all favorite recipes.

Example Response:

json
Copy code
[
  {
    "title": "Chocolate Cake",
    "ingredients": [
      { "name": "Flour", "quantity": 200, "unit": "grams" },
      { "name": "Sugar", "quantity": 150, "unit": "grams" }
    ],
    "instructions": "Mix the ingredients and bake at 180°C for 30 minutes.",
    "image": "url-to-image"
  },
  {
    "title": "Cookies",
    "ingredients": [
      { "name": "Flour", "quantity": 250, "unit": "grams" },
      { "name": "Butter", "quantity": 100, "unit": "grams" }
    ],
    "instructions": "Mix and bake at 170°C for 15 minutes.",
    "image": "url-to-image"
  }
]
3. Save Recipe to Favorites
Endpoint: POST /recipes/
Description: This endpoint allows you to add a new recipe to the favorites list.

Request Body:

json
Copy code
{
  "title": "Tomato Soup",
  "ingredients": [
    { "name": "Tomato", "quantity": 5, "unit": "pieces" },
    { "name": "Onion", "quantity": 1, "unit": "piece" }
  ],
  "instructions": "Boil the tomatoes and onions, then blend them together.",
  "image": ""
}
Response: Returns the recipe that was added to the favorites.

Example Response:

json
Copy code
{
  "title": "Tomato Soup",
  "ingredients": [
    { "name": "Tomato", "quantity": 5, "unit": "pieces" },
    { "name": "Onion", "quantity": 1, "unit": "piece" }
  ],
  "instructions": "Boil the tomatoes and onions, then blend them together.",
  "image": ""
}
4. Add Ingredient
Endpoint: POST /ingredients/
Description: This endpoint allows you to add a new ingredient to the database.

Request Body:

json
Copy code
{
  "name": "Chocolate Chips",
  "quantity": 100,
  "unit": "grams"
}
Response: Returns the ingredient that was added.

Example Response:

json
Copy code
{
  "name": "Chocolate Chips",
  "quantity": 100,
  "unit": "grams"
}
5. Get All Ingredients
Endpoint: GET /ingredients/
Description: This endpoint allows you to get all ingredients stored in the system.

Response: Returns a list of all ingredients.

Example Response:

json
Copy code
[
  {
    "name": "Flour",
    "quantity": 500,
    "unit": "grams"
  },
  {
    "name": "Sugar",
    "quantity": 300,
    "unit": "grams"
  }
]
6. Update Ingredient
Endpoint: PATCH /ingredients/
Description: This endpoint allows you to update an ingredient in the database.

Request Body:

json
Copy code
{
  "name": "Chocolate Chips",
  "quantity": 200,
  "unit": "grams"
}
Response: Returns the updated ingredient.

Example Response:

json
Copy code
{
  "name": "Chocolate Chips",
  "quantity": 200,
  "unit": "grams"
}
