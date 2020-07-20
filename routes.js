const express = require("express");
const routes = express.Router();
const foodfy = require("./controllers/foodfy");

routes.get("/", foodfy.index);
routes.get("/sobre", foodfy.about);
routes.get("/receitas", foodfy.recipesTable);
routes.get("/receitas/:id", foodfy.recipesDetails);

module.exports = routes;