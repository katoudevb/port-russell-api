const Reservation = require('../models/Reservation');

// Ajouter une réservation
async function addReservation(reservationData) {
  const reservation = new Reservation(reservationData);
  return await reservation.save();
}

//Récuperer une reservation par ID
async function getReservationById(reservationId) {
  return await Reservation.findById(reservationId);
}

// Supprimer une réservation par ID
async function deleteReservation(reservationId) {
  return await Reservation.findByIdAndDelete(reservationId);
}

// Lister les réservations (optionnel selon besoin)
async function listReservations() {
  return await Reservation.find();
}

module.exports = {
  addReservation,
  deleteReservation,
  listReservations,
  getReservationById
};
