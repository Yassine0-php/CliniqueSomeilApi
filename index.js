const express = require("express");


const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:4200"
}));

app.use(express.json());
app.use(cors());

const userRoute = require('./routes/utilisateurs.js');
const patientRoute = require('./routes/patient.js');
const resultatNuitRoute = require('./routes/resultatNuitRoutes.js');
const appareilRoute = require('./routes/appareilRoutes.js');
const rhRoute = require('./routes/rh.js');
const lancerEtl = require('./routes/lancerEtl.js');
const medecinRoute = require('./routes/medecinRoutes.js');

const nuitEtudeRoute = require('./routes/nuitEtude.js');

const lancerStreamlit = require('./routes/lancerStreamlit.js');



app.use('/login', userRoute);
app.use('/patientId', patientRoute);
app.use('/patients', patientRoute);
app.use('/patientsupprimer', patientRoute);
app.use('/patientModifier', patientRoute);
app.use('/afficherPatients', patientRoute);

app.use('/resultat-nuit-ajout', resultatNuitRoute);
app.use('/resultat-nuit', resultatNuitRoute);


app.use('/trouverPersonnelParId', rhRoute);
app.use('/ajouterNouveauPersonnel', rhRoute);
app.use('/supprimerPersonnelId', rhRoute);
app.use('/modifierPersonnelId', rhRoute);

app.use(lancerEtl);

app.use(lancerStreamlit);

app.use('/nuitEtude', nuitEtudeRoute);

app.use(appareilRoute);
app.use(medecinRoute);


const port = 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});