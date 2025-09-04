import React from "react";

const CourseNotFound = ({ text }) => {
  return (
    <div className="text-center">
      <img src="https://glcloud.in/images/static/graphics/certificatefallback.webp" alt="not found" className="w-100" style={{ maxWidth: 350 }} />
      <h5>{text}</h5>
    </div>
  );
};

export default CourseNotFound;
