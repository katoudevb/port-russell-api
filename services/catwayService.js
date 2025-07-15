const Catway = require('../models/catway');

/**
 * Ajoute un nouveau catway en base de données.
 * @param {Object} catwayData - Données du catway à créer.
 * @returns {Promise<Object>} - Retourne le catway créé.
 */
async function addCatway(catwayData) {
  const catway = new Catway(catwayData);
  return await catway.save();
}

/**
 * Supprime un catway par son identifiant.
 * @param {string} catwayId - ID MongoDB du catway à supprimer.
 * @returns {Promise<Object|null>} - Retourne le catway supprimé ou null si non trouvé.
 */
async function deleteCatway(catwayId) {
  return await Catway.findByIdAndDelete(catwayId);
}

/**
 * Récupère un catway par son identifiant.
 * @param {string} catwayId - ID MongoDB du catway à récupérer.
 * @returns {Promise<Object|null>} - Retourne le catway trouvé ou null si non existant.
 */
async function getCatwayById(catwayId) {
  return await Catway.findById(catwayId);
}

/**
 * Met à jour la description de l'état d'un catway.
 * @param {string} catwayId - ID MongoDB du catway à modifier.
 * @param {string} newState - Nouvelle description de l'état du catway.
 * @returns {Promise<Object|null>} - Retourne le catway mis à jour ou null si non trouvé.
 */
async function updateCatwayState(catwayId, newState) {
  return await Catway.findByIdAndUpdate(catwayId, { catwayState: newState }, { new: true });
}

/**
 * Liste tous les catways existants.
 * @returns {Promise<Array>} - Retourne un tableau de catways.
 */
async function listCatways() {
  return await Catway.find();
}

module.exports = {
  addCatway,
  deleteCatway,
  listCatways,
  getCatwayById,
  updateCatwayState
};
