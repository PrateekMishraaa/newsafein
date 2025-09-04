import React, { useEffect, useState } from "react";
import { apiJson } from "api";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const GoogleEmailComponent = ({ formik, toggleModal }) => {
  const [cred, setCred] = useState(null);
  function LoginHandler(data) {
    try {
      setCred(data?.credential);
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  }
  const loginController = async () => {
    try {
      const res = await apiJson.post("/v2/auth/google/user", { cred });
      if (res?.data?.status === "success") {
        let user = res?.data?.user;
        const checkUniqueNess = await apiJson.post("/v2/auth/account-check", { email: user?.email });
        if (checkUniqueNess?.data?.result) {
          formik.setFieldValue("email", user?.email);
          formik.setFieldValue("first_name", user?.given_name);
          formik.setFieldValue("last_name", user?.family_name);
          formik.setFieldValue("profile", user?.picture);
          toggleModal();
        } else {
          toast.dismiss();
          toast.error("Account Already Exists Please try loggin In");
        }
      } else {
        toast.dismiss();
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops Something Went Wrong!!");
    }
  };
  useEffect(() => {
    if (cred) loginController();
  }, [cred]);

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="d-flex align-items-center justify-content-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              LoginHandler(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};
