const bdd = require("../config/connexionBdd");

function findUserByMailAndPassword(email, mdp, callback) {

    console.log(email, mdp);

    bdd.query(
        `SELECT u.id_utilisateur, p.email,p.actif,p.nom,p.prenom,p.telephone,p.date_embauche,u.mdp, u.role 
         FROM utilisateur u
         inner join personnel p on p.id_personnel=u.id_personnel
         WHERE p.email =? AND u.mdp =?`,
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