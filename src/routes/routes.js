const express = require('express');
const routes = express.Router();

const Foodfy = require('./foodfyRoutes');
const Chef = require('./admin/chefRoutes');
const Recipe = require('./admin/recipeRoutes');

Foodfy(routes);
Chef(routes);
Recipe(routes);

module.exports = routes;
