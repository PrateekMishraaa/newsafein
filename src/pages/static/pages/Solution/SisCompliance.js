import React from "react";
import {
  complianceimg2,
  complianceimg3,
  complianceimg4,
  complianceimg5,
  complianceimg6,
  complianceimg8,
} from "../../resources/img";
import Testimonial from "../../components/home/Testimonial";
import BottomCards from "../../components/home/BottomCards";
import FAQ from "../../components/home/FAQ";

const SisCompliance = () => {
  return (
    <div className="m-0 min-vh-100">
      {/* header  */}
      <div className="container">
        <div className="py-5 row justify-content-center align-items-center">
          <div className="col-lg-7">
            <h1 className="text-start heroHeading ">
              <span className="fs-6">Solutions / SIS Compliance</span>
              <br />
              Be accountable. Make your school safe.
            </h1>
          </div>
          <div className="col-lg-5">
            <div className="mx-auto">
              <p className="text-secondary">
                Comply with mandatory guidelines with SafeInSchool Compliance
                modules..
              </p>
              <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
                Get SIS Compliance{" "}
                <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="heroMain px-3 px-sm-5 py-5"
        style={{ background: " #fff8f1" }}
      >
        <div className="row justify-content-evenly align-items-center">
          <div className="col-lg-6 order-sm-2">
            <div className="rounded-5 p-0 m-0 imageContainer">
              <img
                src={complianceimg2}
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
          <div className="col-lg-6 order-sm-1">
            <p className="lh-1 text-muted fw-bold mt-4">
              What is SIS Compliance?
            </p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              A simpler, smarter way to comply with regulations.
            </h1>
            <p className="text-secondary mt-4">
              SIS Compliance provides easy-to-use tools to comply with
              government mandated safety guidelines for schools.
            </p>
          </div>
        </div>
      </div>

      {/* information sections  */}
      <div className="container">
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-lg-6 mb-4">
            <div className="rounded-5 p-0 m-0">
              <img
                src={complianceimg3}
                alt="values"
                width={"100%"}
                style={{
                  maxHeight: "600px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <p className="lh-1 text-muted fw-bold">Key features</p>
            <h1
              className="text-start  lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Create teams, manage inspections and meet safety standards
            </h1>
            <p className="mt-4">
              SIS Compliance lets you perform compliance tasks with ease and
              empowers school administration with a highly integrated
              collaborative platform to ensure physical, emotional and personal
              safety in school.
            </p>
            <ul className="feature fw-semibold  ">
              <li className="mb-2">
                Manage all aspects of school safety compliance through a single
                platform.
              </li>
              <li className="mb-2">
                Create teams of students, teachers and agencies and file
                inspection reports.
              </li>
              <li>
                Ensure 100 percent compliance with highly detailed information
                on each aspect.
              </li>
            </ul>
            <button className="btn btn-outline-type1 mt-4 fw-bold px-4 rounded-pill  py-3">
              View more Advantages{" "}
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* information cards  */}
      <div className="container">
        <div className="row align-items-center row-cols-1 row-cols-md-2 row-cols-lg-3 py-4">

          {/* single card  */}
          <div className="col">
            <div
              className="rounded-4 border  border-secondary p-4 d-flex flex-column justify-content-start my-2"
            >
              <div>
                <h2 className="">Evaluate your schools safety</h2>
                <p>
                  A step-by-step interactive module helps you find the pain points
                  and work on the same even before you start filling the
                  compliance sets.
                </p>
              </div>
            </div>
          </div>
          {/* single card  */}
          <div className="col">
            <div
              className="rounded-4 border border-secondary p-4 d-flex flex-column justify-content-start my-2"
            >
              <div>
                <h2 className="">Ensure safety readiness</h2>
                <p>
                  Timely notifications, reminders and prompts to ensure safety
                  readiness at all times. The platform automatically lists down
                  missing steps and informs school management so that you are
                  always aware of safety issues on the fly.
                </p>
              </div>
            </div>
          </div>
          {/* single card  */}
          <div className="col">
            <div
              className="rounded-4 border  border-secondary p-4 d-flex flex-column justify-content-start my-2"
            >
              <div>
                <h2 className="">Focus on what matters most</h2>
                <p>
                  Created to avoid unnecessary efforts and focussing only on
                  foundational elements of school safety mandated by the
                  Government.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section  */}
      <div className="container">
        <div className="section7Card1 col text-light py-5">
          <h1 className="text-start ">
            Ready to go?
          </h1>
          <div className="mx-auto">
            <p className="text-justify">
              Register through easy steps on this website and choose from a host
              of solutions.
            </p>
            <button className="btn btn-outline-dark fw-bold rounded-pill px-4 py-2">
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* section  */}
      <div className="px-2 px-sm-5 py-5" style={{ backgroundColor: "#2f4871" }}>
        <div className="container">
          <div className="text-white" style={{ maxWidth: "650px" }}>
            <p className="fs-5 text-white">
              Success Stories
            </p>
            <h1 className=" lh-1  text-white heroSubHeading">
              Transforming school safety in India
            </h1>
            <p className="text-white">
              Read inspiring stories on how schools are using SIS Compliance to
              create safer schools in India.
            </p>
          </div>
        </div>
        <div className="container ">
          <div className="row justify-content-between mt-5">
            {/* single card  */}
            <div
              className="section4Card col-md-4 col-12 bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 60%,black),url(${complianceimg4}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    SIS Compliance
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    SSSP
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Safe School
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="fw-semibold text-white">
                      Amity School Noida is one of the first schools in
                      Delhi-NCR to comply fully with SIS compliance.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* single card  */}
            <div
              className="section4Card col-md-4 col-12  bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 60%,black),url(${complianceimg5}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    SIS Learning
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Physical Safety
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Transport
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="fw-bold text-white">
                      How Apeejay school trained students on schoolbus safety.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* single card  */}
            <div
              className="section4Card col-md-3 col-12  bg-light rounded-4 mb-4  p-4 d-flex flex-column align-items-center justify-content-end"
              style={{
                background: `linear-gradient(transparent 60%,black),url(${complianceimg6}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    SIS Certifications
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Emotional Safety
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Sexual abuse
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="fw-bold text-white">
                      SIS Certification on POCSO Act is what every counsellor
                      needs.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-outline-type2 fw-bold rounded-pill px-4 mt-4 py-3">
          <span className="d-inline-block">
            View all case studies
            <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
          </span>
        </button>
      </div>

      <Testimonial />

      {/* section  */}
      <div
        className="heroMain px-3 py-5 px-sm-5"
        style={{ background: " #34507c" }}
      >
        <div className="row justify-content-evenly align-items-center">
          <div className="col-lg-6">
            <p className="lh-1 fw-bold text-white">SIS Compliance App</p>
            <h1
              className="text-start lh-1  text-white"
              style={{ marginTop: " -10px" }}
            >
              Now file reports to the District Administration through SIS
            </h1>
            <p className="text-light mt-4">
              Submit compliance and inspection reports directly to the district
              authorities through the SIS App.
            </p>
            <button className="btn btn-outline-type2 fw-bold rounded-pill px-4 mt-4 py-2">
              Learn more
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
          <div className="col-lg-6">
            <img
              src={complianceimg8}
              alt="news img"
              width={"100%"}
              className="rounded-5 shadow"
              style={{ height: "60vh", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <FAQ />

      <BottomCards />
    </div>
  );
};

export default SisCompliance;
