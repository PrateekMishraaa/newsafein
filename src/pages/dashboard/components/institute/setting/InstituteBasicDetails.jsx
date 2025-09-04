import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import useError from "hooks/useError";
import {jwtDecode} from "jwt-decode"
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import * as Yup from "yup";
import { InputAdornment } from "@mui/material";
import useCurrentLocation from "hooks/useCurrentLocation";
import InstituteProfilePic from "./InstituteProfilePic";

const additionalDetailsSchema = new Yup.object().shape({
  title: Yup.string().max(10).required("Title is Required"),
  first_name: Yup.string().max(100).required("First Name is Required"),
  last_name: Yup.string().max(100).required("Last Name is Required"),
  email: Yup.string().email().required("Email is required"),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  fb: Yup.string()
    .matches(
      /(?:www.facebook.com|www.fb.com|facebook.com|fb.com)/,
      "facebook profile url must match www.facebook.com"
    )
    .notRequired(),
  twitter: Yup.string()
    .matches(
      /(?:twitter.com|www.twitter.com)/,
      "twitter profile url must match www.twitter.com"
    )
    .notRequired(),
  insta: Yup.string()
    .matches(
      /(?:instagram.com|www.instagram.com)/,
      "Instagram profile url must match www.instagram.com"
    )
    .notRequired(),
  lkd: Yup.string()
    .matches(
      /(?:linkedin.com|www.linkedin.com)/,
      "Linkedin profile url must match www.linkedin.com"
    )
    .notRequired(),
  ytb: Yup.string()
    .matches(
      /(?:youtube.com|www.youtube.com)/,
      "Youtube profile url must match www.youtube.com"
    )
    .notRequired(),
  institution_name: Yup.string().required("Institution name is required"),
  bio: Yup.string()
    .max(350, "Too long! ( max 350 characters )")
    .required("Bio is required"),
  institution_address: Yup.string().required("Institution Address is required"),
  state: Yup.string().max(200).required("State is required"),
  pincode: Yup.string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});

