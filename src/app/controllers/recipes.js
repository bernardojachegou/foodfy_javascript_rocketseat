const Recipe = require('../models/recipe');
const File = require('../models/File');

module.exports = {
	async index(request, response) {

		let results = await Recipe.all();
		const recipes = results.rows;

		return response.render("admin/recipes/index", { recipes })
	},

	async show(request, response) {

		let results = await Recipe.find(request.params.id);
		const recipe = results.rows[0];

		if (!recipe) return response.send("Recipe not found!")

		return response.render("admin/recipes/read", { recipe })

	},

	async create(request, response) {

		let results = await Recipe.chefsList();
		const chefsList = results.rows;
		return response.render("admin/recipes/create", { chefsList });
	},

	async edit(request, response) {

		let results = await Recipe.find(request.params.id);
		const recipe = results.rows[0];

		if (!recipe) return response.send("Recipe not found!")

		results = await Recipe.chefsList();
		const chefsList = results.rows;

		return response.render("admin/recipes/edit", { recipe, chefsList });

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

		const filesPromise = request.files.map(file => File.createRecipeFiles({ ...file, recipe_id: recipeId }));
		await Promise.all(filesPromise);

		return response.redirect(`/receitas/${recipeId}`)

	},

	async put(request, response) {
		const keys = Object.keys(request.body);

		for (key of keys) {
			if (request.body[key] == "") {
				return response.send("Please, fill all the fields!")
			}
		}

		let results = await Recipe.update(request.body);
		const recipeId = results.rows[0].id;

		return response.redirect(`/admin/receitas/${recipeId}`)

	},

	async delete(request, response) {
		await Recipe.delete(request.body.id);

		return response.redirect("/admin/receitas")

	}
}

