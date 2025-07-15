/**
 * @file app.js
 * @description Configuration de l'application Express, des routes, middlewares et connexion MongoDB.
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Import des middlewares et routes
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON et les formulaires URL-encodés
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Routes publiques
app.use('/auth', authRoutes);

// Middleware d’authentification appliqué aux routes protégées
app.use(authMiddleware);

// Routes protégées accessibles uniquement après authentification
app.use('/users', userRoutes);
app.use('/catways', catwaysRoutes);
app.use('/catways/:id/reservations', reservationsRoutes);

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Export de l'app pour pouvoir l'utiliser dans server.js ou dans les tests
module.exports = app;
