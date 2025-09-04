// import React from "react";
// import { useState } from "react";
// import { GoogleEmailComponent } from "../google";
// import { Modal, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { apiJson } from "api";
// import { useFormik } from "formik";
// import { useAddress } from "hooks";
// import useCurrentLocation from "hooks/useCurrentLocation";
// import { Divider } from "@mui/material";
// import { toast } from "react-toastify";
// import { instituteregisterSchema } from "schema";
// import { checkUnique } from "utils";
// import * as Yup from "yup";

// const instituteRegisterSchema = new Yup.object({
//   email: Yup.string().email().required("Email is required"),
//   first_name: Yup.string().required("First Name is Required"),
//   last_name: Yup.string().required("Last Name is Required"),
//   institution_name: Yup.string().required("Institution Name is Required"),
//   institute_address: Yup.string().required("Institute Address is Required"),
//   state: Yup.string().required("State is Required"),
//   district: Yup.string().required("District is Required"),
//   pincode: Yup.string().required("Pincode is Required"),
//   profile: Yup.string().notRequired(),
//   login_method: Yup.string().required(),
//   contact: Yup.string()
//     .required("Phone Number is Required")
//     .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches('/^(?=.*[a-z])/', "Must Contain One Lowercase Character")
//     .matches('/^(?=.*[A-Z])/', "Must Contain One Uppercase Character")
//     .matches('/^(?=.*[0-9])/', "Must Contain One Numeric")
//     .matches('/^(?=.[!@#\$%\^&\])/', "Must Contain One special case Character")
//     .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
//   confirm_password: Yup.string().oneOf(
//     [Yup.ref("password"), null],
//     "Password must match"
//   ),
// });

// export const InstituteRegisterForm = () => {
//   const { currentAddress } = useCurrentLocation();
//   const [submitState, setSubmitState] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const [showPass, setShowPass] = useState({
//     password: false,
//     confirm_password: false,
//   });
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };
//   // *Email Unique Ness Checker

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       first_name: "",
//       last_name: "",
//       institute_name: "",
//       institute_address: currentAddress,
//       state: "",
//       district: "",
//       pincode: "",
//       profile: "",
//       login_method: "google",
//       contact: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: instituteregisterSchema,
//     validateOnChange: true,
//     enableReinitialize: true,
//     onSubmit: async (values, action) => {
//       try {
//         setSubmitState(true);
//         const res = await apiJson.post("/register/institution", values);
//         const status = res?.data?.status;
//         console.log("res", res);
//         if (res) {
//           setSubmitState(false);
//         }
//         toast.dismiss();
//         switch (status.toLowerCase()) {
//           case "success":
//             toast.success(res?.data?.message || "Registered Succesfully");
//             formik.resetForm();
//             setShowModal(false);
//             navigate("/login");
//             break;
//           case "error":
//             toast.error(
//               res?.data?.message ||
//               "Error while registering please try again later"
//             );
//             break;
//           case "conflict":
//             toast.warning(res?.data?.message || "Account already exists");
//             navigate("/login");
//             break;
//         }
//       } catch (error) {
//         setSubmitState(false);
//         toast.error(
//           error?.response?.data?.message || "Oops Something Went Wrong"
//         );
//       }
//     },
//   });
//   const { states, districts } = useAddress(formik?.values?.state);
//   const handleClose = () => {
//     formik.resetForm();
//     setShowModal(false);
//   };
//   const handleContinue = async () => {
//     debugger
//     setSubmitState(true);
//     const emailUnique = await checkUnique(formik.values.email);
//     if (emailUnique) {
//       formik.setFieldValue("login_method", "jwt");
//       setShowModal(true);
//       setSubmitState(false);
//     } else {
//       toast.error(
//         "Account with this email address already exists please login."
//       );
//       setSubmitState(false);
//     }
//   };

//   const errorText = (field) => {
//     if (formik.touched[field]) {
//       return (
//         <span className="text-capitalize text-danger">
//           {formik.errors[field]}
//         </span>
//       );
//     }
//   };

