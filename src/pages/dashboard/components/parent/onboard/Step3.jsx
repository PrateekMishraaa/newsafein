import React from "react";
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from "@mui/material";

const Step3 = ({ formik }) => {
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2 mt-1">
        <div className="col-12">
          <div className="row g-2">
            <div>
              <span className="text-dark fs-6">
                You may appoint a Teacher or Admin personnel as a School Safety Coordinator.
              </span>
              <div className="row g-2">
                {/* Coordinator's Name */}
                <div className="col-12 col-lg-6">
                  <TextField
                    id="coordinator.name"
                    name="coordinator.name"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    value={formik?.values?.coordinator?.name}
                    onChange={formik?.handleChange}
                    error={formik?.touched?.coordinator?.name && Boolean(formik?.errors?.coordinator?.name)}
                    helperText={formik?.touched?.coordinator?.name && formik?.errors?.coordinator?.name}
                  />
                </div>
                {/* Coordinator's role */}
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="coordinator.designation"
                    name="coordinator.designation"
                    label="Function"
                    variant="outlined"
                    value={formik?.values?.coordinator?.designation}
                    onChange={formik?.handleChange}
                    error={formik?.touched?.coordinator?.designation && Boolean(formik?.errors?.coordinator?.designation)}
                    helperText={formik?.touched?.coordinator?.designation && formik?.errors?.coordinator?.designation}
                  />
                </div>
                {/* Coordinator's Phone */}
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="coordinator.contact"
                    name="coordinator.contact"
                    label="Phone number"
                    variant="outlined"
                    value={formik?.values?.coordinator?.contact}
                    onChange={formik?.handleChange}
                    error={formik?.touched?.coordinator?.contact && Boolean(formik?.errors?.coordinator?.contact)}
                    helperText={formik?.touched?.coordinator && formik?.errors?.coordinator?.contact}
                  />
                </div>
                {/* Coordinator's Email */}
                <div className="col-12 col-lg-6">
                  <TextField
                    id="coordinator.email"
                    name="coordinator.email"
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    value={formik?.values?.coordinator?.email}
                    onChange={formik?.handleChange}
                    error={formik?.touched?.coordinator?.email && Boolean(formik?.errors?.coordinator?.email)}
                    helperText={formik?.touched?.coordinator && formik?.errors?.coordinator?.email}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question8-label" className="text-dark mb-2">
              What are you interested in? <span className="text-secondary">(Optional)</span>
            </FormLabel>
            <Select
              id="question8"
              name="question8"
              value={formik?.values.question8}
              onChange={formik?.handleChange}
              error={formik?.errors.question8 && Boolean(formik?.touched.question8)}
            >
              <MenuItem value="Teacher's Training on School Safety">Teacher's Training on School Safety</MenuItem>
              <MenuItem value="Students’ Sensitisation of Safety at School">Students’ Sensitisation of Safety at School</MenuItem>
              <MenuItem value="Training of Non-Teaching Staff on various Child Safety Aspects">Training of Non-Teaching Staff on various Child Safety Aspects</MenuItem>
              <MenuItem value="Compliance with Government Guidelines">Compliance with Government Guidelines</MenuItem>
              <MenuItem value="School Safety Certifications for Teachers and Staff">School Safety Certifications for Teachers and Staff</MenuItem>
              <MenuItem value="All of the Above">All of the Above</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText>
            {formik?.touched.question8 && formik?.errors.question8}
          </FormHelperText>
        </div>
        {/* Hear About */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question9" className="text-dark mb-2">
              Where did you hear about SafeInSchool? <span className="text-secondary">(Optional)</span>
            </FormLabel>
            <Select
              id="question9"
              name="question9"
              value={formik?.values.question9}
              onChange={formik?.handleChange}
              error={formik?.errors.question9 && Boolean(formik?.touched.question9)}
            >
              <MenuItem value="Newspaper">Newspaper</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Social Media">Social Media</MenuItem>
              <MenuItem value="Friends">Colleagues</MenuItem>
              <MenuItem value="Some Event">Some Event</MenuItem>
              <MenuItem value="Government Notification">Government Notification</MenuItem>
              <MenuItem value="Yuvamanthan">Yuvamanthan</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <FormHelperText>
              {formik?.touched.question9 && formik?.errors.question9}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Step3;
