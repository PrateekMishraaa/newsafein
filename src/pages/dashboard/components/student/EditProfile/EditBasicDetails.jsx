import { api, apiJsonAuth } from "api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import { toast } from "react-toastify";
import { FormHelperText, InputAdornment } from "@mui/material";
import moment from "moment";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import EditProfilePic from "./EditProfilePic";

const validationSchema = yup.object().shape({
  first_name: yup.string().max(100).required("First Name is Required"),
  last_name: yup.string().max(100).required("Last Name is Required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("Pin code is Required"),
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
  pincode: yup
    .string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});
const EditBasicDetails = () => {

  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  // const tokendata = localStorage.getItem('token')
  // console.log(tokendata)
  const { fullDetails } = useOutletContext();
  const [states, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tokendata,setTokenData] = useState([]);
  //  console.log(tokendata)

  const basicFormik = useFormik({
    initialValues: {
      first_name: fullDetails?.first_name,
      last_name: fullDetails?.last_name,
      contact: fullDetails?.contact,
      email: fullDetails?.email,
      dob: fullDetails?.dob?.slice(0, 10),
      father_name: fullDetails?.father_name,
      gender: fullDetails?.gender,
      fb: fullDetails?.fb,
      twitter: fullDetails?.twitter,
      insta: fullDetails?.insta,
      lkd: fullDetails?.lkd,
      ytb: fullDetails?.ytb,
      bio: fullDetails?.bio,
      address: fullDetails?.address,
      state: fullDetails?.state || "",
      district: fullDetails?.district,
      pincode: fullDetails?.pincode,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      toast.loading("Loading....");
      if (token) {
        try {
          const res = await apiJsonAuth.put(`/student/profile`, values, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            toast.dismiss();
            toast.success(res.data.message);
          }
        } catch (error) {
          if (error) {
            Swal.fire({
              width: 400,
              title: error.response.data.message
                ? error.response.data.message
                : "Something Went Wrong Check  your Network Connection",
              icon: "error",
            });
          }
          ErrorResponder(error);
        }
      }
    },
  });


 useEffect(() => {
    const tokendata = localStorage.getItem("token");
    if (tokendata) {
      const decoded = jwtDecode(tokendata);
      console.log("Decoded Token:", decoded.data);
      setTokenData(decoded.data)
    }
  }, []);

  const fetchState = async () => {
    try {
      const response = await api.get("/v2/public/state");
      if (response.status === 200) {
        setState(response?.data?.states);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const fetchDistrict = async (state) => {
    try {
      const response = await api.get(`/v2/public/district?state=${state}`);
      if (response?.data?.status === "success") {
        setDistricts(response?.data?.district);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    let state = basicFormik?.values?.state || "";
    fetchDistrict(state);
  }, [basicFormik?.values?.state]);
  return (
    <>
      <EditProfilePic />
      <form onSubmit={basicFormik.handleSubmit}>
        <div className="row row-cols-1 row-cols-lg-2 g-2 gy-4">
          {/* Full Name  */}
          <div className="col">
            <h6>Full Name</h6>
          </div>
          <div className="col">
            <div className="row row cols-1 row-cols-lg-2 g-2">
              <div className="col">
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  size="large"
                  disabled
                  value={tokendata.first_name}
                  InputLabelProps={{ shrink: true }}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.first_name &&
                    Boolean(basicFormik.errors.first_name)
                  }
                  helperText={
                    basicFormik.touched.first_name &&
                    basicFormik.errors.first_name
                  }
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  size="large"
                  value={tokendata.last_name}
                  disabled
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
              id="contact"
              name="contact"
              label="Contact"
              size="large"
              value={tokendata.contact || "null"}
              onChange={basicFormik.handleChange}
              disabled
              InputLabelProps={{ shrink: true }}
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
            <h6>Email Address</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              size="large"
              value={tokendata.email}
              onChange={basicFormik.handleChange}
              InputLabelProps={{ shrink: true }}
              disabled={true}
              error={
                basicFormik.touched.email && Boolean(basicFormik.errors.email)
              }
              helperText={basicFormik.touched.email && basicFormik.errors.email}
            />
          </div>


           <div className="col">
            <h6>Role</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="Role"
              name="Role"
              label="Role"
              size="large"
              value={tokendata.role}
              onChange={basicFormik.handleChange}
              InputLabelProps={{ shrink: true }}
              disabled={true}
              error={
                basicFormik.touched.email && Boolean(basicFormik.errors.email)
              }
              helperText={basicFormik.touched.email && basicFormik.errors.email}
            />
          </div>
          {/* Date Of Birth */}
          <div className="col">
            <h6>Date Of Birth</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="dob"
              name="dob"
              type="date"
              inputProps={{
                max: moment().format("YYYY-MM-DD"),
              }}
              label="Date of Birth"
              size="large"
              value={basicFormik.values.dob}
              onChange={basicFormik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={basicFormik.touched.dob && Boolean(basicFormik.errors.dob)}
              helperText={basicFormik.touched.dob && basicFormik.errors.dob}
            />
          </div>
          {/* Guardian Name */}
          <div className="col">
            <h6>Guardian Name</h6>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="father_name"
              name="father_name"
              label="Guardian Name"
              size="large"
              value={basicFormik.values.father_name}
              onChange={basicFormik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={
                basicFormik.touched.father_name &&
                Boolean(basicFormik.errors.father_name)
              }
              helperText={
                basicFormik.touched.father_name &&
                basicFormik.errors.father_name
              }
            />
          </div>
          {/* Gender */}
          <div className="col">
            <h6>Gender</h6>
          </div>
          <div className="col">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={basicFormik.values.gender}
                id="gender"
                name="gender"
                onChange={basicFormik.handleChange}
                InputLabelProps={{ shrink: true }}
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  checked={basicFormik.values.gender === "female"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={basicFormik.values.gender === "male"}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  checked={basicFormik.values.gender === "other"}
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* Social Links  */}
          <div className="col">
            <h6>Social Media Links</h6>
          </div>
          <div className="col">
            <div className="row row-cols-1 row-cols-lg-2 g-2">
              <div className="col">
                <TextField
                  fullWidth
                  id="fb"
                  name="fb"
                  label="Facebook"
                  size="large"
                  type="url"
                  value={basicFormik?.values?.fb}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
                  size="large"
                  type="url"
                  value={basicFormik?.values?.twitter}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
                  size="large"
                  type="url"
                  value={basicFormik?.values?.insta}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
                  size="large"
                  type="url"
                  value={basicFormik?.values?.lkd}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
                  size="large"
                  type="url"
                  value={basicFormik?.values?.ytb}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
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
          {/* About */}
          <div className="col">
            <h6>About</h6>
            <p>
              {basicFormik?.values?.bio?.length} Characters ({" "}
              {350 - basicFormik?.values?.bio?.length} left)
            </p>
          </div>
          <div className="col">
            <TextField
              fullWidth
              id="bio"
              name="bio"
              multiline
              rows={4}
              size="large"
              value={basicFormik?.values?.bio}
              onChange={basicFormik.handleChange}
              error={basicFormik.touched.bio && Boolean(basicFormik.errors.bio)}
              helperText={basicFormik.touched.bio && basicFormik.errors.bio}
            />
          </div>
          {/* Address  */}
          <div className="col">
            <h6>Address</h6>
          </div>
          <div className="col">
            <div className="row g-2">
              <div className="col-12">
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  size="large"
                  value={basicFormik?.values?.address}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={
                    basicFormik.touched.address &&
                    Boolean(basicFormik.errors.address)
                  }
                  helperText={
                    basicFormik.touched.address && basicFormik.errors.address
                  }
                />
              </div>
              <div className="col-12 col-lg-6">
                <FormControl fullWidth>
                  <span id="state-label">State</span>
                  <select
                    labelId="state-label"
                    id="state"
                    name="state"
                    value={basicFormik?.values?.state}
                    onChange={basicFormik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    className={
                      basicFormik?.errors.state &&
                      Boolean(basicFormik?.touched.state)
                        ? "border-danger form-select py-3"
                        : " form-select py-3"
                    }
                  >
                    {states?.map((state, stateIndex) => {
                      return (
                        <option key={stateIndex} value={state?.State}>
                          {state?.State}
                        </option>
                      );
                    })}
                  </select>
                  <FormHelperText className="text-danger">
                    {basicFormik.touched?.state && basicFormik.errors?.state}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <FormControl fullWidth>
                  <span id="district-label">District</span>
                  <select
                    labelId="district-label"
                    id="district"
                    name="district"
                    value={basicFormik.values?.district}
                    onChange={basicFormik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    className={
                      basicFormik?.errors.district &&
                      Boolean(basicFormik?.touched.district)
                        ? "border-danger form-select py-3"
                        : " form-select py-3"
                    }
                  >
                    {Boolean(districts.length) ? (
                      districts?.map((item, districtIndex) => {
                        return (
                          <option key={districtIndex} value={item?.District}>
                            {item?.District}
                          </option>
                        );
                      })
                    ) : (
                      <option value={basicFormik.values?.state}>
                        {basicFormik.values?.state}
                      </option>
                    )}
                  </select>
                  <FormHelperText className="text-danger">
                    {basicFormik.touched?.district &&
                      basicFormik.errors?.district}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  fullWidth
                  id="pincode"
                  name="pincode"
                  label="Pin Code"
                  size="large"
                  value={basicFormik.values.pincode}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={
                    basicFormik.touched.pincode &&
                    Boolean(basicFormik.errors.pincode)
                  }
                  helperText={
                    basicFormik.touched.pincode && basicFormik.errors.pincode
                  }
                />
              </div>
            </div>
          </div>
          {/* <div className="col">
            <Button
              color="success"
              disabled={basicFormik?.isSubmitting}
              variant="contained"
              className="rounded"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default EditBasicDetails;
