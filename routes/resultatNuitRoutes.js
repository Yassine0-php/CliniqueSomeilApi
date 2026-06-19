const express = require("express");
const router = express.Router();
const resultatNuitModel = require('../modele/resultatNuitModel.js')


router.post("/", (req, res) => {

    const { nuit, spo2_min, spo2_moy, spo2_mediane, duree_sommeil_min, new_duree_hypoxie, position_dominante, decibels_max, decibels_moy, new_nb_ronflements_forts } = req.body;

    result = resultatNuitModel.insertDataNight(
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

    if (result == 0)
        return res.status(401).json({ "message": "Résultat nuit non ajouté" });

    return res.status(200).json({
        "message": "Résultat nuit ajouté avec succés",
        "id": result
    });
});


module.exports = router;