//   return (
//     <div className="container" style={{ maxWidth: 500 }}>
//       <h3>Start Creating Your School’s Account</h3>
//       <p>
//         Onboard your school with us and begin creating a safe environment for
//         every child.
//       </p>
//       {/* Normal Registration */}
//       <div className="mt-4">
//         <div className="mb-2">
//           <label htmlFor="institute_name" className="form-label fs-6 text-dark">
//             Institute Name
//           </label>
//           <input
//             autoComplete="off"
//             type="text"
//             id="institute_name"
//             name="institute_name"
//             value={formik.values.institute_name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="form-control py-3"
//           />
//           {errorText("institute_name")}
//         </div>
//         <div className="mb-2">
//           <label htmlFor="institute_name" className="form-label fs-6 text-dark">
//             Email Address
//           </label>
//           <input
//             autoComplete="off"
//             type="email"
//             id="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={'form-control py-3'}
//           />
//           {errorText("email")}
//         </div>
//         <button
//           disabled={
//             !Boolean(formik.values.email) ||
//             !Boolean(formik.values.institute_name) ||
//             submitState
//           }
//           type="submit"
//           className={`btn btn-primary w-100 py-3 mt-2 ${!Boolean(formik.values.email) ||
//               !Boolean(formik.values.institute_name)
//               ? "bg-secondary border-secondary"
//               : ""
//             }`}
//           onClick={handleContinue}
//         >
//           Continue
//         </button>
//       </div>
//       <Divider className="my-3" variant="middle">
//         Or
//       </Divider>
//       {/* Google Registration */}
//       <GoogleEmailComponent formik={formik} toggleModal={toggleModal} />
//       {/* Other Details Modal */}
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
//                   autoComplete="off"
//                   type="text"
//                   id="first_name"
//                   name="first_name"
//                   value={formik?.values?.first_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {errorText("first_name")}
//               </div>
//               <div className="col">
//                 <label htmlFor="last_name" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   autoComplete="off"
//                   type="text"
//                   id="last_name"
//                   name="last_name"
//                   value={formik?.values?.last_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {errorText("last_name")}
//               </div>
//             </div>
//             <div className="mb-2">
//               <label htmlFor="contact" className="form-label">
//                 Contact Number
//               </label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 id="contact"
//                 name="contact"
//                 value={formik?.values?.contact}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("contact")}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="institute_name" className="form-label">
//                 Institution Name
//               </label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 id="institute_name"
//                 name="institute_name"
//                 value={formik?.values?.institute_name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("institute_name")}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="institute_name" className="form-label">
//                 Institution Address
//               </label>
//               <textarea
//                 autoComplete="off"
//                 type="text"
//                 rows={2}
//                 id="institute_address"
//                 name="institute_address"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//                 required
//               >
//                 {formik?.values?.institute_address}
//               </textarea>
//               {errorText("institute_address")}
//             </div>
//             <div className="row row-cols-2 g-2 mb-2">
//               <div className="col">
//                 <select
//                   labelId="state-label"
//                   id="state"
//                   name="state"
//                   value={formik?.values?.state}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={
//                     formik?.errors.state && Boolean(formik?.touched.state)
//                       ? "border-danger form-select"
//                       : " form-select"
//                   }
//                   required
//                 >
//                   <option>Select State</option>
//                   {states?.map((state, stateIndex) => {
//                     return (
//                       <option key={stateIndex} value={state?.State}>
//                         {state?.State}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 {errorText("state")}
//               </div>
//               <div className="col">
//                 <select
//                   id="district"
//                   name="district"
//                   value={formik.values?.district}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={
//                     Boolean(formik?.errors.district) &&
//                       Boolean(formik?.touched.district)
//                       ? "border-danger form-select"
//                       : " form-select"
//                   }
//                   required
//                 >
//                   <option>Select District</option>
//                   {Boolean(districts.length) ? (
//                     districts?.map((item, districtIndex) => {
//                       return (
//                         <option key={districtIndex} value={item?.District}>
//                           {item?.District}
//                         </option>
//                       );
//                     })
//                   ) : (
//                     <option value={formik.values?.state}>
//                       {formik.values?.state}
//                     </option>
//                   )}
//                 </select>
//                 {errorText("district")}
//               </div>
//               <div className="col">
//                 <input
//                   autoComplete="off"
//                   type="text"
//                   id="pincode"
//                   name="pincode"
//                   value={formik?.values?.pincode}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                   placeholder="Enter Pincode"
//                 />
//                 {errorText("pincode")}
//               </div>
//             </div>
//             <div className="row g-2 mb-3">
//               <div className="col-6">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <div className="input-group">
//                   <input
//                     autoComplete="off"
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
//                 {errorText("password")}
//               </div>
//               <div className="col-6">
//                 <label htmlFor="confirm_password" className="form-label">
//                   Confirm Password
//                 </label>
//                 <div className="input-group">
//                   <input
//                     autoComplete="off"
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
//                 {errorText("confirm_password")}
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={
//                 submitState || Boolean(Object.keys(formik.errors).length)
//               }
//               className={`btn  w-100 ${submitState || formik.isSubmitting
//                   ? "btn-success"
//                   : "btn-primary"
//                 }`}
//             >
//               {submitState || formik.isSubmitting ? (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <Spinner size="sm" /> Submitting
//                 </span>
//               ) : (
//                 <span>Register</span>
//               )}
//             </button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };


// import React, { useState, useEffect } from "react";
// import { GoogleEmailComponent } from "../google";
// import { Modal, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { apiJson } from "api";
// import { useFormik } from "formik";
// import { Divider } from "@mui/material";
// import { toast } from "react-toastify";
// import { checkUnique } from "utils";
// import * as Yup from "yup";
// import { State, City } from "country-state-city";
// import axios from "axios";

// const instituteRegisterSchema = Yup.object({
//   email: Yup.string().email().required("Email is required"),
//   first_name: Yup.string().required("First Name is Required"),
//   last_name: Yup.string().required("Last Name is Required"),
//   institute_name: Yup.string().required("Institution Name is Required"),
//   institute_address: Yup.string().required("Institute Address is Required"),
//   state: Yup.string().required("State is Required"),
//   district: Yup.string().required("District is Required"),
//   pincode: Yup.string().required("Pincode is Required"),
//   profile: Yup.string().notRequired(),
//   login_method: Yup.string().required(),
//   contact: Yup.string()
//     .required("Phone Number is Required")
//     .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
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

// export const InstituteRegisterForm = () => {
//   const [submitState, setSubmitState] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const navigate = useNavigate();
//   const [showPass, setShowPass] = useState({
//     password: false,
//     confirm_password: false,
//   });

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       first_name: "",
//       last_name: "",
//       institute_name: "",
//       institute_address: "",
//       state: "",
//       district: "",
//       pincode: "",
//       profile: "",
//       login_method: "google",
//       contact: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: instituteRegisterSchema,
//     validateOnChange: true,
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       try {
//         setSubmitState(true);
//         const res = await axios.post("http://localhost:3100/api/register/institution", values);
//         const status = res?.data?.status;
//         if (res) {
//           setSubmitState(false);
//         }
//         toast.dismiss();
//         switch (status.toLowerCase()) {
//           case "success":
//             toast.success(res?.data?.message || "Registered Successfully");
//             formik.resetForm();
//             setShowModal(false);
//             navigate("/login");
//             break;
//           case "error":
//             toast.error(
//               res?.data?.message || "Error while registering please try again later"
//             );
//             break;
//           case "conflict":
//             toast.warning(res?.data?.message || "Account already exists");
//             navigate("/login");
//             break;
//         }
//       } catch (error) {
//         setSubmitState(false);
//         toast.error(
//           error?.response?.data?.message || "Oops Something Went Wrong"
//         );
//       }
//     },
//   });

//   const handleClose = () => {
//     formik.resetForm();
//     setShowModal(false);
//   };

//   const handleContinue = async () => {
//     setSubmitState(true);
//     const emailUnique = await checkUnique(formik.values.email);
//     if (emailUnique) {
//       formik.setFieldValue("login_method", "jwt");
//       setShowModal(true);
//       setSubmitState(false);
//     } else {
//       toast.error("Account with this email address already exists please login.");
//       setSubmitState(false);
//     }
//   };

//   useEffect(() => {
//     const fetchedStates = State.getStatesOfCountry('IN'); // Fetch states for India
//     setStates(fetchedStates);
//   }, []);

//   const handleStateChange = (event) => {
//     const stateValue = event.target.value;
//     formik.handleChange(event); // Update formik values

//     const selectedState = states.find((state) => state.name === stateValue);

//     if (selectedState) {
//       const fetchedDistricts = City.getCitiesOfState('IN', selectedState.isoCode);
//       setDistricts(fetchedDistricts); // Update districts for selected state
//     } else {
//       setDistricts([]); // Reset districts if no state selected
//     }
//   };

//   const errorText = (field) => {
//     if (formik.touched[field]) {
//       return (
//         <span className="text-capitalize text-danger">
//           {formik.errors[field]}
//         </span>
//       );
//     }
//   };

//   return (
//     <div className="container" style={{ maxWidth: 500 }}>
//       <h3>Start Creating Your School’s Account</h3>
//       <p>
//         Onboard your school with us and begin creating a safe environment for every child.
//       </p>
//       {/* Normal Registration */}
//       <div className="mt-4">
//         <div className="mb-2">
//           <label htmlFor="institute_name" className="form-label fs-6 text-dark">
//             Institute Name
//           </label>
//           <input
//             autoComplete="off"
//             type="text"
//             id="institute_name"
//             name="institute_name"
//             value={formik.values.institute_name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="form-control py-3"
//           />
//           {errorText("institute_name")}
//         </div>
//         <div className="mb-2">
//           <label htmlFor="email" className="form-label fs-6 text-dark">
//             Email Address
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
//           {errorText("email")}
//         </div>
//         <button
//           disabled={
//             !formik.values.email ||
//             !formik.values.institute_name ||
//             submitState
//           }
//           type="submit"
//           className={`btn btn-primary w-100 py-3 mt-2 ${!formik.values.email || !formik.values.institute_name ? "bg-secondary border-secondary" : ""}`}
//           onClick={handleContinue}
//         >
//           Continue
//         </button>
//       </div>
//       <Divider className="my-3" variant="middle">Or</Divider>
//       {/* Google Registration */}
//       <GoogleEmailComponent formik={formik} toggleModal={toggleModal} />
//       {/* Other Details Modal */}
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
//                   autoComplete="off"
//                   type="text"
//                   id="first_name"
//                   name="first_name"
//                   value={formik.values.first_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {errorText("first_name")}
//               </div>
//               <div className="col">
//                 <label htmlFor="last_name" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   autoComplete="off"
//                   type="text"
//                   id="last_name"
//                   name="last_name"
//                   value={formik.values.last_name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 />
//                 {errorText("last_name")}
//               </div>
//             </div>
//             <div className="mb-2">
//               <label htmlFor="contact" className="form-label">
//                 Contact Number
//               </label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 id="contact"
//                 name="contact"
//                 value={formik.values.contact}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("contact")}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="institute_address" className="form-label">
//                 Institute Address
//               </label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 id="institute_address"
//                 name="institute_address"
//                 value={formik.values.institute_address}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("institute_address")}
//             </div>
//             <div className="row row-cols-2 g-2 mb-2">
//               <div className="col">
//                 <label htmlFor="state" className="form-label">
//                   State
//                 </label>
//                 <select
//                   id="state"
//                   name="state"
//                   value={formik.values.state}
//                   onChange={handleStateChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 >
//                   <option value="">Select State</option>
//                   {states.map((state) => (
//                     <option key={state.name} value={state.name}>
//                       {state.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errorText("state")}
//               </div>
//               <div className="col">
//                 <label htmlFor="district" className="form-label">
//                   District
//                 </label>
//                 <select
//                   id="district"
//                   name="district"
//                   value={formik.values.district}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="form-control"
//                 >
//                   <option value="">Select District</option>
//                   {districts.map((district) => (
//                     <option key={district.name} value={district.name}>
//                       {district.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errorText("district")}
//               </div>
//             </div>
//             <div className="mb-2">
//               <label htmlFor="pincode" className="form-label">
//                 Pincode
//               </label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 id="pincode"
//                 name="pincode"
//                 value={formik.values.pincode}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("pincode")}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 autoComplete="off"
//                 type={showPass.password ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("password")}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="confirm_password" className="form-label">
//                 Confirm Password
//               </label>
//               <input
//                 autoComplete="off"
//                 type={showPass.confirm_password ? "text" : "password"}
//                 id="confirm_password"
//                 name="confirm_password"
//                 value={formik.values.confirm_password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="form-control"
//               />
//               {errorText("confirm_password")}
//             </div>
//             <button
//               type="submit"
//               className={`btn btn-primary w-100 py-3 ${submitState ? "bg-secondary border-secondary" : ""}`}
//             >
//               {submitState ? <Spinner animation="border" size="sm" /> : "Register"}
//             </button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import { GoogleEmailComponent } from "../google";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { Divider } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { checkUnique } from "utils";
import * as Yup from "yup";
import { State, City } from "country-state-city";
import axios from "axios";

// Complete validation schema based on your requirements
const instituteRegisterSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email Address is required"),
  title: Yup.string().required("Title is required"),
  first_name: Yup.string().max(100).required("First Name is Required"),
  last_name: Yup.string().max(100).required("Last Name is Required"),
  institute_name: Yup.string().max(200).required("Institute Name is Required"),
    about_institute: Yup.string().max(1000).required("About Institute is Required"), // Fixed validation
  institute_address: Yup.string().max(1000).required("Institute Address is Required"),
  state: Yup.string().max(100).required("State is Required"),
  district: Yup.string().required("District is Required"),
  pincode: Yup.string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required"),

  profile: Yup.string().notRequired(),
  login_method: Yup.string().required(),
});
console.log(instituteRegisterSchema)
export const InstituteRegisterForm = () => {
  const [submitState, setSubmitState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // API Base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3100";

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      email: "",
      // title: "",
      first_name: "",
      last_name: "",
      institute_name: "",
      institute_address: "",
   
about_institute: "",
      state: "",
      district: "",
      pincode: "",
      profile: "",
      login_method: "jwt",
      contact: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: instituteRegisterSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setSubmitState(true);
        
        // Prepare data according to backend expectations
        const registrationData = {
          // title: values.title,
          first_name: values.first_name,
          last_name: values.last_name,
          institute_name: values.institute_name,
          institute_address: values.institute_address,
           about_institute: values.about_institute, 
          state: values.state,
          district: values.district,
          pincode: values.pincode,
          email: values.email,
          contact: values.contact,
          password: values.password,
          login_method: values.login_method,
          profile: values.profile || null,
          confirm_password:values.confirm_password
        };

        const res = await axios.post(`${API_BASE_URL}/api/register/institution`, registrationData, {
         
        });
        
        console.log(res.data);
        const status = res?.data?.status?.toLowerCase();
        
        toast.dismiss();
        
        switch (status) {
          case "success":
            toast.success(res?.data?.message || "Registration initiated successfully");
            setShowModal(false);
            
            // If login method is not Google, show OTP verification
            if (values.login_method !== "google") {
              setShowOtpModal(true);
            } else {
              navigate("/login");
            }
            break;
            
          case "error":
            toast.error(res?.data?.message || "Error while registering please try again later");
            break;
            
          case "conflict":
            toast.warning(res?.data?.message || "Account already exists");
            navigate("/login");
            break;
            
          default:
            toast.error("Unexpected response from server");
        }
      } catch (error) {
        console.error("Registration error:", error);
        
        // Enhanced error handling
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 403:
              toast.error(data?.message || "Access forbidden. Please check your permissions.");
              break;
            case 401:
              toast.error("Unauthorized. Please login again.");
              break;
            case 429:
              toast.error("Too many requests. Please try again later.");
              break;
            case 500:
              toast.error("Server error. Please try again later.");
              break;
            default:
              toast.error(data?.message || "Registration failed. Please try again.");
          }
        } else if (error.request) {
          toast.error("Network error. Please check your connection and try again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitState(false);
      }
    },
  });
