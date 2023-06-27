import { db } from "../index"
import { collection, doc, serverTimestamp, writeBatch, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"

export const PAGE_LIMIT = 4

// add question request
export const requestAddQuestion = (title, description, authorUID) => {
    const batch = writeBatch(db)
    const questionDocRef = doc(collection(db, "questions"))
    let question = {
        title,
        description,
        author: authorUID,
        created_at: serverTimestamp(),
        votes: 0,
        answers: 0,
        status: "pending",
        views: 0,
    }

    const userQuestionDocRef = doc(collection(db, "users", authorUID, "questions"), questionDocRef.id)

    batch.set(questionDocRef, question)
    batch.set(userQuestionDocRef, {})
    return batch.commit()
}

// get public questions request
export const requestGetPublicQuestions = async (lastDocRef) => {
    const questionsRef = collection(db, "questions")
    let dataRef;
    if (lastDocRef) {
        dataRef = query(questionsRef, orderBy("created_at", "desc"), limit(PAGE_LIMIT), startAfter(lastDocRef));
    } else {
        dataRef = query(questionsRef, orderBy("created_at", "desc"), limit(PAGE_LIMIT));
    }
    const data = await getDocs(dataRef)
    let temp = {};
    temp["data"] = data.docs.map(item => ({
        ...item.data(),
        id: item.id,
    }))
    temp["lastDocRef"] = data.docs[data.docs.length - 1]
    return temp
}