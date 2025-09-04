import React, { useEffect } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import { FormHelperText, FormLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import useError from "hooks/useError";
import { BoardData } from "../onboard/Step2";
import { SimpleBreadCrumb } from "components/ui";
import * as Yup from "yup";
const preferenceSchema = Yup.object().shape({
  question1: Yup.string().required("Total No. of students is Required"),
  question2: Yup.string().required("Total No. of teachers is Required"),
  question3: Yup.string().required(
    "Total number of non-teaching staff is Required"
  ),
  question4: Yup.string().required("Type of School is Required"),
  question5: Yup.string().required("UDISE CODE is required"),
  question6: Yup.string().required("Board is required"),

  question7: Yup.string().required("Medium of Education is required"),
});
const medium = [
  "Bengali",
  "English",
  "Gujrati",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Odiya",
  "Punjabi",
  "Sanskrit",
  "Tamil",
  "Telugu",
  "Urdu",
];

const InstituteEditPreference = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details, fetchDetails] = useOutletContext();

  // Bsic Formik
  useEffect(() => {
    useFormik.initialValues = {
      question1: details?.io_q1,
      question2: details?.io_q2,
      question3: details?.io_q3,
      question4: details?.io_q4,
      question5: details?.io_q5,
      question6: details?.io_q6,
      question7: details?.io_q7,
      question8: details?.io_q8,
      question9: details?.io_q9,
    };
  }, [details]);
  const formik = useFormik({
    initialValues: {
      question1: details?.io_q1,
      question2: details?.io_q2,
      question3: details?.io_q3,
      question4: details?.io_q4,
      question5: details?.io_q5,
      question6: details?.io_q6,
      question7: details?.io_q7,
      question8: details?.io_q8,
      question9: details?.io_q9,
    },
    validationSchema: preferenceSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (token) {
        try {
          const res = await apiJsonAuth.put(
            `/institute/profile?update_type=preference`,
            values,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.status === 200) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              width: 400,
            });
            fetchDetails();
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
    },
  });
  return (
    <>
      {/* <SimpleBreadCrumb page={"Edit Preference"} />
      <div className="container py-4" style={{maxWidth:700}}> */}
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          {/* No Of Students  */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question1" className="text-dark">
              Total number of students
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="question1"
              name="question1"
              type={"number"}
              fullWidth
              variant="outlined"
              value={formik?.values.question1}
              onChange={formik?.handleChange}
              error={
                formik?.touched.question1 && Boolean(formik?.errors.question1)
              }
              helperText={formik?.touched.question1 && formik?.errors.question1}
            />
          </div>
          {/* NO Of Teachers  */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question2" className="text-dark">
              Total number of Teachers
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="question2"
              name="question2"
              type={"number"}
              fullWidth
              variant="outlined"
              value={formik?.values.question2}
              onChange={formik?.handleChange}
              error={
                formik?.touched.question2 && Boolean(formik?.errors.question2)
              }
              helperText={formik?.touched.question2 && formik?.errors.question2}
            />
          </div>
          {/* NO Of Non-Teachers  */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question1" className="text-dark">
              Total number of non-teaching staff
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              name="question3"
              id="question3"
              type={"number"}
              fullWidth
              variant="outlined"
              value={formik?.values.question3}
              onChange={formik?.handleChange}
              error={
                formik?.touched.question3 && Boolean(formik?.errors.question3)
              }
              helperText={formik?.touched.question3 && formik?.errors.question3}
            />
          </div>
          {/* TYPE OF SCHOOL */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question4-label" className="text-dark mb-2">
              Type of School
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth>
              <Select
                id="question4"
                name="question4"
                value={formik?.values.question4}
                onChange={formik?.handleChange}
                error={
                  formik?.errors.question4 && Boolean(formik?.touched.question4)
                }
              >
                <MenuItem value="school">Pre-School</MenuItem>
                <MenuItem value="college">Primary</MenuItem>
                <MenuItem value="university">Middle School</MenuItem>
                <MenuItem value="other">High School</MenuItem>
                <MenuItem value="other">Senior Secondary</MenuItem>
              </Select>
              <FormHelperText className="text-danger">
                {formik?.touched.question4 && formik?.errors.question4}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Udise Code */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question5-label" className="text-dark">
              UDISE CODE
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="question5"
              name="question5"
              type={"number"}
              fullWidth
              className="mt-2"
              variant="outlined"
              value={formik?.values.question5}
              onChange={formik?.handleChange}
              error={
                formik?.touched.question5 && Boolean(formik?.errors.question5)
              }
              helperText={formik?.touched.question5 && formik?.errors.question5}
            />
          </div>
          {/* SELECT Your Board */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question6" className="text-dark mb-2">
              Select Your Board
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth>
              <Select
                id="question6"
                name="question6"
                value={formik?.values.question6}
                onChange={formik?.handleChange}
                error={
                  formik?.touched.question6 && Boolean(formik?.errors.question6)
                }
              >
                {BoardData?.map((board, index) => {
                  return (
                    <MenuItem value={board} key={index}>
                      {board}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className="text-danger">
                {formik?.touched.question6 && formik?.errors.question6}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Medium of Education */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question7" className="text-dark mb-2">
              Medium of Education
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth>
              <Select
                id="question7"
                name="question7"
                value={formik?.values.question7}
                onChange={formik?.handleChange}
                error={
                  formik?.errors.question7 && Boolean(formik?.touched.question7)
                }
              >
                {medium.map((med, index) => {
                  return (
                    <MenuItem value={med} key={index}>
                      {med}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className="text-danger">
                {formik?.touched.question7 && formik?.errors.question7}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Medium of Education */}
          <div className="col-12 col-lg-6">
            <FormLabel id="question8-label" className="text-dark mb-2">
              What are you interested in?{" "}
              <span className="text-secondary">(Optional)</span>
            </FormLabel>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth>
              <Select
                id="question8"
                name="question8"
                value={formik?.values.question8}
                onChange={formik?.handleChange}
                error={
                  formik?.errors.question8 && Boolean(formik?.touched.question8)
                }
              >
                <MenuItem value="Teacher's Training on School Safety">
                  Teacher's Training on School Safety
                </MenuItem>
                <MenuItem value="Students’ Sensitisation of Safety at School">
                  Students’ Sensitisation of Safety at School
                </MenuItem>
                <MenuItem value="Training of Non-Teaching Staff on various Child Safety Aspects">
                  Training of Non-Teaching Staff on various Child Safety Aspects
                </MenuItem>
                <MenuItem value="Compliance with Government Guidelines">
                  Compliance with Government Guidelines
                </MenuItem>
                <MenuItem value="School Safety Certifications for Teachers and Staff">
                  School Safety Certifications for Teachers and Staff
                </MenuItem>
                <MenuItem value="All of the Above">All of the Above</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText>
              {formik?.touched.question8 && formik?.errors.question8}
            </FormHelperText>
          </div>
          <div className="col-12">
            <Button
              color="warning"
              variant="contained"
              className="py-3"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      {/* </div> */}
    </>
  );
};

export default InstituteEditPreference;
