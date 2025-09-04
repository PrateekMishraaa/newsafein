import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
// imports Stepper
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useFormik } from "formik";
import useError from "hooks/useError";
import { apiAuth } from "api";
import { toast } from "react-toastify";
import { useGlobalContext } from "global/context";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import ConfettiExplosion from "react-confetti-explosion";
import { Modal } from "react-bootstrap";

const MAX_FILE_SIZE = 1048576; // 1MB

const validFileExtensions = { image: ["jpg", "png", "jpeg"] };

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const onboardSchema = new Yup.object({
  profile: Yup.mixed()
    .required()
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size",
      "Max allowed size is 1MB",
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
  fb: Yup.string()
    .max(500)
    .matches(/(?:www.facebook.com|www.fb.com)/, "Facebook profile not found")
    .notRequired(),
  twitter: Yup.string()
    .max(500)
    .matches(/(?:twitter.com|www.twitter.com)/, "Twitter Profile not found")
    .notRequired(),
  insta: Yup.string()
    .max(500)
    .matches(/(www.instagram.com)/, "Instagram profile not found")
    .notRequired(),
  lkd: Yup.string()
    .max(500)
    .matches(/(www.linkedin.com)/, "Linkedin profile not found")
    .notRequired(),
  ytb: Yup.string()
    .max(500)
    .matches(/(www.youtube.com)/, "Youtube profile not found")
    .notRequired(),
  bio: Yup.string()
    .max(350, "Bio is Too long! ( max 350 characters )")
    .required("Bio is required"),
  question1: Yup.string().required("Number Of Students is Required"),
  question2: Yup.string().required("Number Of Teachers is Required"),
  question3: Yup.string().required("Number Of Non Teaching Staff is Required"),
  question4: Yup.string().required("Type Of School is Required"),
  question5: Yup.string()
  .matches(/^[a-zA-Z0-9]+$/, 'UDISE Code must be alphanumeric and without spaces')
  .required('UDISE Code is required'),
  question6: Yup.string().required("Education Board is required"),
  question7: Yup.string().required("Education Medium is required"),
  question8: Yup.string().notRequired(),
  question9: Yup.string().notRequired(),
  coordinator: Yup.object()
    .shape({
      name: Yup.string()
        .max(400)
        .required("School Safety Coordinator's Name is required"),
      email: Yup.string()
        .email("email must be a valid.")
        .max(300)
        .required("School Safety Coordinator's Email is required"),
      contact: Yup.string()
        .required("School Safety Coordinator's Contact Number is required")
        .max(300)
        .matches(/^[0-9]{10}$/, "Invalid Contact Number"),
      designation: Yup.string()
        .max(300)
        .required("Coordinator's Designation is required"),
    })
    .required("Must have Coordinator"),
});

