import { db } from '../config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export async function getProducts() {
    try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error("Грешка при извличане на задачи: ", error);
        return [];
    }
}