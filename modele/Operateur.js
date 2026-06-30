
const bdd = require("../config/connexionBdd");

function trouverAppareilParId(id, callback) {
    bdd.query(
        `SELECT * FROM appareil WHERE id_appareil = ?`,
        [id],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result[0]);
        }
    );
}

function ajouterNouveauAppareil(modele, numero_serie, fabricant, date_installation, localisation, callback) {
    bdd.query(
        `INSERT INTO appareil (modele, numero_serie, fabricant, date_installation, localisation) VALUES (?, ?, ?, ?, ?)`,
        [modele, numero_serie, fabricant, date_installation, localisation],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.lastID);
        }
    );
}

function supprimerAppareilId(id, callback) {
    bdd.query(
        `DELETE FROM appareil WHERE id_appareil = ?`,
        [id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}

function modifierLocalisationAppareil( id, localisation, callback) {

    bdd.query(
        `UPDATE appareil 
         SET localisation = ?
         WHERE id_appareil = ?`,
        [localisation, id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}


module.exports = {
    trouverAppareilParId,
    ajouterNouveauAppareil,
    modifierLocalisationAppareil,
    supprimerAppareilId
};