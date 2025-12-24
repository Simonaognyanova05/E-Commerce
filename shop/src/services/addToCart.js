import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const addToCart = async (userId, product, quantity) => {
    const cartRef = collection(db, "carts");

    // 🔥 търсим продукт САМО за този user
    const q = query(
        cartRef,
        where("userId", "==", userId),
        where("productId", "==", product.id)
    );

    const existingProduct = await getDocs(q);

    if (!existingProduct.empty) {
        const cartDoc = existingProduct.docs[0];
        const cartDocRef = doc(db, "carts", cartDoc.id);

        await updateDoc(cartDocRef, {
            quantity: cartDoc.data().quantity + quantity,
        });

        return;
    }

    await addDoc(cartRef, {
        userId,
        productId: product.id,
        productName: product.productName,
        price: product.price,
        img: product.img1,
        quantity,
        createdAt: serverTimestamp(),
    });
};
