// require('dotenv').config();
import { FormatQuoteTwoTone } from "@mui/icons-material";
import { InstituteRegisterForm } from "components/auth";
import React from "react";
const InstituteRegister2 = () => {
  return (
    <>
      <div>
        <div className="row g-0">
          <div className="col-12 col-lg-7 bg-light-white2-grad">
            <div className="d-flex w-100 flex-column justify-content-around pt-5 h-100 min-vh-100">
              <div className="text-center mx-auto">
                <h2 className="fs-1">
                  <span className="text-primary">Institutional</span> Registration
                </h2>
                <p className="mt-4" style={{ maxWidth: 650 }}>
                  Step into the gateway of security with SafeInSchool (SIS) School Registration. Embark on your compliance journey by completing the essential fields and enrolling your institution. Extend the invitation to your stakeholders to explore an array of online modules on school safety and beyond. Join us today to safeguard the future of education.
                </p>
              </div>
              <div className="">
                <img src="/img/schoolsafety.png" alt="" className="w-100" style={{ height: "450px", objectFit: "contain" }} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            {/* Registration Form */}
            <div className="h-100 d-flex align-items-center justify-content-center">
              <InstituteRegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteRegister2;
