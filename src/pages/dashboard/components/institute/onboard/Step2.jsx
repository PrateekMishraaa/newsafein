import React from "react";
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from "@mui/material";

export const BoardData = [
  "CBSE",
  "CISCE",
  "IGOT-Health",
  "NIOS",
  "OTHERS",
  "STATE (Andhra Pradesh)",
  "STATE (Arunachal Pradesh)",
  "STATE (Assam)",
  "STATE (Bihar)",
  "STATE (Chandigarh)",
  "STATE (Chattisgarh)",
  "STATE (Delhi)",
  "STATE (Goa)",
  "STATE (Gujrat)",
  "STATE (Haryana)",
  "STATE (Himachal Pradesh)",
  "STATE (Jammu & Kashmir)",
  "STATE (Jharkhand)",
  "STATE (Karnataka)",
  "STATE (Kerala)",
  "STATE (Madhya Pradesh)",
  "STATE (Maharashtra)",
  "STATE (Manipur)",
  "STATE (Meghalaya)",
  "STATE (Mizoram)",
  "STATE (Nagaland)",
  "STATE (Odisha)",
  "STATE (Punjab)",
  "STATE (Rajasthan)",
  "STATE (Sikkim)",
  "STATE (Tamil Nadu)",
  "STATE (Tripura)",
  "STATE (Uttar Pradesh)",
  "STATE (Uttarakhand)",
  "UT (Andaman & Nicobar Islands)",
  "UT ( DNH & DD)",
  "UT (Ladakh)",
  "UT (Puducherry)",
];

const medium = ["Bengali", "English", "Gujrati", "Hindi", "Kannada", "Malayalam", "Marathi", "Odiya", "Punjabi", "Sanskrit", "Tamil", "Telugu", "Urdu"];
const Step2 = ({ formik }) => {
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2">
        {/* TYPE OF SCHOOL */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question4-label" className="text-dark mb-2">
              Type of School
            </FormLabel>
            <Select id="question4" name="question4" value={formik?.values.question4} onChange={formik?.handleChange} error={formik?.errors.question4 && Boolean(formik?.touched.question4)}>
              <MenuItem value="school">Pre-School</MenuItem>
              <MenuItem value="college">Primary</MenuItem>
              <MenuItem value="university">Middle School</MenuItem>
              <MenuItem value="other">High School / Senior Sec School</MenuItem>
              {/* <MenuItem value="other">Senior Secondary</MenuItem> */}
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question4 && formik?.errors.question4}</FormHelperText>
          </FormControl>
        </div>
        {/* Udise Code */}
        <div className="col-12 col-lg-6">
          <FormLabel id="question5-label" className="text-dark">
            UDISE CODE
          </FormLabel>
          <TextField id="question5" type={"text"} fullWidth className="mt-2" variant="outlined" value={formik?.values.question5} onChange={formik?.handleChange} error={formik?.touched.question5 && Boolean(formik?.errors.question5)} helperText={formik?.touched.question5 && formik?.errors.question5} />
        </div>
        {/* SELECT Your Board */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question6" className="text-dark mb-2">
              Select Your Board
            </FormLabel>
            <Select id="question6" name="question6" value={formik?.values.question6} onChange={formik?.handleChange} error={formik?.touched.question6 && Boolean(formik?.errors.question6)}>
              {BoardData?.map((board, index) => {
                return (
                  <MenuItem value={board} key={index}>
                    {board}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question6 && formik?.errors.question6}</FormHelperText>
          </FormControl>
        </div>
        {/* Medium of Education */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question7" className="text-dark mb-2">
              Medium of Education
            </FormLabel>
            <Select id="question7" name="question7" value={formik?.values.question7}  onChange={(event) => {const selectedValue = event.target.value;
            // Use formik's setFieldValue function to update the form field
            formik?.setFieldValue("question7", selectedValue);
            }} error={formik?.errors.question7 && Boolean(formik?.touched.question7)}>
              {medium.map((med) => {
                return <MenuItem value={med}>{med}</MenuItem>;
              })}
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question7 && formik?.errors.question7}</FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Step2;
