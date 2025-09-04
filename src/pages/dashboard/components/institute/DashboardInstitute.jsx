// import { apiAuth, apiJsonAuth } from "api";
// import { useGlobalContext } from "global/context";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import Badge from "@mui/material/Badge";
// import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
// import { Popup } from "utils/Popup";
// import useError from "hooks/useError";
// import OnboardModalInstitute from "./onboard/OnboardModalInstitute";
// import ComplianceGrid from "pages/compliance/ComplianceGrid";
// import InstituteCoordinators from "./component/InstituteCoordinators";
// import ProfileCard from "./component/ProfileCard";
// import { AccountVerifyModal } from "components/auth";
// import { Alert } from "react-bootstrap";

// export const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "ripple 1.2s infinite ease-in-out",
//       border: "3px solid currentColor",
//       content: '""',
//     },
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }));

// const DashboardInstitute = () => {
//   let { pathname } = useLocation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [onboardingModal, setOnboardingModal] = useState(false);
//   const [delegates, setDelegates] = useState([]);
//   const [StdCoordinate, setStdCoordinate] = useState([]);
//   const [details, setDetails] = useState({});
//   const [certificates, setCertificates] = useState([]);
//   let [affiliated, setAffiliated] = useState([]);
//   let [isAffiliated, setIsAffiliated] = useState(false);
//   let [countDelegate, setCountDelegate] = useState([]);
//   let [countStudent, setCountStudents] = useState([]);
//   let [eventDate, setEventDate] = useState("");
//   const { ErrorResponder } = useError();
//   const { userData, token, setUser } = useGlobalContext();
//   const [shareableLink, setShareableLink] = useState(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${details?.slug}`);
//   let [showAlert, setShowAler] = useState(false);
//   // --------------
//   // FetchDetails
//   // --------------
//   const getAffiliateInstitute = async () => {
//     try {
//       const res = await apiAuth.get(`admin/institute-affiliate/${userData?.id}`);
//       if (res.status == 200) {
//         if (res?.data?.result.length) {
//           setIsAffiliated(true);
//           console.log({ aff: res?.data?.result });
//         }
//         setAffiliated(res?.data?.result);
//       }
//     } catch (error) {
//       ErrorResponder(error);
//       // console.log("All Errors: ", error);
//     }
//   };
//   const getCertificateList = async () => {
//     try {
//       const res = await apiAuth.get(`admin/institute-certificates/${userData?.id}`);
//       if (res.status == 200) {
//         console.log(res, userData?.id);
//         if (res?.data?.result.length) {
//           setCertificates(res?.data?.result);
//         }
//       }
//     } catch (error) {
//       ErrorResponder(error);
//       console.log("All Errors: ", error);
//     }
//   };
//   console.log(certificates?.length);
//   async function getCountDelegate() {
//     if (token) {
//       try {
//         const res = await apiJsonAuth.post(
//           `/institute/delegatee`,
//           {
//             instituteId: userData?.id,
//           },
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (res.status === 200) {
//           //  console.log("Delegates Fetched!!s", res.data.result);
//           setCountDelegate(res.data.result);
//         }
//       } catch (error) {
//         ErrorResponder(error);
//         // Popup("error", error.response.data.message);
//       }
//     }
//   }
//   async function getCountStudent() {
//     if (token) {
//       try {
//         const res = await apiJsonAuth.post(
//           `/institute/studente`,
//           {
//             instituteId: userData?.id,
//           },
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (res.status === 200) {
//           //  console.log("students Fetched!!s", res.data.result);
//           setCountStudents(res.data.result);
//         }
//       } catch (error) {
//         ErrorResponder(error);
//         // Popup("error", error.response.data.message);
//       }
//     }
//   }
//   const fetchDelegates = async () => {
//     if (token) {
//       try {
//         const res = await apiJsonAuth.post(
//           `/institute/delegates?search=${searchTerm}`,
//           {
//             instituteId: userData?.id,
//           },
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (res.status === 200) {
//           //  console.log("Delegates Fetched!!s");
//           setDelegates(res.data.result);
//         }
//       } catch (error) {
//         ErrorResponder(error);
//         // Popup("error", error.response.data.message);
//       }
//     }
//   };
//   // --------------
//   // FetchDetails
//   // --------------
//   const fetchDetails = async () => {
//     if (token) {
//       Popup("loading");
//       try {
//         const res = await apiJsonAuth.get("/institute", {
//           headers: {
//             Authorization: token,
//           },
//         });
//         if (res?.data && res?.status === 200) {
//           Popup();
//           setDetails(res.data.result[0]);
//           setUser({ ...userData, logo: res.data.result[0].logo });
//           setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${res.data.result[0]?.slug}`);
//         }
//         if (!res?.data?.onboard) {
//           setOnboardingModal(true);
//         }
//       } catch (error) {
//         ErrorResponder(error);
//       }
//     }
//   };
//   // --------------
//   // Fetch Student Coordinators
//   // --------------
//   const fetchStdCoordinate = async () => {
//     if (token) {
//       try {
//         const res = await apiAuth.get(`/institute/studentCoordinate`, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         if (res.status === 200) {
//           setStdCoordinate(res.data);
//         }
//       } catch (error) {
//         ErrorResponder(error);
//       }
//     }
//   };
//   // ---------------
//   // Share Modal
//   // ---------------
//   const [reloads, setReloads] = useState(0);
//   const reloaderContent = () => {
//     setReloads(reloads + 1);
//   };
//   useEffect(() => {
//     if (token) {
//       fetchDetails();
//       fetchDelegates();
//       fetchStdCoordinate();
//       getAffiliateInstitute();
//       getCountStudent();
//       getCountDelegate();
//       getCertificateList();
//     }
//   }, [token, reloads]);
//   // console.log(details);
//   const DownloadQR = () => {
//     const canvas = document.getElementById("qrcode");
//     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//     let downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "registerqrcode.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return (
//     <>
//       <div>
//         {/* Modal TO Verify Account  */}
//         {Boolean(details?.status) && details?.status !== "active" ? <AccountVerifyModal checkReload={fetchDetails} name={details?.first_name + " " + details?.last_name} /> : onboardingModal ? <OnboardModalInstitute details={details} fetchDetails={reloaderContent} /> : ""}
//         <div className="bg-white pb-5">
//           {pathname === "/dashboard/" && (
//             <div>
//               {/* New Design  */}
//               <div className="bg-light">
//                 <div className="container py-2">
//                   <div className="row g-3">
//                     {/* Card */}
//                     <div className="col-12 col-lg-8">
//                       <div className="bg-white p-3 p-lg-4 h-100 rounded-3 shadow-sm border" style={{ overflow: "hidden", position: "relative" }}>
//                         <div>
//                           <div className="row g-3">
//                             <div className="col-lg-9 order-2">
//                               <div>
//                                 <h4 className="fs-4 fw-semibold lh-1">{details?.institution_name}</h4>
//                                 <span className="fw-semibold font-ubd">
//                                   {details?.institution_address ? (
//                                     <>
//                                       {" "}
//                                       {details?.institution_address}, {details?.state} {details?.pincode ? details?.pincode : ""}
//                                     </>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </span>
//                                 <p className="d-lg-block d-none lh-sm">
//                                   <small className="text-dark">{details?.bio}</small>
//                                 </p>
//                                 <div></div>
//                               </div>
//                             </div>
//                             <div className="col-lg-3 order-1">
//                               <div className="d-flex flex-wrap">
//                                 <img
//                                   src={details?.logo && details?.logo !== "" ? details.logo : "https://yuvamanthan.s3.ap-south-1.amazonaws.com/development/data/profile/replace.webp"}
//                                   alt="Logo"
//                                   className="bg-white rounded shadow-sm border"
//                                   style={{
//                                     width: "100%",
//                                     maxWidth: 150,
//                                     height: 150,
//                                     height: "auto",
//                                     objectFit: "cover",
//                                   }}
//                                 />
//                               </div>
//                               <div className="mt-2">
//                                 {details?.fb?.length ? (
//                                   <a href={details?.fb} target={"_blank"} className="me-1 d-inline-block" style={{ color: "navy" }}>
//                                     <Facebook />
//                                   </a>
//                                 ) : (
//                                   ""
//                                 )}
//                                 {details?.lkd?.length ? (
//                                   <a href={details?.lkd} target={"_blank"} className="me-1 d-inline-block" style={{ color: "blue" }}>
//                                     <LinkedIn />
//                                   </a>
//                                 ) : (
//                                   ""
//                                 )}
//                                 {details?.twitter?.length ? (
//                                   <a href={details?.twitter} target={"_blank"} className="me-1 d-inline-block" style={{ color: "skyblue" }}>
//                                     <Twitter />
//                                   </a>
//                                 ) : (
//                                   ""
//                                 )}
//                                 {details?.ytb?.length ? (
//                                   <a href={details?.ytb} target={"_blank"} className="me-1 d-inline-block" style={{ color: "red" }}>
//                                     <YouTube />
//                                   </a>
//                                 ) : (
//                                   ""
//                                 )}
//                                 {details?.insta?.length ? (
//                                   <a href={details?.insta} target={"_blank"} className="me-1 d-inline-block" style={{ color: "red" }}>
//                                     <Instagram />
//                                   </a>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* Stats */}
//                     <div className="col-12 col-lg-4">
//                       <div className="row row-cols-2 g-2">
//                         <div className="col">
//                           <div className="card rounded-3 p-2 p-md-3 text-center bg-white-gray py-lg-3 border h-100 shadow-sm">
//                             <h1 className="fw-semibold">{countStudent && countStudent.length ? countStudent.filter((std) => std.role === "teacher").length : 0}</h1>
//                             <div>
//                               <span className="fw-regular text-dark fs-6 fw-semibold">Total Teachers</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col">
//                           <div className="card rounded-3 p-2 p-md-3 text-center bg-white-gray py-lg-3 border h-100 shadow-sm">
//                             <h1 className="fw-semibold">{countStudent && countStudent.length ? countStudent.filter((std) => std.role === "student").length : 0}</h1>
//                             <div>
//                               <span className="fw-regular text-dark fs-6 fw-semibold">Total Student</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col">
//                           <div className="card rounded-3 p-2 p-md-3 bg-white-gray text-center py-lg-3 border h-100 shadow-sm">
//                             <h1 className=" fw-semibold">{countDelegate && countDelegate.length ? countDelegate.length : 0}</h1>
//                             <div>
//                               <span className="fw-regular text-dark fs-6 fw-semibold">Course Enrolled</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col">
//                           <div className="card rounded-3 p-2 p-md-3 bg-white-gray text-center py-lg-3 border h-100 shadow-sm">
//                             <h1 className=" fw-semibold">{certificates && certificates?.length ? certificates?.length : 0}</h1>
//                             <div>
//                               <span className="fw-regular text-dark fs-6 fw-semibold">Certifications</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* End New Design  */}
//             </div>
//           )}
//           <div className="bg-white rounded-bottom min-vh-100">
//             <div>
//               <div className="container py-4">
//                 <div className="row g-4">
//                   <div className="col-12 col-lg-7 col-xl-8">
//                     <Alert variant="secondary">
//                       <h4>Welcome to SafeInSchool</h4>
//                       <p>Here, your school's safety odyssey commences. You can start by inviting your teachers on the platform by sharing the invite link on your dashboard. Alternatively, you can also use the QR Code on posters for teachers to scan and join.</p>
//                       <p>What’s more? We have curated a set of compliance questions in accordance with the ‘NCPCR Manual on Child Safety in Schools.’</p>
//                     </Alert>
//                     <div>
//                       <div className=" lh-1">
//                         <ComplianceGrid />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12 col-lg-5 col-xl-4">
//                     <ProfileCard details={details} shareableLink={shareableLink} DownloadQR={DownloadQR} affiliated={affiliated} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardInstitute;




import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Popup } from "utils/Popup";
import useError from "hooks/useError";
import OnboardModalInstitute from "./onboard/OnboardModalInstitute";
import ComplianceGrid from "pages/compliance/ComplianceGrid";
import ProfileCard from "./component/ProfileCard";
import { AccountVerifyModal } from "components/auth";
import { Alert } from "react-bootstrap";
import axios from "axios";

// ✅ Styled Badge
export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "3px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));

const DashboardInstitute = () => {
  const { pathname } = useLocation();
  const { ErrorResponder } = useError();
  const { userData, token, setUser } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [onboardingModal, setOnboardingModal] = useState(false);
  const [delegates, setDelegates] = useState([]);
  const [StdCoordinate, setStdCoordinate] = useState([]);
  const [details, setDetails] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [affiliated, setAffiliated] = useState([]);
  const [isAffiliated, setIsAffiliated] = useState(false);
  const [countDelegate, setCountDelegate] = useState([]);
  const [countStudent, setCountStudents] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const [reloads, setReloads] = useState(0);

  const reloaderContent = () => setReloads((prev) => prev + 1);

  // ✅ Guard: Prevent API calls if no token or userData.id
  const isReady = token && userData?.id;

  // --------------------
  // Fetch Affiliate Institutes
  // --------------------
// const getAffiliateInstitute = async () => {
//   if (!isReady) return;
//   try {
//     const res = await axios.get(`http://localhost:3100/api/admin/institute-affiliate/${userData.id}`, {
//       headers: { Authorization: token }
//     });
//     if (res.status === 200) {
//       setAffiliated(res.data?.result || []);
//       setIsAffiliated(!!res.data?.result?.length);
//       console.log("Affiliate data:", res.data?.result);
//     }
//   } catch (error) {
//     console.error("Affiliate API Error:", error.response?.status, error.response?.data);
//     ErrorResponder(error);
//   }
// };

  // --------------------
  // Fetch Certificates
  // --------------------
  const getCertificateList = async () => {
    if (!isReady) return;
    try {
      const res = await apiAuth.get(`api/admin/institute-certificates/${userData.id}`);
      if (res.status === 200) {
        setCertificates(res.data?.result || []);
      }
    } catch (error) {
      console.error("Certificate API Error:", error);
      ErrorResponder(error);
    }
  };

  // --------------------
  // Count Delegates
  // --------------------
  // const getCountDelegate = async () => {
  //   if (!isReady) return;
  //   try {
  //     const res = await apiJsonAuth.post(
  //       `/institute/delegate`,
  //       { instituteId: userData.id },
  //       { headers: { Authorization: token } }
  //     );
  //     if (res.status === 200) setCountDelegate(res.data?.result || []);
  //   } catch (error) {
  //     console.error("Count Delegate API Error:", error.response?.status, error.response?.data);
  //     ErrorResponder(error);
  //   }
  // };

  // --------------------
  // Count Students
  // --------------------
// const getCountStudent = async () => {
//   // if (!isReady) return;
//   try {
//     const res = await axios.get(
//       'http://localhost:3100/api/institute/student',
//       { instituteId: userData.id }
//     );
//     console.log("institute", res);
//     if (res.status === 200) setCountStudents(res.data?.result || []);
//   } catch (error) {
//     console.log("error fetching data", error);
//     ErrorResponder(error);
//   }
// };

  // --------------------
  // Fetch Delegates
  // --------------------
  const fetchDelegates = async () => {
    if (!isReady) return;
    try {
      const res = await axios.post(
        "http://localhost:3100/api/institute/delegates?search=${searchTerm}",
        { instituteId: userData.id },
        { headers: { Authorization: token } }
      );
      if (res.status === 200) setDelegates(res.data?.result || []);
    } catch (error) {
      console.error("Delegates API Error:", error.response?.status, error.response?.data);
      ErrorResponder(error);
    }
  };

  // --------------------
  // Fetch Institute Details
  // --------------------
  const fetchDetails = async () => {
    if (!isReady) return;
    Popup("loading");
    try {
      const res = await axios.get("http://localhost:3100/api/institute", {
        headers: { Authorization: token },
      });
      Popup();
      if (res?.status === 200 && res?.data?.result?.length) {
        const data = res.data.result[0];
        setDetails(data);
        setUser({ ...userData, logo: data.logo });
        setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${data.slug}`);
        if (!res.data.onboard) setOnboardingModal(true);
      }
    } catch (error) {
      console.error("Details API Error:", error.response?.status, error.response?.data);
      ErrorResponder(error);
    }
  };

  // --------------------
  // Fetch Student Coordinators
  // --------------------
  const fetchStdCoordinate = async () => {
    if (!isReady) return;
    try {
      const res = await apiAuth.get(`/api/institute/studentCoordinate`, {
        headers: { Authorization: token },
      });
      if (res.status === 200) setStdCoordinate(res.data || []);
    } catch (error) {
      console.error("Student Coordinate API Error:", error.response?.status, error.response?.data);
      ErrorResponder(error);
    }
  };

  // --------------------
  // Download QR
  // --------------------
  const DownloadQR = () => {
    const canvas = document.getElementById("qrcode");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "registerqrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // --------------------
  // Effects
  // --------------------
  useEffect(() => {
    if (isReady) {
      fetchDetails();
      fetchDelegates();
      fetchStdCoordinate();
      // getAffiliateInstitute();
      // getCountStudent();
      // getCountDelegate();
      getCertificateList();
    }
  }, [token, reloads, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {/* Verify Account or Onboarding Modal */}
      {Boolean(details?.status) && details?.status !== "active" ? (
        <AccountVerifyModal checkReload={fetchDetails} name={`${details?.first_name || ""} ${details?.last_name || ""}`} />
      ) : onboardingModal ? (
        <OnboardModalInstitute details={details} fetchDetails={reloaderContent} />
      ) : null}

      <div className="bg-white pb-5">
        {pathname === "/dashboard/" && (
         <div className="bg-light">
  <div className="container py-2">
    <div className="row g-3">
      {/* Profile Card */}
      <div className="col-12 col-lg-8">
        <div
          className="bg-white p-3 p-lg-4 h-100 rounded-3 shadow-sm border"
          style={{ overflow: "hidden", position: "relative" }}
        >
          <div className="row g-3 align-items-center">
            {/* Logo */}
            <div className="col-lg-3 text-center">
              <img
                src={
                  details?.logo ||
                  "https://yuvamanthan.s3.ap-south-1.amazonaws.com/development/data/profile/replace.webp"
                }
                alt="Institution Logo"
                className="bg-white rounded-circle shadow-sm border"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              {/* Social Links */}
              <div className="mt-3 d-flex justify-content-center flex-wrap gap-2">
                {details?.fb && (
                  <a
                    href={details.fb}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "navy" }}
                  >
                    <Facebook />
                  </a>
                )}
                {details?.lkd && (
                  <a
                    href={details.lkd}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "blue" }}
                  >
                    <LinkedIn />
                  </a>
                )}
                {details?.twitter && (
                  <a
                    href={details.twitter}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "skyblue" }}
                  >
                    <Twitter />
                  </a>
                )}
                {details?.ytb && (
                  <a
                    href={details.ytb}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "red" }}
                  >
                    <YouTube />
                  </a>
                )}
                {details?.insta && (
                  <a
                    href={details.insta}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "red" }}
                  >
                    <Instagram />
                  </a>
                )}
              </div>
            </div>

            {/* Institution Details */}
            <div className="col-lg-9">
               <h4
        className="fs-3 fw-bold lh-1 mb-2 text-primary"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {details?.institution_name || "Institution Name"}
        {details?.last_name && ` ${details.last_name}`}
      </h4>
              {details?.institution_address && (
                <p
                  className="fw-semibold text-muted mb-1"
                  style={{ fontSize: "1rem" }}
                >
                  📍 {`${details.institution_address}, ${details.state} ${
                    details?.pincode || ""
                  }`}
                </p>
              )}
              {details?.bio && (
                <p className="text-dark lh-sm mb-0" style={{ fontSize: "0.95rem" }}>
                  <small>{details.bio}</small>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="col-12 col-lg-4">
        <div className="row row-cols-2 g-2">
          <div className="col">
            <div className="card rounded-3 p-3 text-center bg-white-gray border h-100 shadow-sm">
              <h1 className="fw-semibold">
                {countStudent?.filter((std) => std.role === "teacher").length || 0}
              </h1>
              <span className="fw-semibold text-dark fs-6">Total Teachers</span>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-3 p-3 text-center bg-white-gray border h-100 shadow-sm">
              <h1 className="fw-semibold">
                {countStudent?.filter((std) => std.role === "student").length || 0}
              </h1>
              <span className="fw-semibold text-dark fs-6">Total Students</span>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-3 p-3 text-center bg-white-gray border h-100 shadow-sm">
              <h1 className="fw-semibold">{countDelegate?.length || 0}</h1>
              <span className="fw-semibold text-dark fs-6">Course Enrolled</span>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-3 p-3 text-center bg-white-gray border h-100 shadow-sm">
              <h1 className="fw-semibold">{certificates?.length || 0}</h1>
              <span className="fw-semibold text-dark fs-6">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        )}

        {/* Compliance & Profile */}
        <div className="bg-white rounded-bottom min-vh-100">
          <div className="container py-4">
            <div className="row g-4">
              <div className="col-12 col-lg-7 col-xl-8">
                <Alert variant="secondary">
                  <h4>Welcome to SafeInSchool</h4>
                  <p>Invite your teachers using the dashboard invite link or QR code. Explore compliance questions as per the ‘NCPCR Manual on Child Safety in Schools.’</p>
                </Alert>
                <ComplianceGrid />
              </div>
              <div className="col-12 col-lg-5 col-xl-4">
                <ProfileCard details={details} shareableLink={shareableLink} DownloadQR={DownloadQR} affiliated={affiliated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInstitute;
