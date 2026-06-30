const express = require("express");
const router = express.Router();
const medecinModele = require('../modele/medecinModel.js')


router.get('/medecins_validateurs', (req,res) => {

    medecinModele.trouverMedecinsValidateurs((err, medecin) => {
         console.log("Erreur SQL :", err);
    console.log("Medecin :", medecin);

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        return res.status(200).json({
            "medecins" : medecin
        });

    });

});
            
module.exports = router;