import { FormControl, InputAdornment, TextField } from "@mui/material";
import { apiAuth, apiJson, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import Swal from "sweetalert2";

const EditIntituteDetails = () => {
  const [states, setStates] = useState([]);
  let [datas, setData] = useState("");
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();

  const Ins_status = ["active", "pending", "inactive", "deleted", "verified"];
  let { id } = useParams();

  // console.log(datas, "Institute data=>...");
  // Validation Schema
  const additionalDetailsSchema = new Yup.object().shape({
    title: Yup.string().max(10).required("Title is Required"),
    first_name: Yup.string().max(100).required("First Name is Required"),
    last_name: Yup.string().max(100).required("Last Name is Required"),
    email: Yup.string().email().required("Email is required"),
    contact: Yup.string()
      .required("Phone Number is Required")
      .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),

    institution_name: Yup.string().required("Institution name is required"),
    bio: Yup.string()
      .max(350, "Too long! ( max 350 characters )")
      .required("Bio is required"),
    institution_address: Yup.string().required(
      "Institution Address is required"
    ),
    state: Yup.string().max(200).required("State is required"),
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

    pincode: Yup.string()
      .required("Pin code is Required")
      .matches(/^[0-9]{6}$/, "Invalid Pin code"),
    status: Yup.string().required("Status is require"),
  });
  // use formik
  const editFormik = useFormik({
    initialValues: {
      title: datas?.title || "Mr.",
      first_name: datas?.first_name,
      last_name: datas?.last_name,
      email: datas?.email,
      contact: datas?.contact,

      institution_name: datas?.institution_name,
      bio: datas?.bio,
      institution_address: datas?.institution_address,
      state: datas?.state,
      pincode: datas?.pincode,
      fb: datas?.fb,
      twitter: datas?.twitter,
      insta: datas?.insta,
      lkd: datas?.lkd,
      ytb: datas?.ytb,
      status: datas?.status,
    },
    enableReinitialize: true,
    validationSchema: additionalDetailsSchema,
    onSubmit: async (values) => {
      // console.log(values.state, values.status, "===>");
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const newBio = values.bio.replaceAll("'", "’");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("first_name", values.first_name);

      formData.append("last_name", values.last_name);
      formData.append("contact", values.contact);
      formData.append("email", values.email);
      formData.append("fb", values.fb);
      formData.append("twitter", values.twitter);
      formData.append("insta", values.insta);
      formData.append("lkd", values.lkd);
      formData.append("ytb", values.ytb);
      formData.append("institution_name", values.institution_name);
      formData.append("bio", newBio);
      formData.append("institution_address", values.institution_address);
      formData.append("state", values.state);
      formData.append("status", values.status);
      formData.append("pincode", values.pincode);
      if (token) {
        try {
          const res = await apiJson.put(
            `/admin/updateInstituteByadmin/${id}`,
            formData,
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
            getDataById();
            // fetchDetails();
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
    },
  });

  // Institute Api data

  const getDataById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/institute/${id}`);
      if (res.status == 200) {
        setData(res?.data?.result);
      }
    } catch (error) {
      console.log("All Error: ", error);
    }
  };
  useEffect(() => {
    getDataById();
  }, [id]);

  const fetchState = async () => {
    const states = await apiAuth.get("/v2/public/state");
    if (states.status === 200) {
      setStates(states?.data?.states);
    }
  };
  useEffect(() => {
    fetchState();
  }, []);

  // console.log("Formik State:", {
  //   values: editFormik.values,
  //   touched: editFormik.touched,
  //   errors: editFormik.errors,
  //   isValid: editFormik.isValid,
  //   isSubmitting: editFormik.isSubmitting,
  // });

  return (
    <>
      <div className="conatainer p-2">
        <h4 className="py-2">
          Edit details of {editFormik.values.institution_name}
        </h4>
        <form onSubmit={editFormik.handleSubmit}>
          <div className="row">
            {/* left column */}
            <div className="col-12 col-lg-6">
              <div className="col-12 mb-2">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  className="form-select h-100 py-3"
                  label="Title"
                  value={editFormik.values.title}
                  onChange={editFormik.handleChange}
                  required
                >
                  <option value={"Mr."}>Mr.</option>
                  <option value={"Ms."}>Ms.</option>
                  <option value={"Miss"}>Miss</option>
                </select>
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="f_name" className="form-label">
                  First Name
                </label>
                <TextField
                  type="text"
                  name="first_name"
                  value={editFormik.values.first_name}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.first_name &&
                    Boolean(editFormik.errors.first_name)
                  }
                  className="form-control"
                  id="f_name"
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    editFormik.touched.first_name &&
                    editFormik.errors.first_name
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="l_name" className="form-label">
                  Last Name
                </label>
                <TextField
                  fullWidth
                  type="text"
                  name="last_name"
                  id="l_name"
                  size="large"
                  value={editFormik.values.last_name}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.last_name &&
                    Boolean(editFormik.errors.last_name)
                  }
                  helperText={
                    editFormik.touched.last_name && editFormik.errors.last_name
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="email" name="email" className="form-label">
                  Email
                </label>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  size="large"
                  value={editFormik.values.email}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.email && Boolean(editFormik.errors.email)
                  }
                  helperText={
                    editFormik.touched.email && editFormik.errors.email
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="contact" className="form-label">
                  Conatct
                </label>
                <TextField
                  fullWidth
                  size="large"
                  name="contact"
                  id="conatct"
                  value={editFormik.values.contact}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.contact &&
                    Boolean(editFormik.errors.contact)
                  }
                  helperText={
                    editFormik.touched.contact && editFormik.errors.contact
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="ins_name" className="form-label">
                  Institute Name
                </label>
                <TextField
                  name="institution_name"
                  className="form-control"
                  id="ins_name"
                  value={editFormik.values.institution_name}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.institution_name &&
                    Boolean(editFormik.errors.institution_name)
                  }
                  helperText={
                    editFormik.touched.institution_name &&
                    editFormik.errors.institution_name
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <FormControl fullWidth>
                  <label htmlFor="status" className="form-label text-dark">
                    Status
                  </label>
                  <select
                    name="status"
                    class="form-select"
                    id="status"
                    className="form-select h-100 py-3"
                    value={editFormik.values.status}
                    onChange={editFormik.handleChange}
                  >
                    <option value="">Select Status</option>
                    {Ins_status.map((status, statusIndex) => (
                      <option key={statusIndex} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
            </div>
            {/* right column */}
            <div className="col-12 col-lg-6">
              <div className="col-12 mb-2 ">
                <label htmlFor="ins_bio" className="form-label">
                  Institute Bio
                </label>
                <TextField
                  fullWidth
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  size="large"
                  className="mb-1"
                  InputLabelProps={{ shrink: true }}
                  value={editFormik.values.bio}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.bio && Boolean(editFormik.errors.bio)
                  }
                  helperText={editFormik.touched.bio && editFormik.errors.bio}
                />
                {editFormik?.values?.bio?.length} Characters ({" "}
                {350 - editFormik?.values?.bio?.length} left)
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="ins_address" class="form-label">
                  Address
                </label>
                <TextField
                  fullWidth
                  name="institution_address"
                  id="ins_address"
                  value={editFormik.values.institution_address}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.institution_address &&
                    Boolean(editFormik.errors.institution_address)
                  }
                  helperText={
                    editFormik.touched.institution_address &&
                    editFormik.errors.institution_address
                  }
                />
              </div>
              {/* <div className="row"> */}
              <div className="col-12 mb-2">
                <FormControl fullWidth>
                  <label htmlFor="state" className="form-label text-dark">
                    State
                  </label>
                  <select
                    type="text"
                    name="state"
                    className="form-select h-100 py-3"
                    id="state"
                    value={editFormik.values.state}
                    onChange={editFormik.handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state, stateIndex) => (
                      <option key={stateIndex} value={state?.State}>
                        {state?.State}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
              <div className="col-12 mb-2">
                <label for="inputZip" className="form-label">
                  Zip
                </label>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  name="pincode"
                  className="form-control"
                  id="inputZip"
                  value={editFormik.values.pincode}
                  onChange={editFormik.handleChange}
                  error={
                    editFormik.touched.pincode &&
                    Boolean(editFormik.errors.pincode)
                  }
                  helperText={
                    editFormik.touched.pincode && editFormik.errors.pincode
                  }
                />
                {/* </div> */}
              </div>
              {/* Social Link */}
              <div className="col">
                <label htmlFor="f_name" className="form-label">
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
                      value={editFormik.values.fb}
                      onChange={editFormik.handleChange}
                      error={
                        editFormik.touched.fb && Boolean(editFormik.errors.fb)
                      }
                      helperText={editFormik.touched.fb && editFormik.errors.fb}
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
                      value={editFormik.values.twitter}
                      onChange={editFormik.handleChange}
                      error={
                        editFormik.touched.twitter &&
                        Boolean(editFormik.errors.twitter)
                      }
                      helperText={
                        editFormik.touched.twitter && editFormik.errors.twitter
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
                  <div className="col-12 col-lg-6 ">
                    <TextField
                      fullWidth
                      id="insta"
                      name="insta"
                      label="Instagram"
                      type={"url"}
                      size="large"
                      value={editFormik.values.insta}
                      onChange={editFormik.handleChange}
                      error={
                        editFormik.touched.insta &&
                        Boolean(editFormik.errors.insta)
                      }
                      helperText={
                        editFormik.touched.insta && editFormik.errors.insta
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
                  <div className="col-12 col-lg-6 ">
                    <TextField
                      fullWidth
                      id="lkd"
                      name="lkd"
                      label="LinkedIn"
                      type={"url"}
                      size="large"
                      value={editFormik.values.lkd}
                      onChange={editFormik.handleChange}
                      error={
                        editFormik.touched.lkd && Boolean(editFormik.errors.lkd)
                      }
                      helperText={
                        editFormik.touched.lkd && editFormik.errors.lkd
                      }
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
                      value={editFormik.values.ytb}
                      onChange={editFormik.handleChange}
                      error={
                        editFormik.touched.ytb && Boolean(editFormik.errors.ytb)
                      }
                      helperText={
                        editFormik.touched.ytb && editFormik.errors.ytb
                      }
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
            </div>
          </div>
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
        </form>
      </div>
    </>
  );
};

export default EditIntituteDetails;
