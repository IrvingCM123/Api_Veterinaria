import { firebaseAdmin } from "./firebaseConfig";

const db = firebaseAdmin.firestore(); // Obtén una instancia de Firestore

const usersCollection = db.collection("users"); // Reemplaza 'users' por el nombre de tu colección

export const newUser = {
  name: "John Doe",
  email: "johndoe@example.com",
};

usersCollection
  .add(newUser)
  .then((docRef) => {
    console.log("Documento agregado con ID:", docRef.id);

    // Leer el documento recién agregado
    return usersCollection.doc(docRef.id).get();
  })
  .then((doc) => {
    if (doc.exists) {
      console.log("Documento leído:", doc.data());
    } else {
      console.log("El documento no existe.");
    }
  })
  .catch((error) => {
    console.error("Error al agregar o leer el documento:", error);
  });
