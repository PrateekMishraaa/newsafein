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
]


const classArray = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "CPD",
  "OTHERS",
  "Preschool 1",
  "Preschool 2",
  "Preschool 3",
  "Foundational Stage",
]
const Step2 = ({ formik }) => {
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2">
        {/* TYPE OF SCHOOL */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth size="small">
            <FormLabel id="question1-label" className="text-dark mb-2">
              Which Class Do You Teach?*
            </FormLabel>
            <Select
              id="question1"
              name="question1"
              value={formik?.values.question1}
              onChange={formik?.handleChange}
              error={formik?.errors.question1 && Boolean(formik?.touched.question1)}
            >
              {classArray?.map((classString, index) => {
                return <MenuItem value={classString} key={index}>{classString}</MenuItem>
              })
              }
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question1 && formik?.errors.question1}</FormHelperText>
          </FormControl>
        </div>
        {/* Udise Code */}
        <div className="col-12 col-lg-6">
          <FormLabel id="question5-label" className="text-dark">
            UDISE CODE
          </FormLabel>
          <TextField
            size="small"
            id="question5"
            type={"number"}
            fullWidth
            className="mt-2"
            variant="outlined"
            value={formik?.values.question5}
            onChange={formik?.handleChange}
            error={formik?.touched.question5 && Boolean(formik?.errors.question5)}
            helperText={formik?.touched.question5 && formik?.errors.question5}
          />
        </div>
        {/* SELECT Your Board */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question6" className="text-dark mb-2">
              Select Your Board
            </FormLabel>
            <Select
              id="question6"
              name="question6"
              value={formik?.values.question6}
              onChange={formik?.handleChange}
              error={formik?.touched.question6 && Boolean(formik?.errors.question6)}
            >
              {BoardData?.map((board, index) => {
                return <MenuItem value={board} key={index}>{board}</MenuItem>
              })
              }
            </Select>
            <FormHelperText className="text-danger">
              {formik?.touched.question6 && formik?.errors.question6}
            </FormHelperText>
          </FormControl>
        </div>
        {/* Medium of Education */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth>
            <FormLabel id="question7" className="text-dark mb-2">
              Medium of Education
            </FormLabel>
            <Select
              id="question7"
              name="question7"
              value={formik?.values.question7}
              onChange={formik?.handleChange}
              error={formik?.errors.question7 && Boolean(formik?.touched.question7)}
            >
              <MenuItem value="school">Pre-School</MenuItem>
              <MenuItem value="college">Primary</MenuItem>
              <MenuItem value="university">Middle School</MenuItem>
              <MenuItem value="other">High School</MenuItem>
              <MenuItem value="other">Senior Secondary</MenuItem>
            </Select>
            <FormHelperText className="text-danger">
              {formik?.touched.question7 && formik?.errors.question7}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Step2;
