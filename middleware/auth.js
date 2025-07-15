const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'MonSuperSecretDeJWT';

/**
 * Middleware d’authentification JWT.
 * Vérifie la présence et la validité du token dans l’en-tête Authorization.
 * Injecte les données décodées dans req.user si succès.
 *
 * @param {import('express').Request} req - Objet requête Express
 * @param {import('express').Response} res - Objet réponse Express
 * @param {import('express').NextFunction} next - Fonction middleware suivante
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1]; // Format attendu : "Bearer <token>"
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Ajoute les infos utilisateur à la requête
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
