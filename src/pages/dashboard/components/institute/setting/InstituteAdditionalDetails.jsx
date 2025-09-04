import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import { apiAuth } from "api";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { InputAdornment } from "@mui/material";
import { useGlobalContext } from "global/context";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { LinkedinIcon } from "react-share";
import { useOutletContext } from "react-router-dom";
import useError from "hooks/useError";
import { SimpleBreadCrumb } from "components/ui";

const additionalDetailsSchema = new Yup.object({
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
    .max(250, "Too long! ( max 250 characters )")
    .required("Bio is required"),
  institution_address: Yup.string().required("Institution Address is required"),
  state: Yup.string().max(200).required("State is required"),
  pincode: Yup.string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});

const InstituteAdditionalDetails = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details, fetchDetails] = useOutletContext();

  // Additional Formik
  const additionalFormik = useFormik({
    initialValues: {
      fb: details?.fb,
      twitter: details?.twitter,
      insta: details?.insta,
      lkd: details?.lkd,
      ytb: details?.ytb,
      institution_name: details?.institution_name,
      bio: details?.bio,
      institution_address: details?.institution_address,
      state: details?.state,
      pincode: details?.pincode,
    },
    validationSchema: additionalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, "====>val");
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const formData = new FormData();
      const newBio = values.bio.replaceAll("'", "’");
      formData.append("fb", values.fb);
      formData.append("twitter", values.twitter);
      formData.append("insta", values.insta);
      formData.append("lkd", values.lkd);
      formData.append("ytb", values.ytb);
      formData.append("institution_name", values.institution_name);
      // formData.append("bio", values.bio);
      formData.append("bio", newBio);
      formData.append("institution_address", values.institution_address);
      formData.append("state", values.state);
      formData.append("pincode", values.pincode);
      if (token) {
        try {
          const res = await apiAuth.put(
            `/institute/profile?update_type=additional`,
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
      <form onSubmit={additionalFormik.handleSubmit}>
        <div className="row gy-4">
          {/* Bio */}
          <div className="col-12 col-lg-6">
            <h6>Bio</h6>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              size="large"
              InputLabelProps={{ shrink: true }}
              value={additionalFormik.values.bio}
              onChange={additionalFormik.handleChange}
              error={
                additionalFormik.touched.bio &&
                Boolean(additionalFormik.errors.bio)
              }
              helperText={
                additionalFormik.touched.bio && additionalFormik.errors.bio
              }
            />
            {additionalFormik?.values?.bio?.length} Characters ({" "}
            {350 - additionalFormik?.values?.bio?.length} left)
          </div>
          {/* Institute Name */}
          <div className="col-12 col-lg-6">
            <h6>Institute Name</h6>
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              fullWidth
              id="institution_name"
              name="institution_name"
              label="Institute Name"
              multiline
              rows={3}
              size="large"
              InputLabelProps={{ shrink: true }}
              value={additionalFormik.values.institution_name}
              onChange={additionalFormik.handleChange}
              error={
                additionalFormik.touched.institution_name &&
                Boolean(additionalFormik.errors.institution_name)
              }
              helperText={
                additionalFormik.touched.institution_name &&
                additionalFormik.errors.institution_name
              }
            />
          </div>
          {/* Institute Address */}
          <div className="col-12 col-lg-6">
            <h6>Institute Address</h6>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-12 col-lg-6">
                <TextField
                  fullWidth
                  id="institution_address"
                  name="institution_address"
                  label="Institute Address"
                  multiline
                  rows={3}
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={additionalFormik.values.institution_address}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.institution_address &&
                    Boolean(additionalFormik.errors.institution_address)
                  }
                  helperText={
                    additionalFormik.touched.institution_address &&
                    additionalFormik.errors.institution_address
                  }
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  label="State"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={additionalFormik.values.state}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.state &&
                    Boolean(additionalFormik.errors.state)
                  }
                  helperText={
                    additionalFormik.touched.state &&
                    additionalFormik.errors.state
                  }
                />
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <TextField
                  fullWidth
                  id="pincode"
                  name="pincode"
                  label="Pin Code"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={additionalFormik.values.pincode}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.pincode &&
                    Boolean(additionalFormik.errors.pincode)
                  }
                  helperText={
                    additionalFormik.touched.pincode &&
                    additionalFormik.errors.pincode
                  }
                />
              </div>
            </div>
          </div>
          {/* Social Link */}
          <div className="col-12 col-lg-6">
            <h5>Social Links</h5>
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
                  type={"url"}
                  value={additionalFormik.values.fb}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.fb &&
                    Boolean(additionalFormik.errors.fb)
                  }
                  helperText={
                    additionalFormik.touched.fb && additionalFormik.errors.fb
                  }
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
                  value={additionalFormik.values.twitter}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.twitter &&
                    Boolean(additionalFormik.errors.twitter)
                  }
                  helperText={
                    additionalFormik.touched.twitter &&
                    additionalFormik.errors.twitter
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
                  value={additionalFormik.values.insta}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.insta &&
                    Boolean(additionalFormik.errors.insta)
                  }
                  helperText={
                    additionalFormik.touched.insta &&
                    additionalFormik.errors.insta
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
                  value={additionalFormik.values.lkd}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.lkd &&
                    Boolean(additionalFormik.errors.lkd)
                  }
                  helperText={
                    additionalFormik.touched.lkd && additionalFormik.errors.lkd
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
              <div className="col">
                <TextField
                  fullWidth
                  id="ytb"
                  name="ytb"
                  label="Youtube"
                  type={"url"}
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  value={additionalFormik.values.ytb}
                  onChange={additionalFormik.handleChange}
                  error={
                    additionalFormik.touched.ytb &&
                    Boolean(additionalFormik.errors.ytb)
                  }
                  helperText={
                    additionalFormik.touched.ytb && additionalFormik.errors.ytb
                  }
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

          <div className="col-12 col-lg-6">
            <Button
              color="success"
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
    </>
  );
};

export default InstituteAdditionalDetails;
