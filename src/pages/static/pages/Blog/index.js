import React from "react";
import { Outlet } from "react-router-dom";
function Blog() {
  return (
    <div>
      <div className="container pb-4">
        <div className="row g-3 justify-content-center">
          <div className="col-12 col-lg-10">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
