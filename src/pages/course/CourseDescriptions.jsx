import React from "react";
import CourseReview from "./CourseReview";

const CourseDescriptions = ({ course }) => {
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <div className="container">
      {/* top view  */}
      <div className="row pt-2 pt-lg-4 align-items-center">
        <div className="col-11">
          <h1 className="">{course?.course_name}</h1>
        </div>
      </div>
      <div className="border-top pb-3 pb-lg-4">
        <ul
          className="nav nav-pills-design-4 nav-pills"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item px-0 ms-0" role="presentation">
            <button
              className="nav-link active py-2 rounded-0"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
            >
              Description
            </button>
          </li>
          <li className="nav-item px-0 ms-0" role="presentation">
            <button
              className="nav-link py-2 rounded-0"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#learn"
              type="button"
              role="tab"
            >
              What will you learn
            </button>
          </li>
          <li className="nav-item ms-0" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
            >
              Reviews
            </button>
          </li>
        </ul>
        <div className="tab-content p-0">
          <div
            className="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <div className="py-4">
              <div className="quill-ls text-dark" dangerouslySetInnerHTML={createMarkup(course?.desc)} />
            </div>
          </div>
          <div
            className="tab-pane"
            id="learn"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <div className="py-4">
              <div className="quill-ls text-dark" dangerouslySetInnerHTML={createMarkup(course?.learn)} />
            </div>
          </div>
          <div
            className="tab-pane p-0"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
            <div className="py-4">
              <CourseReview courseId={course?.courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptions;
