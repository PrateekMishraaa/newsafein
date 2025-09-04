import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { DescriptionOutlined, Facebook, Instagram, LinkedIn, LiveHelpOutlined, PictureAsPdf, PictureAsPdfOutlined, QuestionMark, Quiz, QuizOutlined, Twitter, VideoCameraBack, VideoCameraBackOutlined, YouTube } from "@mui/icons-material";
import { apiAuth } from "api";
import CourseContentItem from "./sidepanel/CourseContentItem";
import CourseCertificationButton from "./sidepanel/CourseCertificationButton";

const typeWiseIconCount = (type, count) => {
  if (count) {
    switch (type) {
      case 1:
        return (
          <small className="fw-semibold bg-white rounded-1 lh-0 p-1 shadow-sm me-1 d-inline-flex text-secondary">
            {count}&nbsp;
            <VideoCameraBackOutlined sx={{ fontSize: 18 }} />
          </small>
        );
      case 2:
        return (
          <small className="fw-semibold bg-white rounded-1 lh-0 p-1 shadow-sm me-1 d-inline-flex text-secondary">
            {count}&nbsp;
            <DescriptionOutlined sx={{ fontSize: 18 }} />
          </small>
        );
      case 3:
        return (
          <small className="fw-semibold bg-white rounded-1 lh-0 p-1 shadow-sm me-1 d-inline-flex text-secondary">
            {count}&nbsp;
            <LiveHelpOutlined sx={{ fontSize: 18 }} />
          </small>
        );
      default:
        return "";
    }
  } else {
    return;
  }
};

const CourseSidePanel = ({ courseDetail, progress, activeContentId, setActiveContentId, activeSession, setActiveSession }) => {
  // const [progress, setProgress] = useState([]);
  const [sections, setSections] = useState([]);
  const fetchSections = async (courseId) => {
    const res = await apiAuth.get(`/v2/course/play/${courseId}/sections`);
    if (res?.data?.status === "success") {
      setSections(res?.data?.result);
    }
  };
  useEffect(() => {
    if (courseDetail?.courseId) {
      fetchSections(courseDetail?.courseId);
    }
  }, [courseDetail?.courseId]);
  return (
    <div>
      <div className="container pt-0 px-0 pb-5">
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className=" text-secondary fw-bold">Course Modules</h5>
          </div>
          <div className="">
            <div className="d-flex align-items-center justify-content-between ">
              <span className="fs-5 fw-semibold">
                {courseDetail?.section_completed === courseDetail?.contentCount ? (
                  <b className="text-success fw-semibold">
                    <i className="bi bi-check-circle-fill"></i> Course Completed
                  </b>
                ) : (
                  "Progress"
                )}
              </span>
              <span className="">
                {courseDetail?.section_completed ? courseDetail?.section_completed : 0}/{courseDetail?.contentCount}
              </span>
            </div>
            <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: "7px" }}>
              <div
                className="progress-bar p-0"
                style={{
                  width: `${(courseDetail?.section_completed * 100) / courseDetail?.contentCount}%`,
                }}></div>
            </div>
          </div>
        </div>
        <div className="coursemodules border-top">
          <div className="accordion accordion-flush" id="courseModuleAccordian">
            {sections?.map((section, index) => (
              <div className="accordion-item p-0 mt-0" key={index}>
                <h2 className="accordion-header">
                  <button className={`accordion-button ${Boolean(activeSession == section.sectionId) && "enter"} py-2 shadow-sm rounded border bg-white text-dark ${Boolean(activeSession == section.sectionId) ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={"#course-module-" + section.sectionId}>
                    <div>
                      <div className="fs-6 mb-1">{section?.section_title}</div>
                      <span className="text-secondary">
                        {typeWiseIconCount(1, section?.videoCount)}
                        {typeWiseIconCount(2, section?.pdfCount)}
                        {typeWiseIconCount(3, section?.quizCount)}
                      </span>
                    </div>
                  </button>
                </h2>
                <div id={"course-module-" + section.sectionId} className={Boolean(activeSession == section.sectionId) ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                  <CourseContentItem sectionId={section?.sectionId} progress={progress} setActiveContentId={setActiveContentId} activeContentId={activeContentId} setActiveSession={setActiveSession} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <CourseCertificationButton courseDetail={courseDetail} progress={progress} />
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-center">
            <Avatar alt={courseDetail?.author} src={"/android-chrome-192x192.png"} sx={{ width: 66, height: 66 }} className="me-4" />
            <h5 className=" ">{courseDetail?.author}</h5>
          </div>
          <div className="text-center">{/* <h6> Us </h6> */}</div>
          <div className="d-flex justify-content-center">
            <IconButton href="https://www.facebook.com/profile.php?id=100089167461647&mibextid=ZbWKwL" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <Facebook sx={{ color: "blue" }} />
            </IconButton>
            <IconButton href="https://twitter.com/Yuvamanthan_org" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <Twitter sx={{ color: "skyblue" }} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/yuva-manthan-09aa2025b/" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <LinkedIn sx={{ color: "blue" }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/yuvamanthan_org/" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <Instagram sx={{ color: "tomato" }} />
            </IconButton>
            <IconButton href="https://www.youtube.com/@yuvamanthan_" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <YouTube sx={{ color: "red" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidePanel;
