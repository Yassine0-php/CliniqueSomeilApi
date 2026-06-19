const bdd = require("../config/connexionBdd");


bdd.query('SELECT * FROM resultat_nuit', (err, results) => {
    if (err) throw err;
    // console.log(results);
});

function insertDataNight(
    nuit,
    spo2_min,
    spo2_moy,
    spo2_mediane,
    duree_sommeil_min,
    new_duree_hypoxie,
    position_dominante,
    decibels_max,
    decibels_moy,
    new_nb_ronflements_forts
) {

    const sql = `
    INSERT INTO resultat_nuit (
        id_nuit,
        id_medecin_validateur,
        date_validation,
        iah,
        spo2_min,
        spo2_moy,
        spo2_mediane,
        nb_apnees,
        nb_hypopnees,
        nb_rera,
        nb_microeveils,
        duree_sommeil_min,
        duree_hypoxie_min,
        position_dominante,
        duree_apnee_moy_sec,
        duree_apnee_max_sec,
        decibels_max,
        decibels_moy,
        nb_ronflements_forts
    )
    VALUES (
        ?,
        (SELECT id_medecin FROM nuit_etude WHERE id_nuit = ?),
        CURRENT_DATE(),
        (
            SELECT SUM(valeur)/2
            FROM (
                SELECT COUNT(*) AS valeur
                FROM evenement_respiratoire
                WHERE type_evenement IN ('apnée obstructive','apnée centrale')
                AND id_nuit = ?

                UNION ALL

                SELECT COUNT(*)
                FROM evenement_respiratoire
                WHERE type_evenement = 'hypopnée'
                AND id_nuit = ?
            ) AS iah
        ),
        ?,
        ?,
        ?,
        (
            SELECT (COUNT(*) * ? / 120)
            FROM evenement_respiratoire
            WHERE type_evenement IN ('apnée obstructive','apnée centrale')
            AND id_nuit = ?
        ),
        (
            SELECT (COUNT(*) * ? / 120)
            FROM evenement_respiratoire
            WHERE type_evenement = 'hypopnée'
            AND id_nuit = ?
        ),
        (
            SELECT (COUNT(*) * ? / 120)
            FROM evenement_respiratoire
            WHERE type_evenement = 'RERA'
            AND id_nuit = ?
        ),
        (
            SELECT (COUNT(*) * ? / 120)
            FROM evenement_respiratoire
            WHERE id_nuit = ?
        ),
        ?,
        ?,
        ?,
        (
            SELECT AVG(duree_sec)
            FROM evenement_respiratoire
            WHERE id_nuit = ?
        ),
        (
            SELECT MAX(duree_sec)
            FROM evenement_respiratoire
            WHERE id_nuit = ?
        ),
        ?,
        ?,
        ?
    )`;

    const values = [
        nuit,
        nuit,
        nuit,
        nuit,
        spo2_min,
        spo2_moy,
        spo2_mediane,

        duree_sommeil_min,
        nuit,

        duree_sommeil_min,
        nuit,

        duree_sommeil_min,
        nuit,

        duree_sommeil_min,
        nuit,

        duree_sommeil_min,
        new_duree_hypoxie,
        position_dominante,

        nuit,
        nuit,

        decibels_max,
        decibels_moy,
        new_nb_ronflements_forts
    ];

    bdd.query(sql, values, (err, result) => {
        if (err) {
            // console.error("Erreur insert sur resultat_nuit :", err);
            ajout = 0
            return ajout;
        }
        ajout = result.insertId
        return ajout;
        // console.log("Ligne ajoutée avec ID :", result.insertId);
    });
}


module.exports = { insertDataNight }; // partager la fonction