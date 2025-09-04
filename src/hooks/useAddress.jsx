import {api} from "api";
import React, { useState } from "react";
import { useEffect } from "react";
import {toast} from "react-toastify";

export const useAddress = (state) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const fetchStates = async () => {
    try {
      const response = await api.get("/v2/public/state");
      if (response.status === 200) {
        setStates(response?.data?.states);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const fetchDistricts = async (state) => {
    try {
      const response = await api.get(`/v2/public/district?state=${state}`);
      if (response?.data?.status === "success") {
        setDistricts(response?.data?.district);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchStates();
  }, []);
  useEffect(() => {
    fetchDistricts(state);
  }, [state]);
  return { states, districts };
};
