import React, { useEffect, useState } from "react";
import { Avatar, ButtonBase, IconButton } from "@mui/material";
import { BadgeTwoTone, CheckCircleTwoTone, Dashboard, Facebook, Instagram, LinkedIn, PictureAsPdfTwoTone, QuizTwoTone, Twitter, VideoCameraBackTwoTone, YouTube, } from "@mui/icons-material";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { Popup } from "utils/Popup";
import { useNavigate } from "react-router-dom";
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


// Course Panel 
const CoursePanel = ({ modules, generateCertificate, setCurrentCourse, activeCourse, sectionCompleted, progress, series, isGenerating, courseId, }) => {
  const { userData } = useGlobalContext();
  const [certAvail, setCertAvail] = useState(false);
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (modules?.sectionArr == progress.length) {
      setPercent(100);
    } else {
      if (modules?.sectionArr) setPercent((progress.length * 100) / modules?.courseSections);
    }
  }, [sectionCompleted]);
  const CheckCertificate = async () => {
    try {
      let response = await apiAuth.get(`/course/certificate/check?courseId=${courseId}&studentId=${userData.id}`);
      if (response.status == 200) {
        if (response?.data?.result?.checked) {
          setCertAvail(true);
        }
      }
    } catch (error) {
      Popup(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    CheckCertificate();
  }, []);
  return (
    <>
      <div className="container d-none d-lg-block pt-0 px-0 pb-5">
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className=" text-secondary fw-bold">Course Modules</h5>
          </div>
          <div className="">
            <div className="d-flex align-items-center justify-content-between ">
              <span className=" fs-5 fw-semibold">
                {progress?.length === series?.length ? (
                  <b className="text-success fw-semibold">
                    <i className="bi bi-check-circle-fill"></i> Course Completed
                  </b>
                ) : (
                  "Progress"
                )}
              </span>
              <span className="">
                {progress?.length ? progress?.length : 0}/{series?.length}
              </span>
            </div>
            <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: "7px" }}>
              <div
                className="progress-bar p-0"
                style={{
                  width: `${(progress?.length * 100) / series?.length}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="coursemodules border-top">
          <div className="accordion accordion-flush" id="courseModuleAccordian">
            {modules?.sectionArr?.map((section, index) => (
              <div className="accordion-item p-0 mt-0" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={
                      index == 0
                        ? "accordion-button py-3 shadow-sm rounded border bg-white text-dark"
                        : "accordion-button py-3 shadow-sm rounded border bg-white text-dark collapsed"
                    }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#course-module-" + section.sectionId}
                  >
                    <div>
                      <span className="fs-5">{section?.section_title}</span> <br />
                      <span className="text-secondary">{section?.video_documents?.length} Resource</span>
                    </div>
                  </button>
                </h2>
                <div
                  id={"course-module-" + section.sectionId}
                  className={index == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                  data-bs-parent="#courseModuleAccordian"
                >
                  <ul className="module-sublist ">
                    {section?.video_documents?.map((topic, index) => (
                      <li key={index} className={activeCourse?.seriesId == topic.seriesId ? "rounded active" : "rounded"} style={{ cursor: "pointer" }}>
                        <ButtonBase onClick={() => setCurrentCourse(topic.seriesId)} className="p-3 border rounded-1 p-relative d-flex align-items-center justify-content-start text-start w-100">
                          {topic?.vd_type === 1 ? (
                            <VideoCameraBackTwoTone sx={{ color: "blue" }} />
                          ) : topic?.vd_type === 2 ? (
                            <PictureAsPdfTwoTone sx={{ color: "red" }} />
                          ) : (
                            <QuizTwoTone sx={{ color: "green" }} />
                          )}
                          <span className="fs-6 ms-2">{topic?.series_title} </span>
                          {progress?.includes(topic.seriesId) ? (
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/1634/1634264.png"
                              alt=""
                              style={{
                                height: "25px",
                                position: "absolute",
                                right: "0",
                                top: "0",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </ButtonBase>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {progress?.length == series?.length ? (
              <>
                {certAvail ? (
                  <div
                    className={"rounded btn-bg-green-grad active"}
                    onClick={() => navigate("/dashboard/certificate/" + courseId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                      <BadgeTwoTone />
                      &nbsp;&nbsp; Download Certificate
                    </div>
                  </div>
                ) : (
                  <div className={isGenerating ? "bg-light" : "bg-light-maroon-grad"} onClick={() => !isGenerating && generateCertificate()} style={{ cursor: "pointer" }}>
                    <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                      {isGenerating ? <span className="text-success">
                        <CheckCircleTwoTone />
                        &nbsp;&nbsp; Applied Successfully
                      </span> :
                        <>
                          <BadgeTwoTone />
                          &nbsp;&nbsp; Apply For Certificate
                        </>
                      }
                    </div>
                  </div>
                )}
                <div
                  className={"rounded text-primary"}
                  onClick={() => navigate("/dashboard/")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                    <Dashboard />
                    &nbsp;&nbsp; Dashboard
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-center">
            <Avatar alt={modules?.author} src={"/android-chrome-192x192.png"} sx={{ width: 66, height: 66 }} className="me-4" />
            <h5 className=" ">{modules?.author}</h5>
          </div>
          <div className="text-center">{/* <h6> Us </h6> */}</div>
          <div className="d-flex justify-content-center">
            <IconButton
              href="https://www.facebook.com/profile.php?id=100089167461647&mibextid=ZbWKwL"
              target={"_blank"}
              className="m-1 bg-white shadow-sm border border-light"
            >
              <Facebook sx={{ color: "blue" }} />
            </IconButton>
            <IconButton href="https://twitter.com/Yuvamanthan_org" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
              <Twitter sx={{ color: "skyblue" }} />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/yuva-manthan-09aa2025b/"
              target={"_blank"}
              className="m-1 bg-white shadow-sm border border-light"
            >
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
      <div>
        <SwipeableEdgeDrawer classes={"d-lg-none"}
          headerText={"Course Modules"}>
          <div className="container-fluid pt-0 px-0 pb-5">
            <div className="py-3 px-2">
              <div className="">
                <div className="d-flex align-items-center justify-content-between ">
                  <span className=" fs-5 fw-semibold">
                    {progress?.length === series?.length ? (
                      <b className="text-success fw-semibold">
                        <i className="bi bi-check-circle-fill"></i> Course Completed
                      </b>
                    ) : (
                      "Progress"
                    )}
                  </span>
                  <span className="">
                    {progress?.length ? progress?.length : 0}/{series?.length}
                  </span>
                </div>
                <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: "7px" }}>
                  <div
                    className="progress-bar p-0"
                    style={{
                      width: `${(progress?.length * 100) / series?.length}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="coursemodules border-top">
              <div className="accordion accordion-flush" id="courseModuleAccordian">
                {modules?.sectionArr?.map((section, index) => (
                  <div className="accordion-item p-0 mt-0" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className={
                          index == 0
                            ? "accordion-button py-3 shadow-sm rounded border bg-white text-dark"
                            : "accordion-button py-3 shadow-sm rounded border bg-white text-dark collapsed"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#course-module-" + section.sectionId}
                      >
                        <div>
                          <span className="fs-5">{section?.section_title}</span> <br />
                          <span className="text-secondary">{section?.video_documents?.length} Resource</span>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={"course-module-" + section.sectionId}
                      className={index == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                      data-bs-parent="#courseModuleAccordian"
                    >
                      <ul className="module-sublist ps-0 mb-0">
                        {section?.video_documents?.map((topic, index) => (
                          <li key={index} className={activeCourse?.seriesId == topic.seriesId ? "active" : ""} style={{ cursor: "pointer" }}>
                            <ButtonBase onClick={() => setCurrentCourse(topic.seriesId)} className="p-3 border rounded-0 p-relative d-flex align-items-center justify-content-start text-start w-100">
                              {topic?.vd_type === 1 ? (
                                <VideoCameraBackTwoTone sx={{ color: "blue" }} />
                              ) : topic?.vd_type === 2 ? (
                                <PictureAsPdfTwoTone sx={{ color: "red" }} />
                              ) : (
                                <QuizTwoTone sx={{ color: "green" }} />
                              )}
                              <span className="fs-6 ms-2">{topic?.series_title} </span>
                              {progress?.includes(topic.seriesId) ? (
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/1634/1634264.png"
                                  alt=""
                                  style={{
                                    height: "25px",
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </ButtonBase>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                {progress?.length == series?.length ? (
                  <>
                    {certAvail ? (
                      <div
                        className={"rounded btn-bg-green-grad active"}
                        onClick={() => navigate("/dashboard/certificate/" + courseId)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                          <BadgeTwoTone />
                          &nbsp;&nbsp; Download Certificate
                        </div>
                      </div>
                    ) : (
                      <div className={isGenerating ? "bg-light" : "bg-light-maroon-grad"} onClick={() => !isGenerating && generateCertificate()} style={{ cursor: "pointer" }}>
                        <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                          {isGenerating ? <span className="text-success">
                            <CheckCircleTwoTone />
                            &nbsp;&nbsp; Applied Successfully
                          </span> :
                            <>
                              <BadgeTwoTone />
                              &nbsp;&nbsp; Apply For Certificate
                            </>
                          }
                        </div>
                      </div>
                    )}
                    <div
                      className={"rounded text-primary"}
                      onClick={() => navigate("/dashboard/")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                        <Dashboard />
                        &nbsp;&nbsp; Dashboard
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="p-3">
              <div className="d-flex align-items-center justify-content-center">
                <Avatar alt={modules?.author} src={"/android-chrome-192x192.png"} sx={{ width: 66, height: 66 }} className="me-4" />
                <h5 className=" ">{modules?.author}</h5>
              </div>
              <div className="text-center">{/* <h6> Us </h6> */}</div>
              <div className="d-flex justify-content-center">
                <IconButton
                  href="https://www.facebook.com/profile.php?id=100089167461647&mibextid=ZbWKwL"
                  target={"_blank"}
                  className="m-1 bg-white shadow-sm border border-light"
                >
                  <Facebook sx={{ color: "blue" }} />
                </IconButton>
                <IconButton href="https://twitter.com/Yuvamanthan_org" target={"_blank"} className="m-1 bg-white shadow-sm border border-light">
                  <Twitter sx={{ color: "skyblue" }} />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/yuva-manthan-09aa2025b/"
                  target={"_blank"}
                  className="m-1 bg-white shadow-sm border border-light"
                >
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
        </SwipeableEdgeDrawer>
      </div>
    </>
  );
};


// Drawer 
const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer({ children, classes, headerText }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // This is used only for the example
  return (
    <Root >
      <CssBaseline styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          height: `calc(80% - ${drawerBleeding}px)`,
          overflow: 'visible',
        },
      }} />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer

        className={classes}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          className="bg-light border border-bottom-0"
          onClick={toggleDrawer(!open)}
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller sx={{ color: "blue" }} />
          <Typography sx={{ p: 2 }} className=" fs-5 text-center text-primary"
          >{headerText}</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 0,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default CoursePanel;