const InstituteBasicDetails = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details, fetchDetails] = useOutletContext();
  const tokendata = localStorage.getItem('token',token)
  const [decodedToken, setDecodedToken] = useState(null);

  // JWT Token decode with proper error handling
  useEffect(() => {
    const tokendata = localStorage.getItem('token') || token;
    
    if (tokendata) {
      try {
        const decoded = jwtDecode(tokendata);
        console.log("Decoded token details:", decoded);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem('token');
      }
    }
  }, [token]);


  

  // Bsic Formik
 const basicFormik = useFormik({
    initialValues: {
      title: details?.title || "Mr.",
      first_name: details?.first_name || decodedToken?.data?.first_name || "",
      middle_name: details?.middle_name || "",
      last_name: details?.last_name || decodedToken?.data?.last_name || "",
       contact: details?.contact || decodedToken?.data?.contact || "",
      email: details?.email || decodedToken?.data?.email || "",
      fb: details?.fb || "",
      twitter: details?.twitter || "",
      insta: details?.insta || "",
      lkd: details?.lkd || "",
      ytb: details?.ytb || "",
      institution_name: details?.institution_name || decodedToken?.data?.institution_name || "",
     bio: details?.bio || decodedToken?.data?.about_institute || "",
      institution_address: details?.institution_address || decodedToken?.data?.institution_address || "",
      state: details?.state || "",
      district: details?.district || "",
      pincode: details?.pincode || "",
    },
    enableReinitialize: true,
    validationSchema: additionalDetailsSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, "====>>>val");
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const newBio = values.bio.replaceAll("'", "'");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("first_name", values.first_name);
      formData.append("middle_name", values.middle_name);
      formData.append("last_name", values.last_name);
      formData.append("contact", values.contact);
      formData.append("fb", values.fb);
      formData.append("twitter", values.twitter);
      formData.append("insta", values.insta);
      formData.append("lkd", values.lkd);
      formData.append("ytb", values.ytb);
      formData.append("institution_name", values.institution_name);
      formData.append("bio", newBio);
      formData.append("institution_address", values.institution_address);
      formData.append("state", values.state);
      formData.append("district", values.district);
      formData.append("pincode", values.pincode);
      
      const currentToken = localStorage.getItem('token') || token;
      if (currentToken) {
        try {
          const res = await apiAuth.put(
            `/institute/profile?update_type=basic`,
            formData,
            {
              headers: {
                Authorization: currentToken,
              },
            }
          );
          if (res.status === 200) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              width: 400,
            });
            resetForm();
            fetchDetails();
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
    },
  });



  
  useEffect(() => {
    if (decodedToken?.data) {
      // Update form values with token data if details are not available
      if (!details?.first_name && decodedToken.data.first_name) {
        basicFormik.setFieldValue("first_name", decodedToken.data.first_name);
      }
      if (!details?.last_name && decodedToken.data.last_name) {
        basicFormik.setFieldValue("last_name", decodedToken.data.last_name);
      }
      if (!details?.contact && decodedToken.data.contact) {
      basicFormik.setFieldValue("contact", decodedToken.data.contact);
    }
      if (!details?.email && decodedToken.data.email) {
        basicFormik.setFieldValue("email", decodedToken.data.email);
      }
      if (!details?.institution_name && decodedToken.data.institution_name) {
        basicFormik.setFieldValue("institution_name", decodedToken.data.institution_name);
      }
      if (!details?.institution_address && decodedToken.data.institution_address) {
        basicFormik.setFieldValue("institution_address", decodedToken.data.institution_address);
      }
    }
  }, [decodedToken, details]);

  const [districts, setDistricts] = useState([]);

  const { states } = useCurrentLocation();

  const handleStateIndexChange = async (stateValue) => {
    if (stateValue?.length && states?.length) {
      let index = await states?.findIndex(
        (state) => state?.state?.toLowerCase() === stateValue.toLowerCase()
      );
      setDistricts(states[index]?.District);

      return index;
    }
  };
  useEffect(() => {
    handleStateIndexChange(basicFormik?.values?.state);
  }, [basicFormik?.values?.state, states]);

  useEffect(() => {
    if (details?.title) {
      basicFormik.setFieldValue("title", details?.title);
    }
  }, [details]);
  return (
    <>
      {/* <SimpleBreadCrumb page={"Edit Profile"} /> */}
      {/* <div className="py-4 container" style={{ maxWidth: 700 }}> */}
      <InstituteProfilePic />
      <form onSubmit={basicFormik.handleSubmit}>
        <div className="row row-cols-1 row-cols-lg-2 g-2 gy-4">
          <div className="col">
            <h6>Full Name</h6>
          </div>
          <div className="col">
            <div className="row cols-1 row-cols-lg-2 g-2">
              <div className="col-12 col-lg-2">
                <select
                  id="title"
                  name="title"
                  className="form-select h-100 py-3"
                  label="Title"
                  value={basicFormik.values.title}
                  onChange={basicFormik.handleChange}
                  required
                >
                  <option value={"Mr."}>Mr.</option>
                  <option value={"Ms."}>Ms.</option>
                  <option value={"Miss"}>Miss</option>
                </select>
              </div>
              <div className="col-12 col-lg-5">
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={basicFormik.values.first_name}
                  // onChange={basicFormik.handleChange}
                  disabled
                  error={
                    basicFormik.touched.first_name &&
                    Boolean(basicFormik.errors.first_name)
                  }
                  required
                  helperText={
                    basicFormik.touched.first_name &&
                    basicFormik.errors.first_name
                  }
                />
              </div>
              <div className="col-12 col-lg-5">
                <TextField
                  fullWidth
                  required
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={basicFormik.values.last_name}
                  disabled
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.last_name &&
                    Boolean(basicFormik.errors.last_name)
                  }
                  helperText={
                    basicFormik.touched.last_name &&
                    basicFormik.errors.last_name
                  }
                />
              </div>
            </div>
          </div>
          {/* Contact  */}
          <div className="col">
            <h6>Contact Number</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              required
              id="contact"
              name="contact"
              label="Contact"
              size="large"
              InputLabelProps={{ shrink: true }}
              value={basicFormik.values.contact}
              onChange={basicFormik.handleChange}
              error={
                basicFormik.touched.contact &&
                Boolean(basicFormik.errors.contact)
              }
              helperText={
                basicFormik.touched.contact && basicFormik.errors.contact
              }
            />
          </div>
          {/* Email  */}
          <div className="col">
            <h6>Email</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              size="large"
              InputLabelProps={{ shrink: true }}
              value={basicFormik.values.email}
              onChange={basicFormik.handleChange}
              error={
                basicFormik.touched.email && Boolean(basicFormik.errors.email)
              }
              disabled={true}
              helperText={basicFormik.touched.email && basicFormik.errors.email}
            />
          </div>
          {/* About  */}
          <div className="col">
            <h6>About</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              size="large"
              InputLabelProps={{ shrink: true }}
             value={basicFormik.values.bio}
             disabled
              onChange={basicFormik.handleChange}
              error={basicFormik.touched.bio && Boolean(basicFormik.errors.bio)}
              helperText={basicFormik.touched.bio && basicFormik.errors.bio}
            />
            {basicFormik?.values?.bio?.length} Characters ({" "}
            {350 - basicFormik?.values?.bio?.length} left)
          </div>
          {/* School name  */}
          <div className="col">
            <h6>School Name</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="institution_name"
              name="institution_name"
              label="School Name"
              multiline
              rows={3}
              size="large"
              InputLabelProps={{ shrink: true }}
              value={basicFormik.values.institution_name}
              disabled
              onChange={basicFormik.handleChange}
              error={
                basicFormik.touched.institution_name &&
                Boolean(basicFormik.errors.institution_name)
              }
              helperText={
                basicFormik.touched.institution_name &&
                basicFormik.errors.institution_name
              }
            />
          </div>
          {/* School Address  */}
          <div className="col">
            <h6>School Address</h6>
          </div>
          <div className="col">
            <div className="row g-2">
              <div className="col-12">
                <TextField
                  fullWidth
                  id="institution_address"
                  name="institution_address"
                  label="School Address"
                  multiline
                  rows={3}
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={basicFormik.values.institution_address}
                  disabled
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.institution_address &&
                    Boolean(basicFormik.errors.institution_address)
                  }
                  helperText={
                    basicFormik.touched.institution_address &&
                    basicFormik.errors.institution_address
                  }
                />
              </div>
              <div className="col-12 col-lg-6">
                <FormControl fullWidth>
                  <label>
                    Select State <b className="text-danger">*</b>
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="form-select py-3"
                    onChange={basicFormik?.handleChange}
                    value={basicFormik?.values?.state}
                  >
                    {states?.map((state, i) => {
                      return (
                        <option key={i} value={state?.state}>
                          {state?.state}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <FormHelperText className="text-danger">
                  {basicFormik?.touched?.state && basicFormik?.errors?.state}
                </FormHelperText>
              </div>
              <div className="col-12 col-lg-6">
                <FormControl fullWidth>
                  <label>
                    Select District <b className="text-danger">*</b>
                  </label>
                  <select
                    id="district"
                    name="district"
                    className="form-select py-3"
                    value={basicFormik?.values?.district}
                    onChange={basicFormik?.handleChange}
                  >
                    {districts?.map((district, i) => {
                      return (
                        <option key={i} value={district?.district}>
                          {district?.district}
                        </option>
                      );
                    })}
                  </select>
                  <FormHelperText className="text-danger">
                    {basicFormik?.touched.district &&
                      basicFormik?.errors.district}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <span>
                  Pincode <b className="text-danger">*</b>
                </span>
                <TextField
                  id="pincode"
                  name="pincode"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={basicFormik?.values?.pincode}
                  onChange={basicFormik?.handleChange}
                  error={
                    basicFormik?.errors?.pincode &&
                    basicFormik?.touched?.pincode
                  }
                  type="number"
                  helperText={
                    basicFormik?.touched?.pincode &&
                    basicFormik?.errors?.pincode
                  }
                />
              </div>
            </div>
          </div>
          {/* Social Link */}
          <div className="col">
            <h5>Social Links</h5>
          </div>
          <div className="col">
            <div className="row row-cols-1 row-cols-lg-2 g-3">
              <div className="col">
                <TextField
                  fullWidth
                  id="fb"
                  name="fb"
                  label="Facebook"
                  size="large"
                  type={"url"}
                  value={basicFormik.values.fb}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.fb && Boolean(basicFormik.errors.fb)
                  }
                  helperText={basicFormik.touched.fb && basicFormik.errors.fb}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook sx={{ color: "blue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  type={"url"}
                  size="large"
                  value={basicFormik.values.twitter}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.twitter &&
                    Boolean(basicFormik.errors.twitter)
                  }
                  helperText={
                    basicFormik.touched.twitter && basicFormik.errors.twitter
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter sx={{ color: "skyblue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="insta"
                  name="insta"
                  label="Instagram"
                  type={"url"}
                  size="large"
                  value={basicFormik.values.insta}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.insta &&
                    Boolean(basicFormik.errors.insta)
                  }
                  helperText={
                    basicFormik.touched.insta && basicFormik.errors.insta
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram sx={{ color: "red" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="lkd"
                  name="lkd"
                  label="LinkedIn"
                  type={"url"}
                  size="large"
                  value={basicFormik.values.lkd}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.lkd && Boolean(basicFormik.errors.lkd)
                  }
                  helperText={basicFormik.touched.lkd && basicFormik.errors.lkd}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn sx={{ color: "blue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="ytb"
                  name="ytb"
                  label="Youtube"
                  type={"url"}
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={basicFormik.values.ytb}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.ytb && Boolean(basicFormik.errors.ytb)
                  }
                  helperText={basicFormik.touched.ytb && basicFormik.errors.ytb}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTube sx={{ color: "red" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          {/* <div className="col-12 col-lg-6">
            <Button
              color="success"
              variant="contained"
              className="rounded"
              size="large"
              type="submit" // Make sure type is set to "submit"
            >
              Submit
            </Button>
          </div> */}
        </div>
      </form>
      {/* </div> */}
      {/* <div className="mt-5">
        <InstituteAdditionalDetails />
      </div> */}
    </>
  );
};

export default InstituteBasicDetails;



// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import { apiAuth } from "api";
// import { useGlobalContext } from "global/context";
// import { FormHelperText } from "@mui/material";
// import Swal from "sweetalert2";
// import { useOutletContext } from "react-router-dom";
// import useError from "hooks/useError";
// import {jwtDecode} from "jwt-decode"; // ✅ FIXED
// import {
//   Facebook,
//   Instagram,
//   LinkedIn,
//   Twitter,
//   YouTube,
// } from "@mui/icons-material";
// import * as Yup from "yup";
// import { InputAdornment } from "@mui/material";
// import useCurrentLocation from "hooks/useCurrentLocation";
// import InstituteProfilePic from "./InstituteProfilePic";

// // ✅ Validation Schema
// const additionalDetailsSchema = Yup.object().shape({
//   title: Yup.string().max(10).required("Title is Required"),
//   first_name: Yup.string().max(100).required("First Name is Required"),
//   last_name: Yup.string().max(100).required("Last Name is Required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   contact: Yup.string()
//     .required("Phone Number is Required")
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
//   fb: Yup.string()
//     .matches(/^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/, "Invalid Facebook URL")
//     .notRequired(),
//   twitter: Yup.string()
//     .matches(/^https?:\/\/(www\.)?twitter\.com\/.+/, "Invalid Twitter URL")
//     .notRequired(),
//   insta: Yup.string()
//     .matches(/^https?:\/\/(www\.)?instagram\.com\/.+/, "Invalid Instagram URL")
//     .notRequired(),
//   lkd: Yup.string()
//     .matches(/^https?:\/\/(www\.)?linkedin\.com\/.+/, "Invalid LinkedIn URL")
//     .notRequired(),
//   ytb: Yup.string()
//     .matches(/^https?:\/\/(www\.)?youtube\.com\/.+/, "Invalid YouTube URL")
//     .notRequired(),
//   institution_name: Yup.string().max(200).required("Institution name is required"),
//   bio: Yup.string()
//     .max(350, "Bio must be 350 characters or less")
//     .required("Bio is required"),
//   institution_address: Yup.string().max(1000).required("Institution Address is required"),
//   state: Yup.string().max(200).required("State is required"),
//   district: Yup.string().max(1000).required("District is required"),
//   pincode: Yup.string()
//     .required("Pincode is Required")
//     .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
// });

// const InstituteBasicDetails = () => {
//   const { ErrorResponder } = useError();
//   const { token } = useGlobalContext();
//   const [details, fetchDetails] = useOutletContext();
//   const [districts, setDistricts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [decodedToken, setDecodedToken] = useState(null); // ✅ Store decoded token
//   const { states } = useCurrentLocation();

//   // ✅ Get token from context or localStorage
//   const getToken = () => {
//     return token || localStorage.getItem("token");
//   };

//   // ✅ Decode token once
//   // useEffect(() => {
//   //   const tokenValue = getToken();
//   //   if (tokenValue) {
//   //     try {
//   //       const decoded = jwtDecode(tokenValue);
//   //       setDecodedToken(decoded);
//   //     } catch (error) {
//   //       console.error("Error decoding token:", error);
//   //     }
//   //   }
//   // }, [token]);

//   const basicFormik = useFormik({
//     initialValues: {
//       title: details?.title || "Mr.",
//       first_name: details?.first_name || "",
//       middle_name: details?.middle_name || "",
//       last_name: details?.last_name || "",
//       contact: details?.contact || "",
//       email: details?.email || "",
//       fb: details?.fb || "",
//       twitter: details?.twitter || "",
//       insta: details?.insta || "",
//       lkd: details?.lkd || "",
//       ytb: details?.ytb || "",
//       institution_name: details?.institution_name || "",
//       bio: details?.bio || "",
//       institution_address: details?.institution_address || "",
//       state: details?.state || "",
//       district: details?.district || "",
//       pincode: details?.pincode || "",
//     },
//     enableReinitialize: true,
//     validationSchema: additionalDetailsSchema,
//     onSubmit: async (values) => {
//       setIsLoading(true);
//       Swal.fire({
//         width: 300,
//         title: "Updating...",
//         didOpen: () => Swal.showLoading(),
//         allowOutsideClick: false,
//       });

//       try {
//         const formData = new FormData();
//         Object.keys(values).forEach((key) => {
//           formData.append(key, values[key] || "");
//         });

//         const currentToken = getToken();
//         if (!currentToken) throw new Error("Authentication token not found");

//         const res = await apiAuth.put(
//           `/institute/profile?update_type=basic`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${currentToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (res.status === 200) {
//           Swal.fire({
//             title: res.data.message || "Profile updated successfully!",
//             icon: "success",
//             width: 400,
//           });
//           fetchDetails && fetchDetails();
//         }
//       } catch (error) {
//         console.error("Update error:", error);
//         ErrorResponder(error);
//         Swal.fire({
//           title: "Update Failed",
//           text: error?.response?.data?.message || "Something went wrong",
//           icon: "error",
//           width: 400,
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   // ✅ State and District handling
//   const handleStateIndexChange = async (stateValue) => {
//     if (stateValue && states?.length) {
//       const stateIndex = states.findIndex(
//         (state) => state?.state?.toLowerCase() === stateValue.toLowerCase()
//       );
//       if (stateIndex !== -1 && states[stateIndex]?.District) {
//         setDistricts(states[stateIndex].District);
//       } else {
//         setDistricts([]);
//       }
//       return stateIndex;
//     }
//     setDistricts([]);
//   };

//   const handleStateChange = (event) => {
//     basicFormik.handleChange(event);
//     basicFormik.setFieldValue("district", "");
//   };

//   useEffect(() => {
//     handleStateIndexChange(basicFormik?.values?.state);
//   }, [basicFormik?.values?.state, states]);

//   return (
//     <>
//       <InstituteProfilePic />
//       <form onSubmit={basicFormik.handleSubmit}>
//         <div className="row row-cols-1 row-cols-lg-2 g-2 gy-4">
          
//           {/* ✅ Display Decoded Token */}
//           <div className="col">
//             <h6>Decoded Token</h6>
//           </div>
//           <div className="col">
//             <TextField
//               fullWidth
//               value={decodedToken ? JSON.stringify(decodedToken) : "No Token Found"}
//               label="Decoded Token"
//               InputLabelProps={{ shrink: true }}
//               multiline
//               rows={3}
//               disabled
//             />
//           </div>

//           {/* Rest of your form fields here */}
//           {/* ... */}
          
//           <div className="col-12 col-lg-6">
//             <Button
//               color="success"
//               variant="contained"
//               className="rounded"
//               size="large"
//               type="submit"
//               disabled={isLoading || !basicFormik.isValid}
//             >
//               {isLoading ? "Updating..." : "Update Profile"}
//             </Button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default InstituteBasicDetails;
