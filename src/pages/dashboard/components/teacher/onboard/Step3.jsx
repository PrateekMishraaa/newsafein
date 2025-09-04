import React from "react";
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from "@mui/material";

const Step3 = ({ formik }) => {
  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
      <div className="row g-2 mt-1">
        {/* Your Education */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth size="small">
            <FormLabel id="question4-label" className="text-dark mb-2">
              Your Education
            </FormLabel>
            <select id="question4" name="question4" value={formik?.values.question4} onChange={formik?.handleChange} error={formik?.errors.question4 && Boolean(formik?.touched.question4)} className="form-select">
              <option value="">Other - Please mention</option>
              <option value="Graduation - Subjects studied">Graduation - Subjects studied</option>
              <option value="Post Graduation - Subjects studied">Post Graduation - Subjects studied</option>
              <option value="Doctorate - Subject">Doctorate - Subject</option>
            </select>
            {!["Graduation - Subjects studied", "Post Graduation - Subjects studied", "Doctorate - Subject"].includes(formik?.values.question4) && <input type="text" name="question4" id="question4" className="form-control mt-2" placeholder="Mention Education Here.." onChange={formik.handleChange} />}
            <FormHelperText className="text-danger">{formik?.touched.question4 && formik?.errors.question4}</FormHelperText>
          </FormControl>
        </div>
        {/* Your Education */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth size="small">
            <FormLabel id="question5-label" className="text-dark mb-2">
              Subject studied
            </FormLabel>
            <TextField id="question5" name="question5" value={formik?.values.question5} onChange={formik?.handleChange} error={formik?.errors.question5 && Boolean(formik?.touched.question5)} size="small" helperText={formik?.touched.question5 && formik?.errors.question5} />
          </FormControl>
        </div>
        {/* Your Education */}
        <div className="col-12 col-lg-6">
          <FormControl fullWidth size="small">
            <FormLabel id="question6-label" className="text-dark mb-2">
              Total Work Experience in Schools*
            </FormLabel>
            <Select id="question6" name="question6" value={formik?.values.question6} onChange={formik?.handleChange} error={formik?.errors.question6 && Boolean(formik?.touched.question6)}>
              <MenuItem value="1-3 years">1-3 years</MenuItem>
              <MenuItem value="3-6 years">3-6 years</MenuItem>
              <MenuItem value="6-10 years">6-10 years</MenuItem>
              <MenuItem value="10-20 years">10-20 years</MenuItem>
              <MenuItem value="20 years or more">20 years or more</MenuItem>
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question6 && formik?.errors.question6}</FormHelperText>
          </FormControl>
        </div>
        {/* Medium of Education */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question7-label" className="text-dark mb-2">
              Which School Safety aspects are you most interested in? <span className="text-secondary">(Optional)</span>
            </FormLabel>
            <Select id="question7" name="question7" value={formik?.values.question7} onChange={formik?.handleChange} error={formik?.errors.question7 && Boolean(formik?.touched.question7)}>
              <MenuItem value="Teachers Orientation & Training">Teachers Orientation & Training</MenuItem>
              <MenuItem value="Health & Physical Safety">Health & Physical Safety</MenuItem>
              <MenuItem value="School Buildings, Grounds and Facilities">School Buildings, Grounds and Facilities</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Cyber Safety & Policy">Cyber Safety & Policy</MenuItem>
              <MenuItem value="Psychosocial Safety & Support">Psychosocial Safety & Support</MenuItem>
              <MenuItem value="All of the above">All of the above</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText className="text-danger">{formik?.touched.question7 && formik?.errors.question7}</FormHelperText>
        </div>
        {/* Question8 */}
        <div className="col-12">
          <FormControl fullWidth size="small">
            <FormLabel id="question8-label" className="text-dark mb-2">
              Are you open to assuming a more prominent role concerning school safety in your school?
            </FormLabel>
            <Select id="question8" name="question8" value={formik?.values.question8} onChange={formik?.handleChange} error={formik?.errors.question8 && Boolean(formik?.touched.question8)}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Not sure">Not sure</MenuItem>
            </Select>
            <FormHelperText className="text-danger">{formik?.touched.question8 && formik?.errors.question8}</FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Step3;
