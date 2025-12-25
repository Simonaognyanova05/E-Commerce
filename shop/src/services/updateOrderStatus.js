import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
};
