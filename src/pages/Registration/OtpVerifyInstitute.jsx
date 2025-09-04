import { ReplayOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const OtpVerifyInstitute = ({ checkOtp, email, show, setShowOtp, handleOtp }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
      email: email,
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      checkOtp(email, values.otp);
    },
  });
  const [resend, setResend] = useState(true);
  const HandleResend = () => {
    handleOtp();
    setResend(false);
  };
  return (
    <div>
      <Modal show={show}>
        <Modal.Header>
          <h1 className="modal-title fs-5" id="otpModalLabel">
            VERIFY YOUR EMAIL          </h1>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <p>Please enter the OTP sent to your email address</p>
              <span className="text-danger">In case you seem to have not received an email, please check your promotions and spam folders.</span>
              <TextField name="email" type={"hidden"} className="fade hide" value={email} fullWidth />
              <TextField name="otp" type={"text"} fullWidth value={formik.otp} onChange={formik.handleChange} />
            </div>
            <Button className="mt-2" onClick={HandleResend} disabled={resend}>
              Resend otp <ReplayOutlined />
            </Button>
            <Button color="success" variant="contained" type="submit" className="py-3 mt-3" fullWidth>
              Verify
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OtpVerifyInstitute;
