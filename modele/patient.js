
const bdd = require("../config/connexionBdd");

function displayAllPatients(callback) {
    bdd.query(
        `SELECT * FROM patient`,
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null,  result);
        }
    );
}


function findPatientById(id_patient, callback) {
    bdd.query(
        `SELECT * FROM patient WHERE id_patient = ?`,
        [id_patient],
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


function supprimerPatientId(id_patient, callback) {
    bdd.query(
        `DELETE FROM patient WHERE id_patient = ?`,
        [id_patient],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}

function modifierPatient(id_patient, nom, prenom, date_naissance, sexe,adresse,telephone,email, numero_secu,imc_initial,fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif, callback) {

    bdd.query(
        `UPDATE patient 
         SET nom = ?, prenom = ?, date_naissance = ?, sexe = ?, adresse = ?, telephone = ?, 
         email = ?, numero_secu = ?, imc_initial = ?, fumeur = ?, pa_tabac = ?, consommation_alcool = ?, 
         profession = ?, niveau_activite = ?,date_creation_dpi = ?, actif = ?
         WHERE id_patient = ?`,
        [ nom, prenom, date_naissance, sexe,adresse,telephone,email, numero_secu,imc_initial,fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif,id_patient],
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
    displayAllPatients,
    ajouterNouveauPatient,
    supprimerPatientId,
    modifierPatient
    
};