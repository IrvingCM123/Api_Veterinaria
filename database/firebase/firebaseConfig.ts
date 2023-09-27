// firebase/firebaseConfig.ts
import admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.ts'); // Asegúrate de tener este archivo
console.log(serviceAccount.json);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.json),
});

export const firebaseAdmin = admin;
