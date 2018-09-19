require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = require('../../local/firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

const notificationsRef = admin.firestore().collection('notifications');

console.log(notificationsRef);
