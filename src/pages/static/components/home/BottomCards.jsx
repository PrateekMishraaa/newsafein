import { Call } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BottomCards = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        <div className="col">
          <div className="border p-3 p-lg-4 rounded-4 h-100 shadow-sm bg-light-white2-grad">
            <h3 className="text-start ">Ready to go?</h3>
            <div className="mx-auto">
              <p className="text-justify">
                Register through easy steps on this website and choose from a
                host of solutions.  
              </p>
              <Button
                size="large"
                variant="contained"
                color="error"
                className="text-capitalize rounded"
                onClick={() => navigate("/login")}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border p-3 p-lg-4 rounded-4 h-100 shadow-sm  bg-light-maroon-grad">
            <h3 className="text-start ">Need advice?</h3>
            <div className="mx-auto">
              <p className="text-justify">
                Have any questions on how SafeInSchool works? Not sure which
                solution is right for you? Call our helpline number and we will
                be happy to answer all your questions.
              </p>
              <Button
                size="large"
                variant="contained"
                color="success"
                className="text-capitalize rounded"
                startIcon={<Call />}
              >
                <a href="tel: +91 9560771911" style={{ color: "white" }}>
                  +91 9560771911
                </a>
              </Button>{" "}
              <br />
              <span className="text-white fw-semibold mt-2">
                (Working hours - 10am - 5pm, Mon-Sat)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCards;
