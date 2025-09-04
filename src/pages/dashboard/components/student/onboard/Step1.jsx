import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DriveFolderUploadTwoTone, Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Avatar, Button, InputAdornment } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
const Step1 = ({ formik, details }) => {

  const profileUpdate = (e) => {
    formik.setFieldValue("profile", e.target?.files[0])
  }
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-3 mt-1">
        {/* Profile  */}
        <div className="col-12">
          <div className="d-flex align-items-start justify-content-between justify-content-lg-start">
            <Avatar alt="" name="profilepic" src={formik?.values?.profile ? URL.createObjectURL(formik?.values?.profile) : ""} className="rounded" sx={{ width: 80, height: 80 }} />
            <div className="ms-2">
              <h3 className="fs-6 font-ubd fw-thin text-dark text-initial" style={{ fontWeight: 500 }}>
                Upload Profile Picture
              </h3>
              <Button color={formik?.touched?.profile && Boolean(formik?.errors?.profile) ? "error" : "primary"} variant="outlined" size="small" className="rounded text-capitalize" aria-label="upload picture" component="label">
                <span>Upload</span>
                <input hidden name="profile" accept=".png, .jpg, .jpeg" type="file" onChange={profileUpdate} />
                <DriveFolderUploadTwoTone className="fs-3" />
              </Button>
              <small className="d-block">* Upload a Hi-resolution PNG or JPEG file only.</small>
            </div>
          </div>
          <span className="text-danger">{formik?.touched?.profile && formik?.errors?.profile}</span>
        </div>
        {/*Bio*/}
        <div className="col-12">
          <span className="font-ubd fw-thin text-dark fs-6">Write a short Bio.</span>
          <TextField
            fullWidth
            id="bio"
            name="bio"
            placeholder="XYZ University is a world-renowned academic institution that has been at the forefront of innovation and excellence in education for over a century."
            multiline
            rows={4}
            value={formik?.values.bio}
            onChange={formik?.handleChange}
            error={formik?.touched.bio && Boolean(formik?.errors.bio)}
            helperText={formik?.touched.bio && formik?.errors.bio}
          />
          {formik?.values?.bio?.length} Characters ( {350 > formik?.values?.bio?.length ? 350 - formik?.values?.bio?.length : 0} left )
        </div>
        {/* Social Links  */}
        <div className="col-12">
          <div>
            <p className="font-ubd text-dark fs-6">Link the social media accounts of your Institution <span className="text-secondary">(Optional)</span></p>
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="fb"
                  name="fb"
                  label="Facebook"
                  type={"url"}
                  value={formik?.values.fb}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.fb)}
                  helperText={formik?.errors.fb}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook sx={{ color: "blue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  type={"url"}
                  value={formik?.values.twitter}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.twitter)}
                  helperText={formik?.errors.twitter}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter sx={{ color: "skyblue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="insta"
                  name="insta"
                  label="Instagram"
                  type={"url"}
                  value={formik?.values.insta}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.insta)}
                  helperText={formik?.errors.insta}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram sx={{ color: "tomato" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="lkd"
                  name="lkd"
                  label="LinkedIn"
                  type={"url"}
                  value={formik?.values.lkd}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.lkd)}
                  helperText={formik?.errors.lkd}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn sx={{ color: "blue" }} />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="ytb"
                  name="ytb"
                  label="Youtube"
                  type={"url"}
                  value={formik?.values.ytb}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.ytb)}
                  helperText={formik?.errors.ytb}
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
        </div>
      </div>
    </div>
  );
};

export default Step1;
