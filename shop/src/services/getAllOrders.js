import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getAllOrders = async () => {
    const ordersRef = collection(db, "orders");

    // подреждаме по дата (най-новите първо)
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return orders;
};
