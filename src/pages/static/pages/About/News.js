import React from "react";

const News = () => {
  return (
    <div className="min-vh-100">
      <div className="container px-3 py-5 px-sm-5 row justify-content-start align-items-start">
        <div className="col-md-7 p-3">
          <p className="fw-semibold text-muted d-flex align-items-center">
            <img src="./img/listIcon.png" alt="listIcon" className="me-2" />{" "}
            News
          </p>
          <h1 className="text-start heroHeading  lh-1">
            Catch up on the latest news, success stories and more.
          </h1>
        </div>
        <div className="col-md-5">
          <h1 className="text-start herosubHeading  mt-4">Categories</h1>
          <select
            className="form-select form-select-lg mb-3 w-100"
            aria-label=".form-select-lg example"
          >
            <option selected>Select Category</option>
            <option value="school safety">School Safety</option>
            <option value="certification">Certification</option>
          </select>
        </div>
      </div>

      {/* All news Container  */}
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          {/* single News Item  */}
          <div style={{ maxWidth: "350px" }} className=" mb-4 mx-2">
            <div
              className=" bg-light rounded-4 p-4 d-flex flex-column justify-content-end"
              style={{
                height: "350px",
                background: "url(./img/testimonial3.webp) no-repeat center",
                backgroundSize: "cover",
              }}
            >
              <div>
                <p>
                  <span className="quality px-3 mb-2 py-2 d-inline-block rounded-pill text-muted m-1">
                    Compliance
                  </span>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    NCPCR
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Physical Safety
                  </span>
                </p>
              </div>
            </div>
            <div className="fw-semibold">
              <p className="text-secondary my-2">22Aug 2022</p>
              <p style={{ color: "#34507c", textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
                dolorum necessitatibusbjdb bdsjksj
              </p>
            </div>
          </div>
        </div>
        {/* pagination bar */}
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example ">
            <ul className="pagination">
              <li className="me-3">
                <a
                  className="page-link    rounded bg-primary bg-opacity-50 text-white border-0"
                  href="/"
                >
                  first
                </a>
              </li>
              <li className="page-item">
                <a className="page-link rounded-start " href="/">
                  <i className="bi bi-caret-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link rounded-end" href="/">
                  <i className="bi bi-caret-right"></i>
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="page-link  rounded bg-primary bg-opacity-50 text-white border-0"
                  href="/"
                >
                  Last
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News;
