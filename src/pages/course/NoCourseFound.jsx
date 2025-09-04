import React from "react";
const NoCourseFound = () => {
  return (
    <div className="row col-lg-12">
      <img src="https://glcloud.in/images/static/graphics/certificatefallback.webp" className="h-75 w-50 mx-auto d-block" alt="logo" style={{ objectFit: "contain" }} />
      <h3 className="text-center fw-semibold">No courses found</h3>
    </div>
  );
};

export default NoCourseFound;
