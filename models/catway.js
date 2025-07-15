const mongoose = require('mongoose');

/**
 * Schéma représentant un catway (emplacement d’amarrage)
 * @typedef Catway
 * @property {string} catwayNumber - Numéro unique du catway
 * @property {'short'|'long'} type - Type de catway (court ou long)
 * @property {string} [catwayState] - État actuel du catway (ex : disponible, occupé)
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['short', 'long'], required: true },
  catwayState: { type: String }
});

module.exports = mongoose.model('Catway', catwaySchema);
