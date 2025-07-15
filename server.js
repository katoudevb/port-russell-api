/**
 * @file server.js
 * @description Point d'entrée de l'application. Lance le serveur Express.
 */

const app = require('./app');

// Port d'écoute, défini par la variable d'environnement PORT ou 3000 par défaut
const PORT = process.env.PORT || 3000;

/**
 * Démarre le serveur Express.
 * Affiche un message dans la console une fois que le serveur est opérationnel.
 */
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