console.log("institution registr value",formik);
  // OTP Verification Handler
  const handleOtpVerification = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setOtpLoading(true);
      
      const otpData = {
        email: formik.values.email,
        otp: otp.trim()
      };

      const res = await axios.post(`${API_BASE_URL}/api/register/institute-verification`, otpData);
      const status = res?.data?.status?.toLowerCase();

      toast.dismiss();

      switch (status) {
        case "success":
          toast.success("Account verified successfully!");
          setShowOtpModal(false);
          formik.resetForm();
          setOtp("");
          navigate("/login");
          break;
          
        case "warning":
          toast.warning(res?.data?.message || "Incorrect OTP");
          break;
          
        case "error":
          toast.error(res?.data?.message || "Verification failed");
          break;
          
        default:
          toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      
      const resendData = {
        email: formik.values.email
      };

      const res = await axios.post(`${API_BASE_URL}/api/register/resend-otp`, resendData);
      const status = res?.data?.status?.toLowerCase();

      toast.dismiss();

      if (status === "success") {
        toast.success("OTP sent successfully to your email");
      } else {
        toast.error(res?.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setShowModal(false);
    setShowOtpModal(false);
    setOtp("");
  };

  const handleContinue = async () => {
    // Validate email and institute name before proceeding
    try {
      await Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email Address is required"),
        institute_name: Yup.string().max(200).required("Institute Name is Required"),
      }).validate({
        email: formik.values.email,
        institute_name: formik.values.institute_name
      });
    } catch (validationError) {
      toast.error(validationError.message);
      return;
    }

    setSubmitState(true);
    
    try {
      const emailUnique = await checkUnique(formik.values.email);
      if (emailUnique) {
        formik.setFieldValue("login_method", "jwt");
        setShowModal(true);
      } else {
        toast.error("Account with this email address already exists. Please login.");
      }
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      toast.error("Error checking email availability");
    } finally {
      setSubmitState(false);
    }
  };

  useEffect(() => {
    const fetchedStates = State.getStatesOfCountry('IN');
    setStates(fetchedStates);
  }, []);

  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    formik.handleChange(event);

    const selectedState = states.find((state) => state.name === stateValue);

    if (selectedState) {
      const fetchedDistricts = City.getCitiesOfState('IN', selectedState.isoCode);
      setDistricts(fetchedDistricts);
    } else {
      setDistricts([]);
    }
  };

  const errorText = (field) => {
    if (formik.touched[field] && formik.errors[field]) {
      return (
        <span className="text-capitalize text-danger">
          {formik.errors[field]}
        </span>
      );
    }
  };

  return (
    <>
      <div className="container" style={{ maxWidth: 700 }}>
        <h3>Start Creating Your School's Account</h3>
        <p>
          Onboard your school with us and begin creating a safe environment for every child.
        </p>
        
        {/* Normal Registration */}
        <div className="mt-4">
          <div className="mb-2">
            <label htmlFor="institute_name" className="form-label fs-6 text-dark">
              Institute Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="institute_name"
              name="institute_name"
              value={formik.values.institute_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control py-3 ${formik.touched.institute_name && formik.errors.institute_name ? 'is-invalid' : ''}`}
            />
            {errorText("institute_name")}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label fs-6 text-dark">
              Email Address
            </label>
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control py-3 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            />
            {errorText("email")}
          </div>
          <button
            disabled={
              !formik.values.email ||
              !formik.values.institute_name ||
              submitState ||
              (formik.touched.email && formik.errors.email) ||
              (formik.touched.institute_name && formik.errors.institute_name)
            }
            type="button"
            className={`btn btn-primary w-100 py-3 mt-2 ${(!formik.values.email || !formik.values.institute_name || (formik.touched.email && formik.errors.email) || (formik.touched.institute_name && formik.errors.institute_name)) ? "bg-secondary border-secondary" : ""}`}
            onClick={handleContinue}
          >
            {submitState ? <Spinner animation="border" size="sm" /> : "Continue"}
          </button>
        </div>
        
        <Divider className="my-3" variant="middle">Or</Divider>
        
        {/* Google Registration */}
        <GoogleEmailComponent formik={formik} toggleModal={toggleModal} />
        
        {/* Other Details Modal */}
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">
              Start creating your account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2 w-full">
                <label htmlFor="title" className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <select
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
                {errorText("title")}
              </div>
              
              <div className="row row-cols-2 g-2 mb-2">
                <div className="col">
                  <label htmlFor="first_name" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.first_name && formik.errors.first_name ? 'is-invalid' : ''}`}
                  />
                  {errorText("first_name")}
                </div>
                <div className="col">
                  <label htmlFor="last_name" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.last_name && formik.errors.last_name ? 'is-invalid' : ''}`}
                  />
                  {errorText("last_name")}
                </div>
              </div>
              
              <div className="mb-2">
                <label htmlFor="contact" className="form-label">
                  Contact Number <span className="text-danger">*</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.contact && formik.errors.contact ? 'is-invalid' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                />
                {errorText("contact")}
              </div>
              
              <div className="mb-2">
                <label htmlFor="institute_address" className="form-label">
                  Institute Address <span className="text-danger">*</span>
                </label>
                <textarea
                  id="institute_address"
                  name="institute_address"
                  value={formik.values.institute_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.institute_address && formik.errors.institute_address ? 'is-invalid' : ''}`}
                  rows="3"
                />
                {errorText("institute_address")}
              </div>

                  
            <div className="mb-2">
                <label htmlFor="about_institute" className="form-label">
                  About Institute <span className="text-danger">*</span>
                </label>
                <textarea
                  id="about_institute"
                  name="about_institute"
                  value={formik.values.about_institute}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.about_institute && formik.errors.about_institute ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder="Tell us about your institute..."
                />
                {errorText("about_institute")}
              </div>
              
              <div className="row row-cols-2 g-2 mb-2">
                <div className="col">
                  <label htmlFor="state" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={handleStateChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.state && formik.errors.state ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errorText("state")}
                </div>
                <div className="col">
                  <label htmlFor="district" className="form-label">
                    District <span className="text-danger">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.district && formik.errors.district ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errorText("district")}
                </div>
              </div>
              
              <div className="mb-2">
                <label htmlFor="pincode" className="form-label">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.pincode && formik.errors.pincode ? 'is-invalid' : ''}`}
                  placeholder="Enter 6-digit pincode"
                />
                {errorText("pincode")}
              </div>
              
              {/* Password Field */}
              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    style={{ paddingRight: '2.5rem' }}
                    placeholder="Minimum 10 characters with special characters"
                  />
                  <span
                    onClick={togglePassword}
                    className="position-absolute"
                    style={{
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#6c757d'
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errorText("password")}
                {formik.touched.password && !formik.errors.password && formik.values.password && (
                  <small className="text-success">
                    ✓ Password meets requirements
                  </small>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-2">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    autoComplete="off"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <span
                    onClick={toggleConfirmPassword}
                    className="position-absolute"
                    style={{
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#6c757d'
                    }}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errorText("confirm_password")}
                {formik.touched.confirm_password && !formik.errors.confirm_password && formik.values.confirm_password && (
                  <small className="text-success">
                    ✓ Passwords match
                  </small>
                )}
              </div>
              
              <button
                type="submit"
                disabled={submitState || !formik.isValid}
                className={`btn btn-primary w-100 py-3 ${(submitState || !formik.isValid) ? "bg-secondary border-secondary" : ""}`}
              >
                {submitState ? <Spinner animation="border" size="sm" /> : "Register"}
              </button>
            </form>
          </Modal.Body>
        </Modal>

        {/* OTP Verification Modal */}
        <Modal show={showOtpModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">
              Verify Your Email
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-3">
              <p>We've sent a verification code to:</p>
              <strong>{formik.values.email}</strong>
            </div>
            
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
                placeholder="Enter 4-digit OTP"
                maxLength="4"
              />
            </div>
            
            <button
              onClick={handleOtpVerification}
              disabled={otpLoading || !otp.trim()}
              className="btn btn-primary w-100 mb-2"
            >
              {otpLoading ? <Spinner animation="border" size="sm" /> : "Verify OTP"}
            </button>
            
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="btn btn-outline-secondary w-100"
            >
              {resendLoading ? <Spinner animation="border" size="sm" /> : "Resend OTP"}
            </button>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer/>
    </>
  );
};