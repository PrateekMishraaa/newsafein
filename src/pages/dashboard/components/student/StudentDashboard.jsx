import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { api, apiJson, apiJsonAuth } from "api";
import { pop2 } from "utils/Popup";
import { useGlobalContext } from "global/context";
import CourseCardItem from "pages/course/components/CourseCardItem";
import BlogSwiper from "pages/static/pages/Blog/BlogSwiper";
import CourseLoaderCardSkeleton from "layout/loader/CourseLoader";
import { Popup } from "utils/Popup";

import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import useError from "hooks/useError";
import OnboardModalTeacher from "pages/dashboard/components/teacher/onboard/OnboardModalTeacher";
import OnboardModalParent from "pages/dashboard/components/parent/onboard/OnboardModalParent";
import OnboardModalStudent from "pages/dashboard/components/student/onboard/OnboardModalStudent";
import CourseNotFound from "components/fallbacks/CourseNotFound";
import { PollContainer } from "components/dashboard";
import { AccountVerifyModal } from "components/auth";
import { QuotesCarousel } from "components/dashboard/student/QuotesCarousel";
import ComplianceGrid from "pages/compliance/ComplianceGrid";

const StudentDashboard = () => {
  const { ErrorResponder } = useError();
  const [details, setDetails] = useState({});
  const [quoteData, setQuoteData] = useState();
  const { token, userData, setUser } = useGlobalContext();
  const [activeCourses, setActiveCourses] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [reloads, setReloads] = useState(0);
  const [onboard, setOnboard] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const res = await apiJsonAuth.get("/student/detail", {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setDetails(res.data.result[0]);
        {
          setUser({ ...userData, profile: res?.data?.result[0]?.profile });
        }
        Popup();
        if (!res?.data?.onboard) {
          setOnboard(true);
        }
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const res = await api.get(`/course`);
      if (res.status == 200) {
        let activeCourseList = res.data.courses.filter((course) => {
          const roles = course?.role?.replaceAll(" ", "");
          let rolesArr = roles?.split(",") || [];
          if (course.status == "active" && rolesArr.includes(userData?.role)) return course;
        });
        let upcomingCourseList = res.data.courses.filter((course) => {
          const roles = course?.role?.replaceAll(" ", "");
          let rolesArr = roles?.split(",") || [];
          if (course.status !== "active" && rolesArr.includes(userData?.role)) return course;
        });
        setActiveCourses(activeCourseList);
        setUpcomingCourses(upcomingCourseList);
        setCourseLoading(false);
      }
    } catch (error) {
      if (error) {
        setCourseLoading(false);
        pop2.error(error.response.data.message);
      }
    }
  };
  const getAllQuotes = async () => {
    try {
      const res = await apiJson.get("admin/quotes");
      if (res.status === 200) {
        setQuoteData(res?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const roleWiseOnBoard = (role) => {
    switch (role) {
      case "teacher":
        return <OnboardModalTeacher details={details} fetchDetails={reloaderContent} />;
      case "student":
        return <OnboardModalStudent details={details} fetchDetails={reloaderContent} />;
      case "parent":
        return <OnboardModalParent details={details} fetchDetails={reloaderContent} />;
      default:
        return <OnboardModalStudent details={details} fetchDetails={reloaderContent} />;
    }
  };
  const reloaderContent = () => {
    setReloads(reloads + 1);
  };
  useEffect(() => {
    if (token) {
      window.scrollTo(0, 0);
      fetchAllCourses();
      fetchDetails();
    }
    getAllQuotes();
  }, [token]);
  return (
    <div>
      {/* Modal TO Verify Account  */}
      {Boolean(details?.status) && details?.status !== "active" ? <AccountVerifyModal checkReload={fetchDetails} name={details?.first_name + " " + details?.last_name} /> : onboard ? roleWiseOnBoard(details?.role) : ""}
      {}
      {/* Details  */}
      <div className="bg-light">
        <div className={`container py-2`}>
          <div className="row row-cols-1 row-cols-lg-2 g-2 justify-content-start">
            {/* Profile  */}
            <div className="col">
              <div className="rounded-3 container bg-white p-3 h-100 border">
                <div className="d-flex w-100 flex-column flex-lg-row ">
                  <div>
                    <Avatar alt={details ? details?.first_name : "Avatar"} src={details?.profile} sx={{ width: 146, height: 146, mr: 3 }} className="shadow-sm border bg-white rounded" />
                    <div className="d-flex align-items-center justify-content-start mt-1">
                      {details?.fb && (
                        <a href={details?.fb} target={"_blank"} className="me-2 fs-6">
                          <Facebook className="fs-5" />
                        </a>
                      )}
                      {details?.twitter && (
                        <a href={details?.twitter} target={"_blank"} className="me-2">
                          <Twitter className="text-info fs-5" />
                        </a>
                      )}
                      {details?.insta && (
                        <a href={details?.insta} target={"_blank"} className="me-2">
                          <Instagram className="text-danger fs-5" />
                        </a>
                      )}
                      {details?.lkd && (
                        <a href={details?.lkd} target={"_blank"} className="me-2">
                          <LinkedIn className="fs-5" />
                        </a>
                      )}
                      {details?.ytb && (
                        <a href={details?.ytb} target={"_blank"} className="me-2">
                          <YouTube className="text-danger fs-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-initial font-ubd mb-0 fs-4">
                      {details?.first_name}&nbsp;
                      {details?.last_name}
                    </h5>
                    {Boolean(details?.institution_name) && <span className="text-dark fw-semibold">{details?.institution_name}</span>}
                    <div className="lh-sm mt-1">
                      <small className="text-dark">{details?.bio && details?.bio}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Quotes  */}
            <div className="col">
              <QuotesCarousel quoteData={quoteData} />
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3 gy-4 justify-content-start">
          <div className="col-12  col-lg-8">
            <h4 className="fw-bold ">Courses For You</h4>
            {activeCourses?.length ? (
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {activeCourses?.map((course, i) => {
                  return <CourseCardItem courses={course} key={i} enrolled={false} status={"active"} />;
                })}
              </div>
            ) : courseLoading ? (
              <CourseLoaderCardSkeleton />
            ) : (
              <CourseNotFound text={"No Course Found"} />
            )}
          </div>
          <div className="col-12 col-lg-4">
            <PollContainer details={details} />
          </div>
          <div className="col-12  col-lg-8">
            <h4 className="fw-bold ">Upcoming Courses</h4>
            {upcomingCourses.length ? (
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {upcomingCourses?.map((course, i) => {
                  if (!(course?.sections?.length && course?.status === "active")) return <CourseCardItem courses={course} key={i} enrolled={false} status={"upcoming"} />;
                })}
              </div>
            ) : courseLoading ? (
              <CourseLoaderCardSkeleton />
            ) : (
              <CourseNotFound text={"No Upcoming Course Found"} />
            )}

            {/* Compliance For Coordinators ONly */}
            {userData.role === "coordinator" && <ComplianceGrid />}
          </div>
          <div className="col-12">
            <div className="">
              <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row">
                <h4 className=" ">Explore our Blogs</h4>
                <Link target={"_blank"} href="/blog" variant="outlined" color="warning" className="text-capitalize rounded-3">
                  View All Blogs
                </Link>
              </div>
              <BlogSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
