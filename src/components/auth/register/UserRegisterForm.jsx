// import React from "react";
// import { useState } from "react";
// import { GoogleEmailComponent } from "../google";
// import { Alert, Modal } from "react-bootstrap";
// import {
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { checkUnique, textLimit } from "utils";
// import { useNavigate, useParams } from "react-router-dom";
// import { api, apiJson } from "api";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import useError from "hooks/useError";
// import { useQuery } from "hooks";
// import * as Yup from "yup";
// import axios from "axios";

// const userRegisterSchema = new Yup.object({
//   email: Yup.string().email().required("Email is required"),
//   first_name: Yup.string().required("First Name is Required"),
//   last_name: Yup.string().required("Last Name is Required"),
//   role: Yup.string().required(),
//   profile: Yup.string().notRequired(),
//   login_method: Yup.string().required(),
//   dob: Yup.string().required(),
//   instituteId: Yup.string().required(),
//   contact: Yup.string()
//     .required("Phone Number is Required")
//     .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
//   gender: Yup.string().required(),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
//     .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
//     .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
//     .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
//     .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
//   confirm_password: Yup.string().oneOf(
//     [Yup.ref("password"), null],
//     "Password must match"
//   ),
// });





// export const UserRegisterForm = ({ collegeId }) => {
//   const navigate = useNavigate();
//   const param = useParams();
//   let query = useQuery();
//   let user = param.user || query.get("type");
//   const [showModal, setShowModal] = useState(false);
//   const [submitState, setSubmitState] = useState(false);
//   const [showPass, setShowPass] = useState({
//     password: false,
//     confirm_password: false,
//   });
//   const [instituteList, setInstituteList] = useState([]);
//   const { ErrorResponder } = useError();

//   const fetchInstituteList = async () => {
//     try {
//       const res = await axios.get("http://localhost:3100/api/public/institute-list");
//       switch (res?.data?.status) {
//         case "success":
//           setInstituteList(res?.data?.result);
//           break;
//       }
//     } catch (error) {
//       ErrorResponder(error);
//     }
//   };

//   useEffect(() => {
//     fetchInstituteList();
//   }, []);


//   useEffect(()=>{
//     console.log('collegeId',collegeId)
//     formik.setFieldValue('instituteId', String(collegeId))
//   },[collegeId])


