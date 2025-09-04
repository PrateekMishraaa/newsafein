import React, { useEffect, useState } from "react";
import { apiJson } from "api";
import { toast } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useGlobalContext } from "global/context";
import RegisterAsk from "pages/Auth/logincomps/RegisterAsk";

const adminRole = ["admin", "subAdmin"];

export const GoogleButton = () => {
  const [cred, setCred] = useState(null);
  const { setUser, setToken } = useGlobalContext();
  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const handleToggle = () => setshowRegisterPopup(!showRegisterPopup);

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
      const res = await apiJson.post("/v2/auth/google", { cred });
      console.log(res);
      if (res?.data?.status === "success") {
        toast.dismiss();
        toast.success("Logged in Successfully");
        setUser(res.data.user);
        setToken(res.data.jwt);
        if (adminRole.includes(res.data.user.role)) {
          window.location.replace("/admin/");
        } else {
          window.location.replace("/");
        }
        console.log(res?.data);
      } else if (res.data?.status === "redirect-register") {
        handleToggle();
      } else {
        toast.dismiss();
        toast.error(res?.data?.message);
      }
    } catch (error) {
      // toast.error("Oops Something Went Wrong!!");
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
            useOneTap
            auto_select
          />
        </div>
      </GoogleOAuthProvider>
      {showRegisterPopup && <RegisterAsk handleClose={handleToggle} />}
    </div>
  );
};
