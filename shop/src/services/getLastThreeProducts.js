import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase";

export const getLastThreeProducts = async () => {
    const productsRef = collection(db, "products");

    const q = query(
        productsRef,
        orderBy("createdAt", "desc"),
        limit(3)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
