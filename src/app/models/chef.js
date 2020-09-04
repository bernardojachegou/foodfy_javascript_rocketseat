const db = require('../../config/db.js');
// const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`, function (err, results) {
            if(err) throw `Database error: ${err}`

            callback(results.rows);
        })
    }
}