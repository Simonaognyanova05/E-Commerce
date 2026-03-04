import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const updateOrderStatus = async (orderId, newStatus) => {
    if (!orderId) {
        throw new Error("Order ID is required");
    }

    const orderRef = doc(db, "orders", orderId);

    await updateDoc(orderRef, {
        status: newStatus
    });
};