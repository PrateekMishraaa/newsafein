import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { apiJson } from "api";
import { Popup } from "utils/Popup";
// import ReCAPTCHA from "react-google-recaptcha";
import useAxios from "hooks/useAxios";

export default function ForgetPassword() {
  // const captchaRef = useRef();
  const [email, setEmail] = React.useState();
  const { resSwitch } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Popup("loading", "Processing your request");
      const res = await apiJson.post(`auth/forget-password`, {
        email: email,
      });
      const { status } = resSwitch(res)
      // if (status) {
      //   captchaRef.current.reset();
      // } else {
      //   captchaRef.current.reset();
      // }
    } catch (error) {
      console.log(error);
      Popup("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container border rounded rounded-4 p-3 p-lg-4 shadow-sm bg-white" style={{ maxWidth: "450px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="h-100 p-2 p-lg-4"
        >
          <div className="d-flex align-items-center h-100 flex-column justify-content-center">
            <Typography component="h1" variant="h4" className="fw-bold">
              Reset Password
            </Typography>
            <div className="text-dark fs-6 text-center">You can reset your password in few clicks</div>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="What is your registered email?"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={captchaRef} /> */}
              <Button type="submit" fullWidth className="text-initial" variant="contained" sx={{ mt: 3, mb: 2, p: 2 }}>
                Reset Password
              </Button>
              <a href={"mailto:help@safeinschool.in"} className="text-center">
                Facing Issue? <span className="text-dark">Drop us a Mail</span>
              </a>
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}
