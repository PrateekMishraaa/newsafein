import React from "react";
import { learningimg1, learningimg3, learningimg4, learningimg5, learningimg6, learningimg7 } from "../../resources/img";
import { Button } from "@mui/material";
import { ArrowForwardSharp } from "@mui/icons-material";

const SisLearning = () => {
  return (
    <div className="min-vh-100">
      {/* header  */}
      <div className="container py-5">
        <div className="row align-items-start g-3">
          <div className="col-md-7">
            <h3 className="text-start ">
              <span className="fs-6">Solutions / SIS Learning</span> <br />
              Everything you ought to learn about school safety
            </h3>
          </div>
          <div className="col-md-5">
            <div>
              <p className="text-secondary">
                We’ve created comprehensive eLearning experiences on school safety aimed at preparing more informed stakeholders.
              </p>
              <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
                View topics <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="heroMain px-3 py-5 px-sm-5" style={{ background: " #fff8f1" }}>
        <div className="row justify-content-evenly align-items-center">
          <div className="col-md-6 order-sm-2">
            <div className="rounded-5 p-0 m-0 imageContainer">
              <img
                src={learningimg1}
                alt="compliace"
                className="rounded-4"
                style={{
                  maxHeight: "600px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-6 order-sm-1 mt-3">
            <p className="lh-1 text-muted fw-bold">What is SIS LMS?</p>
            <h1 className="text-start heroSubHeading lh-1 ">
              Intelligent training solution for safer schools
            </h1>
            <p className="text-secondary mt-4">
              SIS LMS automatically differentiates users and provides relevant training and workshop modules that cover all aspects of school safety.
            </p>
          </div>
        </div>
      </div>

      {/* information sections  */}
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 align-items-center px-3 py-5 px-sm-5">
          <div className="col">
            <div className="rounded-5 p-0 m-0">
              <img
                src={learningimg3}
                alt="values"
                width={"100%"}
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col">
            <p className="lh-1 text-muted fw-bold">Key features</p>
            <h3 className="text-start lh-1 " style={{ marginTop: " -10px" }}>
              Packed with all the features
            </h3>
            <p>
              School safety is an exhaustive topic but we’ve aimed at achieving key learning outcomes that are necessary to meet mandated standards.
              This makes each training short, crisp and to the point. Moreover, interactive elements make learning about school safety so much fun.
            </p>
            <ul className="feature">
              <li>Whole school and multi-sectoral approach to training</li>
              <li>Separate training modules for school staff, students and parents.</li>
              <li>Supported by interactive elements like Q&A, Quiz, Audio and Video.</li>
              <li>Training on all key aspects of school safety.</li>
              <li>Instant results visible only to school admin.</li>
              <li>Extremely safe and secure.</li>
            </ul>
            <button className="btn btn-outline-type1 mt-4 fw-bold px-4 rounded-pill  py-3">
              View more Advantages <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* information cards  */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-center px-3 py-5 px-sm-5">
          {/* single card  */}
          <div className="col">
            <div className="rounded-4 border shadow-sm p-3 p-lg-4">
              <h3 className="">All Included</h3>
              <p>Schools admins can themselves add users, create teams and access compliance modules through an integrated admin platform.</p>
            </div>
          </div>
          {/* single card  */}
          <div className="col">
            <div className="rounded-4 border shadow-sm p-3 p-lg-4">
              <h3 className="">Secure and scalable</h3>
              <p>
                Enhanced safety features like OTP verification of each user on email and phone ensures complete peace of mind. Whether it is one user
                or thousands of users, you can protect student privacy, meet compliance requirements or restrict access to certain users, it's all on
                your fingertips.
              </p>
            </div>
          </div>
          {/* single card  */}
          <div className="col">
            <div className="rounded-4 border shadow-sm p-3 p-lg-4">
              <h3 className="">Accessible for all</h3>
              <p>
                Allows schools to add their staff, students and their parents through a dedicated dashboard therefore allowing access to all
                stakeholders without any interference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* section  */}
      <div className="container">
        <div className="section7Card1 col-lg-8 text-light p-5 rounded-4 me-sm-4 mb-4">
          <h1 className="text-start " style={{ fontFamily: "DM Serif Display" }}>
            Step-by-step process
          </h1>
          <div className="mx-auto">
            <p className="text-justify">
              SIS processes are designed for ease of use. Prompts for next steps make navigating and accessing various features extremely easy.
            </p>
            <Button className="rounded-4 text-capitalize" color="warning" size="large" variant="outlined" endIcon={<ArrowForwardSharp />}>Learn More</Button>
          </div>
        </div>
      </div>

      {/* section  */}
      <div className="heroMain px-3 py-5 px-sm-5" style={{ background: " #fff8f1" }}>
        <div className="row justify-content-evenly align-items-center">
          <div className="col-md-6">
            <div className="rounded-5 p-0 m-0 imageContainer">
              <img
                src={learningimg4}
                alt="compliace"
                className="rounded-4 mx-auto d-block"
                width="80%"
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <h1 className="text-start heroSubHeading lh-1 " style={{ marginTop: " -10px" }}>
              Industry validation and trusted learning partner
            </h1>
            <p className="text-secondary mt-4">
              Trusted and validated by top educational institutions and government agencies, our platform has won countless awards for innovation and
              impact.
            </p>
            <button className="btn btn-outline-type1 mt-4 fw-bold px-4 rounded-pill  py-3">
              See our awards <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* section  */}
      <div className="px-2 px-sm-5 py-5">
        <div className="container">
          <div className="" style={{ maxWidth: "750px" }}>
            <p className="fs-5" style={{ marginBottom: " -3px" }}>
              One Platform. Endless possibilities
            </p>
            <h1 className=" lh-1   heroSubHeading">Build mandatory school safety teams with us</h1>
            <p>
              Learn more about how you can create dedicated teams of teachers, students, parents and child safety authorities as prescribed by safety
              guidelines.
            </p>
          </div>
        </div>
        <div className="container">
          <div className=" row justify-content-between mt-5">
            {/* single card  */}
            <div
              className="section4Card col-md-4 col-12 bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 20%,black),url(${learningimg5}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <h3 className=" fw-bold text-warning">Students</h3>
                    <p className="fw-semibold text-white">Army Schools lead the way by becoming the first schools in India to implement ADOPT CSS and SIS compliance.</p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* single card  */}
            <div
              className="section4Card col-md-4 col-12  bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 20%,black),url(${learningimg6}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <h3 className=" fw-bold  text-warning">Teaching and non-teaching staff</h3>
                    <p className="fw-bold text-white">
                      Training and certifications for school staff to help them become flag bearers of school safety and also grow professionally.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* single card  */}
            <div
              className="section4Card col-md-3 col-12 bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 20%,black),url(${learningimg7}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <h3 className=" fw-bold  text-warning">Multi-sectoral approach</h3>
                    <p className="fw-bold text-white">Bring members of society, RWAs and authorities on your school safety journey.</p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SisLearning;
