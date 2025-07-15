const express = require('express');
const router = express.Router();
const authService = require('../services/authServices');

/**
 * POST /register
 * Enregistre un nouvel utilisateur avec les données fournies dans le corps de la requête.
 * @body {Object} userData - Données utilisateur (ex: name, email, password)
 * @returns {Object} Message de confirmation d'enregistrement
 */
router.post('/register', async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /login
 * Authentifie un utilisateur avec email et mot de passe.
 * Renvoie un token JWT en cas de succès.
 * @body {Object} credentials - Contient email et password
 * @returns {Object} Token JWT
 */
router.post('/login', async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
