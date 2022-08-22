import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export async function createEncryptedMessage(message, password) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
