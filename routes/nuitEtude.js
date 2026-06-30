const express = require("express");
const router = express.Router();
const nuitEtudeModele = require('../modele/nuitEtudeModel.js')





router.get("/", (req, res) => {

    nuitEtudeModele.getNuitNonTraiter((err, nuit_etude) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        return res.status(200).json({
            nuit_etude : nuit_etude
        });

    });

});
module.exports = router;