import React from 'react'
import { useGlobalContext } from '../global/context'
import axios from 'axios';
import { toast } from 'react-toastify';

const useAxios = () => {
    const { token } = useGlobalContext();
    // Api Creates 
    const endPoint = {
        json: axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:2100/",
            timeout: 25000,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
        authJson: axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:2100/",
            timeout: 25000,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
        formData: axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:2100/",
            timeout: 25000,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
        authFormData: axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:2100/",
            timeout: 25000,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
            },
        })
    }
    const resSwitch = (res) => {
        let result, status;
        switch (res?.data?.status) {
            case "success":
                toast.success(res?.data?.message);
                result = res?.data?.result;
                status = true;
                break;
            case "warning":
                toast.warning(res?.data?.message);
                result = res?.data?.result;
                status = false;
                break;
            case "error":
                toast.error(res?.data?.message);
                result = res?.data?.result;
                status = false;
                break;
        }
        return { result, status }
    }
    return { endPoint, resSwitch }
}

export default useAxios