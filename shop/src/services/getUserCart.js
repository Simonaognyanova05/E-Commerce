import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getUserCart = async (userId) => {
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("userId", "==", userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,       // ID на cart item
        ...doc.data(),
    }));
};
