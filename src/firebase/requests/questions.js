import { calculatePointOnVoteAQuestion } from "../../helpers/api"
import { db } from "../index"
import { collection, doc, serverTimestamp, writeBatch, getDocs, limit, orderBy, query, startAfter, getDoc, setDoc, updateDoc, increment } from "firebase/firestore"

export const PAGE_LIMIT = 4
export const POINT_ON_VOTE_TYPE_1 = 10
export const POINT_ON_VOTE_TYPE_2 = -2

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

// get question from id request
export const requestGetPublicQuestionData = async (id) => {
    const questionRef = doc(db, "questions", id);
    const questionSnapshot = await getDoc(questionRef);
    if (questionSnapshot.exists()) {
        const data = {
            ...questionSnapshot.data(),
            id,
        }

        const voteType = await requestToGetVoteTypeByUserToQuestion(id, data.author)
        data["voteType"] = voteType
        return data;
    }
    else throw new Error('Question not found');
}

// vote a question request
export const reqestToVoteQuestion = async (id, userID, authorID, typeOfVote, prevTypeOfVote) => {
    const voteRef = doc(db, "questions", id, "votes", userID);
    await setDoc(voteRef, {
        type: typeOfVote,
        created_at: serverTimestamp(),
    })
    await updateVoteOfQuestion(id, typeOfVote, prevTypeOfVote)
    await updateAuthorPointsOnVoteAQuestion(authorID, typeOfVote, prevTypeOfVote)
    return typeOfVote
}

// get vote type given by user to question using id
export const requestToGetVoteTypeByUserToQuestion = async (id, userID) => {
    const voteRef = doc(db, "questions", id, "votes", userID);
    const voteSnapShot = await getDoc(voteRef);
    if (voteSnapShot.exists()) {
        return voteSnapShot.data().type;
    }
    else return 0
}

// update vote on | vote a question request
export const updateVoteOfQuestion = async (id, typeOfVote, prevTypeOfVote) => {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, {
        votes: increment(calculatePointOnVoteAQuestion(typeOfVote, prevTypeOfVote)),
    })
}

// update author points points | on vote a question
export const updateAuthorPointsOnVoteAQuestion = async (authorID, typeOfVote, prevTypeOfVote) => {
    const authorRef = doc(db, "users", authorID)
    await updateDoc(authorRef, {
        points: increment(calculatePointOnVoteAQuestion(typeOfVote, prevTypeOfVote)),
    })
}