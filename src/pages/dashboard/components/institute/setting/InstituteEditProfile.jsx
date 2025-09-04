import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useError from "hooks/useError";

const InstituteEditProfile = () => {
  const { ErrorResponder } = useError();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData, token } = useGlobalContext();
  const [details, setDetails] = useState({});
  // fetchDetails
  const fetchDetails = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(
          "/institute",
          {
            instituteId: userData.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setDetails(res.data.result[0]);
      } catch (error) {
        ErrorResponder(error);
        // toast.dismiss();
        // toast.error("Oops Something went wrong");
        // handlelogout();
      }
    }
  };
  useEffect(() => {
    if (token) {
      fetchDetails();
    }
  }, [token]);

  return (
    <>
      <div className="min-vh-10 container">
        <h4>Profile</h4>
        <div className="designed-navs border-bottom">
          <NavLink to="/edit/">Profile</NavLink>
          <NavLink to="/edit/preference">Prefrences</NavLink>
          <NavLink to="/edit/password">Password</NavLink>
        </div>
        <div className="container py-5">
          <Outlet context={[details, fetchDetails]} />
        </div>
      </div>
    </>
  );
};

export default InstituteEditProfile;
