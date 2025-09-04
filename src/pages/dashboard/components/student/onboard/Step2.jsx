import React from "react";
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from "@mui/material";

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
        {/* Question1 */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question1-label" className="text-dark mb-2">
              Which Class Do You Study In?
            </FormLabel>
            <Select
              id="question1"
              name="question1"
              size="large"
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
        {/* Question2 */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question2-label" className="text-dark mb-2">
              Are you a part of the School Safety Committee?
            </FormLabel>
            <Select
              id="question2"
              name="question2"
              size="large"
              value={formik?.values.question2}
              onChange={formik?.handleChange}
              error={formik?.errors.question2 && Boolean(formik?.touched.question2)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Not Sure">Not Sure</MenuItem>
            </Select>
            <FormHelperText className="text-danger">
              {formik?.touched.question2 && formik?.errors.question2}
            </FormHelperText>
          </FormControl>
        </div>
        {/* Question3 */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question3-label" className="text-dark mb-2">
              Do you use a School Bus or Transportation Provided by the School? <span className="text-secondary">(Optional)</span>
            </FormLabel>
            <Select
              id="question3"
              name="question3"
              size="large"
              value={formik?.values.question3}
              onChange={formik?.handleChange}
              error={formik?.errors.question3 && Boolean(formik?.touched.question3)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <FormHelperText className="text-danger">
              {formik?.touched.question3 && formik?.errors.question3}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Step2;
