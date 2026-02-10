import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const deleteCartItem = async (userId, productId) => {
    try {
        const cartItemRef = doc(db, "users", userId, "cart", productId);
        await deleteDoc(cartItemRef);
    } catch (error) {
        throw new Error("Неуспешно премахване от количката!");
    }
};
