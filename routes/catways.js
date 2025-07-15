const express = require('express');
const router = express.Router();
const catwayService = require('../services/catwayService');

/**
 * POST /
 * Crée un nouveau catway avec les données envoyées dans le corps de la requête.
 * @body {Object} catwayData - Données du catway à créer
 * @returns {Object} Le catway créé
 */
router.post('/', async (req, res) => {
  try {
    const newCatway = await catwayService.addCatway(req.body);
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /:id
 * Supprime un catway identifié par son ID passé en paramètre d'URL.
 * @param {string} id - ID du catway à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete('/:id', async (req, res) => {
  try {
    await catwayService.deleteCatway(req.params.id);
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /
 * Récupère la liste de tous les catways.
 * @returns {Array} Liste des catways
 */
router.get('/', async (req, res) => {
  try {
    const catways = await catwayService.listCatways();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
