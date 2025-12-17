import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; 
    } catch (error) {
        console.error("Firebase Auth Error Code:", error.code);
        console.error("Firebase Auth Error Message:", error.message);

        if (error.code === "auth/user-not-found") {
            throw new Error("Потребителят не съществува!");
        } else if (error.code === "auth/wrong-password") {
            throw new Error("Грешна парола!");
        } else {
            throw new Error("Възникна грешка при влизане!");
        }
    }
}