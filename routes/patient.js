const express = require("express");
const router = express.Router();
const patientModele = require('../modele/patient.js')


router.get('/par_id', (req,res) => {

    const id  = Number(req.query.id);
    //console.log("id reçu : ", id)
    patientModele.findPatientById(id, (err, patient) => {
         console.log("Erreur SQL :", err);
    console.log("Patient :", patient);

    if (err) {
        return res.status(500).json({ 
            success: false,
            error: err.message
        });
    }
        if (patient) {
             return res.status(200).json({
                "patient": {
                    "id_patient": patient.id_patient,
                    "nom": patient.nom,
                    "prenom": patient.prenom,


                    "date_naissance":patient.date_naissance,
                    "sexe":patient.sexe,
                    "adresse":patient.adresse,
                    "telephone":patient.telephone,
                    "email":patient.email,
                    "numero_secu":patient.numero_secu,
                    "imc_initial":patient.imc_initial,
                    "fumeur":patient.fumeur,
                    "pa_tabac":patient.pa_tabac,
                    "consommation_alcool":patient.consommation_alcool,
                    "profession":patient.profession,
                    "niveau_activité":patient.niveau_activite,
                    "date_creation_dpi":patient.date_creation_dpi,
                    "actif":patient.actif


                    
                    
                }
             });
        
        }else {
             return res.status(404).json({"message":"Patient non trouvé"})
        }

            
    });
});


router.get("/", (req, res) => {

    patientModele.displayAllPatients((err, patients) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        return res.status(200).json({
            patients: patients
        });

    });

});








router.post("/", (req, res) => {

   

    const { nom, prenom, date_naissance, sexe,adresse,telephone,email, numero_secu,imc_initial,fumeur,
            pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif } = req.body;


   patientModele.ajouterNouveauPatient(
    nom,prenom,date_naissance,sexe,adresse,telephone,email,numero_secu,imc_initial,fumeur,
    pa_tabac,consommation_alcool,profession, niveau_activite,date_creation_dpi,actif,
    //attribut table patient

    
    (err, id) => {
        if (err) {
            return res.status(500).json({ message:"patient deja existant !!" });
        }

        res.status(201).json({
            message: "Patient ajouté",
            id: id
        });
    }
);
});

router.delete("/", (req, res) => {
     const id  = Number(req.query.id);

    

   patientModele.supprimerPatientId(
    id,
    (err, id) => {
        if (err) {
            return res.status(500).json({ message:"la supression n'a pas été faite" });
        }

        res.status(201).json({message: "Patient supprimé avec succès !!",});
    }
);
});

router.put("/", (req, res) => {
     const id  = Number(req.query.id);
     const { nom, prenom, date_naissance, sexe,adresse,telephone,email, numero_secu,imc_initial,fumeur,
            pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif } = req.body;
    
    //ajouter les infos de la table patient
   patientModele.modifierPatient(
    id,nom,prenom,date_naissance,sexe,adresse,telephone, email, numero_secu,imc_initial,
    fumeur,pa_tabac,consommation_alcool,profession,niveau_activite,date_creation_dpi,actif,
    
    (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if(changes === 0) {
            return res.status(404).json({error: "patient introuvable"})
        }

        res.status(200).json({
            message: "Patient modifié avec succès !!",
            id: id
        });
    }
);
});




module.exports = router;







