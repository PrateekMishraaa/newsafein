import React, { useEffect, useState } from "react";
import { useGlobalContext } from "global/context";
import { apiAuth } from "api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useError from "hooks/useError";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";
const StudentEditProfile = () => {
  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  const [fullDetails, setFullDetails] = React.useState();
  async function fetchCountriesAndDesignation() {}
  const fetchDetails = async () => {
    toast.dismiss();
    toast.loading("Loading....");
    try {
      const res = await apiAuth.get("/student/detail", {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        toast.dismiss();
        setFullDetails(res.data.result[0]);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      fetchDetails();
      fetchCountriesAndDesignation();
    }
  }, [token]);
  return (
    <>
      <div className="min-vh-100 container">
        <h4>Profile</h4>
        <p>Manage Your Profiles</p>
        <div className="designed-navs border-bottom">
          <NavLink to="/edit/">Profile</NavLink>
          <NavLink to="/edit/preference">Preferences</NavLink>
          <NavLink to="/edit/password">Password</NavLink>
        </div>
        <div className="container py-5">
          <Outlet context={{ userData, fullDetails, fetchDetails }} />
        </div>
      </div>
    </>
  );
};

export default StudentEditProfile;
