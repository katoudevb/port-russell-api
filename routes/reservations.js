const express = require('express');
const router = express.Router({ mergeParams: true }); // Permet de récupérer :id dans l'URL parent (catway)
const reservationService = require('../services/reservationService');

/**
 * POST /
 * Ajouter une réservation pour un catway donné.
 * L'ID du catway est récupéré depuis req.params.id.
 * @body {Object} reservationData - Données de la réservation
 * @returns {Object} La réservation créée
 */
router.post('/', async (req, res) => {
  try {
    const reservationData = { ...req.body, catwayId: req.params.id };
    const newReservation = await reservationService.addReservation(reservationData);
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /:reservationId
 * Supprimer une réservation par son ID.
 * @param {string} reservationId - ID de la réservation à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete('/:reservationId', async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.reservationId);
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /
 * Lister toutes les réservations.
 * @returns {Array} Liste des réservations
 */
router.get('/', async (req, res) => {
  try {
    const reservations = await reservationService.listReservations();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
