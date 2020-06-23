const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const recipes = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server
});

server.get("/", (request, response) => {
    return response.render("index", { recipes });
});

server.get("/sobre", (request, response) => {
    return response.render("about");
})

server.get("/receitas", (request, response) => {
    return response.render("recipes", { recipes });
})

server.get("/receita", (request, response) => {
    const id = request.query.id;

    const recipe = recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!recipe) {
        return response.send("Curso não encontrado");
    }
    return response.render("recipeDetails", { recipe })
})

server.listen(3000, () => {
    console.log("Server online...")
});