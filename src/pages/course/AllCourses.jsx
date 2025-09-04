import { api } from "api";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CourseCardItem from "./components/CourseCardItem";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Form } from "react-bootstrap";
import NoCourseFound from "./NoCourseFound";
import "./loader.css"

export const CourseGrid = ({ allCourses }) => {
  return (
    <>
      {!allCourses?.length ? (
        <NoCourseFound />
      ) : (
        // <CourseLoader />
        allCourses?.map((course, i) => {
          return <CourseCardItem courses={course} key={i} enrolled={false} />;
        })
      )}
    </>
  );
};

const AllCourses = ({ banner }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [courseParameter, setCourseParameter] = useState({
    search: "",
    sort: "recent",
    category: "",
    level: "",
  });

  const FetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/course?search=${courseParameter.search}&sort=${
          courseParameter.sort
        }&category=${courseParameter.category}&level=${
          courseParameter.level
        }&page=${currentPage}&limit=${10}`
      );
      if (response.status === 200) {
        setIsLoading(false);
        setAllCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      if (error) {
        toast.dismiss();
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong check your network connection"
        );
      }
    }
  };
  const FetchConfigs = async () => {
    try {
      const response = await api.get(`/course`);
      if (response.status === 200) {
        setAllCategories(response.data.categories);
        setAllLevels(response.data.levels);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      if (error) {
        toast.dismiss();
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong check your network connection"
        );
      }
    }
  };

  const handlePrevious = () => {
    let decrement = Number(currentPage) - 1; // Decrease currentPage by 1

    if (decrement >= 1) {
      setCurrentPage(decrement);
    }
  };

  const handleNext = () => {
    let increment = Number(currentPage) + 1; // Increase currentPage by 1
    if (increment <= totalPages && allCourses.length > 0) {
      setCurrentPage(increment);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : null}
        >
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageItems;
  };

  useEffect(() => {
    FetchCourses();
  }, [currentPage, courseParameter.sort]);
  useEffect(() => {
    FetchConfigs();
  }, []);
  

  return (
    <React.Fragment>
      {banner !== false && (
        <div className="bg-dark pt-3">
          <div className="container">
            <div className="align-items-center justify-content-center py-3 py-lg-4">
              <h3 className="fs-1 text-white font-ubd text-initial ">
                Our Courses
              </h3>
              {/* <div className="link-light link-offset-2">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="white" href="/">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                  </Link>
                  <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="white">
                    All Courses
                  </Link>
                </Breadcrumbs>
              </div> */}

              <div className="link-light link-offset-2 d-flex">
                {/* <Breadcrumbs aria-label="breadcrumb"> */}
                <Link
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="white"
                  href="/"
                >
                  <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
                  Home
                </Link>
                {/* Add a custom style for the slash */}
                <span style={{ color: "white", marginLeft: "5px" }}>/</span>
                <Link
                  style={{ marginLeft: "5px" }}
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="white"
                >
                  All Courses
                </Link>
                {/* </Breadcrumbs> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container py-3">


        <div className="row g-2">
          <div className="col-lg-3">
            <div className="sidebar">
              <form onSubmit={(e) => e.preventDefault()}>
                <h5 className="fw-semibold">Filter Courses</h5>
                <div className="border p-3 border rounded-3">
                  <h5>Categories</h5>
                  {allCategories?.map((category, i) => (
                    <div key={`category-checkbox-${i}`} className="mb-1">
                      <Form.Check
                        type={"radio"}
                        id={`category-checkbox-${i}`}
                        name={"category"}
                        className="text-capitalize"
                        label={category.category}
                        value={category.category}
                        onChange={(e) =>
                          setCourseParameter({
                            ...courseParameter,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="border p-3 border rounded-3 mt-3">
                  <h5>Levels</h5>
                  {allLevels?.map((level, i) => (
                    <div key={`level-checkbox-${i}`} className="mb-1">
                      <Form.Check
                        type={"checkbox"}
                        id={`level-checkbox-${i}`}
                        name={"level"}
                        className="text-capitalize"
                        value={level.level}
                        label={level.level}
                        onChange={(e) =>
                          setCourseParameter({
                            ...courseParameter,
                            level: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* <div className="mt-3">
                  <Rating />
                </div> */}

                <button
                  type="button"
                  className="btn btn-lg rounded-0 mt-3"
                  onClick={FetchCourses}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="container">
              <div className="row g-2">
                <div className="col-12 col-lg-8">
                  <div className="d-flex input-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control rounded-0"
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
                      <button
                        className="btn btn-primary rounded-0"
                        type="button"
                        id="button-addon2"
                        onClick={FetchCourses}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <select
                    className="form-select bg-white fs-6 rounded-0 h-100"
                    value={courseParameter.sort}
                    onChange={(e) =>
                      setCourseParameter({
                        ...courseParameter,
                        sort: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Sort Courses
                    </option>
                    <option value="recent">Recent</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                  </select>
                </div>
                {/* Gridfor COurses  */}
                <div className="container py-3">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3">
                    {isLoading ? (
                      <div className="loaderpart">
                      <h1 className="loder_Tag">
                      <span className="let1 spanTag">l</span>  
                      <span className="let2 spanTag">o</span>  
                      <span className="let3 spanTag">a</span>  
                      <span className="let4 spanTag">d</span>  
                      <span className="let5 spanTag">i</span>  
                      <span className="let6 spanTag">n</span>  
                      <span className="let7 spanTag">g</span>  
                    </h1>
                    </div>
                    ) : (
                      <CourseGrid
                        allCourses={allCourses}
                        paramState={courseParameter}
                        setParamState={setCourseParameter}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Gridfor COurses  */}

              {allCourses?.length >0 ? (
                <nav aria-label="...">
                  <ul className="pagination mt-5">
                    <li className="page-item">
                      <a className="page-link" onClick={handlePrevious}>
                        Prev
                      </a>
                    </li>

                    {renderPageItems()}

                    {/* Conditionally render the "Next" button */}
                    {currentPage < totalPages && (
                      <li className="page-item">
                        <a className="page-link" onClick={handleNext}>
                          Next
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllCourses;
