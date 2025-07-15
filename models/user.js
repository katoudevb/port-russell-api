const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schéma utilisateur
 * @typedef User
 * @property {string} name - Nom complet de l'utilisateur
 * @property {string} email - Email unique de l'utilisateur
 * @property {string} password - Mot de passe hashé
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/**
 * Middleware Mongoose : Hash le mot de passe avant sauvegarde
 * Si le champ password est modifié, génère un salt et hash le mot de passe.
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(err) {
    next(err);
  }
});

/**
 * Méthode d'instance pour comparer un mot de passe fourni avec le hash stocké.
 * @param {string} candidatePassword - Mot de passe à vérifier
 * @returns {Promise<boolean>} Résultat de la comparaison
 */
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
