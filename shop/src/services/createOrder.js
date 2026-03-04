import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const createOrder = async ({
    orderNumber,
    userId,
    email,
    items,
    subtotal,
    status = "pending",
}) => {
    if (!userId) {
        throw new Error("User is not authenticated");
    }

    if (!items || items.length === 0) {
        throw new Error("Cart is empty");
    }

    const parsedSubtotal = Number(subtotal) || 0;
    const shipping = parsedSubtotal > 0 ? 4 : 0;
    const total = parsedSubtotal + shipping;

    const order = {
        orderNumber,
        userId,
        email,

        items: items.map(item => ({
            productId: item.productId || item.id,
            productName: item.productName,
            price: Number(item.price),
            quantity: Number(item.quantity),
            img: item.img || "",
        })),

        subtotal: parsedSubtotal,
        shipping,
        total,

        status, // вече идва отвън (waiting_for_payment или pending)

        paymentMethod: "bank", // при теб в момента е фиксирано
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), order);

    return docRef.id;
};