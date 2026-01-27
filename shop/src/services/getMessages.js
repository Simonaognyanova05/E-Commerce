import { db } from '../config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export async function getMessages() {
    try {
        const q = query(collection(db, "messages"));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error("Грешка при извличане на резервациите: ", error);
        return [];
    }
}