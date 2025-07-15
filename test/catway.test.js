/**
 * @fileoverview Tests d’intégration du service Catway avec connexion réelle à MongoDB.
 * Teste la création, la lecture, la mise à jour et la suppression (CRUD) des catways.
 */

require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const Catway = require('../models/Catway');
const catwayService = require('../services/catwayService');

describe('Catway Service', () => {
  /**
   * Avant tous les tests, connexion à MongoDB et nettoyage de la collection Catway
   */
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Catway.deleteMany({});
  });

  /**
   * Après tous les tests, fermeture de la connexion MongoDB
   */
  after(async () => {
    await mongoose.connection.close();
  });

  // Variable pour stocker l’ID d’un catway créé, utilisée dans plusieurs tests
  let catwayId;

  /**
   * Test création d’un catway
   * Vérifie que le catway est créé et que l’ID est généré
   */
  it('Créer un catway', async () => {
    const catwayData = { catwayNumber: 'Catway 1', type: 'short', catwayState: 'available' };
    const catway = await catwayService.addCatway(catwayData);
    catwayId = catway._id;
    expect(catway).to.have.property('_id');
    expect(catway.catwayNumber).to.equal('Catway 1');
  });

  /**
   * Test liste tous les catways
   * Vérifie que la liste retournée est un tableau non vide
   */
  it('Lister tous les catways', async () => {
    const catways = await catwayService.listCatways();
    expect(catways).to.be.an('array').that.is.not.empty;
  });

  /**
   * Test récupération d’un catway par ID
   * Vérifie que le catway retourné correspond à l’ID demandé
   */
  it('Récupérer les détails d’un catway', async () => {
    const catway = await catwayService.getCatwayById(catwayId);
    expect(catway).to.have.property('_id');
    expect(catway._id.toString()).to.equal(catwayId.toString());
  });

  /**
   * Test mise à jour de l’état d’un catway
   * Vérifie que le champ catwayState est bien modifié
   */
  it('Modifier la description de l’état d’un catway', async () => {
    const newState = 'occupied';
    const updatedCatway = await catwayService.updateCatwayState(catwayId, newState);
    expect(updatedCatway.catwayState).to.equal(newState);
  });

  /**
   * Test suppression d’un catway
   * Vérifie que le catway est supprimé et n’est plus retrouvé dans la base
   */
  it('Supprimer un catway', async () => {
    const result = await catwayService.deleteCatway(catwayId);
    expect(result._id.toString()).to.equal(catwayId.toString());

    const deleted = await catwayService.getCatwayById(catwayId);
    expect(deleted).to.be.null;
  });
});
