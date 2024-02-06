# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Fonctionnalités de l'application ###

## Authentification :

- Connexion par email & mot de passe
- Inscription
Mot de passe oublié (réinitialisation du mdp par email)

- Cryptage du mdp en base de données (Bcrypt)
- A la connexion, stockage du token dans le localstorage
- Déconnexion

* Annonces :
- Consultation des annonces
- Vue du détail d'une annonce
- Contact de l'annonceur par mail (utilisation de MailHog)
- Consultation des annonces de l'utilisateur connecté
- Mise à jour d'une annonce
- Suppression d'annonce

* Réservation de bureau :
- Choix de la date de réservation via datapicker
- Réservation des bureaux libres par clic

* Page d'accueil :
- Description du site
- Utilisation API météo (https://openweathermap.org/api)

### Technologies utilisées : ###

* Back : NestJS
* Base de données : PostgreSQL
* Front : Angular
* Librairie graphique : NgZorro

### Lancer le projet ###

* Front :
- Dans un terminal, se placer dans le dossier front-projet : taper "cd front-projet"
- Taper "ng serve"
- Ouvrir dans un navigateur l'url : http://localhost:4200

* Back :
- Dans un terminal, se placer dans le dossier back-projet : taper "cd back-projet"
- Taper "npm run start"
- Si besoin, vérifier que le server tourne bien dans un navigateur sur l'url : http://localhost:3000

* Service email :
- Lancer le fichier : MailHog_windows_amd64.exe
- Ouvrir dans un navigateur l'url : http://localhost:8025 



### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact