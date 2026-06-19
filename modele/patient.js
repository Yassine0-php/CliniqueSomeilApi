
const bdd = require("../config/connexionBdd");

function findPatientById(id, callback) {
    bdd.query(
        `SELECT * FROM patient WHERE id_patient = ?`,
        [id],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null,  result[0]);
        }
    );
}

function ajouterNouveauPatient(nom, prenom, date_naissance, sexe,adresse,telephone,email, numero_secu,imc_initial,fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif,callback) {
    bdd.query(
        `INSERT INTO patient (nom, prenom, date_naissance,sexe,adresse,telephone,email,numero_secu,imc_initial,fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?)`,
        [nom, prenom, date_naissance,sexe,adresse,telephone,email,numero_secu,imc_initial,fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.lastID);
        }
    );
}


function supprimerPatientId(id, callback) {
    bdd.query(
        `DELETE FROM patient WHERE id = ?`,
        [id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}

function modifierPatient(id, nom, prenom, age, mail, telephone, callback) {

    bdd.query(
        `UPDATE patient 
         SET nom = ?, prenom = ?, age = ?, mail = ?, telephone = ?
         WHERE id = ?`,
        [nom, prenom, age, mail, telephone, id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}








module.exports = {
    findPatientById,
    ajouterNouveauPatient,
    supprimerPatientId,
    modifierPatient
    
};