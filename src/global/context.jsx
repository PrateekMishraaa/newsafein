import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

const initialState = {
  user: null,
  jwt: null,
  userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  loginStatus: false,
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setUser = (userdata) => {
    localStorage.setItem("user", JSON.stringify(userdata));
    return dispatch({
      type: "SET_USER",
      payload: {
        userData: userdata,
        loginStatus: true,
      },
    });
  };
  const removeUser = () => {
    localStorage.removeItem("user");
    return dispatch({
      type: "SET_USER",
      payload: {
        userData: {},
        loginStatus: false,
      },
    });
  };
  const setToken = (token) => {
    localStorage.setItem("token", token);
    Cookies.set("jwt", token);
    return dispatch({
      type: "SET_TOKEN",
      payload: {
        token: token,
      },
    });
  };
  const LoginUser = (token) => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "v2/user/me", { headers: `Bearer ${token}` })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    return dispatch({
      type: "SET_TOKEN",
      payload: {
        token: null,
      },
    });
  };
  const logoutHandler = () => {
    removeToken();
    removeUser();
    toast.dismiss();
    toast.success("Logged out successfully");
    window.location.replace("/");
  };
  const isLoggedIn = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem("token");
    if (token && user) {
      setUser(user);
      setToken(token);
    }
    return state.loginStatus;
    return true;
  };
  function adminRoles() {
    let user = JSON.parse(localStorage.getItem("user"));
    let role = user?.role;
    switch (role) {
      case "admin":
        return 1;

        break;
      case "subAdmin":
        return 2;

        break;
      case "editor":
        return 3;

        break;
      case "blogger":
        return 4;

        break;
      case "viewer":
        return 5;

        break;

      default:
        return 5;
        break;
    }
  }

  useEffect(() => {
    let jwt = Cookies.get("jwt");
    if (jwt) {
      LoginUser(jwt);
    }
  }, []);

  // Api
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setToken,
        removeToken,
        removeUser,
        isLoggedIn,
        adminRoles,
        logoutHandler,
        LoginUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

//Global custom hook
const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, useGlobalContext };
