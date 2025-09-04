import React from "react";
import { complianceimg2 } from "../../resources/img";
import BottomCards from "../../components/home/BottomCards";

const SisCertification = () => {
  return (
    <div>
      {/* header  */}
      <div className="container py-5 px-3 px-sm-5 row justify-content-center">
        <div className="col-md-7">
          <h6>Solutions / Certifications</h6>
          <h1 className="text-start heroHeading ">
            Become a certified school safety expert.
          </h1>
        </div>
        <div className="col-md-5">
          <div className="mx-auto">
            <p className="text-justify text-secondary">
              Choose from a range of certifications and become an expert
              contributor to a safe and healthy environment in schools.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Find a Certification
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className="heroMain py-5 px-3 px-sm-5"
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
          <div className="col-lg-6 order-sm-1 mt-4">
            <h1
              className="text-start  lh-1  mt-3"
              style={{ marginTop: " -10px" }}
            >
              Credentials that meet and exceed Government requirements
            </h1>
            <p className="text-secondary mt-4">
              An SIS certification guarantees a holistic approach towards
              aspects of school safety that goes beyond minimum safety and
              security standards. Every SIS Certification training is created
              keeping in mind both Indian and International Standards in school
              safety. These certifications will provide a distinct advantage to
              the individual and give them the edge and confidence to approach
              school safety professionally.
            </p>
          </div>
        </div>
      </div>

      {/* section  */}
      <div className="px-2 py-5 p-sm-5">
        <div className="container">
          <div className="" style={{ maxWidth: "650px" }}>
            <p className="fs-5" style={{ marginBottom: " -3px" }}>
              Topics
            </p>
            <h1 className=" lh-1   heroSubHeading">
              Transforming school safety in India
            </h1>
            <p>
              Read inspiring stories on how schools are using SIS Compliance to
              create safer schools in India.
            </p>
          </div>
        </div>
        <div className="container">
          <div className=" row justify-content-between mt-5 fw-semibold">
            {/* single card  */}
            <div className="section4Card col-md-4 rounded-4 mb-4 p-4 d-flex flex-column justify-content-end">
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    Trainings
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    POCSO
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Sexual abuse
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="text-white">
                      Evaluate if the existing safeguards against child sexual
                      abuse are sensitive enough to listen to voices of
                      children.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* single  card  */}
            <div className="section4Card col-md-4 rounded-4 mb-4  p-4 d-flex flex-column justify-content-end">
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    Compliance
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Emotional safety
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Anti-bullying committee
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="text-white">
                      See how an anti-bullying committee in school is much more
                      than statutory guidance.
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* single card  */}
            <div className="section4Card col-md-3 rounded-4 mb-4 p-4 d-flex flex-column justify-content-end">
              <div>
                <p>
                  <span className="quality px-3 py-2 d-inline-block rounded-pill text-muted m-1">
                    Topics
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Fire safety
                  </span>
                  <span className="quality d-inline-block px-3 py-2 rounded-pill text-muted m-1">
                    Awareness
                  </span>
                </p>
                <div className="d-flex align-items-center hoverableText p-2">
                  <div>
                    <p className="text-white">
                      A spotlight on Fire Safety: Fire Safety Awareness Team
                    </p>
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
          View all topics <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
        </button>
      </div>
      {/* features section  */}
      <div>
        <div className="container">
          <div className="" style={{ maxWidth: "750px" }}>
            <p className="fs-5" style={{ marginBottom: " -3px" }}>
              SIS Certification Advantage
            </p>
            <h1 className=" lh-1   heroSubHeading">
              Why schools need SIS Certified individuals
            </h1>
            <p>
              Government of India guidelines make it mandatory for schools to
              achieve a bare minimum school safety standard failing to which
              action can be taken against the school. With schools being
              accountable towards their safety, it is a responsibility of the
              school to take school safety seriously. SIS Certifications is a
              collaborative platform that assists schools in retraining their
              resources to become professionals in various aspects of school
              safety and helps them create a safer school environment to meet
              statutory requirements.
            </p>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-evenly">
            <div
              className="d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-brightness-alt-high fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">
                  Multimedia Interactive Resources
                </h5>
                <small>
                  Get access to workshops, webinars, podcasts and much more.
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi  bi-diamond-half fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Evaluate school safety</h5>
                <small>
                  With certified professionals schools can correctly evaluate
                  their safety standards
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-balloon-heart fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Collaborative approach</h5>
                <small>
                  Emphasise on multi-sectoral approach help socialise other
                  stakeholders on school safety
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-book-half fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Manage school safety</h5>
                <small>
                  With demonstrated safety management skills schools can depend
                  on a certified professional
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-bank fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Boost child safety</h5>
                <small>
                  With certified professionals inside the school premises each
                  child becomes more secure.
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-bar-chart-line-fill fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Maintain safety standards</h5>
                <small>
                  Certified individuals help schools make informed decisions to
                  maintain safety standards
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-boxes fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Get peace of mind</h5>
                <small>
                  Having certified professionals as stakeholders schools can
                  depend on them in need
                </small>
              </div>
            </div>
            <div
              className=" bg-light mx-2 my-3 d-flex flex-column justify-content-evenly p-3 rounded-4 shadow-sm"
              style={{ width: "280px", minHeight: "200px" }}
            >
              <i className="bi bi-camera-reels-fill fs-3 text-secondary"></i>{" "}
              <div>
                <h5 className=" text-secondary">Professional outlook</h5>
                <small>
                  Additional trainings to handle child safety against
                  psychosocial and emotional setting
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCards />
    </div>
  );
};

export default SisCertification;
