const db = require('../../config/db.js');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows);
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.row)
        })
    }
}