//   const toggleHandle = () => {
//     setShowModal(!showModal);
//   };
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       role: user,
//       profile: "",
//       login_method: "google",
//       dob: "2001-01-01",
//       instituteId: "",
//       first_name: "",
//       last_name: "",
//       contact: "",
//       gender: "male",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: userRegisterSchema,
//     validateOnMount: true,
//     onSubmit: async (values, action) => {
//       try {
//         setSubmitState(true);
//         toast.dismiss();
//         toast.loading();
//         console.log('valuesss', values)
//         // const res = await apiJson.post("api/v1/register/student", values);
//         const res = await axios.post("http://localhost:3100/api/register/student", values);
//         if (res) {
//         }
//         toast.dismiss();
//         switch (res?.data?.status) {
//           case "SUCCESS":
//             toast.success(res?.data?.message || "Registered Succesfully");
//             navigate("/login");
//             break;
//           case "CONFLICT":
//             toast.success(res?.data?.message || "Account already exist");
//             break;
//           case "ERROR":
//             toast.error(res?.data?.message || "Error while registering");
//             break;
//         }
//         setSubmitState(false);
//       } catch (error) {
//         console.error("this is error",error);
//         toast.error(
//           error?.response?.data?.message || "Oops Something Went Wrong"
//         );
//         setSubmitState(false);
//       }
//     },
//   });
//   const handleClose = () => {
//     formik.resetForm();
//     toggleHandle();
//   };
//   const handleContinue = async () => {
//     console.log("formik valuesis ",formik.values)
//     const emailUnique = await checkUnique(formik.values.email);
//     if (emailUnique) {
//       formik.setFieldValue("login_method", "jwt");
//       setShowModal(true);
//     } else {
//       toast.error(
//         "Account with this email address already exists please login."
//       );
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className=" text-capitalize">
//         Create your account as a <span className="text-primary">{user}</span>
//       </h2>
//       <p>
//         Start by following the instructions as you follow a step-by-step
//         onboarding process!
//       </p>
//       {/* Normal Registration */}
//       <div className="mt-4">
//         <div className="mb-2">
//           <label htmlFor="institute_name" className="form-label fs-6 text-dark">
//             Enter your email ID
//           </label>
//           <input
//             autoComplete="off"
//             type="email"
//             id="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={`form-control py-3`}
//           />
//           {Boolean(formik.touched.email) && (
//             <span className="text-capitalize text-danger">
//               {formik.errors.email}
//             </span>
//           )}
//         </div>
//         <button
//           disabled={
//             !Boolean(formik.values.email) || Boolean(formik.errors.email)
//           }
//           type="submit"
//           className={`btn btn-primary w-100 py-3 mt-2 ${
//             !Boolean(formik.values.email) || Boolean(formik.errors.email)
//               ? "bg-secondary border-secondary"
//               : ""
//           }`}
//           onClick={handleContinue}
//         >
//           Continue
//         </button>
//       </div>
//       <Divider className="my-3" variant="middle">
//         Or
//       </Divider>
//       <GoogleEmailComponent formik={formik} toggleModal={toggleHandle} />
//       {/* Details Modal */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title className="fs-5">
//             Start creating your account
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="row row-cols-2 g-2 mb-2">
//               <div className="col">
//                 <label htmlFor="first_name" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   name="first_name"
//                   value={formik?.values?.first_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {Boolean(formik.touched.first_name) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.first_name}
//                   </span>
//                 )}
//               </div>
//               <div className="col">
//                 <label htmlFor="last_name" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="last_name"
//                   name="last_name"
//                   value={formik?.values?.last_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {Boolean(formik.touched.last_name) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.last_name}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="row row-cols-2 g-2 mb-2">
//               <div className="col">
//                 <label htmlFor="contact" className="form-label">
//                   Contact Number
//                 </label>
//                 <input
//                   type="text"
//                   id="contact"
//                   name="contact"
//                   value={formik?.values?.contact}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {Boolean(formik.touched.contact) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.contact}
//                   </span>
//                 )}
//               </div>
//               <div className="col">
//                 <label htmlFor="dob" className="form-label">
//                   Date Of Birth
//                 </label>
//                 <input
//                   type="date"
//                   id="dob"
//                   name="dob"
//                   value={formik?.values?.dob}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {Boolean(formik.touched.dob) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.dob}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="mb-2">
//               <FormControl>
//                 <FormLabel id="gender-label" className="mb-0 text-secondary">
//                   Gender
//                 </FormLabel>
//                 <RadioGroup
//                   aria-labelledby="gender-label"
//                   defaultValue={formik?.values?.gender}
//                   id="gender"
//                   name="gender"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   row
//                 >
//                   <FormControlLabel
//                     value="female"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                   <FormControlLabel
//                     value="male"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="other"
//                     control={<Radio />}
//                     label="Other"
//                   />
//                 </RadioGroup>
//               </FormControl>
//               {Boolean(formik.touched.gender) && (
//                 <span className="text-danger text-capitalize">
//                   {formik.errors.gender}
//                 </span>
//               )}
//             </div>
//             {!Boolean(collegeId) ? (
//               <>
//                 <select
//                   id="instituteId"
//                   name="instituteId"
//                   className="form-select py-2"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik?.values?.instituteId}
//                 >
//                   <option value="">Click to Select School</option>
//                   {instituteList?.map((institute, instituteIndex) => {
//                     return (
//                       <option key={instituteIndex} value={institute?.id}>
//                         {textLimit(institute?.institution_name, 50)}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 {Boolean(formik.touched.instituteId) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.instituteId}
//                   </span>
//                 )}
//                 <Alert variant="success" className="p-2 mt-2">
//                   Note : If your school is not found in the list you can select
//                   SafeInSchool and create an independent account
//                 </Alert>
//               </>
//             ) : (
//               ""
//             )}
//             <div className="row g-2 mb-3">
//               <div className="col-6">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <div className="input-group">
//                   <input
//                     type={showPass.password ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formik?.values?.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="form-control"
//                   />
//                   <button
//                     type="button"
//                     className="btn border-secondary"
//                     onClick={() =>
//                       setShowPass({ ...showPass, password: !showPass.password })
//                     }
//                   >
//                     {showPass.password ? (
//                       <i className="bi bi-eye-slash"></i>
//                     ) : (
//                       <i className="bi bi-eye"></i>
//                     )}
//                   </button>
//                 </div>
//                 {Boolean(formik.touched.password) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.password}
//                   </span>
//                 )}
//               </div>
//               <div className="col-6">
//                 <label htmlFor="confirm_password" className="form-label">
//                   Confirm Password
//                 </label>
//                 <div className="input-group">
//                   <input
//                     type={showPass.confirm_password ? "text" : "password"}
//                     id="confirm_password"
//                     name="confirm_password"
//                     value={formik?.values?.confirm}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="form-control"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPass({
//                         ...showPass,
//                         confirm_password: !showPass.confirm_password,
//                       })
//                     }
//                     className="btn border-secondary"
//                   >
//                     {showPass.confirm_password ? (
//                       <i className="bi bi-eye-slash"></i>
//                     ) : (
//                       <i className="bi bi-eye"></i>
//                     )}
//                   </button>
//                 </div>
//                 {Boolean(formik.touched.confirm_password) && (
//                   <span className="text-danger text-capitalize">
//                     {formik.errors.confirm_password}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <button
//               disabled={
//                 Boolean(Object.keys(formik.errors).length) || submitState
//               }
//               type="submit"
//               className="btn btn-primary w-100 cursor-pointer"
//             >
//               Register
//             </button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };


