import React, { useEffect, useState } from "react";
import CourseCardItem from "pages/course/components/CourseCardItem";
import AccessDenied from "layout/fallback/AccessDenied";
import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import NoCourseFound from "pages/course/NoCourseFound";
import { SimpleBreadCrumb } from "components/ui";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const { userData, token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const [courseParameter, setCourseParameter] = useState({
    search: "",
    sort: "recent",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEnrolled = async () => {
    try {
      const res = await apiJsonAuth.post(
        `/course/enrolled?search=${courseParameter.search}&sort=${courseParameter.sort}&page=${currentPage}`,
        {
          studentId: userData?.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setEnrolledCourses(res.data.courses);
        setTotalPages(res.data.totalPages);
      } else {
        console.log("Error:", res.status);
      }
    } catch (error) {
      if (error?.response?.status !== 404) {
        ErrorResponder(error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`} aria-current={currentPage === i ? "page" : null}>
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageItems;
  };

  useEffect(() => {
    fetchEnrolled();
  }, [courseParameter.sort, currentPage]);
  return (
    <>
      <SimpleBreadCrumb page={`My Courses`} />
      <div className="container py-4">
        {!enrolledCourses ? (
          <>
            <AccessDenied link={"/courses"} img={"/images/coursefallback.jpg"} message={"No Enrolled Courses Found"} />
          </>
        ) : (
          <div>
            <div className="row mb-4 g-2">
              <div className="col-12 col-md-8">
                <div className="d-flex input-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control shadow-0 px-3"
                      placeholder="Write Course Name Here"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={(e) =>
                        setCourseParameter({
                          ...courseParameter,
                          search: e.target.value,
                        })
                      }
                    />
                    <button className="btn btn-primary rounded-end fw-semibold" type="button" id="button-addon2" onClick={fetchEnrolled}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <select
                  className="form-select bg-white rounded h-100"
                  value={courseParameter.sort}
                  onChange={(e) =>
                    setCourseParameter({
                      ...courseParameter,
                      sort: e.target.value,
                    })
                  }>
                  <option value="" disabled>
                    Sort Courses
                  </option>
                  <option value="recent">Recent</option>
                  <option value="atoz">A to Z</option>
                  <option value="ztoa">Z to A</option>
                </select>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mt-3">
              {!enrolledCourses?.length ? (
                <NoCourseFound />
              ) : (
                // <CourseLoaderCardSkeleton />
                enrolledCourses.map((courses, i) => {
                  return <CourseCardItem courses={courses} key={i} enrolled={true} />;
                })
              )}
            </div>
            <nav aria-label="...">
              <ul className="pagination mt-5">
                <li className="page-item disabled">
                  <a className="page-link" onClick={handlePrevious}>
                    Prev
                  </a>
                </li>
                {renderPageItems()}
                <li className="page-item">
                  <a className="page-link" onClick={handleNext}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
