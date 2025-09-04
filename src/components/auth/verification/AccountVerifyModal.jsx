import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import verifySVG from "./verify.svg";
import { Button } from "@mui/material";
import { LockClockTwoTone } from "@mui/icons-material";
import { apiJson } from "api";
import { toast } from "react-toastify";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";

export const AccountVerifyModal = ({ checkReload, name }) => {
  const { userData } = useGlobalContext();
  const [show, setShow] = useState(true);
  const { ErrorResponder } = useError();
  let [userType, setUser] = useState("");
  function SetUserType() {
    switch (userData?.type) {
      case 0:
        setUser(userData?.role);
        break;
      case 1:
        setUser("institute");
        break;
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      checkReload();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    SetUserType();
  }, [userData]);
  // TIMER
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const resend_interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(resend_interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(resend_interval);
    };
  });
  const sendVerificationEmail = async () => {
    try {
      if (minutes == 0 && seconds == 0) {
        const res = await apiJson.post("/auth/send-verification-email", {
          email: userData?.email,
          name,
          type: userType,
        });
        setMinutes(2);
        setSeconds(59);
        switch (res?.data?.status) {
          case "success":
            toast.dismiss();
            toast.success(res?.data?.message);
            break;
          case "warning":
            toast.dismiss();
            toast.warning(res?.data?.message);
            break;
          case "error":
            toast.dismiss();
            toast.error(res?.data?.message);
            break;
        }
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  return (
    <>
      {/* <Modal show={show}>
        <Modal.Body className="text-center py-4 rounded-4">
          <h4>Verify Your Account</h4>
          <img src={verifySVG} alt="verification" style={{ maxWidth: "200px" }} />
          <p className="fs-6 lh-sm">An email with the verification link sent to your email address please click on the link and verify your account.</p>
          <div className="text-dark">
            Didn't Get email
            <div className={`d-flex align-items-center justify-content-center ${!minutes && !seconds && "d-none"}`}>
              <LockClockTwoTone />
              <small>
                {" "}
                {minutes} min : {seconds} sec
              </small>
            </div>
            <div>
              <Button color="success" size="small" disabled={Boolean(minutes) || Boolean(seconds)} className="rounded text-capitalize" onClick={sendVerificationEmail}>
                Resend Email
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};