// // {
// //   "identifier": "admin@dps.edu",
// //   "password": "StrongPass2024"
// // }

import React from "react";
import { useState } from "react";
import { GoogleEmailComponent } from "../google";
import { Alert, Modal } from "react-bootstrap";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { checkUnique, textLimit } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import { api, apiJson } from "api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useError from "hooks/useError";
import { useQuery } from "hooks";
import * as Yup from "yup";
import axios from "axios";

// Login Schema (separate from registration)
const userLoginSchema = new Yup.object({
  identifier: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Registration Schema (your existing one, fixed)
const userRegisterSchema = new Yup.object({
  email: Yup.string().email().required("Email is required"),
  first_name: Yup.string().required("First Name is Required"),
  last_name: Yup.string().required("Last Name is Required"),
  role: Yup.string().required(),
  profile: Yup.string().notRequired(),
  login_method: Yup.string().required(),
  dob: Yup.string().required(),
  instituteId: Yup.string().required(),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  gender: Yup.string().required(),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});
// console.log("teacher data",userRegisterSchema)
// Login Form Component
export const UserLoginForm = ({ userType = "student" }) => {
  const navigate = useNavigate();
  const [submitState, setSubmitState] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { ErrorResponder } = useError();

  const loginFormik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    validateOnMount: true,
    onSubmit: async (values, action) => {
      try {
        setSubmitState(true);
        toast.dismiss();
        toast.loading("Logging in...");
        
        console.log('Login values:', values);
        
        // Map userType to API type parameter
        const typeMapping = {
          'student': '0',
          'institute': '1', 
          'admin': '2',
          'coordinator': '1'
        };
        
        const res = await axios.post(
          `http://localhost:3100/api/auth/login?type=${typeMapping[userType] || '0'}`, 
          values
        );
        
        toast.dismiss();
        
        switch (res?.data?.status) {
          case "success":
            toast.success(res?.data?.message || "Logged in successfully");
            
            // Store JWT token (adjust storage method as needed)
            if (res?.data?.jwt) {
              localStorage.setItem("auth_token", res.data.jwt);
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }
            
            // Navigate based on user type
            switch (res?.data?.user?.type) {
              case 0: // Student
                navigate("/student/dashboard");
                break;
              case 1: // Institute/Coordinator
                navigate("/institute/dashboard");
                break;
              case 2: // Admin
                navigate("/admin/dashboard");
                break;
              default:
                navigate("/dashboard");
            }
            break;
            
          case "warning":
            toast.warning(res?.data?.message || "Login failed");
            break;
            
          case "error":
            toast.error(res?.data?.message || "Login error");
            break;
            
          default:
            toast.error("Unexpected response from server");
        }
        
        setSubmitState(false);
      } catch (error) {
        console.error("Login error:", error);
        toast.dismiss();
        toast.error(
          error?.response?.data?.message || "Login failed. Please try again."
        );
        setSubmitState(false);
      }
    },
  });

  return (
    <div className="container">
      <h2 className="text-capitalize">
        Login as <span className="text-primary">{userType}</span>
      </h2>
      <p>Enter your credentials to access your account</p>
      
      <form onSubmit={loginFormik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label fs-6 text-dark">
            Email Address
          </label>
          <input
            autoComplete="email"
            type="email"
            id="identifier"
            name="identifier"
            value={loginFormik.values.identifier}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            className={`form-control py-3 ${
              loginFormik.touched.identifier && loginFormik.errors.identifier 
                ? 'is-invalid' 
                : ''
            }`}
            placeholder="Enter your email address"
          />
          {loginFormik.touched.identifier && loginFormik.errors.identifier && (
            <div className="text-danger mt-1">
              {loginFormik.errors.identifier}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-6 text-dark">
            Password
          </label>
          <div className="input-group">
            <input
              autoComplete="current-password"
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              className={`form-control py-3 ${
                loginFormik.touched.password && loginFormik.errors.password 
                  ? 'is-invalid' 
                  : ''
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </button>
          </div>
          {loginFormik.touched.password && loginFormik.errors.password && (
            <div className="text-danger mt-1">
              {loginFormik.errors.password}
            </div>
          )}
        </div>

        <button
          disabled={
            !loginFormik.isValid || 
            submitState || 
            !loginFormik.values.identifier || 
            !loginFormik.values.password
          }
          type="submit"
          className={`btn w-100 py-3 mt-2 ${
            !loginFormik.isValid || submitState || 
            !loginFormik.values.identifier || !loginFormik.values.password
              ? "btn-secondary"
              : "btn-primary"
          }`}
        >
          {submitState ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-3">
        <a href="/forgot-password" className="text-primary text-decoration-none">
          Forgot Password?
        </a>
      </div>
      
      <Divider className="my-3" variant="middle">
        Or
      </Divider>
      
      <GoogleEmailComponent 
        formik={loginFormik} 
        isLogin={true}
        userType={userType}
      />
    </div>
  );
};

// Registration Form Component (your existing form, with fixes)
export const UserRegisterForm = ({ collegeId }) => {
  const navigate = useNavigate();
  const param = useParams();
  let query = useQuery();
  let user = param.user || query.get("type");
  const [showModal, setShowModal] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [showPass, setShowPass] = useState({
    password: false,
    confirm_password: false,
  });
  const [instituteList, setInstituteList] = useState([]);
  const { ErrorResponder } = useError();

  const fetchInstituteList = async () => {
    try {
      const res = await axios.get("http://localhost:3100/api/public/institute-list");
      switch (res?.data?.status) {
        case "success":
          setInstituteList(res?.data?.result);
          break;
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };

  useEffect(() => {
    fetchInstituteList();
  }, []);

  useEffect(() => {
    console.log('collegeId', collegeId);
    if (collegeId) {
      formik.setFieldValue('instituteId', String(collegeId));
    }
  }, [collegeId]);

  const toggleHandle = () => {
    setShowModal(!showModal);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      role: user,
      profile: "",
      login_method: "jwt", // Changed from "google" to "jwt" for normal registration
      dob: "2001-01-01",
      instituteId: collegeId ? String(collegeId) : "",
      first_name: "",
      last_name: "",
      contact: "",
      gender: "male",
      password: "",
      confirm_password: "",
    },
    validationSchema: userRegisterSchema,
    validateOnMount: true,
    onSubmit: async (values, action) => {
      try {
        setSubmitState(true);
        toast.dismiss();
        toast.loading("Registering...");
        
        console.log('Registration values:', values);
        
        const res = await axios.post("http://localhost:3100/api/register/student", values);
        toast.dismiss();
        console.log("registration data",res)
        
        switch (res?.data?.status) {
          case "SUCCESS":
            toast.success(res?.data?.message || "Registered Successfully");
            setShowModal(false);
            navigate("/login");
            break;
          case "CONFLICT":
            toast.warning(res?.data?.message || "Account already exists");
            break;
          case "ERROR":
            toast.error(res?.data?.message || "Error while registering");
            break;
          default:
            toast.error("Unexpected response from server");
        }
        setSubmitState(false);
      } catch (error) {
        console.error("Registration error:", error);
        toast.dismiss();
        toast.error(
          error?.response?.data?.message || "Registration failed. Please try again."
        );
        setSubmitState(false);
      }
    },
  });
  console.log("formik value",formik)

  const handleClose = () => {
    formik.resetForm();
    toggleHandle();
  };

  const handleContinue = async () => {
    console.log("formik values:", formik.values);
    try {
      const emailUnique = await checkUnique(formik.values.email);
      if (emailUnique) {
        formik.setFieldValue("login_method", "jwt");
        setShowModal(true);
      } else {
        toast.error(
          "Account with this email address already exists. Please login."
        );
      }
    } catch (error) {
      toast.error("Error checking email availability");
    }
  };

  return (
    <div className="container">
      <h2 className="text-capitalize">
        Create your account as a <span className="text-primary">{user}</span>
      </h2>
      <p>
        Start by following the instructions as you follow a step-by-step
        onboarding process!
      </p>
      
      {/* Email Entry Step */}
      <div className="mt-4">
        <div className="mb-2">
          <label htmlFor="email" className="form-label fs-6 text-dark">
            Enter your email ID  
          </label>
         
          <input
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control py-3 ${
              formik.touched.email && formik.errors.email ? 'is-invalid' : ''
            }`}
            placeholder="Enter your email address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger mt-1">
              {formik.errors.email}
            </div>
          )}
      
        </div>
       
        <button
          disabled={
            !Boolean(formik.values.email) || Boolean(formik.errors.email)
          }
          type="button"
          className={`btn w-100 py-3 mt-2 ${
            !Boolean(formik.values.email) || Boolean(formik.errors.email)
              ? "btn-secondary"
              : "btn-primary"
          }`}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      
      <Divider className="my-3" variant="middle">
        Or
      </Divider>
      
      <GoogleEmailComponent formik={formik} toggleModal={toggleHandle} />
      
      {/* Registration Details Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">
            Complete your registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            {/* Name Fields */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label htmlFor="first_name" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.first_name && formik.errors.first_name ? 'is-invalid' : ''
                  }`}
                  placeholder="Enter first name"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <div className="text-danger mt-1">
                    {formik.errors.first_name}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="last_name" className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.last_name && formik.errors.last_name ? 'is-invalid' : ''
                  }`}
                  placeholder="Enter last name"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div className="text-danger mt-1">
                    {formik.errors.last_name}
                  </div>
                )}
              </div>
            </div>

            {/* Contact and DOB */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label htmlFor="contact" className="form-label">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.contact && formik.errors.contact ? 'is-invalid' : ''
                  }`}
                  placeholder="10-digit mobile number"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-danger mt-1">
                    {formik.errors.contact}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="dob" className="form-label">
                  Date Of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.dob && formik.errors.dob ? 'is-invalid' : ''
                  }`}
                />
                {formik.touched.dob && formik.errors.dob && (
                  <div className="text-danger mt-1">
                    {formik.errors.dob}
                  </div>
                )}
              </div>
            </div>

            {/* Gender Selection */}
            <div className="mb-3">
              <FormControl>
                <FormLabel id="gender-label" className="mb-2 text-secondary">
                  Gender *
                </FormLabel>
                <RadioGroup
                  aria-labelledby="gender-label"
                  value={formik.values.gender}
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger mt-1">
                  {formik.errors.gender}
                </div>
              )}
            </div>

            {/* Institute Selection */}
            {!Boolean(collegeId) && (
              <div className="mb-3">
                <label htmlFor="instituteId" className="form-label">
                  Select School/Institute *
                </label>
                <select
                  id="instituteId"
                  name="instituteId"
                  className={`form-select py-2 ${
                    formik.touched.instituteId && formik.errors.instituteId ? 'is-invalid' : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.instituteId}
                >
                  <option value="">Click to Select School</option>
                  {instituteList?.map((institute, instituteIndex) => (
                    <option key={instituteIndex} value={institute?.id}>
                      {textLimit(institute?.institution_name, 50)}
                    </option>
                  ))}
                </select>
                {formik.touched.instituteId && formik.errors.instituteId && (
                  <div className="text-danger mt-1">
                    {formik.errors.instituteId}
                  </div>
                )}
                <Alert variant="info" className="p-2 mt-2">
                  <small>
                    Note: If your school is not found in the list, you can select 
                    SafeInSchool and create an independent account
                  </small>
                </Alert>
              </div>
            )}

            {/* Password Fields */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <div className="input-group">
                  <input
                    type={showPass.password ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPass({ ...showPass, password: !showPass.password })
                    }
                  >
                    {showPass.password ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger mt-1">
                    <small>{formik.errors.password}</small>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password *
                </label>
                <div className="input-group">
                  <input
                    type={showPass.confirm_password ? "text" : "password"}
                    id="confirm_password"
                    name="confirm_password"
                    value={formik.values.confirm_password} // Fixed: was confirm instead of confirm_password
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPass({
                        ...showPass,
                        confirm_password: !showPass.confirm_password,
                      })
                    }
                    className="btn btn-outline-secondary"
                  >
                    {showPass.confirm_password ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                </div>
                {formik.touched.confirm_password && formik.errors.confirm_password && (
                  <div className="text-danger mt-1">
                    <small>{formik.errors.confirm_password}</small>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={
                !formik.isValid || submitState
              }
              type="submit"
              className={`btn w-100 py-3 ${
                !formik.isValid || submitState ? "btn-secondary" : "btn-primary"
              }`}
            >
              {submitState ? "Registering..." : "Complete Registration"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};