const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

/**
 * Enregistre un nouvel utilisateur en hachant son mot de passe.
 * @param {Object} userData - Données de l'utilisateur (email, password, etc.).
 * @returns {Promise<Object>} - Retourne le document utilisateur sauvegardé.
 */
async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
}

/**
 * Authentifie un utilisateur avec email et mot de passe.
 * Génère un token JWT valide 1 heure en cas de succès.
 * @param {Object} param0 - Objet contenant email et password.
 * @param {string} param0.email - Email de l'utilisateur.
 * @param {string} param0.password - Mot de passe clair.
 * @throws {Error} Lance une erreur si utilisateur introuvable ou mot de passe invalide.
 * @returns {Promise<string>} - Token JWT signé.
 */
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Utilisateur introuvable');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Mot de passe invalide');

  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Met à jour un utilisateur existant par son ID.
 * @param {string} id - Identifiant MongoDB de l'utilisateur.
 * @param {Object} updateData - Données à modifier.
 * @returns {Promise<Object|null>} - Utilisateur mis à jour ou null si non trouvé.
 */
async function updateUser(id, updateData) {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
}

/**
 * Supprime un utilisateur par son ID.
 * @param {string} id - Identifiant MongoDB de l'utilisateur à supprimer.
 * @returns {Promise<void>} - Ne retourne rien.
 */
async function deleteUser(id) {
  await User.findByIdAndDelete(id);
  return;
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
};
