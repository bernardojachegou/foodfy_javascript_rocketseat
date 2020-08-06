const express = require("express");
const routes = express.Router();
const foodfy = require("./controllers/foodfy");
const admin = require("./controllers/admin");

// Área comum
routes.get("/", foodfy.index);
routes.get("/sobre", foodfy.about);
routes.get("/receitas", foodfy.recipesTable);
routes.get("/receitas/:id", foodfy.recipesDetails);

// Área administrativa
routes.get("/admin/receitas", admin.index);
routes.get("/admin/receitas/criar", admin.create);
routes.get("/admin/receitas/:id", admin.show);
routes.get("/admin/receitas/:id/editar", admin.edit);

routes.post("/admin/receitas", admin.post);
routes.put("/admin/receitas", admin.put);
routes.delete("/admin/receitas", admin.delete);

module.exports = routes;

