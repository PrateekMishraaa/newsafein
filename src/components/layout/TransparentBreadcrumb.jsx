import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const TransparentBreadcrumb = ({ fullwidth, btn, heading, rightCol }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="border-top border-bottom bg-light">
      <div className="container py-3">
        <div className="row justify-content-between g-2">
          <div className={`${fullwidth ? "col-12" : "col"}`}>
            <div className="d-flex align-items-center">
              {btn ? (
                btn
              ) : (
                <IconButton className="border rounded fs-6" onClick={goBack}>
                  <ArrowBack />
                </IconButton>
              )}
              <h4 className="fs-3 text-lg-start text-capitalize ms-2">{heading}</h4>
            </div>
          </div>
          <div className="col text-lg-end">{rightCol}</div>
        </div>
      </div>
    </div>
  );
};
