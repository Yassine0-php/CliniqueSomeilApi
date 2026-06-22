const bdd = require("../config/connexionBdd");

function trouverPersonnelParId(id, callback) {
    bdd.query(
        `SELECT * FROM personnel WHERE id_personnel = ?`,
        [id],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null,  result[0]);
        }
    );
}

function ajouterNouveauPersonnel(nom, prenom, date_embauche, telephone, email, actif, callback) {
    bdd.query(
        `INSERT INTO personnel (nom, prenom, date_embauche, telephone, email, actif) VALUES (?, ?, ?, ?, ?, ?)`,
        [nom, prenom, date_embauche, telephone, email, actif],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.lastID);
        }
    );
}

function supprimerPersonnelId(id, callback) {
    bdd.query(
        `DELETE FROM personnel WHERE id_personnel = ?`,
        [id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}

function modifierPersonnelId(id, nom, prenom, date_embauche, telephone, email, actif, callback) {

    bdd.query(
        `UPDATE personnel 
         SET nom = ?, prenom = ?, date_embauche = ?, telephone = ?, email = ?, actif = ?
         WHERE id_personnel = ?`,
        [nom, prenom, date_embauche, telephone, email, actif, id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}




module.exports = {
    trouverPersonnelParId,
    ajouterNouveauPersonnel,
    supprimerPersonnelId,
    modifierPersonnelId
    
};