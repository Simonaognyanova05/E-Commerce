import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const clearUserCart = async (userId) => {
    if (!userId) return;

    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(cartDoc =>
        deleteDoc(doc(db, "carts", cartDoc.id))
    );

    await Promise.all(deletePromises);
};
