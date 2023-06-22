import { db } from "../../index"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const requestAddQuestion = (title, description, authorUID) => {
    let post = {
        title,
        description,
        author: authorUID,
        created_at: serverTimestamp(),
    }
    return addDoc(collection(db, 'question'), post)
}

export default requestAddQuestion