import React from "react";

const PageNotFound = () => {
  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <div className="d-flex flex-column align-items-center">
        <img
          src="https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif"
          alt=""
          style={{ maxWidth: "300px" }}
        />
        <h1 className="heroSubHeading  text-center">
          OOPS! Page not Found
        </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
