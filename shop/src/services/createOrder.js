import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const createOrder = async (user, cartItems) => {
    if (!user || !user.uid) {
        throw new Error("User is not authenticated");
    }

    if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    const order = {
        userId: user.uid,
        email: user.email || "",
        items: cartItems.map(item => ({
            productId: item.id, // ВАЖНО
            productName: item.productName,
            price: Number(item.price),
            quantity: Number(item.quantity),
            img: item.img || ""
        })),
        subtotal,
        shipping,
        total,
        status: "pending",
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
};
