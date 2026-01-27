import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function sendMessage(message, name, email, subject) {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            message,
            name,
            email,
            subject,
            createdAt: new Date()
        });

        return { status: 200, message: "Съобщението не е изпратено успешно!" };
    } catch (error) {
        console.error("Грешка при създаване на продукта: ", error.message);

        if (error.message.includes("invalid") || error.message.includes("missing")) {
            return { status: 400, message: error.message };
        }

        return { status: 500, message: "Възникна вътрешна грешка!" };
    }
}