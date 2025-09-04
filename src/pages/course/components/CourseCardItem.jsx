import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const CourseCardItem = ({ courses, addTOWishlist, enrolled, status }) => {
  return (
    <>

      <div
        className={`col ${status}`}
        style={{ overFlow: " hidden !important" }}
      >
        <div className="course-container course-card h-100 rounded-2 shadow-sm p-2 p-lg-3 bg-white border">
          {/* <div className="row g-2 justify-content-between"> */}

          <div className="d-flex flex-column justify-content-between h-100 w-100">
          <div>
            <div className="col-12">
              <img
                src={courses?.thumbnail}
                className="rounded d-block w-100 img-cover"
                alt=""
              />
            </div>
            
              <div style={{ border: "px solid red"}}>
              <div className="course-details font-third">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex justify-content-start align-items-center">
                    <Rating
                      name="text-feedback"
                      value={5}
                      readOnly
                      precision={0.5}
                      icon={
                        <StarIcon
                          color="warning"
                          style={{ fontSize: "15px" }}
                          fontSize="inherit"
                        />
                      }
                      emptyIcon={
                        <StarIcon
                          style={{ fontSize: "15px", opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {/* <span className="ms-3 font-third text-secondary fs-6">( {Math.floor(Math.random() * 500)} reviews )</span> */}
                  </div>
                  {addTOWishlist ? (
                    <button
                      onClick={() => {
                        addTOWishlist({
                          courseName: courses.courseName,
                          authorName: courses.authorName,
                          description: courses.Desc,
                          courseId: courses.id,
                          thumbnailImage: courses.thumbnailImage,
                        });
                      }}
                      className="btn border-0"
                    >
                      <i className="bi bi-bookmark text-secondary"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className=" course_name d-flex  justify-content-between align-items-start">
                  <Link to={`/course/detail/${courses.slug}`}>
                    <h4 className=" hover-primary text-darkprime text-initial">
                      {courses.course_name}
                    </h4>
                  </Link>
                </div>
                <div>
                  <span className="font-third text-dark">
                    <i className="bi bi-journal-bookmark-fill"></i>{" "}
                    {courses?.sections?.length} lessons
                  </span>
                  <span className="font-third text-dark ms-2">
                    <i className="bi bi-stopwatch"></i> {courses?.duration}
                  </span>
                  <span className="font-third text-dark ms-2">
                    <i className="bi bi-person"></i> {courses?.author}
                  </span>
                </div>
                {enrolled && (
                  <>
                    <div className="d-flex align-items-center justify-content-between ">
                      <span className="fs-6 font-third text-secondary">
                        {(courses?.section_completed * 100) /
                          courses?.sections?.length ===
                        100 ? (
                          <b className="text-success fw-semibold">
                            <i className="bi bi-check-circle-fill"></i>
                            Course Completed
                          </b>
                        ) : (
                          "Progress"
                        )}
                      </span>
                      <span className="">
                        {courses?.section_completed
                          ? Math.round(
                              (courses?.section_completed * 100) /
                                courses?.course_length
                            )
                          : 0}{" "}
                        %
                      </span>
                    </div>
                    <div
                      className="progress mt-2"
                      role="progressbar"
                      aria-label="Example with label"
                      style={{ height: "7px" }}
                    >
                      <div
                        className="progress-bar p-0"
                        style={{
                          width: `${
                            (courses?.section_completed * 100) /
                            courses?.course_length
                          }%`,
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
              
            </div>
          </div>
            
            <div className="card-footer">
                <div className="d-md-flex align-items-center justify-content-between mt-3">
                  {enrolled ? (
                    <Link
                      className="btn btn-success border-0 rounded-1 w-100 py-3"
                      to={`/dashboard/courseview/${courses.courseId}`}
                    >
                      Continue <i className="bi bi-play-fill"></i>
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-primary  rounded-1 py-2 w-100 py-3"
                      to={`/course/detail/${courses.slug}`}
                    >
                      <small className="fs-8">View Details</small>
                    </Link>
                  )}
          </div>
                </div>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default CourseCardItem;
