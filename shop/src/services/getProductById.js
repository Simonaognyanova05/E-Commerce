// services/products.js
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Взима продукт по ID от Firestore
 * @param {string} id - ID-то на документа
 * @returns {Promise<object|null>} Продукт или null ако не съществува
 */
export async function getProductById(id) {
    try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return { id: snap.id, ...snap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Firestore getProductById error:", error);
        throw new Error("Неуспешно зареждане на продукта!");
    }
}