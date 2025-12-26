import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const createOrder = async ({
    userId,
    email,
    items,
    shippingData,
    subtotal,
    shipping,
    total,
}) => {
    if (!userId) {
        throw new Error("User is not authenticated");
    }

    if (!items || items.length === 0) {
        throw new Error("Cart is empty");
    }

    const order = {
        userId,
        email,
        items: items.map(item => ({
            productId: item.productId || item.id,
            productName: item.productName,
            price: Number(item.price),
            quantity: Number(item.quantity),
            img: item.img || "",
        })),
        shippingData: {
            firstName: shippingData.firstName,
            lastName: shippingData.lastName,
            phone: shippingData.phone,
            email: shippingData.email,
            address: shippingData.address,
            city: shippingData.city,
            zip: shippingData.zip,
        },
        subtotal: Number(subtotal),
        shipping: Number(shipping),
        total: Number(total),
        status: "pending",
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), order);

    return docRef.id;
};
