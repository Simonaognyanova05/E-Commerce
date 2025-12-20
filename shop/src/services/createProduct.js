import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createProduct(productData) {
    try {
        const docRef = await addDoc(collection(db, "products"), {
            productName: productData.productName,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            img1: productData.img1,
            img2: productData.img2,
            img3: productData.img3,
            createdAt: new Date()
        });

        return { id: docRef.id, ...productData };
    } catch (error) {
        console.error("Firestore Error:", error);
        throw new Error("Възникна грешка при създаване на продукта!");
    }
}