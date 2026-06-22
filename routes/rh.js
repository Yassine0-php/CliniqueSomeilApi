const express = require("express");
const router = express.Router();
const rhModele = require('../modele/rhModele.js')

router.get('/', (req,res) => {

    const id  = Number(req.query.id);
    //console.log("id reçu : ", id)
    rhModele.trouverPersonnelParId(id, (err, personnel) => {
         console.log("Erreur SQL :", err);
    console.log("Personnel :", personnel);

    if (err) {
        return res.status(500).json({ 
            success: false,
            error: err.message
        });
    }
        if (personnel) {
             return res.status(200).json({
                "Personnel": {
                    "id_Personnel ": personnel.id_personnel,
                    "Nom ": personnel.nom,
                    "Prenom ": personnel.prenom,
                    "Date embauche " : personnel.date_embauche,
                    "Téléphone " : personnel.telephone,
                    "Email " : personnel.email,
                    
                }
             });
        
        }else {
             return res.status(404).json({"Message":"Personnel non trouvé"})
        }

            
    });
});


router.post("/", (req, res) => {
    const {nom, prenom, date_embauche, telephone, email, actif } = req.body;

    rhModele.ajouterNouveauPersonnel(
    nom,
    prenom,
    date_embauche,
    telephone,
    email,
    actif,
    (err, id) => {


          if (err) {
    console.error("Erreur SQL :", err);

    return res.status(500).json({
        error: err.message,
        details: err
    });
}
        // if (err) {
        //     return res.status(500).json({ message:"personnel deja existant !!" });
        // }

        res.status(201).json({
            message: "Personnel ajouté",
            id: id
        });
    }
);
});


router.delete("/", (req, res) => {
     const id  = Number(req.query.id);

    

   rhModele.supprimerPersonnelId(
    id,
    (err, id) => {
        if (err) {
            return res.status(500).json({ message:"La supression n'a pas été faite" });
        }

        res.status(201).json({message: "Personnel supprimé avec succès !!",});
    }
);
});

router.put("/", (req, res) => {
    
    const { id, nom, prenom, date_embauche, telephone, email, actif } = req.body;
    

   rhModele.modifierPersonnelId(
    id,
    nom,
    prenom,
    date_embauche,
    telephone,
    email,
    actif,
    (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if(changes === 0) {
            return res.status(404).json({error: "Personnel introuvable"})
        }

        res.status(200).json({
            message: "Personnel modifié avec succès !!",
            id: id
        });
    }
);
});




module.exports = router;
