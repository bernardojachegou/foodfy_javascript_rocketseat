const express = require("express");
const routes = express.Router();
const foodfy = require("./app/controllers/foodfy");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");

// Área comum
routes.get("/", foodfy.index);
routes.get("/sobre", foodfy.getAbout);
routes.get("/receitas", foodfy.getRecipes);
routes.get("/receitas/:id", foodfy.getRecipeDetails);
routes.get("/chefs", foodfy.getChefs);
routes.get("/chefs/:id", foodfy.getChefDetails);


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
routes.get("/admin/chefs/criar", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/editar", chefs.edit);
routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

module.exports = routes;

