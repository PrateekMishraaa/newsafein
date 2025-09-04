import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { pop2, Popup } from "utils/Popup";
import { apiJson } from "api";

import { useGlobalContext } from "global/context";
import OtpVerifyInstitute from "pages/Registration/OtpVerifyInstitute";

const LoginFormComp = () => {
  const { setUser, setToken } = useGlobalContext();
  const [type, setType] = useState(0)
  const [showPassword, setShowPassword] = React.useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    Popup("loading");
    try {
      const res = await apiJson.post(`/auth/login?type=${type}`, {
        identifier: email,
        password,
      });
      switch (res.status) {
        case 200:
          setUser(res.data.user);
          setToken(res.data.jwt);
          Popup("success", res.data.message);
          if (location?.state?.nextRoute) {
            navigate(location?.state?.nextRoute);
          } else {
            navigate("/dashboard/");
            window.location.reload();
          }
          break;
        case 202:
          setShowOtp(true);
          pop2.success({ title: res.data.message, timer: 1000 });
          break;
        default:
          break;
      }
      if (res.status === 200) {
      }
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          pop2.warning({ title: error.response.data.message, timer: 5000 });
          break;
        case 401:
          pop2.warning({ title: "Under Verification", description: error.response.data.message, timer: 5000 });
          break;
        case 500:
          pop2.error({ title: error.response.data.message, timer: 3000 });
          break;
        default:
          pop2.error({ title: error.response.data.message, timer: 3000 });
          break;
      }
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit} className="login-card container pb-3" style={{ maxWidth: "450px" }}>
        <p>{"Log in to your Account"}</p>
        <div className="mb-3">
          <TextField
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Enter your Email ID"
            fullWidth
            required
          />
        </div>
        <div className="mb-2">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(setShowPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="mt-3 text-center">
          <Button
            type="submit"
            name="login-btn"
            id="login-btn"
            color="warning"
            className="rounded-3"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 2 }}
          >
            Login
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link
            to={`/forget-password`}
            //   state={{ type: usertype }}
            className="text-end w-100"
          >
            Forgot Password ?
          </Link>{" "}
          <br />
          {
            <>
              <span className="font-ubd text-initial">
                {" "}
                Do not have an account yet?{" "}
                <Link to={"/registration"} className="text-end w-100 ">
                  Register for Institution
                </Link>
              </span>
            </>
          }
        </div>
      </form>
      <OtpVerifyInstitute email={email} show={showOtp} setShowOtp={setShowOtp} />
    </>
  );
};

export default LoginFormComp;
