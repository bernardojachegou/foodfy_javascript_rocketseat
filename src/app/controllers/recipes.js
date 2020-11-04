const Recipe = require('../models/recipe');
const File = require('../models/File');

module.exports = {
    async index(request, response) {

        let results = await Recipe.all();
        const recipes = results.rows;

        return response.render("admin/recipes/index", { recipes })
    },

    create(request, response) {

        Recipe.chefsSelectOption(function (options) {
            return response.render("admin/recipes/create", { chefOptions: options });
        })


    },

    async show(request, response) {

        let results = await Recipe.find(request.params.id);
        const recipe = results.rows[0];

        if (!recipe) return response.send("Recipe not found!")

        return response.render("admin/recipes/read", { recipe })

    },

    edit(request, response) {
    Recipe.find(request.params.id, function (recipe) {
        if (!recipe) return response.send("Recipe not found!")

        Recipe.chefsSelectOption(function (options) {
            return response.render("admin/recipes/edit", { recipe, chefOptions: options });
        })

    })
},

async post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Por favor, preencha todos os campos");
        }
    }

    if (request.files.length == 0) {
        return response.send('Por favor, envie pelo menos uma imagem');
    }

    let results = await Recipe.create(request.body);
    const recipeId = results.rows[0].id;

    const filesPromise = request.files.map(file => File.create({ ...file }))
    await Promise.all(filesPromise);


    return response.redirect(`/receitas/${recipeId}`)

},

put(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!")
        }
    }

    Recipe.update(request.body, function () {
        return response.redirect(`/admin/receitas/${request.body.id}`)
    })
},

delete (request, response) {
    Recipe.delete(request.body.id, function () {
        return response.redirect("/admin/receitas")
    })
}
}

