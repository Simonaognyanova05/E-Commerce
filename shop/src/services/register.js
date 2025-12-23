// services/register.js
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function register(email, password) {
    const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user;
}
