const admin = require('firebase-admin');
const serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-guide-4e170-default-rtdb.firebaseio.com"
  });
}

module.exports = admin;