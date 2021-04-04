const express = require('express');
const routes = express.Router();
const foodfy = require('../app/controllers/foodfyController');
const Chef = require('./restricted/chef');
const Recipe = require('./restricted/recipe');
// const User = require('./restricted/user');

// User(routes);
Chef(routes);
Recipe(routes);

routes.get('/', foodfy.index);
routes.get('/about', foodfy.about);
routes.get('/recipes', foodfy.recipes);
routes.get('/recipes/:id', foodfy.recipe);
routes.get('/chefs', foodfy.chefs);
routes.get('/chefs/:id', foodfy.chef);

module.exports = routes;
