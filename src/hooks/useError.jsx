import React from "react";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useError(err) {
    const { token, removeToken, removeUser, userData, setToken } = useGlobalContext();
    const navigate = useNavigate();
    const handlelogout = () => {
        removeToken();
        removeUser();
        navigate("/login/");
    };
    const ErrorResponder = (err) => {
        switch (err?.response?.status) {
            case 495:
                // window.location.reload();
                break;
            case 498:
                handlelogout();
                toast.dismiss()
                toast.error("Connection Timed Out");
                break;
            default:
                // let msg = err?.response?.data?.message ? err?.response?.data?.message : "Oops! Something Went Wrong Check Your Internet Connection";
                toast.dismiss()
                // toast.warning(msg)
                break;
        }
    }
    return { ErrorResponder }
}
export default useError;