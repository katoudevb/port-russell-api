const mongoose = require('mongoose');

/**
 * Schéma d'une réservation de catway
 * @typedef Reservation
 * @property {string} catwayNumber - Numéro du catway réservé
 * @property {string} clientName - Nom du client ayant réservé
 * @property {string} boatName - Nom du bateau réservé
 * @property {Date} checkIn - Date et heure d'arrivée
 * @property {Date} checkOut - Date et heure de départ
 */
const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
