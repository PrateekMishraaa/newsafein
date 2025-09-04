import { apiJson } from "api";
import useError from "hooks/useError";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AccountVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { ErrorResponder } = useError();
  const verifyFunction = async () => {
    try {
      if (token) {
        const res = await apiJson.get(`auth/verify-account?token=` + token);
        console.log(res);
        toast.dismiss();
        switch (res?.data?.user_status) {
          case "active":
            toast.success(res?.data?.message);
            navigate("/login");
            break;
          case "inactive":
            toast.warning(res?.data?.message);
            break;
        }
      } else {
        toast.dismiss();
        toast.error("Invalid Url");
        navigate("/error");
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };

  useEffect(() => {
    verifyFunction();
  }, []);

  return (
    <div className="constainer">
      <div style={{ margin: "auto", textAlign: "center" }}>
        <img src={"/images/authorizeImg.jpg"} alt="authorizeVerify" height={400} width={400} style={{ objectFit: "contain", maxWidth: "100%" }} />
        <h4>
          <span className="text-primary">Congratulations!</span> You have successfully verified your email.
        </h4>
        <button onClick={()=>navigate('/login')} className="btn btn-primary mt-3">Login</button>
      </div>
    </div>
  );
};
