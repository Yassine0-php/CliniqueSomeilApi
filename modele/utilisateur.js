const bdd = require("../config/connexionBdd");

function findUserByMailAndPassword(email, mdp, callback) {

    console.log(email, mdp);

    bdd.query(
        `SELECT id_utilisateur, email, mdp, role 
         FROM utilisateur 
         WHERE email = ? AND mdp = ?`,
        [email, mdp],
        (err, rows) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            console.log("Résultat SQL :", rows);

            if (rows.length > 0) {
                return callback(null, rows[0]);
            }

            return callback(null, null);
        }
    );
}

module.exports = {
    findUserByMailAndPassword
};