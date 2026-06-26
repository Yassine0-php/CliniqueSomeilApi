const express = require("express");
const router = express.Router();
const userModele = require('../modele/utilisateur.js')

router.post('/', (req, res) => {

    const { email, mdp } = req.body;
    console.log(req.body);
    userModele.findUserByMailAndPassword(email, mdp, (err, user) => {

        if (err) {
            return res.status(500).json({ success: false });
        }

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Connexion validée",
                id_utilisateur: user.id_utilisateur,
                role: user.role,
                email:user.email,
                actif:user.actif,
                nom : user.nom,
                prenom : user.prenom,
                telephone :user.telephone,
                date_embauche:user.date_embauche
            });
        }

        return res.status(401).json({
            success: false,
            message: "Connexion refusée"
        });
    });
});

module.exports = router;