import { db } from "../../index"
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore"

const requestAddQuestion = (title, description, authorUID) => {
    const batch = writeBatch(db)
    const questionDocRef = doc(collection(db, "questions"))
    let question = {
        title,
        description,
        author: authorUID,
        created_at: serverTimestamp(),
    }

    const userQuestionDocRef = doc(collection(db, "users", authorUID, "questions"), questionDocRef.id)

    batch.set(questionDocRef, question)
    batch.set(userQuestionDocRef, {})
    return batch.commit()
}

export default requestAddQuestion