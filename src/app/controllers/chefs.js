const Chef = require('../models/chef');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(request, response) {
    try {
      let results = await Chef.all();
      const chefs = results.rows;

      const chefWithImage = await Promise.all(
        chefs.map(async (chef) => {
          const fileResults = await Chef.find(chef.id); // trazendo os chefs
          const fileId = fileResults.rows[0].file_id; // pegando o id da imagem dentro de chef

          const imageResults = await File.find(fileId); // trazendo as imagens
          const image = imageResults.rows[0].path; // acessando a propriedade path das imagens

          return {
            ...chef,
            image: `${request.protocol}://${
              request.headers.host
            }${image.replace('public', '')}`,
          };
        })
      );
      return response.render('admin/chefs/index', { chefs: chefWithImage });
    } catch (error) {
      console.log(error);
    }
  },

  create(request, response) {
    return response.render('admin/chefs/create');
  },

  async show(request, response) {
    try {
      // get chef
      let results = await Chef.find(request.params.id);

      const chef = results.rows[0];

      if (!chef) return response.send('Chef not found!');

      // get image of chef
      results = await File.find(chef.file_id);
      const files = results.rows.map((file) => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace(
          'public',
          ''
        )}`,
      }));

      // get recipes of chef
      results = await Chef.findChefRecipes(chef.id);
      const chefRecipes = results.rows;

      // get image of recipe
      const chefRecipesWithImage = await Promise.all(
        chefRecipes.map(async (recipe) => {
          const fileResults = await RecipeFile.findRecipeId(recipe.id); // id 31
          const fileId = fileResults.rows[0].file_id; // 92

          const imageResults = await File.find(fileId); // pega oq tem no file(name, path)
          const image = imageResults.rows[0].path; // acessando o path

          return {
            // no map eu preciso de um return, no caso retorno uma nova propriedade para recipe
            ...recipe,
            image: `${request.protocol}://${
              request.headers.host
            }${image.replace('public', '')}`,
          };
        })
      );

      return response.render('admin/chefs/read', {
        chef,
        files,
        chefRecipes: chefRecipesWithImage,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async edit(request, response) {
    try {
      let results = await Chef.find(request.params.id);

      const chef = results.rows[0];

      if (!chef) return response.send('Chef not found!');

      // get images
      results = await Chef.files(chef.file_id);
      let files = results.rows;
      files = files.map((file) => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace(
          'public',
          ''
        )}`,
      }));

      return response.render('admin/chefs/edit', { chef, files });
    } catch (error) {
      console.log(error);
    }
  },

  async post(request, response) {
    try {
      const keys = Object.keys(request.body);

      for (key of keys) {
        if (request.body[key] == '') {
          return response.send('Por favor, preencha todos os campos!');
        }
      }

      if (request.files.length == 0) {
        return response.send('Por favor, envie pelo menos uma imagem');
      }

      const filesPromise = request.files.map((file) => File.create(file));

      const filePromiseResults = await Promise.all(filesPromise);

      const fileId = filePromiseResults[0].rows[0].id; // capturar o Id do file e jogar no create do chef;

      let resultsChefs = await Chef.create({
        name: request.body.name,
        file_id: fileId,
      });

      const chefId = resultsChefs.rows[0].id;

      return response.redirect(`/admin/chefs/${chefId}`);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  },

  async put(request, response) {
    try {
      const keys = Object.keys(request.body);

      for (key of keys) {
        if (request.body[key] == '' && key != 'removed_files') {
          return response.send('Please fill all fields!');
        }
      }

      let newFiles;

      // get new image
      if (request.files.length != 0) {
        const newFilesPromise = request.files.map((file) => File.create(file));

        newFiles = await Promise.all(newFilesPromise);
        //console.log(newFiles)
      }

      // remove photo from db
      if (request.body.removed_files) {
        // 1,
        const removedFiles = request.body.removed_files.split(','); // [1,]

        const lastIndex = removedFiles.length - 1;

        removedFiles.splice(lastIndex, 1); // [1]

        console.log(removedFiles);

        const removedFilesPromise = removedFiles.map((id) => File.delete(id));

        await Promise.all(removedFilesPromise);
      }

      console.log({
        name: request.body.name,
        file_id: newFiles[0].rows[0].id,
        id: request.body.id,
      });

      await Chef.update({
        name: request.body.name,
        file_id: newFiles[0].rows[0].id,
        id: request.body.id,
      });

      return response.redirect(`/admin/chefs/${request.body.id}`);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  },

  async delete(request, response) {
    try {
      let results = await Chef.find(request.body.id);

      const chef = results.rows[0];

      if (chef.total_recipes >= 1) {
        return response.send(
          'Chefs que possuem receitas não podem ser deletados'
        );
      } else {
        await Chef.delete(request.body.id);

        await File.delete(chef.file_id);

        return response.redirect(`/admin/chefs`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
