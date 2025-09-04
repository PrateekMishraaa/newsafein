const forumReducer = (state, action) => {

    // if(action.type === "SET_USER") {
    //     return {
    //         ... state,
    //         userData: action.payload.userData,
    //     }
    // }

    // if(action.type === "SET_TOKEN") {
    //     return {
    //         ... state,
    //         token: action.payload.token,
    //     }
    // }

    // return state;

    switch(action.type) {
        case "SET_QUESTIONS": return {...state, questions: action.payload.questions};
        case "GET_QUESTIONS": return {...state, questions: action.payload.questions};
        default: return state;
    }
}

export default forumReducer;