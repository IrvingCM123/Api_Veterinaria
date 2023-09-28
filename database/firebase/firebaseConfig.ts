import admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.ts");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.json),
});

export const firebaseAdmin = admin;
