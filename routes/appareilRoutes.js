const express = require("express");
const router = express.Router();
const appareilModele = require('../modele/appareilModel.js')


router.get('/appareilId', (req,res) => {

    const id  = Number(req.query.id);
    //console.log("id reçu : ", id)
    appareilModele.trouverAppareilParId(id, (err, appareil) => {
         console.log("Erreur SQL :", err);
    console.log("Appareil :", appareil);

    if (err) {
        return res.status(500).json({ 
            success: false,
            error: err.message
        });
    }
        if (appareil) {
             return res.status(200).json({
                appareil,             
                }
             );
        
        }else {
             return res.status(404).json({"message":"Appareil non trouvé"})
        }

            
    });
});


router.post("/appareil-ajout", (req, res) => {
    const { modele, numero_serie, fabricant, date_installation, localisation } = req.body;

    appareilModele.ajouterNouveauAppareil(
    modele, 
    numero_serie, 
    fabricant, 
    date_installation,
    localisation,

    (err, id) => {
        if (err) {
            return res.status(500).json({ message : "Appareil déjà existant !!" });
        }

        res.status(201).json({
            message: "Appareil ajouté",
            id: id
        });
    }
);
});


router.delete("/appareil-suppression", (req, res) => {
     const id  = Number(req.query.id);

    appareilModele.supprimerAppareilId(
    id,
    (err, id) => {
        if (err) {
            return res.status(500).json({ message:"La supression n'a pas été faite" });
        }

        res.status(201).json({ message: "Appareil supprimé avec succès !!"});
    }
);
});


router.put("/appareil-localisation-modification", (req, res) => {
     const id  = Number(req.query.id);
    const {localisation} = req.body;
    

   appareilModele.modifierLocalisationAppareil(
    id,
    localisation,
    (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if(changes === 0) {
            return res.status(404).json({error: "Appareil introuvable"})
        }

        res.status(200).json({
            message: "Appareil modifié avec succès !!",
            id: id,
            localisation : localisation
        });
    }
);
});



module.exports = router;