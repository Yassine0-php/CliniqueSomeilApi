const express = require("express");
const router = express.Router();
const resultatNuitModel = require('../modele/resultatNuitModel.js')


router.post("/ajout", async (req, res) => {

    const { nuit, spo2_min, spo2_moy, spo2_mediane, duree_sommeil_min, new_duree_hypoxie, position_dominante, decibels_max, decibels_moy, new_nb_ronflements_forts } = req.body;

    result = await resultatNuitModel.insertDataNight(
        nuit,
        spo2_min,
        spo2_moy,
        spo2_mediane,
        duree_sommeil_min,
        new_duree_hypoxie,
        position_dominante,
        decibels_max,
        decibels_moy,
        new_nb_ronflements_forts);
    if (result) {
        return res.status(200).json({
            "message": "Résultat nuit ajouté avec succés",
            "id": result
        });
    }
    else {
        return res.status(500).json({ "message": "Résultat nuit non ajouté" });
    }
});

router.get('/details', async (req, res) => {

    const id = Number(req.query.id_nuit);

    result = await resultatNuitModel.chercherResultNuit(id);
    if (!result) {
        return res.status(500).json({
            success: false,
            message: "Résultat nuit non trouvé",

        });
    }
    return res.status(200).json({
        "resultat_nuit": {
            "id_medecin_validateur": result['id_medecin_validateur'],
            "id_nuit": result['id_nuit'],
            "date_validation": result['date_validation'],
            "iah": result['iah'],
            "spo2_min": result['spo2_min'],
            "spo2_moy": result['spo2_moy'],
            "spo2_mediane": result['spo2_mediane'],
            "nb_apnees": result['nb_apnees'],
            "nb_hypopnees": result['nb_hypopnees'],
            "nb_rera": result['nb_rera'],
            "nb_microeveils": result['nb_microeveils'],
            "duree_sommeil_min": result['duree_sommeil_min'],
            "duree_hypoxie_min": result['duree_hypoxie_min'],
            "position_dominante": result['position_dominante'],
            "duree_apnee_moy_sec": result['duree_apnee_moy_sec'],
            "duree_apnee_max_sec": result['duree_apnee_max_sec'],
            "decibels_max": result['decibels_max'],
            "decibels_moy": result['decibels_moy'],
            "nb_ronflements_forts": result['nb_ronflements_forts'],
            "severite_iah": result['severite_iah'],
            "commentaire_medical": result['commentaire_medical'],
        }
    });
});


router.get('/suppression', async (req, res) => {

    const id = Number(req.query.id_nuit);
    result = await resultatNuitModel.supprimerResultNuit(id);

    if (result == 0) {
        return res.status(500).json({
            success: false,
            message: "Résultat Nuit non trouvé",

        });
    }
    return res.status(200).json({
        "resultat_nuit": {
            "message": "Résultat Nuit supprimé avec succés"
        }
    });
});


router.put("/modification", async (req, res) => {

    const {
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
        new_nb_ronflements_forts,
        nuit } = req.body;

    result = await resultatNuitModel.modifierResultNuit(
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
        new_nb_ronflements_forts,
        nuit);
    if (result === 1) {
        return res.status(200).json({
            "message": "Résultat nuit  mis à jour  avec succés",
        });
    }
    else {

        return res.status(500).json({ "message": "Résultat nuit non mis à jour" });
    }
});

module.exports = router;







