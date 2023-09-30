import admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.json),
});

export const firebaseAdmin = admin;
