var admin = require("firebase-admin");

var serviceAccount = require("./archivo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
