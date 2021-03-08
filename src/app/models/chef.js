const db = require('../../config/db.js');
const { date } = require('../../lib/utils');

module.exports = {
  all() {
    return db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs 
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id
      ORDER BY name ASC`);
  },

  create({ file_id, name }) {
    const query = `
			INSERT INTO chefs (
					file_id,
					name,
					created_at
			) VALUES ($1, $2, $3)
			RETURNING id
		`;

    const values = [file_id, name, date(Date.now()).iso];

    return db.query(query, values);
  },

  find(id) {
    return db.query(
      `
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs 
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id, chefs.name, chefs.created_at;`,
      [id]
    );
  },

  findRecipesOfChef(id) {
    return db.query(
      `
    SELECT *
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE chefs.id = $1`,
      [id]
    );
  },

  findChefRecipes(id) {
    return db.query(
      `
        SELECT *
        FROM recipes
        WHERE chef_id = $1
        ORDER BY created_at DESC
    `,
      [id]
    );
  },

  update(data) {
    const query = `
        UPDATE chefs SET
            name=($1),
            file_id=($2)
        WHERE id = $3
    `;

    const values = [data.name, data.file_id, data.id];

    return db.query(query, values);
  },

  delete(id) {
    try {
      return db.query(`DELETE FROM chefs WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },

  totalRecipesOfChef() {
    return db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`);
  },

  files(id) {
    return db.query(` SELECT * FROM files WHERE id = $1`, [id]);
  },
};