// Onboarding Steps
const steps = [
  "About your school",
  "Board and Language",
  "Appoint a School Safety Coordinator",
];
function OnboardStepper({ handleClose, details, fetchDetails }) {
  //Start Formik and API Calls
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const formik = useFormik({
    initialValues: {
      first_name: details?.first_name,
      email: details?.email,
      institution_name: details?.institution_name,
      profile: "",
      bio: details?.bio || "",
      fb: details?.fb || "",
      insta: details?.insta || "",
      lkd: details?.lkd || "",
      twitter: details?.twitter || "",
      ytb: details?.ytb || "",
      question1: details?.question1 || "",
      question2: details?.question2 || "",
      question3: details?.question3 || "",
      question4: details?.question4 || "",
      question5: details?.question5 || "",
      question6: details?.question6 || "",
      question7: details?.question7 || "",
      question8: details?.question8 || "",
      question9: details?.question9 || "",
      coordinator: {
        name: "",
        email: "",
        contact: "",
        designation: "",
      },
    },
    validationSchema: onboardSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values, Actions) => {
      toast?.dismiss();
      toast.loading("Onboarding please wait..");
      try {
        setSubmitState(true);
        const response = await apiAuth.post("/institute/onboard", values, {
          headers: {
            Authorization: token,
          },
        });
        setSubmitState(false);

        switch (response?.data?.status) {
          case "success":
            toast.dismiss();
            toast.success(response.data.message);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            fetchDetails();
            break;
          case "error":
            toast.dismiss();
            toast.error(response.data.message);
            break;
          case "warning":
            toast.dismiss();
            toast.warning(response.data.message);
            break;
          default:
            break;
        }
      } catch (err) {
        ErrorResponder(err);
        setSubmitState(false);
      }
    },
  });
  //End Formik
  console.log({ error: formik.errors, value: formik.values });
  // Stepper States and Functions
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [submitState, setSubmitState] = React.useState(false);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const FieldsErrorChecker = (arr) => {
    const errorElements = Object.keys(formik?.errors);
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (errorElements.includes(element)) {
        result = true;
        break;
      }
    }
    return result;
  };
  const handleNext = () => {
    if (activeStep === 0) {
      const fields = [
        "profile",
        "bio",
        "question1",
        "question2",
        "question3",
        "fb",
        "twitter",
        "insta",
        "lkd",
        "ytb",
      ];
      console.log("IN active Step 0", FieldsErrorChecker(fields));
      const errorCheck = FieldsErrorChecker(fields);
      console.log(errorCheck);
      if (errorCheck) {
        console.log("IF");
        fields.forEach((field) => {
          formik?.setFieldTouched(field, true);
        });
      } else {
        console.log("ELSE");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      const fields = ["question4", "question5", "question6", "question7"];
      const errorCheck = FieldsErrorChecker(fields);
      if (errorCheck) {
        fields.forEach((field) => {
          formik?.setFieldTouched(field, true);
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      const fields = [
        "coordinator?.name",
        "coordinator?.email",
        "coordinator?.phone",
        "coordinator?.designation",
        "question8",
        "question9",
      ];
      const errorCheck = FieldsErrorChecker(fields);
      if (errorCheck) {
        fields.forEach((field) => {
          formik?.setFieldTouched(field, true);
        });
      } else {
        formik?.handleSubmit();
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const stepForms = [
    <Step1 formik={formik} details={details} />,
    <Step2 formik={formik} details={details} />,
    <Step3 formik={formik} details={details} />,
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <div className="container-fluid">
        <Stepper
          className="flex-column flex-lg-row justify-content-start w-100 align-items-start"
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} className="p-1">
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep < 3 && (
          <Typography
            sx={{ my: 1 }}
            className="p-2 px-3 border border-warning d-inline-block rounded-3 shadow-sm"
          >
            <span className="fw-bold text-primary">Step {activeStep + 1}</span>{" "}
            : {steps[activeStep]}
          </Typography>
        )}
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="container-fluid pb-3">
            <ConfettiExplosion />
            <img
              src="/images/fallback/onboardsucces.jpg"
              alt=""
              className="w-100"
              style={{ height: 260, objectFit: "contain" }}
            />
            <Typography sx={{ mb: 1 }} className="fw-semibold text-center">
              <CheckCircleOutlineOutlined color="success" /> Onboarding
              completed
            </Typography>
            <Box
              className="justify-content-center"
              sx={{ display: "flex", flexDirection: "row", pt: 2 }}
            >
              <Button
                variant="outlined"
                className="rounded-3"
                color="success"
                onClick={handleClose}
              >
                Continue To Dashboard
              </Button>
            </Box>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {stepForms[activeStep]}
          <div className="container-fluid pb-3">
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="contained"
                disabled={submitState}
                className="rounded-3"
                color="success"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
//End Onbording Steps

// Onboard Modal
export default function OnboardModalInstitute({ details, fetchDetails }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };
  return (
    <Modal
      show={open}
      size="lg"
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Modal.Body>
        <Box>
          <OnboardStepper
            handleClose={handleClose}
            details={details}
            fetchDetails={fetchDetails}
          />
        </Box>
      </Modal.Body>
    </Modal>
  );
}
// End Onboard Modal
