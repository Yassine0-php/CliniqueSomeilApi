const mysql = require("mysql2");
require("dotenv").config();

const bdd = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


bdd.connect((err) => {
    if (err) {
        console.log("Erreur connexion MySQL :", err);
        return;
    }

     console.log("Connexion MySQL réussie !");
     console.log(process.env.DB_HOST);
     console.log(process.env.DB_USER);
     console.log(process.env.DB_PASSWORD);
     console.log(process.env.DB_NAME);
});


module.exports = bdd;