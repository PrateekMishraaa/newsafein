import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast } from "react-toastify";
import { apiJsonAuth } from "api";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";

const StudentSingleRegister = ({ collegeId, reload, closeBtn, role }) => {
  const ErrorResponder = useError();
  const { token } = useGlobalContext();
  const [submitState, setSubmitState] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      dob: "2001-01-26",
      first_name: "",
      middle_name: "",
      last_name: "",
      contact: "",
      father_name: "",
      gender: "male",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("Email is required"),
      dob: yup.string().required("Pin code is Required"),
      first_name: yup.string().max(100).required("First Name is Required"),
      last_name: yup.string().max(100).required("Last Name is Required"),
      contact: yup
        .string()
        .required("Phone Number is Required")
        .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
      //   father_name: yup.string().max(100).required("Father Name is Required"),
      gender: yup.string().required("Gender is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (token) {
        try {
          setSubmitState(true);
          const res = await apiJsonAuth.post(
            "/institute/addStudent",
            {
              email: values?.email,
              password: values?.password,
              confirm_password: values?.confirm_password,
              dob: values?.dob,
              instituteId: collegeId,
              first_name: values?.first_name,
              last_name: values?.last_name,
              contact: values?.contact,
              //   father_name: values?.father_name,
              gender: values?.gender,
              role,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res) {
            setSubmitState(false);
          }
          switch (res?.data?.status) {
            case "success":
              resetForm();
              closeBtn.current.click();
              reload();
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
        } catch (err) {
          setSubmitState(false);
          ErrorResponder(err);
        }
      }
    },
  });
  return (
    <div className="p-2 p-md-3 p-lg-4">
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
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
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
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
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
          <div className="col-12">
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
          <div className="col-12">
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
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* <div className="col-12">
            <TextField
              fullWidth
              id="father_name"
              name="father_name"
              label="Father's Name"
              size="large"
              value={formik.values.father_name}
              onChange={formik.handleChange}
              error={
                formik.touched.father_name && Boolean(formik.errors.father_name)
              }
              helperText={
                formik.touched.father_name && formik.errors.father_name
              }
            />
          </div> */}
          <div className="col-12">
            <Button
              type="submit"
              color="warning"
              variant="contained"
              disabled={submitState}
              className={submitState ? "py-3 bg-success" : "py-3"}
              size="large"
              fullWidth
            >
              {submitState ? (
                <div className="d-flex justify-content-around text-light">
                  {" "}
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">loading...</span>
                  </div>
                  <span className="text-light mx-3 text-capitalize">
                    Submitting...
                  </span>{" "}
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentSingleRegister;
