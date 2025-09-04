import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ComplianceProgress(props) {
  const colorSwitch = (val) => {
    let color = "error";
    if (val >= 50 && val < 80) {
      color = "primary";
    }
    if (val >= 80) {
      color = "success";
    }
    return color;
  };
  return (
    <div className="d-flex align-items-center">
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress color={colorSwitch(props.value)} size={"large"} variant="determinate" {...props} sx={{ width: 80, height: 80 }} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant="caption" component="div" color="text.secondary" className="fs-6 text-dark fw-bold">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
      <div className="p-2">
        <h5 className="fw-bold">Compliance Progress</h5>
      </div>
    </div>
  );
}
