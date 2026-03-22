import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createBlog(blogData) {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: blogData.title,
            category: blogData.category,
            description: blogData.description,
            img: blogData.img,

            createdAt: new Date()
        });

        return { id: docRef.id, ...blogData };
    } catch (error) {
        console.error("Firestore Error:", error);
        throw new Error("Възникна грешка при създаване на статията!");
    }
}