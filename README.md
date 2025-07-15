# Port de Plaisance - API REST

## Vue d’ensemble

Ce projet est une API REST permettant la gestion d’un port de plaisance.  
Il gère les entités suivantes :  
- **Catways** : les emplacements pour les bateaux (numéro, type, état).  
- **Réservations** : réservations associées aux catways.  
- **Utilisateurs** : gestion des comptes utilisateurs avec authentification JWT.

L’API est sécurisée par un système d’authentification via token JWT.  
Une interface web permet d’interagir avec l’API via un tableau de bord.

---

## Installation

### Prérequis

- Node.js v16+  
- MongoDB local ou distant  
- npm (gestionnaire de paquets Node)

### Setup

git clone <repo-url>
cd port-russell-api
npm install

### Lancer le serveur
node server.js

### Lanccer les tests
npm test

### Lien du site 
https://port-russell-api-p9dt.onrender.com
