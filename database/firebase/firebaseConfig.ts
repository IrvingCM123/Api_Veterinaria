import admin from "firebase-admin";

const dotenv = require('dotenv');

dotenv.config()

const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.json),
});

export const firebaseAdmin = admin;
