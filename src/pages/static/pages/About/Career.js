import React from "react";

import { careerimg1 } from "../../resources/img";

const Career = () => {
  let principleData = [
    {
      id: 1,
      icon: "bi-book-half",
      title: "Learning",
      description:
        "We are all learning together. We encourage people who want to learn about new things and can quickly use that learning to create solutions that are innovative and creative.",
    },
    {
      id: 2,
      icon: "bi-brightness-alt-high-fill",
      title: "Simplicity",
      description:
        "We try to simplify complex things for our customers and we follow the same philosophy in our workplace. Try and keep things simple to avoid confusion, right from work relationships to how you approach clients. Simple is always better.",
    },
    {
      id: 3,
      icon: "bi-people",
      title: "Shared responsibility",
      description:
        "We may work through different departments and processes but we share the responsibility to keep our values aligned with that of the company. When we share responsibilities we expect our employees to be self motivated and aligned to the overall objectives when approaching at work..",
    },
    {
      id: 4,
      icon: "bi-award",
      title: "Collaboration",
      description:
        "Ask questions, talk regularly and always keep in touch. We encourage teams to collaborate internally and externally. Always connect with fellow employees and customers whenever you can and clarify your doubts instead of taking uninformed decisions. ",
    },
    {
      id: 5,
      icon: "bi-123",
      title: "Sensitivity",
      description:
        "Be sensitive towards fellow employees and never take anyone for granted. Our company treats all employees with equal respect irrespective of their designation. Any action that is against ethics, honesty and fairness should be deemed against our work culture. ",
    },
  ];

  return (
    <div>
      {/* header  */}
      <div className="header">
        <div className="container">
          <div className="px-3 py-5 px-sm-5 row justify-content-center">
            <div className="col-md-7">
              <p className="fw-semibold text-muted d-flex align-items-center">
                <img src="./img/listIcon.png" alt="listIcon" className="me-2" />{" "}
                Career
              </p>{" "}
              <h1 className="text-start heroSubHeading ">
                Careers at SafeInSchool
              </h1>
            </div>
            <div className="col-md-5 p-3">
              <div className="mx-auto">
                <p className="text-justify text-secondary">
                  We are looking for the best talent to join us in our
                  endeavours. If you are an enthusiastic, self driven and
                  talented individual we have plenty of opportunities for you to
                  grow with us. Join our exceptional pool of talent and let's
                  start making schools in India safe.
                </p>
                <button className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-2">
                  Job openings
                  <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={careerimg1}
          alt="career at sis depiction"
          style={{
            width: "100%",
            maxHeight: "60vh",
            objectFit: "cover",
            objectPosition: "right top",
          }}
        />
      </div>

      {/* sis benefits  */}
      <div className="container">
        <div className="px-3 py-5 px-sm-5 row justify-content-start">
          <div className="col-md-7">
            <h6>HR principles</h6>
            <h1 className="text-start heroSubHeading ">
              Ideas unlimited.
            </h1>
            <p className="text-justify text-secondary">
              One of the key values of our HR practices is ‘growing mindsets’,
              which means we invest in people who are constantly evolving with
              ideas and never stop learning.
            </p>
          </div>
        </div>
        <div className="row align-items-center justify-content-evenly">
          {principleData.map(function (data) {
            return (
              <div
                className="col-10 col-sm-5 bg-light shadow p-4 rounded-4 my-3"
                key={data.id}
              >
                <i className={`bi ${data.icon} fs-1 text-secondary`}></i>
                <h5 className="fw-semibold">{data.title}</h5>
                <p>{data.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
