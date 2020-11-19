const Chef = require('../models/chef');
const File = require('../models/File');

module.exports = {
	create(request, response) {
		return response.render("admin/chefs/create")
	},

	async index(request, response) {
		let results = await Chef.all();
		const chefs = results.rows;

		return response.render("admin/chefs/index", { chefs })
	},

	async show(request, response) {

		let results = await Chef.find(request.params.id);
		const chef = results.rows[0];

		if (!chef) return response.send("Chef not found!")

		results = await Chef.findRecipes(request.params.id);
		const recipes = results.rows[0];

		return response.render("admin/chefs/read", { chef, recipes })

	},

	async edit(request, response) {

		let results = await Chef.find(request.params.id);
		const chef = results.rows[0];

		return response.render("admin/chefs/edit", { chef })

	},

	async post(request, response) {
		const keys = Object.keys(request.body);

		for (key of keys) {
			if (request.body[key] == "") {
				return response.send("Por favor, preencha todos os campos!")
			}
		}

		if (request.files.length == 0) {
			return response.send('Por favor, envie pelo menos uma imagem');
		}

		const filesPromise = request.files.map(file => File.create({ ...file }))
		await Promise.all(filesPromise);
		const fileId = filesPromise.rows[0].id; // capturar o Id do file e jopar no create do chef;

		let resultsChefs = await Chef.create({ ...body, file_id: fileId });

		const chefId = resultsChefs.rows[0].id;

		// consoles de verificação;
		console.log(filesPromise);
		console.log(resultsChefs.rows);

		return response.redirect(`/admin/chefs/${chefId}`)

	},

	async put(request, response) {
		const keys = Object.keys(request.body);

		for (key of keys) {
			if (request.body[key] == "") {
				return response.send("Please, fill all the fields!")
			}
		}

		let results = await Chef.update(request.body);
		const chefId = results.rows[0].id;

		return response.redirect(`/admin/chefs/${chefId}`)

	},

	async delete(request, response) {

		await Chef.delete(request.body.id);

		return response.redirect("/admin/chefs")

	}
}