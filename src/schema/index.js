import * as yup from "yup";

export const instituteregisterSchema = yup.object().shape({
  first_name: yup.string().max(100).required("First Name is Required"),
  middle_name: yup.string().min(0).max(100),
  last_name: yup.string().max(100).required("Last Name is Required"),
  institute_name: yup.string().max(200).required("Institute Name is Required"),
  institute_address: yup
    .string()
    .max(1000)
    .required("Institute Address is Required"),
  state: yup.string().max(100).required("State is Required"),
  district: yup.string().required("District is Required"),
  pincode: yup
    .string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
  email: yup.string().email().required("Email Address is required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
});
export const campusregisterSchema = yup.object().shape({
  first_name: yup.string().max(100).required("First Name is Required"),
  middle_name: yup.string().min(0).max(100),
  last_name: yup.string().max(100).required("Last Name is Required"),
  institute_name: yup.string().max(200).required("Institute is Required"),
  institute_address: yup
    .string()
    .max(1000)
    .required("Institute Address is Required"),
  state: yup.string().max(100).required("State is Required"),
  pincode: yup
    .string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
  email: yup.string().email().required("Email is required"),
  confirm_email: yup
    .string()
    .oneOf([yup.ref("email"), null], "Email must match"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  g20_certification_num: yup
    .string()
    .max(200)
    .required("G20 Certification is required to apply for campus Sherpa"),
  reference: yup.string().max(300).required("Reference is Required"),
  social_active: yup.string().max(1000).required("Required"),
  views_on_g20: yup
    .string()
    .min(100, "Minimum 100 Words is required")
    .max(600, "Maximum 600 words are allowed")
    .required("This Field is Required"),
  topics: yup.array().required(),
});
export const studentRegisterSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("DOB is Required"),
  first_name: yup.string().max(100).required("First Name is Required"),
  middle_name: yup.string().min(0).max(100),
  last_name: yup.string().max(100).required("Last Name is Required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  father_name: yup.string().max(100).notRequired(),
  role: yup.string().max(100).required("Role is required."),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
export const setpasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});

//Edit Profile Schemas
export const editInstituteBasicProfile = yup.object().shape({
  title: yup.string().max(10).required("Title is Required"),
  first_name: yup.string().max(100).required("First Name is Required"),
  last_name: yup.string().max(100).required("Last Name is Required"),
  email: yup.string().email().required("Email is required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
});

export const editStudentSchema = yup.object().shape({
  first_name: yup.string().max(100).required("First Name is Required"),
  last_name: yup.string().max(100).required("Last Name is Required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("Date of Birth is Required"),
  father_name: yup.string().max(100).required("Father Name is Required"),
  fb: yup
    .string()
    .matches(
      /(www.facebook.com)/,
      "facebook profile url must match www.facebook.com"
    ),
  twitter: yup
    .string()
    .matches(
      /(www.twitter.com)/,
      "twitter profile url must match www.twitter.com"
    ),
  insta: yup
    .string()
    .matches(
      /(www.instagram.com)/,
      "Instagram profile url must match www.instagram.com"
    ),
  lkd: yup
    .string()
    .matches(
      /(www.linkedin.com)/,
      "Linkedin profile url must match www.linkedin.com"
    ),
  ytb: yup
    .string()
    .matches(
      /(www.youtube.com)/,
      "Youtube profile url must match www.youtube.com"
    ),
  bio: yup
    .string()
    .max(250, "Too long! ( max 250 characters )")
    .required("Bio is required"),
  address: yup.string().required("Institution Address is required"),
  state: yup.string().max(200).required("State is required"),
  district: yup.string().max(200).required("District is required"),
  instituteId: yup.string().max(200).required("District is required"),

  pincode: yup
    .string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});
