const express = require("express");
const routes = express.Router();
const foodfy = require("./app/controllers/foodfy");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");

// Área simples
routes.get("/", foodfy.index);
routes.get("/sobre", foodfy.get_about);
routes.get("/receitas", foodfy.get_recipes);
routes.get("/receitas/:id", foodfy.get_details);

// Área administrativa
// Receitas:
routes.get("/admin/receitas", recipes.index);
routes.get("/admin/receitas/criar", recipes.create);
routes.get("/admin/receitas/:id", recipes.show);
routes.get("/admin/receitas/:id/editar", recipes.edit);

routes.post("/admin/receitas", recipes.post);
routes.put("/admin/receitas", recipes.put);
routes.delete("/admin/receitas", recipes.delete);

// Chefs:
routes.get("/admin/chefs", chefs.index);

module.exports = routes;

