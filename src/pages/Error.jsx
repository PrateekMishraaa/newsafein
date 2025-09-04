import React from "react";

const Error = () => {
  return (
    <div className="mt-5 p-1">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <img
            src={"/images/notfound.jpg"}
            alt=""
            className="height-400 d-block w-100"
          />
          <button
            className="btn btn-primary-outline"
            onClick={() => window.history.back()}
          >
            {/* minor change  */}
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
