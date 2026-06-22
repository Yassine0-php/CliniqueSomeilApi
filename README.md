# CliniqueSommeilApi


# 1. Le projet
Api CliniqueSommeil avec node express.js pour liaison avec le projet de géneration de courbe rapport.

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


```
# 3. Routes disponibles et comment les tester

## 1. Route Personnel

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/trouverPersonnelParId` | Récupère un personnel par son ID |`{"id": 15}` |
| POST | `/ajouterNouveauPersonnel` | Création d'un personnel | `{"nom": "Dupont", "prenom" : "Amandine2", "date_embauche" : "2024-01-01", "telephone": "066644666", "email":"test2@test2.fr", "actif" : 1}` |
| DELETE | `/supprimerPersonnelId` | Supprimer un personnel par ID | `{"id": 16}` |
| PUT | `/modifierPersonnelId` | Modifier un personnel à partir de son ID |  `{"id": 15,"nom": "Dupont", "prenom" : "Amandine", "date_embauche" : "2024-01-01", "telephone": "0666666666", "email":"test@test.fr", "actif" : 0}` |


## 2. Route patient

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/patientId` | Récupère un patient par son ID |`{"id": 2}` |
| POST | `/patients` | Ajout d'un patient | `"nom": "bernard","prenom": "franc","date_naissance": "1980-03-27", "sexe": "M","adresse": "14 allée des Platanes, Fleur","telephone": "0622556698","email": "bernard.franc@sfr.fr","numero_secu": "2 80 03 13 143 225","imc_initial": "27.4",fumeur": 0,"pa_tabac": 0, "consommation_alcool": "aucune","profession": "Comptable","niveau_activité": "modéré","date_creation_dpi": "2024-10-05","actif": 1` |
| DELETE | `/patientsupprimer` | Supprimer un patient par ID | `{"id": 2}` |
| PUT | `/patientModifier` | Modifier un patient à partir de son ID |  `"nom": "bernard","prenom": "franc","date_naissance": "1980-03-27", "sexe": "M","adresse": "14 allée des Platanes, Fleur","telephone": "0622556698","email": "bernard.franc@sfr.fr","numero_secu": "2 80 03 13 143 225","imc_initial": "27.4",fumeur": 0,"pa_tabac": 0, "consommation_alcool": "aucune","profession": "Comptable","niveau_activité": "modéré","date_creation_dpi": "2024-10-05","actif": 1` |

## 3. Route Appareil

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/appareilId` | Récupère un appareil par son ID |`{"id": 15}` |
| POST | `/appareil-ajout` | Création d'un nouvel appareil | `{"modele": "AirSense 11", "numero_serie":"SN-CPAP-040", "fabricant": "ResMed", "date_installation": "2025-06-25", "localisation": "Domicile patient"}` |
| DELETE | `/appareil-suppression` | Supprimer un appareil par ID | `{"id": 16}` |
| PUT | `/appareil-localisation-modification` | Modifier la localisation d'un appareil à partir de son ID |  `{"id": 15,"localisation":"Domicile parent"}` |


## 3. Route Résultat d'une nuit

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/resultat-nuit/details` | Récupère un résultat par son un ID nuit |`{"id_nuit": 1}` |
| POST | `/resultat-nuit/ajout` | Ajout d'un résultat nuit | ` {"nuit":"1","spo2_min":"88.70","spo2_moy":"96.80","spo2_mediane":"97.00", "duree_sommeil_min":"450","new_duree_hypoxie":"5","position_dominante":"latérale","decibels_max":"59.80","decibels_moy":"100","new_nb_ronflements_forts":"0"}` |
| DELETE | `/resultat-nuit/suppression` | Supprimer le résultat d'une nuit | `{"id_nuit": 1}` |
| PUT | `/resultat-nuit/modification` | Modifier les résultats d'une nuit |  `{"id_medecin_validateur":"2","date_validation":"2026-06-21","iah": 18.4,"spo2_min": 84,"spo2_moy": 93.2,"spo2_mediane": 94,"nb_apnees": 32,"nb_hypopnees": 45,"nb_rera": 10,"nb_microeveils": 22,"duree_sommeil_min": 50,"duree_hypoxie_min": 35,"position_dominante": "latérale","duree_apnee_moy_sec":21.5,"duree_apnee_max_sec": 48,"decibels_max": 78.3,"decibels_moy": 52.6,"new_nb_ronflements_forts":0,"nuit": "2"}` |
