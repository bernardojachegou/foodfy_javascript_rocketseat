const File = require('../models/File');
const Recipe = require('../models/Recipe');
const RecipeFile = require('../models/RecipeFile');
const Chef = require('../models/Chef');

module.exports = {
  about(request, response) {
    return response.render('foodfy/about');
  },

  async index(request, response) {
    try {
      const { filter } = request.query;

      if (filter) {
        let filterResults = await Recipe.findBy(filter);
        const recipes = filterResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);

        return response.render('foodfy/home', { recipes: lastAdded });
      } else {
        let recipeResults = await Recipe.all();
        const recipes = recipeResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);
        return response.render('foodfy/home', { recipes: lastAdded });
      }
    } catch (error) {
      console.error(error);
    }
  },

  async recipes(request, response) {
    try {
      const { filter } = request.query;

      if (filter) {
        let filterResults = await Recipe.findBy(filter);
        const recipes = filterResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);

        return response.render('foodfy/recipes', { recipes: lastAdded });
      } else {
        let recipeResults = await Recipe.all();
        const recipes = recipeResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);
        return response.render('foodfy/recipes', { recipes: lastAdded });
      }
    } catch (error) {
      console.error(error);
    }
  },

  async recipe(request, response) {
    let results = await Recipe.find(request.params.id);
    const recipe = results.rows[0];

    if (!recipe) return response.send('Recipe not found!');

    return response.render('foodfy/recipe', { recipe });
  },

  async chefs(request, response) {
    let results = await Chef.all();
    const chefs = results.rows;

    return response.render('foodfy/chefs', { chefs });
  },

  async chef(request, response) {
    let results = await Chef.find(request.params.id);
    const chef = results.rows[0];

    if (!chef) return response.send('Recipe not found!');

    results = await Chef.findRecipes(request.params.id);
    const recipes = results.rows[0];

    return response.render('foodfy/chef', { chef, recipes });
  },
};
