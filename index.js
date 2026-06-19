const express = require("express");

const app = express();

app.use(express.json());

const userRoute = require('./routes/utilisateurs.js');
const patientRoute = require('./routes/patient.js');
const resultatNuitRoute = require('./routes/resultatNuitRoutes.js');



app.use('/login', userRoute);
app.use('/patientId', patientRoute);
app.use('/patients', patientRoute);
app.use('/patientsupprimer', patientRoute);
app.use('/patientModifier', patientRoute);
app.use('/resultat-nuit-ajout', resultatNuitRoute);


const port = 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});