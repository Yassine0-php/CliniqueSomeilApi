# CliniqueSommeilApi



# 3. Routes disponibles et comment les tester

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/trouverPersonnelParId` | Récupère un personnel par son ID |`{"id": 15}` |
| POST | `/ajouterNouveauPersonnel` | Création d'un personnel | `{"nom": "Dupont", "prenom" : "Amandine2", "date_embauche" : "2024-01-01", "telephone": "066644666", "email":"test2@test2.fr", "actif" : 1}` |
| DELETE | `/supprimerPersonnelId` | Supprimer un personnel par ID | `{"id": 15}` |
| PUT | `/modifierPersonnelId` | Modifier un personnel à partir de son ID |  `{"id": 15,"nom": "Dupont", "prenom" : "Amandine", "date_embauche" : "2024-01-01", "telephone": "0666666666", "email":"test@test.fr", "actif" : 0}` |
