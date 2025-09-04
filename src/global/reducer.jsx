const reducer = (state, action) => {

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
        case "SET_USER": return {...state, userData: action.payload.userData, loginStatus: action.payload.loginStatus};
        case "SET_TOKEN": return { ... state, token: action.payload.token};
        default: return state;
    }
}

export default reducer;