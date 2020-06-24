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

server.get("/receitas/:id", (request, response) => {
    const id = request.params.index;

    const recipe = recipes.find(function (recipe) {
        return recipe.index == id;
    })

    if (!recipe) {
        return response.send("Receita não encontrada");
    }
    return response.render("recipeDetails", { recipe })
})

server.listen(3000, () => {
    console.log("Server online...")
});