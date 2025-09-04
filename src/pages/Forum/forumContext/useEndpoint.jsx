import React from 'react'
import { useGlobalContext } from './context'
import axios from 'axios';

const useEndpoint = () => {
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
    return { endPoint }
}

export default useEndpoint;