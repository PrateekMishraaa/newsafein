import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { apiJsonAuth } from "api";
import * as yup from "yup";
import {
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useGlobalContext } from "global/context";
import { useOutletContext } from "react-router-dom";
import useError from "hooks/useError";
import SimpleBreadCrumb from "components/ui/breadcrumb/SimpleBreadCrumb";
import { classArray } from "../../teacher/onboard/Step2";

const validationSchema = new yup.object({
  question1: yup.string().notRequired(),
  question2: yup.string().notRequired(),
  question3: yup.string().notRequired(),
  question4: yup.string().notRequired(),
  question5: yup.string().notRequired(),
  question6: yup.string().notRequired(),
  question7: yup.string().notRequired(),
  question8: yup.string().notRequired(),
});

const EditAdditionalDetails = () => {
  const { ErrorResponder } = useError();
  const { token, userData } = useGlobalContext();
  const { fullDetails } = useOutletContext();
  // Additional Update Formik
  const additionalFormik = useFormik({
    initialValues: {
      question1: fullDetails?.question1 || "",
      question2: fullDetails?.question2 || "",
      question3: fullDetails?.question3 || "",
      question4: fullDetails?.question4 || "",
      question5: fullDetails?.question5 || "",
      question6: fullDetails?.question6 || "",
      question7: fullDetails?.question7 || "",
      question8: fullDetails?.question8 || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      toast.loading("Submitting Please Wait...");
      if (token) {
        try {
          const res = await apiJsonAuth.put(
            `/student/profile`,
            { ...values },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(res);
          if (res.status === 200) {
            toast.dismiss();
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log("Error", error);
          if (error) {
            ErrorResponder(error);
          }
        }
      } else {
        console.log("ERROR! Token Not Found");
      }
    },
  });
  // console.log({ error: additionalFormik?.errors, values: additionalFormik?.values })
  const roleWiseText = (student, teacher, parent) => {
    switch (userData?.role) {
      case "student":
        return student;
      case "teacher":
        return teacher;
      case "parent":
        return parent;
    }
  };
  return (
    <>
      <form onSubmit={additionalFormik.handleSubmit}>
        <div className="row gy-4">
          {/* Question1 */}
          <div className="col-12 col-lg-6">
            <h6>
              {roleWiseText(
                "Which Class Do You Study In?",
                "Which Class Do You Teach?"
              )}
            </h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question1"
                name="question1"
                size="large"
                className={
                  additionalFormik?.errors.question1 &&
                  Boolean(additionalFormik?.touched.question1)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
                value={additionalFormik?.values.question1}
                onChange={additionalFormik?.handleChange}
              >
                <option value="">Click To Select</option>
                {classArray?.map((classString, index) => {
                  return (
                    <option value={classString} key={index}>
                      {classString}
                    </option>
                  );
                })}
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question1 &&
                  additionalFormik?.errors.question1}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Question2 */}
          <div className="col-12 col-lg-6">
            <h6>Are you a part of the School Safety Committee?</h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question2"
                name="question2"
                value={additionalFormik?.values.question2}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question2 &&
                  Boolean(additionalFormik?.touched.question2)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not Sure">Not Sure</option>
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question2 &&
                  additionalFormik?.errors.question2}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Question3 */}
          <div className="col-12 col-lg-6">
            <h6>
              Do you use a School Bus or Transportation Provided by the School?{" "}
              <span className="text-secondary">(Optional)</span>
            </h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question3"
                name="question3"
                size="large"
                value={additionalFormik?.values.question3}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question3 &&
                  Boolean(additionalFormik?.touched.question3)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question3 &&
                  additionalFormik?.errors.question3}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Question4 */}
          <div className="col-12 col-lg-6">
            <h6>Your Education</h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question4"
                name="question4"
                size="large"
                value={additionalFormik?.values.question4}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question4 &&
                  Boolean(additionalFormik?.touched.question4)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="Graduation - Subjects studied">
                  Graduation - Subjects studied
                </option>
                <option value="Post Graduation - Subjects studied">
                  Post Graduation - Subjects studied
                </option>
                <option value="Doctorate - Subject">Doctorate - Subject</option>
                <option value="Other - Please mention">
                  Other - Please mention
                </option>
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question4 &&
                  additionalFormik?.errors.question4}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Question5 */}
          <div className="col-12 col-lg-6">
            <h6>Subject studied</h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <TextField
                id="question5"
                name="question5"
                size="large"
                value={additionalFormik?.values.question5}
                onChange={additionalFormik?.handleChange}
                error={
                  additionalFormik?.errors.question5 &&
                  Boolean(additionalFormik?.touched.question5)
                }
                helperText={
                  additionalFormik?.touched.question5 &&
                  additionalFormik?.errors.question5
                }
              />
            </FormControl>
          </div>
          {/* Question6 */}
          <div className="col-12 col-lg-6">
            <h6>Total Work Experience in Schools</h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question6"
                name="question6"
                size="large"
                value={additionalFormik?.values.question6}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question6 &&
                  Boolean(additionalFormik?.touched.question6)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-6 years">3-6 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="10-20 years">10-20 years</option>
                <option value="20 years or more">20 years or more</option>
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question6 &&
                  additionalFormik?.errors.question6}
              </FormHelperText>
            </FormControl>
          </div>
          {/* Question7 */}
          <div className="col-12 col-lg-6">
            <h6>
              Which School Safety aspects are you most interested in?{" "}
              <span className="text-secondary">(Optional)</span>
            </h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question7"
                name="question7"
                size="large"
                value={additionalFormik?.values.question7}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question7 &&
                  Boolean(additionalFormik?.touched.question7)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="Teachers Orientation & Training">
                  Teachers Orientation & Training
                </option>
                <option value="Health & Physical Safety">
                  Health & Physical Safety
                </option>
                <option value="School Buildings, Grounds and Facilities">
                  School Buildings, Grounds and Facilities
                </option>
                <option value="Transportation">Transportation</option>
                <option value="Cyber Safety & Policy">
                  Cyber Safety & Policy
                </option>
                <option value="Psychosocial Safety & Support">
                  Psychosocial Safety & Support
                </option>
                <option value="All of the above">All of the above</option>
              </select>
            </FormControl>
            <FormHelperText className="text-danger">
              {additionalFormik?.touched.question7 &&
                additionalFormik?.errors.question7}
            </FormHelperText>
          </div>
          {/* Question8 */}
          <div className="col-12 col-lg-6">
            <h6>
              Are you open to assuming a more prominent role concerning school
              safety in your school?
            </h6>
          </div>
          <div className="col-12 col-lg-6">
            <FormControl fullWidth size="small">
              <select
                id="question8"
                name="question8"
                size="large"
                value={additionalFormik?.values.question8}
                onChange={additionalFormik?.handleChange}
                className={
                  additionalFormik?.errors.question8 &&
                  Boolean(additionalFormik?.touched.question8)
                    ? "border-danger form-select py-3"
                    : " form-select py-3"
                }
              >
                <option value="">Click To Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not sure">Not sure</option>
              </select>
              <FormHelperText className="text-danger">
                {additionalFormik?.touched.question8 &&
                  additionalFormik?.errors.question8}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="col-6">
            <Button
              color="success"
              className="rounded-3"
              variant="contained"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAdditionalDetails;
