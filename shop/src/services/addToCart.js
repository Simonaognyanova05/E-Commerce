import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const addToCart = async (product, quantity) => {
    const cartRef = collection(db, "carts");

    // Проверка дали продуктът вече е в количката
    const q = query(cartRef, where("productId", "==", product.id));
    const existingProduct = await getDocs(q);

    if (!existingProduct.empty) {
        // Ако съществува → увеличаваме количеството
        const cartDoc = existingProduct.docs[0];
        const cartDocRef = doc(db, "carts", cartDoc.id);

        await updateDoc(cartDocRef, {
            quantity: cartDoc.data().quantity + quantity,
        });

        return;
    }

    // Ако НЕ съществува → добавяме нов
    await addDoc(cartRef, {
        productId: product.id,
        productName: product.productName,
        price: product.price,
        img: product.img1,
        quantity,
        createdAt: serverTimestamp(),
    });
};
