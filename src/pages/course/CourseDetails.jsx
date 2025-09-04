import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseEnroll from "./components/Enroll";
import { api, apiAuth, apiJsonAuth } from "api";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "global/context";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CourseContentAccordianItem from "./CourseContentAccordianItem";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Popup } from "utils/Popup";

const CourseDetails = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const [courseRoles, setCourseRoles] = useState([]);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const [certAvail, setCertAvail] = useState(false)
  const param = useParams();
  const { userData, token } = useGlobalContext();
  const fetchCourseDetails = async () => {
    try {
      const res = await api.get(`/course/detail/${param.slug}`);
      if (res.status == 200) {
        setDetails(res?.data?.course);
        const roles = res?.data?.course?.role?.replaceAll(" ", "");
        let rolesArr = roles?.split(",") || [];
        setCourseRoles(rolesArr);
      }
    } catch (error) {
      if (error) {
        toast.dismiss();
        toast.error(error.response.data.message ? error.response.data.message : "Something went wrong check your network connection");
      }
    }
  };
  const checkUserEnrolledAlready = async () => {
    try {
      const res = await api.get(`course/checkIfUserAlreadyEnrolled/course/${details?.id}/user/${userData?.id}`)
      setAlreadyEnrolled(res?.data?.result)
      console.log('res.result', res?.data?.result)
    }
    catch (error) {
      toast.dismiss()
      toast.error(error.message)
    }

  }
  //Check Certification
  const CheckCertificate = async () => {
    // console.log('course=>> ', courseDetail)
    try {
      let response = await apiJsonAuth.get(`/course/certificate/check?courseId=${details?.id}&studentId=${userData.id}`);
      console.log("=>>>>", response)
      if (response.status == 200) {
        if (response?.data?.result?.checked) {
          setCertAvail(true)
        }
      }
    } catch (error) {
      Popup(error?.response?.data?.message);
    }
  };

  // direct view course 
  const proceedEnroll = async () => {
    let formdata = {
      courseId: details?.id,
      studentId: userData.id,
    };
    if (token) {
      try {
        const res = await apiAuth.post(`/course/enroll`, formdata, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status == 200) {
          toast.dismiss();
          // toast.success(`Enrolled Successfully`);
          navigate(`/dashboard/courseview/${formdata.courseId}`);
        }
      } catch (error) {
        if (error) {
          toast.dismiss();
          if (error.response.status === 409) {
            toast(error.response.data.message ? error.response.data.message : "Something went wrong check your network connection", {
              icon: "😃",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            navigate(`/dashboard/courseview/${formdata.courseId}`, {
              state: {
                tabId: "enrolled",
              },
            });
          } else if (error.response.status !== 409) {
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong check your network connection");
          }
        }
      }
    }
  };
  useEffect(() => {
    CheckCertificate()
  }, [details])
  useEffect(() => {
    checkUserEnrolledAlready()
  }, [details])
  useEffect(() => {
    fetchCourseDetails();
  }, []);
  function createMarkup(data) {
    return { __html: data };
  }

  return (
    <>
      <section className="section bg-darkprime">
        <div className="container pb-5 pb-lg-0" style={{ minHeight: 250 }}>
          <div className="row">
            <div className="col-12 col-lg-8 py-0  order-2 order-lg-1 ">
              <div>
                <h1 className="text-white fw-light heroSubHeading  mt-3">{details?.course_name}</h1>
                {courseRoles.map((courseRole, courseRoleIndex) => (
                  <span key={courseRoleIndex} className="bg-green-grad px-4 py-2 rounded-pill text-white border border-3 shadow-sm fw-bold me-2 text-capitalize">
                    <i className="bi bi-person my-0"></i>&nbsp;&nbsp;{courseRole}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-white fs-6" style={{ textAlign: "justify" }}>
                  <div className="quill-ls" dangerouslySetInnerHTML={createMarkup(details?.desc)} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 order-2 order-lg-1">
              <div className="py-3 pb-lg-4">
                <ul className="nav nav-pills-design-5 nav-pills" id="myTab" role="tablist">
                  <li className="nav-item px-0 ms-0" role="presentation">
                    <button className="nav-link active py-2 rounded-0" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab">
                      Overview
                    </button>
                  </li>
                  <li className="nav-item ms-0" role="presentation">
                    <button className="nav-link" id="what-you-will-learn-tab" data-bs-toggle="tab" data-bs-target="#what-you-will-learn" type="button" role="tab">
                      What you will learn?
                    </button>
                  </li>
                  <li className="nav-item ms-0" role="presentation">
                    <button className="nav-link" id="who-is-it-for-tab" data-bs-toggle="tab" data-bs-target="#who-is-it-for" type="button" role="tab">
                      Who is it for?
                    </button>
                  </li>
                </ul>
                <div className="tab-content p-0">
                  <div className="tab-pane active" id="overview" role="tabpanel" aria-labelledby="overview-tab" tabIndex="0">
                    <div className="py-4">
                      <div className="quill-ls" dangerouslySetInnerHTML={createMarkup(details?.overview)} />
                      {/* <Divider textAlign="left" className="mb-2 mt-4"><h5>Course Syllabus</h5></Divider> */}
                      {/* <CourseContentAccordian sections={details?.sections} /> */}
                    </div>
                  </div>
                  <div className="tab-pane p-0" id="what-you-will-learn" role="tabpanel" aria-labelledby="what-you-will-learn-tab" tabIndex="1">
                    <div className="py-4">
                      <div className="quill-ls" dangerouslySetInnerHTML={createMarkup(details?.whatYouWillLearn)} />
                    </div>
                  </div>
                  <div className="tab-pane p-0" id="who-is-it-for" role="tabpanel" aria-labelledby="who-is-it-for-tab" tabIndex="2">
                    <div className="py-4">
                      <div className="quill-ls" dangerouslySetInnerHTML={createMarkup(details?.whoIsItFor)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div className="p-3 rounded-4 shadow-lg coursedetail-pagecard bg-white">
                <img src={details?.thumbnail} alt="" className="w-100 rounded-3" />
                <table className="table-borderless table">
                  <tr>
                    <td className="pt-2 font-weight-semebold">Duration</td>
                    <td className="text-end pt-2">{details?.duration}</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Mode</td>
                    <td className="text-end pt-2">Online</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Author</td>
                    <td className="text-end pt-2">{details?.author}</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Certification</td>
                    <td className="text-end pt-2">{details?.certification_img ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Category</td>
                    <td className="text-end pt-2">{details?.category}</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Course Level</td>
                    <td className="text-end pt-2">{details?.level}</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-weight-semebold">Course For</td>
                    <td className="text-end pt-2">{details?.role}</td>
                  </tr>
                </table>





                {!token ? (
                  <button
                    className="btn btn-primary py-3 rounded-3 btn-lg w-100 rounded-0 hover-ripple"
                    onClick={() => {
                      navigate("/login", {
                        state: {
                          nextRoute: `/course/detail/${details.slug}`,
                        },
                      });
                    }}>
                    Login to Enroll
                  </button>
                ) : (alreadyEnrolled && certAvail)
                  ?
                  (<>
                    <div className="row justify-content-around">
                      <div className=" col-6 p-1 text-center">
                        <button className="btn btn-primary w-100" onClick={proceedEnroll}>View Course</button>
                      </div>
                      <div onClick={() => navigate("/dashboard/certificate/" + details?.id)} className=" col-6 p-1 text-center">
                        <button className="btn btn-success w-100">Get Certificate</button>
                      </div>
                    </div>
                  </>) : (
                    <button
                      className="btn btn-primary py-3 rounded-3 btn-lg w-100 rounded-0 hover-ripple"
                      onClick={proceedEnroll} // Instead of triggering the modal, call the function directly
                      disabled={!courseRoles.includes(userData.role) || !(details?.sections?.length && details?.status === "active")}
                    >
                      {alreadyEnrolled
                        ? "Start Course"
                        : details?.sections?.length && details?.status === "active"
                          ? !courseRoles.includes(userData.role)
                            ? "Not Available For You!"
                            : "Enroll Now"
                          : "Coming Soon..⏳"}
                    </button>

                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}

    </>
  );
};

const CourseContentAccordian = ({ sections }) => {
  const [expanded, setExpanded] = React.useState("panel0");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {sections?.map((section, sectionIndex) => {
        const expandCheck = expanded === "panel" + sectionIndex;
        return (
          <Accordion expanded={expandCheck} key={sectionIndex} className={`p-1 bg-opacity-50  ${expandCheck ? "shadow rounded-5 border" : ""}`} onChange={handleChange("panel" + sectionIndex)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" className="border-0">
              <Typography sx={{ width: "100%", flexShrink: 0 }}>{section?.section_title}</Typography>
            </AccordionSummary>
            <AccordionDetails className="border-0">
              <CourseContentAccordianItem section={section} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CourseDetails;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
