import React from "react";
import {
  communityimg1,
  communityimg2,
  communityimg3,
  communityimg5,
} from "../../resources/img";
import { Link } from "react-router-dom";
// import newsimg from "../../img/old/newsletter-illustration-concept_114360-767.png";

const Community = () => {
  return (
    <div>
      {/* header  */}
      <div className="container">
        <div className="py-5 row justify-content-center">
          <div className="col-lg-7">
            <h1 className="text-start heroHeading ">
              It takes a village to make a school safe
            </h1>
          </div>
          <div className="col-lg-5">
            <p className="text-secondary">
              Safe school is only possible when all stakeholders namely,
              teachers, students, parents, authorities and members of society
              work together. Our platform is built to be used by everyone who
              wants to participate in making your school truly safe.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              <Link to="/registration">
                Get SafeInschool
                <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* other points  */}
      <div className="container">
        {/* Our values  */}
        <div className="py-5 row align-items-center py-3 py-sm-5">
          <div className="col-lg-6">
            <div className="rounded-5 p-0 m-0">
              <img
                src={communityimg1}
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
          <div className="col-lg-6">
            <p className="lh-1 text-muted fw-bold">
              Get aligned with the objective of creating safe schools
            </p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Collaborate for safety
            </h1>
            <p className="text-secondary mt-4">
              Get trained, certified and involved. Schools are encouraged to
              involve all stakeholders to become active contributors towards
              overall school safety. Whether you're a teacher, student, parent
              of a chosen member of the civil society you can also participate
              and share thoughts and ideas, questions or content on our forums.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Explore Forums{" "}
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
        {/* Our partners  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-lg-6 order-1 order-sm-2 mb-4">
            <div className="rounded-5 p-0 m-0">
              <img
                src={communityimg2}
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
          <div className="col-lg-6 order-2 order-sm-1">
            <p className="lh-1 text-muted fw-bold">Parents</p>
            <h1 className="text-start heroSubHeading lh-1 ">SIS Parenting</h1>
            <p className="text-secondary mt-4">
              Join our learning hub for parents and become aware of best
              practices in child safety. Ensure that your school is always
              following mandatory guidelines and help the school take informed
              decisions.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Start learning
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>

        {/* Our Awards  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-lg-6">
            <div className="rounded-5 p-0 m-0">
              <img
                src={communityimg3}
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
          <div className="col-lg-6">
            <p className="lh-1 text-muted fw-bold">Students</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              SIS Hub
            </h1>
            <p className="text-secondary mt-4">
              Create teams and learn together about various aspects of
              infrastructure and psychosocial safety that are crucial for each
              school. Join conversions and create forum threads to further
              enhance safety of your school.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Get Started
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>

        {/* Our commitment  */}
        <div className="row justify-content-evenly align-items-center py-3 py-sm-5">
          <div className="col-lg-6 order-1 order-sm-2">
            <div className="rounded-5 p-0 m-0 mb-4">
              <img
                src={communityimg5}
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
          <div className="col-lg-6 order-2 order-sm-1">
            <p className="lh-1 text-muted fw-bold">Teachers</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              SIS Teaching
            </h1>
            <p className="text-secondary mt-4">
              Become role models for students through an empathetic approach to
              child safety. Guide your students in the right direction by
              working with them in the Hub to ensure your school meets and
              exceeds government norms.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Show how
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* section3 */}
      {/* <div className="section2 text-light px-3 py-5 px-sm-5">
        <div className="w-sm-50">
          <p className="fs-5" style={{ marginBottom: " -3px" }}>
            Join us on November 21-23
          </p>
          <h1 style={{ fontFamily: "DM Serif Display" }}>
            SIS Community Meet 2022
          </h1>
          <p style={{ maxWidth: " 450px" }}>
            We are excited to welcome you all back to New Delhi for the first
            SIS Community Meet! SIS users, newcomers, educators, workplace
            trainers, administrators and developers will come together to share
            findings and explore best practices in school safety. Learn more
          </p>
          <button className="btn text-light border-light btn-outline-type2 fw-bold rounded-pill px-4 mt-4 py-2">
            Learn More
            <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
          </button>
        </div>
      </div> */}
      {/* section4 */}
      <div className="container py-5">
        <p>Get involved</p>
        <h1 className="heroSubHeading  " style={{ maxWidth: "600px" }}>
          Contribute to the SIS community
        </h1>

        {/* -------- */}
        <div>
          {/* single event  */}
          <div className="p-4 border rounded-4 row align-items-center my-3">
            <div className="col-10">
              <h5>Attend an Event</h5>
              <p>
                Want to get involved or share new learning experiences with the
                SIS community. We have regular events going across whether it's
                online or offline, and you are invited.
              </p>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <i className="bi bi-arrow-right-circle fs-1 d-block"></i>
            </div>
          </div>
          {/* single event  */}
          <div className="p-4 border rounded-4 row align-items-center my-3">
            <div className="col-10">
              <h5>RWAs</h5>
              <p>
                Are you a member of an RWA? Want to learn more about government
                guidelines and key child safety issues? Find all the information
                on how you can access SIS and get involved.
              </p>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <i className="bi bi-arrow-right-circle fs-1 d-block"></i>
            </div>
          </div>
          {/* single event  */}
          <div className="p-4 border rounded-4 row align-items-center my-3">
            <div className="col-10">
              <h5>Non-teaching staf</h5>
              <p>
                Non-teaching staff is at the centre of child safety in schools.
                If you are part of the security team, transportation, sanitation
                or support staff then there is much to learn about school safety
                on the SIS Learning app.
              </p>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <i className="bi bi-arrow-right-circle fs-1 d-block"></i>
            </div>
          </div>
          {/* single event  */}
          <div className="p-4 border rounded-4 row align-items-center my-3">
            <div className="col-10">
              <h5>SafeInSchool Partnerships</h5>
              <p>
                Join hands with safeinschool by becoming a partner and support
                us in our mission to make every school in India meet the basic
                statutory safety requirements.
              </p>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <i className="bi bi-arrow-right-circle fs-1 d-block"></i>
            </div>
          </div>
        </div>
      </div>
      {/* News  */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <p className="lh-1 text-muted fw-bold">SIS news</p>
            <h1
              className="text-start heroSubHeading lh-1 "
              style={{ marginTop: " -10px" }}
            >
              Subscribe to our monthly newsletter
            </h1>
            <p className="text-secondary mt-4">
              Read community news and announcements about SIS solutions,
              services, and events.
            </p>
            <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
              Signup
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </button>
          </div>
          <div className="col-lg-6">
            {/* <img
              src={"/img/old/newsletter-illustration-concept_114360-767.png"}
              alt="news img"
              style={{ maxHeight: "550px" }}
              width={"100%"}
              className="rounded-5 shadow"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
