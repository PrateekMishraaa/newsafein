import { createContext, useContext, useReducer } from "react";
import forumReducer from "./forumReducer";
import { apiForum } from "api";

const ForumContext = createContext();

const initialState = {
  questions: [],
};
const ForumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const setQuestions = (questions) => {
    console.log("Reducer got the Question Data: ", questions);
    return dispatch({
      type: "SET_QUESTIONS",
      payload: {
        questions: questions,
      },
    });
  };

  const getQuestions = async () => {
    console.log("Reducer is getting the Question Data");
    let questions = [];
    try {
      // const res = await apiForum.get(`/v1/api/query?sort=top-questions&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
      const res = await apiForum.get(`/v1/api/query`);
      if (res.status === 200) {
        questions.push(res?.data?.results);
        console.log("Reducer sets the Question Data: " + questions);
      }
    } catch(error) {
      console.log("Error in reducer: ", error);
    }
    return dispatch({
      type: "GET_QUESTIONS",
      payload: {
        questions: questions,
      },
    });
  };
  
  // Api 
  return (
    <ForumContext.Provider
      value={{
        ...state,
        setQuestions,
        getQuestions
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

//Global custom hook
const useForumContext = () => {
  return useContext(ForumContext);
};

export { ForumContext, ForumProvider, useForumContext };
