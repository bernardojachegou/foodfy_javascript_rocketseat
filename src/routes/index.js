const express = require('express');
const routes = express.Router();
const FoodfyController = require('../app/controllers/FoodfyController');
const Chef = require('./restricted/chef');
const Recipe = require('./restricted/recipe');
const User = require('./restricted/user');

User(routes);
Chef(routes);
Recipe(routes);

routes.get('/', FoodfyController.index);
routes.get('/about', FoodfyController.about);
routes.get('/recipes', FoodfyController.recipes);
routes.get('/recipes/:id', FoodfyController.recipe);
routes.get('/chefs', FoodfyController.chefs);
routes.get('/chefs/:id', FoodfyController.chef);

module.exports = routes;
