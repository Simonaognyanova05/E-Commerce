import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // коригирай пътя ако е нужно

export const deleteMessage = async (id) => {
    const ref = doc(db, "messages", id);
    await deleteDoc(ref);
};
