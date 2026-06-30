
const bdd = require("../config/connexionBdd");

function trouverMedecinsValidateurs(callback) {
    bdd.query(
        `SELECT * FROM v_medecins_validateurs`,
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        }
    );
}

module.exports = {
    trouverMedecinsValidateurs
};