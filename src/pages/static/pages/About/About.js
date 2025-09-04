import React from "react";
import { useEffect, useState } from "react";
import { apiJsonAuth } from "api";

import {
  aboutimg1,
  aboutimg2,
  aboutimg3,
  aboutimg4,
  aboutimg5,
} from "../../resources/img";
import RecordsBar from "../../components/home/RecordsBar";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  async function getAllMember() {
    try {
      const result = await apiJsonAuth.get("team/getAllMember");
      if (result.status === 200) {
        setTeamMembers(result?.data?.getAllNewMember);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAllMember();
  }, []);

  return (
    <div>
      {/* section1  */}
      <div className="container">
        <div className="px-3 py-5 px-sm-5 row justify-content-center">
          <div className="col-md-8">
            <p className="fw-semibold text-muted d-flex align-items-center">
              <img src="./img/listIcon.png" alt="listIcon" className="me-2" />{" "}
              About Us
            </p>
            <h1 className="text-start heroSubHeading ">
              Creating safer schools for a better future
            </h1>
          </div>
          <div className="col-md-4 p-3">
            <div className="mx-auto">
              <p className="text-justify text-secondary">
                SafeInSchool provides innovative solutions to schools that
                transform and empower schools to be truly safe and meet and
                exceed safety standards.
              </p>
              <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
                Get the app
                <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* main image  */}
      <div>
        <img
          src={aboutimg1}
          alt="main"
          style={{ maxHeight: "80vh", width: "100%", objectFit: "cover" }}
        />
      </div>

      {/* mission  */}
      <div className="container">
        <div className=" px-3 py-5 px-sm-5 row justify-content-center">
          <div className="col-md-7">
            <small className="fw-semibold">
              <i className="bi bi-circle-fill me-2 text-warning"></i>Our mission
            </small>
            <h1 className="text-start heroSubHeading ">
              Empowering schools to be safer through innovation.
            </h1>
          </div>
          <div className="col-md-4 p-3">
            <div className="mx-auto">
              <p className="text-justify text-secondary">
                SafeInSchool aims to bring technology solutions that will become
                the backbone of school safety in thousands of schools.
              </p>
            </div>
          </div>
        </div>
        <RecordsBar />
      </div>

      {/* other points  */}
      <div className="container">
        {/* Our values  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-md-5 mb-4">
            <div className="rounded-5 p-0 m-0">
              <img
                src={aboutimg2}
                className="rounded-5 shadow"
                alt="values"
                width={"100%"}
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-5">
            <p className="lh-1 text-muted fw-bold">Our Values</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Equitable safety standards in every school.
            </h1>
            <p className="text-secondary mt-4">
              Whether you are a small school or a chain of educational
              institutions, when it comes to safety it is important to have
              uniform safety processes that meet government regulations. At
              SafeInSchool, we are creating just that, a world where every
              school safety is equitable and homogenised.
            </p>
            <p className="text-secondary">
              Our solutions are built keeping in mind the latest regulatory
              requirements and ensuring that our partner schools get access to
              fail safe procedures to evaluate and enhance their schools safety
              standards.
            </p>
          </div>
        </div>

        {/* Our partners  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-md-5 order-1 order-sm-2 mb-4">
            <div className="rounded-5 p-0 m-0">
              <img
                src={aboutimg3}
                className="rounded-5 shadow"
                alt="partners img"
                width="100%"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-5 order-2 order-sm-1">
            <p className="lh-1 text-muted fw-bold">Our Partners</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Collaborating for safer schools
            </h1>
            <p className="text-secondary mt-4">
              Our platform is constantly evolving. We are proud of our partners
              who help us grow and expand into aspects of school safety that we
              previously thought were not possible.
            </p>
            <p className="text-secondary">
              When we talk about our partners, they include government, schools,
              industry and individuals with whom we collaborate regularly to
              improve our solutions and get closer to our objectives. Connect
              with us to partner in our journey towards our mission and see how
              we can help each other
            </p>
          </div>
        </div>

        {/* Our Awards  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-md-5 mb-4">
            <div className="rounded-5 p-0 m-0">
              <img
                src={aboutimg4}
                className="rounded-5 shadow"
                alt="values"
                width={"100%"}
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-5">
            <p className="lh-1 text-muted fw-bold">Our awards</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Awards and recognition
            </h1>
            <p className="text-secondary mt-4">
              Trusted and validated by top educational institutions and
              government agencies, our platform has won countless awards for
              innovation and impact.
            </p>
          </div>
        </div>

        {/* Our commitment  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-md-5 order-1 order-sm-2">
            <div className="rounded-5 p-0 m-0 mb-4">
              <img
                src={aboutimg5}
                className="rounded-5 shadow"
                alt="partners img"
                width="100%"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-5 order-2 order-sm-1">
            <p className="lh-1 text-muted fw-bold">Our commitment</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Creating technology that empowers schools
            </h1>
            <p className="text-secondary mt-4">
              Our technology is created for complete peace of mind for schools.
              From physical safety to cyber security, from infrastructure to
              psychosocial wellbeing, if it's about school safety we have you
              covered.
            </p>
            <p className="text-secondary">
              Our solutions aim towards covering all aspects of safety in school
              by creating responsibility and accountability without any direct
              intervention. Through our solutions schools can make more informed
              decisions and create more value for their stakeholders at the same
              time.
            </p>
          </div>
        </div>
      </div>

      {/* Team option */}
      {teamMembers?.length > 0 && (
        <div className="container mb-4 text-center">
          <p
            class="h2 heroSubHeading lh-1 fw-bold mb-4"
            style={{ color: "#273a52" }}
          >
            Team Members
          </p>
          <div className="row">
            {teamMembers?.map((data, i) => {
              return (
                <div
                  key={data?.id}
                  className="col-12 col-lg-3 col-md-6 rounded-4 p-4"
                >
                  <div
                    className="card p-0 m-0 border-1"
                    style={{ borderRadius: "26px" }}
                  >
                    <div className="card-body p-0 m-0">
                      <div
                        style={{
                          height: "300px",
                        }}
                        className="team-img mb-2"
                      >
                        <img
                          className="h-100 w-100"
                          style={{
                            objectFit: "cover",
                            borderRadius: "26px 26px 0 0",
                          }}
                          src={data?.profile}
                          alt=""
                        />
                      </div>

                      <div
                        className="d-flex flex-column"
                        style={{ borderRadius: "0 0 26px 26px" }}
                      >
                        <span class="h5 fw-bold">{data?.name}</span>
                        <span class="h6 text-secondary">
                          {data?.degination}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* career option  */}
      <div className="py-5 " style={{ backgroundColor: "#fff8f1" }}>
        <div className="container">
          <div className="row align-items-center justify-content-evenly">
            <div className="col-12 col-sm-5">
              <h1 className="heroSubHeading ">
                Interested in working with us?
              </h1>
              <p>
                Want to play a role in improving school safety? Explore career
                opportunities at SafeInSchool.
              </p>
              <button className="btn btn-outline-type1 px-4 py-2 rounded-pill">
                Explore Career
              </button>
            </div>
            <div className="col-12 col-sm-5"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
