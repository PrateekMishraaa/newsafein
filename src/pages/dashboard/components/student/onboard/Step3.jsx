import React from "react";
import IconButton from "@mui/material/IconButton";
import { Avatar, FormControl, FormHelperText, FormLabel, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { DriveFolderUploadTwoTone, Facebook, HelpOutlineOutlined, Instagram, LinkedIn, Star, Twitter, YouTube } from "@mui/icons-material";
import { Popup } from "utils/Popup";

const Step3 = ({ formik }) => {
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2 mt-1">
        {/* Medium of Education */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question7-label" className="text-dark mb-2">
              Which School Safety aspects are you most interested in? <span className="text-secondary">(Optional)</span>
            </FormLabel>
            <Select
              id="question7"
              name="question7"
              size="large"
              value={formik?.values.question7}
              onChange={formik?.handleChange}
              error={formik?.errors.question7 && Boolean(formik?.touched.question7)}
            >
              <MenuItem value="Teachers Orientation & Training">Teachers Orientation & Training</MenuItem>
              <MenuItem value="Health & Physical Safety">Health & Physical Safety</MenuItem>
              <MenuItem value="School Buildings, Grounds and Facilities">School Buildings, Grounds and Facilities</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Cyber Safety & Policy">Cyber Safety & Policy</MenuItem>
              <MenuItem value="Psychosocial Safety & Support">Psychosocial Safety & Support</MenuItem>
              <MenuItem value="All of the above">All of the above</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText className="text-danger">
            {formik?.touched.question7 && formik?.errors.question7}
          </FormHelperText>
        </div>
        {/* Hear About */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question8-label" className="text-dark mb-2">
              Are you open to assuming a more prominent role concerning school safety in your school?
            </FormLabel>
            <Select
              id="question8"
              name="question8"
              size="large"
              value={formik?.values.question8}
              onChange={formik?.handleChange}
              error={formik?.errors.question8 && Boolean(formik?.touched.question8)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Not sure">Not sure</MenuItem>
            </Select>
            <FormHelperText className="text-danger">
              {formik?.touched.question8 && formik?.errors.question8}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </div >
  );
};

export default Step3;
