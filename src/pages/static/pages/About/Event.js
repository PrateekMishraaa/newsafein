import React from "react";

const Event = () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
    >
      <div className="container p-5 row justify-content-start">
        <div className="col-md-7 p-3">
          <p className="fw-semibold text-muted d-flex align-items-center">
            <img src="./img/listIcon.png" alt="listIcon" className="me-2" />{" "}
            Events
          </p>
          <h1 className="text-start heroSubHeading ">
            SIS events happening soon!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Event;
