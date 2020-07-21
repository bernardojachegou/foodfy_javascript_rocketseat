const recipes = require("../data");

exports.index = (request, response) => {
    return response.render("admin/recipes", { recipes });
}