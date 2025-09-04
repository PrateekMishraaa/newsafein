import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { textLimit } from "utils";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

import { useFormik } from "formik";

import { api, apiJson, apiJsonAuth } from "api";
import useError from "hooks/useError";
import { editStudentSchema } from "schema";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "global/context";

const EditStudentData = () => {
  const [instituteList, setInstituteList] = useState([]);
  const { ErrorResponder } = useError();
  const [states, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [fullDetails, setFullDetailes] = useState({});
  const { token } = useGlobalContext();
  const { id, role } = useParams();
  const roles = ["student", "teacher", "parent", "coordinator"];
  const userStatus = ["active", "inactive", "pending", "blocked"];

  const basicFormik = useFormik({
    initialValues: {
      first_name: fullDetails?.first_name,
      last_name: fullDetails?.last_name,
      contact: fullDetails?.contact,
      email: fullDetails?.email,
      dob: fullDetails?.dob?.slice(0, 10),
      father_name: fullDetails?.father_name,
      gender: fullDetails?.gender,
      instituteId: fullDetails?.instituteId,
      fb: fullDetails?.fb,
      twitter: fullDetails?.twitter,
      insta: fullDetails?.insta,
      lkd: fullDetails?.lkd,
      ytb: fullDetails?.ytb,
      bio: fullDetails?.bio,
      address: fullDetails?.address,
      state: fullDetails?.state,
      district: fullDetails?.district,
      pincode: fullDetails?.pincode,
      role: fullDetails?.role,
      status: fullDetails?.status,
    },
    enableReinitialize: true,
    validationSchema: editStudentSchema,
    onSubmit: async (values) => {
      toast.loading("Loading....");

      if (token) {
        try {
          const res = await apiJsonAuth.put(
            `/admin/updateUserData/${id}`,
            values,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.status === 200) {
            toast.dismiss();
            Swal.fire({
              title: res.data.message,
              icon: "success",
              width: 400,
            });
            fetchUserData();
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
  // console.log("Formik State:", {
  //   values: basicFormik.values,
  //   touched: basicFormik.touched,
  //   errors: basicFormik.errors,
  //   isValid: basicFormik.isValid,
  //   isSubmitting: basicFormik.isSubmitting,
  // });

  //======================================
  //fetch user data by id
  //====================================
  const fetchUserData = async () => {
    try {
      let result = await apiJson.get(`/admin/studentDataById/${id}`);
      setFullDetailes(result?.data?.result);
    } catch (error) {
      console.log(error?.response);
    }
  };
  //======================================
  //fetch Institute List
  //====================================
  const fetchInstituteList = async () => {
    try {
      const res = await api("/public/institute-list/");
      switch (res?.data?.status) {
        case "success":
          setInstituteList(res?.data?.result);
          break;
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  // fetch State api
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

  // fetch district Api
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
    fetchUserData();
  }, []);
  // fetch
  useEffect(() => {
    let state = basicFormik?.values?.state || "";
    fetchDistrict(state);
  }, [basicFormik?.values?.state]);
  useEffect(() => {
    fetchInstituteList();
  }, []);

  return (
    <>
      <h4>Edit {basicFormik.values.role} data</h4>
      <div className="p-3">
        <form onSubmit={basicFormik.handleSubmit}>
          <div className="py-3">
            <div className="row cols-1 row-lg-2 ">
              <div className="col-12 col-lg-6">
                <label htmlFor="first_name">First Name</label>

                <TextField
                  fullWidth
                  name="first_name"
                  id="first_name"
                  value={basicFormik?.values?.first_name}
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
              <div className="col-12 col-lg-6">
                <label htmlFor="last_name">Last Name</label>
                <TextField
                  fullWidth
                  name="last_name"
                  id="last_name"
                  value={basicFormik?.values?.last_name}
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
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="father_name">Father Name</label>
                <TextField
                  fullWidth
                  name="father_name"
                  id="father_name"
                  onChange={basicFormik.handleChange}
                  value={basicFormik?.values?.father_name}
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
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="email">Email</label>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  value={basicFormik?.values?.email}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.email &&
                    Boolean(basicFormik.errors.email)
                  }
                  helperText={
                    basicFormik.touched.email && basicFormik.errors.email
                  }
                />
              </div>

              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="dob" className="form-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control"
                  value={basicFormik?.values?.dob}
                  onChange={basicFormik.handleChange}
                  required
                />
              </div>

              <div className="ol-12 col-lg-6 mt-2">
                <FormControl>
                  <FormLabel id="gender-label" className="mb-0 text-secondary">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    defaultValue={basicFormik?.values?.gender}
                    aria-labelledby="gender-label"
                    id="gender"
                    name="gender"
                    onChange={basicFormik.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      checked={basicFormik?.values?.gender === "female"}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      checked={basicFormik?.values?.gender === "male"}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      checked={basicFormik?.values?.gender === "other"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="contact">Conatct</label>
                <TextField
                  fullWidth
                  name="conatct"
                  id="contact"
                  value={basicFormik?.values?.contact}
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
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="address">Address</label>
                <TextField
                  fullWidth
                  name="address"
                  id="address"
                  value={basicFormik?.values?.address}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.address &&
                    Boolean(basicFormik.errors.address)
                  }
                  helperText={
                    basicFormik.touched.address && basicFormik.errors.address
                  }
                />
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <FormControl fullWidth>
                  <label
                    htmlFor="institutution_name"
                    className="form-label text-dark"
                  >
                    Institute
                  </label>
                  <select
                    name="instituteId"
                    class="form-select"
                    id="institution_name"
                    className={`form-select h-100 py-3 ${
                      basicFormik.touched.instituteId &&
                      basicFormik.errors.instituteId
                        ? "is-invalid"
                        : ""
                    }`}
                    value={basicFormik?.values?.instituteId}
                    onChange={basicFormik.handleChange}
                    onBlur={basicFormik.handleBlur}
                  >
                    <option value="">Select Institute</option>
                    {instituteList?.map((institute, instituteIndex) => {
                      return (
                        <option key={instituteIndex} value={institute?.id}>
                          {textLimit(institute?.institution_name, 50)}
                        </option>
                      );
                    })}
                  </select>
                  {basicFormik.touched.instituteId &&
                    basicFormik.errors.instituteId && (
                      <div className="invalid-feedback">
                        {basicFormik.errors.instituteId}
                      </div>
                    )}
                </FormControl>
              </div>

              <div className="col-12 col-lg-6 mt-2">
                <FormControl fullWidth>
                  <label htmlFor="status" className="form-label text-dark">
                    State
                  </label>
                  <select
                    name="state"
                    class="form-select"
                    id="state"
                    className={`form-select h-100 py-3 ${
                      basicFormik.touched.state && basicFormik.errors.state
                        ? "is-invalid"
                        : ""
                    }`}
                    value={basicFormik.values.state}
                    onChange={basicFormik.handleChange}
                    onBlur={basicFormik.handleBlur}
                  >
                    <option value="">Select State</option>
                    {states?.map((state, stateIndex) => {
                      return (
                        <option key={stateIndex} value={state?.State}>
                          {state?.State}
                        </option>
                      );
                    })}
                  </select>
                  {basicFormik.touched.state && basicFormik.errors.state && (
                    <div className="invalid-feedback">
                      {basicFormik.errors.state}
                    </div>
                  )}
                </FormControl>
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <FormControl fullWidth>
                  <label htmlFor="district" className="form-label text-dark">
                    District
                  </label>
                  <select
                    name="district"
                    class="form-select"
                    id="district"
                    className={`form-select h-100 py-3 ${
                      basicFormik.touched.district &&
                      basicFormik.errors.district
                        ? "is-invalid"
                        : ""
                    }`}
                    onBlur={basicFormik.handleBlur}
                    value={basicFormik?.values?.district}
                    onChange={basicFormik.handleChange}
                  >
                    <option value="">Select District</option>
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
                  {basicFormik.touched.district &&
                    basicFormik.errors.district && (
                      <div className="invalid-feedback">
                        {basicFormik.errors.district}
                      </div>
                    )}
                </FormControl>
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="pincode">Pincode</label>
                <TextField
                  fullWidth
                  name="pincode"
                  id="pincode"
                  value={basicFormik.values.pincode}
                  onChange={basicFormik.handleChange}
                  error={
                    basicFormik.touched.pincode &&
                    Boolean(basicFormik.errors.pincode)
                  }
                  helperText={
                    basicFormik.touched.pincode && basicFormik.errors.pincode
                  }
                />
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <FormControl fullWidth>
                  <label htmlFor="status" className="form-label text-dark">
                    Role
                  </label>
                  <select
                    name="role"
                    class="form-select"
                    id="role"
                    value={basicFormik.values.role}
                    onChange={basicFormik.handleChange}
                    className="form-select h-100 py-3"
                  >
                    <option value="">Select Role</option>
                    {roles.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <FormControl fullWidth>
                  <label htmlFor="status" className="form-label text-dark">
                    Status
                  </label>
                  <select
                    name="status"
                    class="form-select"
                    id="status"
                    className="form-select h-100 py-3"
                    value={basicFormik?.values?.status}
                    onChange={basicFormik.handleChange}
                  >
                    <option value="">Select status</option>
                    {userStatus.map((status, statusIndex) => (
                      <option key={statusIndex} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <TextField
                  fullWidth
                  id="bio"
                  name="bio"
                  multiline
                  rows={4}
                  size="large"
                  className="mb-1"
                  value={basicFormik?.values?.bio}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={
                    basicFormik.touched.bio && Boolean(basicFormik.errors.bio)
                  }
                  helperText={basicFormik.touched.bio && basicFormik.errors.bio}
                />
              </div>

              {/* Social Link */}
              <div className="col-12 col-lg-6 ">
                <label htmlFor="f_name" className="form-label mb-2">
                  Social Link
                </label>
                <div className="row g-3">
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="fb"
                      name="fb"
                      label="Facebook"
                      size="large"
                      type={"url"}
                      onChange={basicFormik.handleChange}
                      value={basicFormik?.values?.fb}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Facebook sx={{ color: "blue" }} />{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="twitter"
                      name="twitter"
                      label="Twitter"
                      type={"url"}
                      size="large"
                      onChange={basicFormik.handleChange}
                      value={basicFormik?.values?.twitter}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter sx={{ color: "skyblue" }} />{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6 ">
                    <TextField
                      fullWidth
                      id="insta"
                      name="insta"
                      label="Instagram"
                      type={"url"}
                      size="large"
                      onChange={basicFormik.handleChange}
                      value={basicFormik?.values?.insta}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Instagram sx={{ color: "red" }} />{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6 ">
                    <TextField
                      fullWidth
                      id="lkd"
                      name="lkd"
                      label="LinkedIn"
                      type={"url"}
                      size="large"
                      onChange={basicFormik.handleChange}
                      value={basicFormik?.values?.lkd}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedIn sx={{ color: "blue" }} />{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="ytb"
                      name="ytb"
                      label="Youtube"
                      type={"url"}
                      size="large"
                      onChange={basicFormik.handleChange}
                      value={basicFormik?.values?.ytb}
                      InputLabelProps={{ shrink: true }}
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
              {/* Social Link  end*/}
              <div className="mt-2">
                <Button
                  color="success"
                  variant="contained"
                  className="rounded"
                  size="large"
                  type="submit" // Make sure type is set to "submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudentData;
