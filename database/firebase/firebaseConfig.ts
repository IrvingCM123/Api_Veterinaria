// firebase/firebaseConfig.ts
import admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json'); // Asegúrate de tener este archivo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firebaseAdmin = admin;

