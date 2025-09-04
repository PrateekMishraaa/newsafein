import { apiJson } from "api";
import { useFormik } from "formik";
import React, { useRef } from "react";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
// import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from "react-toastify";
const validationSchema = yup.object().shape({
  full_name: yup.string().max(100).required("First Name is Required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  email: yup.string().email().required("Email is required"),
  subject: yup.string().max(300).required("Message is Required"),
  message: yup.string().max(200).required("Title is Required"),
});
const FormContactUs = () => {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      contact: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, action) => {
      const responce = await apiJson.post("/public/contactus", values);
      switch (responce?.data?.status) {
        case "success":
          toast.dismiss("");
          toast.success(responce?.data?.message);
          action.resetForm();
          break;
        case "warning":
          toast.dismiss("");
          toast.warning(responce?.data?.message);
          break;
        case "error":
          toast.dismiss("");
          toast.error(responce?.data?.message);
          break;
      }
    },
  });
  return (
    <div className="bg-white border p-3 p-lg-4 rounded-4">
      <h3 className="">Leave Us a Message</h3>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="row g-3 gx-2">
          <div className="col-12">
            <TextField fullWidth id="full_name" type="text" name="full_name" label="Full Name" value={formik.values.full_name} onChange={formik.handleChange} error={formik.touched.full_name && formik.errors.full_name} helperText={formik.touched.full_name && formik.errors.full_name} />
          </div>
          <div className="col-md-6">
            <TextField fullWidth id="email" type="email" name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && formik.errors.email} helperText={formik.touched.email && formik.errors.email} />
          </div>
          <div className="col-md-6">
            <TextField fullWidth id="contact" type="number" name="contact" label="Phone Number" value={formik.values.contact} onChange={formik.handleChange} error={formik.touched.contact && formik.errors.contact} helperText={formik.touched.contact && formik.errors.contact} />
          </div>
          <div className="col-12">
            <TextField fullWidth type="text" id="subject" name="subject" label="Subject" value={formik.values.subject} onChange={formik.handleChange} error={formik.touched.subject && formik.errors.subject} helperText={formik.touched.subject && formik.errors.subject} />
          </div>
          <div className="col-12">
            <TextField fullWidth multiline rows={5} id="message" name="message" label="Your message" value={formik.values.message} onChange={formik.handleChange} error={formik.touched.message && formik.errors.message} helperText={formik.touched.message && formik.errors.message} />
          </div>
          <div className="col-12">
            <Button variant="contained" sx={{ p: 2 }} color="warning" className="p-2 text-initial fs-6 rounded px-4" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormContactUs;
