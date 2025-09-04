import React, { useState, useRef } from "react";
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
import { api, apiJsonAuth } from "api";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CheckCircle } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function AdminStudentRegistration({ collegeId, update, setUpdate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeBtn = useRef();
  const ErrorResponder = useError();
  const { token } = useGlobalContext();
  const [submitState, setSubmitState] = React.useState(false);
  let [password, setPassword] = React.useState("");
  let [email, setEmail] = useState("");
  const [copiedLink, setCopiedLink] = React.useState(false);

  // console.log(update)

  React.useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  }, [copiedLink]);
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
      sendemail: false,
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
      father_name: yup.string().max(100).required("Father Name is Required"),
      gender: yup.string().required("Gender is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (token) {
        try {
          setSubmitState(true);
          // console.log(values?.sendemail)
          const res = await apiJsonAuth.post(
            "admin/addStudent",
            {
              email: values?.email,
              password: values?.password,
              confirm_password: values?.confirm_password,
              dob: values?.dob,
              instituteId: collegeId,
              first_name: values?.first_name,
              last_name: values?.last_name,
              contact: values?.contact,
              father_name: values?.father_name,
              gender: values?.gender,
              sendemail: values?.sendemail,
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
          // console.log(res?.data?.status)
          switch (res?.data?.status) {
            case "success":
              setEmail(res?.data?.result?.username);
              setPassword(res?.data?.result?.password);
              handleOpen();
              resetForm();

              toast.dismiss();
              toast.success("Student Added");
              closeBtn.current.click();
              setUpdate(update + 1);
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
    <>
      <div className="h-100">
        <button className="btn me-2 d-flex h-100" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
          Add&nbsp;Student
        </button>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content w-100" style={{ minWidth: "100%" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Student Register
                </h5>
                <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body  p-0">
                <div className="p-2 p-md-3 p-lg-4">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12 col-lg-6">
                        <TextField fullWidth id="first_name" name="first_name" label="First Name" size="large" value={formik.values.first_name} onChange={formik.handleChange} error={formik.touched.first_name && Boolean(formik.errors.first_name)} helperText={formik.touched.first_name && formik.errors.first_name} />
                      </div>
                      <div className="col-12 col-lg-6">
                        <TextField fullWidth id="last_name" name="last_name" label="Last Name" size="large" value={formik.values.last_name} onChange={formik.handleChange} error={formik.touched.last_name && Boolean(formik.errors.last_name)} helperText={formik.touched.last_name && formik.errors.last_name} />
                      </div>
                      <div className="col-12">
                        <TextField fullWidth id="contact" name="contact" label="Mobile Number" size="large" value={formik.values.contact} onChange={formik.handleChange} error={formik.touched.contact && Boolean(formik.errors.contact)} helperText={formik.touched.contact && formik.errors.contact} />
                      </div>
                      <div className="col-12">
                        <TextField fullWidth id="email" name="email" label="Email Address" size="large" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                      </div>
                      <div className="col-12">
                        <TextField fullWidth id="dob" name="dob" type="date" label="Date of Birth" size="large" max="2022-01-01" min="2007-01-01" value={formik.values.dob} onChange={formik.handleChange} error={formik.touched.dob && Boolean(formik.errors.dob)} helperText={formik.touched.dob && formik.errors.dob} />
                      </div>
                      <div className="col-12">
                        <FormControl>
                          <FormLabel id="gender-label">Gender</FormLabel>
                          <RadioGroup aria-labelledby="gender-label" defaultValue={formik.values.gender} id="gender" name="gender" onChange={formik.handleChange} row>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="col-12">
                        <TextField fullWidth id="father_name" name="father_name" label="Father's Name" size="large" value={formik.values.father_name} onChange={formik.handleChange} error={formik.touched.father_name && Boolean(formik.errors.father_name)} helperText={formik.touched.father_name && formik.errors.father_name} />
                      </div>
                      <div className="col-12 form-check">
                        <input class="form-check-input" onChange={formik.handleChange} type="checkbox" value={formik.values.sendemail} id="sendemail" />

                        <label class="form-check-label" htmlfor="semdemail">
                          Would you like to send a welcome mail on given email id.
                        </label>
                      </div>
                      <div className="col-12">
                        <Button type="submit" color="warning" variant="contained" className={submitState ? "py-3 bg-success" : "py-3"} size="large" fullWidth>
                          {submitState ? (
                            <div className="d-flex justify-content-around text-light">
                              {" "}
                              <div class="spinner-border" role="status">
                                <span class="visually-hidden">loading...</span>
                              </div>
                              <span className="text-light mx-3 text-capitalize">Submitting...</span>{" "}
                            </div>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography className="text-center" id="modal-modal-title" variant="h6" component="h2">
                <strong> Registered Succesfully</strong>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Username : </strong>&nbsp;{email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Password : </strong>&nbsp;{password}
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                className="px-2 py-1 border-2 rounded-0 rounded-bottom mt-4"
                color={copiedLink ? "success" : "warning"}
                onClick={() => {
                  navigator.clipboard.writeText(password);
                  setCopiedLink(true);
                }}>
                {!copiedLink ? <ContentCopyIcon /> : <CheckCircle />} <br />
                {copiedLink ? <small>COPIED</small> : <small>COPY</small>}
              </Button>
              <p className="text-center mb-0">
                <strong>Copy The Password</strong>
              </p>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
