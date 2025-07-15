const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');

/**
 * Route POST /register
 * Enregistre un nouvel utilisateur.
 */
router.post('/register', async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Route POST /login
 * Authentifie un utilisateur et retourne un token JWT.
 */
router.post('/login', async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

/**
 * Route PUT /:id
 * Met à jour un utilisateur existant par son ID.
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Route DELETE /:id
 * Supprime un utilisateur par son ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
