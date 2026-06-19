
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

function ajouterNouveauPatient(nom, prenom, age, mail, telephone, callback) {
    bdd.run(
        `INSERT INTO patient (nom, prenom, age, mail, telephone) VALUES (?, ?, ?, ?, ?)`,
        [nom, prenom, age, mail, telephone],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.lastID);
        }
    );
}


function supprimerPatientId(id, callback) {
    bdd.run(
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

    bdd.run(
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