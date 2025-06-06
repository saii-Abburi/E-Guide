const admin = require('firebase-admin');
const serviceAccount = JSON.parse('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-guide-4e170-default-rtdb.firebaseio.com"
  });
}

module.exports = admin;
