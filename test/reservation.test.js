/**
 * @fileoverview Tests unitaires du ReservationService avec Mocha, Chai et Sinon.
 * Teste les fonctionnalités : ajout, suppression, récupération et listing des réservations.
 */

require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');
const Reservation = require('../models/Reservation');
const reservationService = require('../services/reservationService');

describe('Reservation Service', () => {
  // Nettoyage des stubs après chaque test
  afterEach(() => {
    sinon.restore();
  });

  /**
   * Test de la fonction addReservation()
   * Vérifie si une réservation est bien enregistrée via Reservation.prototype.save
   */
  describe('addReservation', () => {
    it('devrait ajouter une réservation', async () => {
      const fakeReservation = { _id: '123', user: 'User1', catway: 'Catway1' };
      sinon.stub(Reservation.prototype, 'save').resolves(fakeReservation);

      const result = await reservationService.addReservation({ user: 'User1', catway: 'Catway1' });
      expect(result).to.deep.equal(fakeReservation);
    });
  });

  /**
   * Test de la fonction deleteReservation()
   * Vérifie que Reservation.findByIdAndDelete() est appelée et retourne l'objet supprimé
   */
  describe('deleteReservation', () => {
    it('devrait supprimer une réservation par ID', async () => {
      const fakeDeleted = { _id: '123' };
      const stub = sinon.stub(Reservation, 'findByIdAndDelete').resolves(fakeDeleted);

      const result = await reservationService.deleteReservation('123');
      expect(stub.calledOnceWith('123')).to.be.true;
      expect(result).to.deep.equal(fakeDeleted);
    });
  });

  /**
   * Test de la fonction listReservations()
   * Vérifie si toutes les réservations sont récupérées avec Reservation.find()
   */
  describe('listReservations', () => {
    it('devrait retourner toutes les réservations', async () => {
      const fakeList = [{ _id: '1' }, { _id: '2' }];
      sinon.stub(Reservation, 'find').resolves(fakeList);

      const result = await reservationService.listReservations();
      expect(result).to.deep.equal(fakeList);
    });
  });

  /**
   * Test de la fonction getReservationById()
   * Vérifie si les détails d'une réservation sont correctement récupérés via findById
   */
  describe('getReservationById', () => {
    it('devrait retourner les détails d\'une réservation', async () => {
      const fakeResa = { _id: '123', user: 'User1', catway: 'Catway1' };
      sinon.stub(Reservation, 'findById').resolves(fakeResa);
      
      const result = await reservationService.getReservationById('123');
      expect(result).to.deep.equal(fakeResa);
    });
  });
});
