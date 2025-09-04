import React from "react";
import TextField from "@mui/material/TextField";
import { DriveFolderUploadTwoTone, Facebook, HelpOutlineOutlined, HelpOutlineTwoTone, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Avatar, Button, InputAdornment } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";

const Step1 = ({ formik, details }) => {
  const profileUpdate = (e) => {
    formik.setFieldValue("profile", e.target?.files[0]);
  };
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2 mt-1">
        {/* Profile  */}
        <div className="col-12">
          <div className="d-flex align-items-start justify-content-between justify-content-lg-start">
            <Avatar alt="" name="profilepic" src={formik?.values?.profile ? URL.createObjectURL(formik?.values?.profile) : ""} className="rounded" sx={{ width: 80, height: 80 }} />
            <div className="ms-2">
              <h3 className="fs-6 font-ubd fw-thin text-dark text-initial" style={{ fontWeight: 500 }}>
                Upload the logo of your institution
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
          <span className="font-ubd fw-thin text-dark fs-6">Write a short paragraph about your school</span>
          <TextField fullWidth id="bio" name="bio" placeholder="XYZ School is a world-renowned academic institution that has been at the forefront of innovation and excellence in education for over a century." multiline rows={2} size="large" value={formik?.values.bio} onChange={formik?.handleChange} error={formik?.touched.bio && Boolean(formik?.errors.bio)} helperText={formik?.touched.bio && formik?.errors.bio} />
          {formik?.values?.bio?.length} Characters ( {350 > formik?.values?.bio?.length ? 350 - formik?.values?.bio?.length : 0} left )
        </div>
        {/* NO Of Students  */}
        <div className="col-12 col-lg-6">
          <FormLabel id="question1" className="text-dark">
            Total number of students
          </FormLabel>
          <TextField id="question1" type={"number"} fullWidth size="small" variant="outlined" value={formik?.values.question1} onChange={formik?.handleChange} error={formik?.touched.question1 && Boolean(formik?.errors.question1)} helperText={formik?.touched.question1 && formik?.errors.question1} />
        </div>
        {/* NO Of Teachers  */}
        <div className="col-12 col-lg-6">
          <FormLabel id="question2" className="text-dark">
            Total number of Teachers
          </FormLabel>
          <TextField id="question2" type={"number"} fullWidth size="small" variant="outlined" value={formik?.values.question2} onChange={formik?.handleChange} error={formik?.touched.question2 && Boolean(formik?.errors.question2)} helperText={formik?.touched.question2 && formik?.errors.question2} />
        </div>
        {/* NO Of Non-Teachers  */}
        <div className="col-12 col-lg-6">
          <FormLabel id="question1" className="text-dark">
            Total number of non-teaching staff
          </FormLabel>
          <TextField id="question3" type={"number"} fullWidth size="small" variant="outlined" value={formik?.values.question3} onChange={formik?.handleChange} error={formik?.touched.question3 && Boolean(formik?.errors.question3)} helperText={formik?.touched.question3 && formik?.errors.question3} />
        </div>
        {/* Social Links  */}
        <div className="col-12">
          <div>
            <p className="font-ubd text-dark fs-6">
              Link the social media accounts of your Institution <span className="text-secondary">(Optional)</span>
            </p>
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="fb"
                  name="fb"
                  label="Facebook"
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
