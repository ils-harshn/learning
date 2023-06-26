import { db } from "../../index"
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"

const requestGetPublicQuestions = async (lastDocRef, pageLimit=5) => {
    const PAGE_LIMIT = pageLimit
    const questionsRef = collection(db, "questions")
    let dataRef;
    if (lastDocRef) {
        dataRef = query(questionsRef, orderBy("created_at"), limit(PAGE_LIMIT), startAfter(lastDocRef));
    } else {
        dataRef = query(questionsRef, orderBy("created_at"), limit(PAGE_LIMIT));
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

export default requestGetPublicQuestions