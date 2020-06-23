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

server.get("/about", (request, response) => {
    return response.render("about");
})

server.get("/recipes", (request, response) => {
    return response.render("recipes", { recipes });
})

server.get("/details", (request, response) => {
    return response.render("recipeDetails", { recipes });
})

server.listen(5000, () => {
    console.log("Server online...")
});