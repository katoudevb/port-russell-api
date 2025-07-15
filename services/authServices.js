const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

/**
 * Enregistre un nouvel utilisateur dans la base de données.
 * @param {Object} userData - Données de l'utilisateur.
 * @param {string} userData.name - Nom de l'utilisateur.
 * @param {string} userData.email - Email de l'utilisateur.
 * @param {string} userData.password - Mot de passe en clair.
 * @returns {Promise<Object>} - Message de confirmation d'enregistrement.
 */
async function registerUser({ name, email, password }) {
  const user = new User({ name, email, password });
  await user.save();
  return { message: 'Utilisateur enregistré' };
}

/**
 * Authentifie un utilisateur et génère un token JWT.
 * @param {Object} credentials - Identifiants de connexion.
 * @param {string} credentials.email - Email de l'utilisateur.
 * @param {string} credentials.password - Mot de passe en clair.
 * @throws {Error} - Si l'utilisateur n'existe pas ou mot de passe invalide.
 * @returns {Promise<Object>} - Token JWT valide pour 1 heure.
 */
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Utilisateur non trouvé');

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error('Mot de passe incorrect');

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

module.exports = {
  registerUser,
  loginUser
};
