import { POINT_ON_VOTE_TYPE_1, POINT_ON_VOTE_TYPE_2 } from "../../firebase/requests/questions";

export const calculatePointOnVoteAQuestion = (typeOfVote, prevTypeOfVote) => {
    let pointsToUpdate = 0;
    if (prevTypeOfVote)
         pointsToUpdate += prevTypeOfVote === 1 ? -POINT_ON_VOTE_TYPE_1: -POINT_ON_VOTE_TYPE_2
    if(typeOfVote)
        pointsToUpdate += typeOfVote === 1 ? POINT_ON_VOTE_TYPE_1: POINT_ON_VOTE_TYPE_2
    return pointsToUpdate
}