import React, { useState } from "react";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { studentRegisterSchema } from "schema";
import { FormHelperText } from "@mui/material";
import { apiJson } from "api";
import { pop2, Popup } from "utils/Popup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, OutlinedInput } from "@mui/material";
import StudentOtpComponent from "./StudentOtpComponent";
import { useLocation, useNavigate } from "react-router-dom";

const StudentRegisterForm = ({ collegeId }) => {
  const [globalEmail, setGlobalEmail] = useState(null)
  const [globalPass, setGlobalPass] = useState(null)
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  const navigate = useNavigate()
  let type = new URLSearchParams(useLocation().search).get("type")
  if (type && type !== 'teacher') {
    navigate("/error")
  }

  // OTP Verification
  const [showOtp, setShowOtp] = useState(false);
  // Password Show Hide Handler 
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // End Password Show Hide 
  // Main Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: type ?? "student",
      dob: "2001-01-26",
      first_name: "",
      last_name: "",
      contact: "",
      gender: "female",
      confirm_password: "",
    },
    validationSchema: studentRegisterSchema,
    onSubmit: async (values, action) => {
      const RegisterPayload = {
        ...values, instituteId: `${collegeId}`
      }
      try {
        setSubmitState(true)
        Popup("loading", "Submiting the form...");
        const res = await apiJson.post("/register/student", RegisterPayload);
        console.log("res", res)
        if (res) {
          setSubmitState(false)
        }
        switch (res?.data?.status) {
          case "SUCCESS":
            pop2.success({ title: "Registered Succesfully", description: res?.data?.message });
            setGlobalEmail(values?.email)
            setGlobalPass(values?.password)
            setShowOtp(true)
            break;
          case "CONFLICT":
            pop2.warning({ title: "Account Exist", description: res?.data?.message });
            break;
          case "ERROR":
            pop2.error({ title: "Error while registering", description: res?.data?.message });
            break;
          default:
            break;
        }
      } catch (error) {
        setSubmitState(false)
        console.log("ERORR REQ", error)
        pop2.error({ title: "Oops Something Went Wrong", description: error?.response?.data?.message });
      }
    },
  });
  // End Main Formi
  console.log({ values: formik.values, errors: formik.errors })
  return (
    <div className="p-2 p-md-3 p-lg-4">
      {
        !showOtp ?
          <form onSubmit={formik.handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-lg-6">
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  size="large"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  size="large"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </div>
              <div className="col-12">
                <TextField
                  fullWidth
                  id="contact"
                  name="contact"
                  label="Mobile Number"
                  size="large"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  error={formik.touched.contact && Boolean(formik.errors.contact)}
                  helperText={formik.touched.contact && formik.errors.contact}
                />
              </div>
              <div className="col-12">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  size="large"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="col-12 col-lg-6 ">
                <TextField
                  fullWidth
                  id="dob"
                  name="dob"
                  type="date"
                  label="Date of Birth"
                  size="large"
                  max="2022-01-01"
                  min="2007-01-01"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
              </div>
              <div className="col-12 col-lg-6">
                <FormControl>
                  <FormLabel id="gender-label">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="gender-label"
                    defaultValue={formik.values.gender}
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    row
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
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
                  <FormHelperText className="text-danger">{formik.touched.password && formik.errors.password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    required
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
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
                  <FormHelperText className="text-danger">{formik.touched.confirm_password && formik.errors.confirm_password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <Button disabled={submitState} color="warning" variant="contained" className={submitState ? "py-3 bg-success" : "py-3"} size="large" fullWidth type="submit">
                  {submitState ? <div className="d-flex justify-content-around text-light"> <div class="spinner-border" role="status">
                    <span class="visually-hidden">loading...</span>
                  </div><span className="text-light mx-3 text-capitalize">Submitting...</span> </div> : "Submit"}
                </Button>
              </div>
            </div>
          </form>
          : <StudentOtpComponent globalEmail={globalEmail} globalPass={globalPass} />
      }
    </div>
  );
};

export default StudentRegisterForm;
