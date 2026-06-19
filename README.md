# CliniqueSomeilApi

# 1. Le projet
Api CliniqueSomeil avec node express.js pour liaison avec le projet de géneration de courbe rapport.

# 2. Comment installer et lancer le projet
Effectuer ces commandes dans un terminal à la racine du projet
```bash

npm install
npm install dotenv
npm install express
npm install mysql2

nodemon 
```
Le serveur démarre sur `http://localhost:3000`.

La base de données utilisée est `clinique` (MySQL). Pour la connecter aux projet:
```js
const mysql = require("mysql2");
require("dotenv").config();

const bdd = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

créer un fichier .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mdp
DB_NAME=votre_bdd

```
    
Créer les routes sur bruno ou postman
GET : récuperer des données via SELECT
POST : Ajouter des données via INSERT INTO
DELETE : Supprimer des données via DELETE
PUT : Modifier des donées via UPDATE

```
