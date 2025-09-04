// import React, {useEffect, useState} from "react";
// import {
//   homeimg1,
//   homeimg8,
//   homeimg9,
//   homeimg10,
//   homeimg11,
// } from "../../resources/img.js";
// import Testimonial from "pages/static/components/home/Testimonial.jsx";
// import RecordsBar from "pages/static/components/home/RecordsBar.jsx";
// import BottomCards from "pages/static/components/home/BottomCards.jsx";
// import {Link} from "react-router-dom";
// import {CourseGrid} from "pages/course/AllCourses.jsx";
// import BlogSwiper from "../Blog/BlogSwiper.jsx";
// import {Button} from "@mui/material";
// import {ArrowForwardSharp} from "@mui/icons-material";
// import {api} from "api/index.js";
// import axios from "axios"
// import {toast} from "react-toastify";
// import GeoChart from "../GeoChart/GeoChart.jsx";
// import { LogoScroll } from "../LogoScroll/LogoScroll.jsx";
// import { MediaCoverage } from "../MediaCoverage/MediaCoverage.jsx";
// import { LatestNews } from "../LatestArticle/LatestNews.jsx";
// const Home = () => {
//   const [allCourse, setAllCourses] = useState([]);
//   const [error,setError] = useState(true)
//   const [loading,setLoading] = useState(false)
//   // const FetchCourses = async () => {
//   //   try {
//   //     // const response = await api.get(
//   //     //   `/course`
//   //     // );
//   //     const response = await axios.get("http://localhost:3100/api/course")
//   //     console.log(response.data);
//   //     if (response.status === 200) {
//   //       let courses = response.data.courses;
//   //       courses.length = 6
//   //       setAllCourses(courses);

//   //     } else {
//   //       console.log("Error:", response.status);
//   //     }
//   //   } catch (error) {
//   //     if (error) {
//   //       toast.dismiss();
//   //       toast.error(
//   //         error.response.data.message
//   //           ? error.response.data.message
//   //           : "Something went wrong check your network connection"
//   //       );
//   //     }
//   //   }
//   // };
//   // useEffect(() => {
//   //   FetchCourses();
//   // }, [])


//   useEffect(()=>{
//       const FetchCourses = async()=>{

// try{
//   const response = await axios.get("http://localhost:3100/api/course")
//   console.log(response.data)
//   setAllCourses(response.data)
// }catch(error){
//   console.log(error)
//   setError(true)
// }
        
//       }
//       FetchCourses()
//   },[])
 
//   return (
//     <div>
//       {/* Hero section  */}
//       <div className="container">
//         <div className="py-5 row justify-content-center">
//           <div className="col-lg-7">
//             <h3 className="text-start heroHeading lh-1">
//               School safety, made Easy for Everyone
//             </h3>
//           </div>
//           <div className="col-lg-5 p-3">
//             <div className="mx-auto">
//               <p className="text-justify text-secondary">
//                 SafeInSchool Learning is a one-stop junction for topics,
//                 training, resources and guidance on aspects of school safety
//                 created by school-system leaders for the K-12 community.
//               </p>
//               <Button
//                 className="rounded-4 text-capitalize"
//                 color="warning"
//                 size="large"
//                 variant="outlined"
//                 endIcon={<ArrowForwardSharp />}
//               >
//                 <Link to="/registration" className="text-primary">
//                   Get SafeInSchool
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{ background: " #fff8f1" }}>
//         <div className="container py-5">
//           <div className="row justify-content-evenly align-items-center g-3">
//             <div className="col-lg-6">
//               <div
//                 className="rounded-5 p-0 m-0 imageContainer"
//                 style={{
//                   overflow: "hidden",
//                   objectPosition: "top",
//                   maxHeight: "500px",
//                 }}
//               >
//                 <img
//                   src={homeimg1}
//                   className="meditateImg"
//                   alt="meditateImg"
//                   width="100%"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <p className="lh-1 text-muted fw-bold">SIS Compliance</p>
//               <h4 className="text-start lh-1  fs-3">
//                 Building a deeply embedded safety culture in schools through
//                 government compliances
//               </h4>
//               <p className="text-secondary mt-4">
//                 At SafeInSchool, we strive to help schools adhere to Government
//                 of India mandated school safety and security standards through a
//                 one-of-a-kind technology solution. The solution offers
//                 location-specific compliance tools which help schools to follow
//                 school safety guidelines and stay accountable.
//               </p>
//               <p className="text-secondary">
//                 With the power of these tools, the school administration is
//                 empowered with an easy-to-use interface that not only lets them
//                 check their safety standards but also provides all the
//                 information they need. What’s more? The system has engaging
//                 audio-video and interactive modules for better understanding.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* section2  */}
//       <div className="section2 text-light px-3 py-5 p-sm-5">
//         <div className="container">
//           <div className="text-white col-12 col-lg-6">
//             <p className="fs-5 text-white" style={{ marginBottom: " -3px" }}>
//               Latest release
//             </p>
//             <h1 className="text-white ">SafeInSchool is here</h1>
//             <p className="text-white">
//               The beta version of SafeInSchool is finally here! Built for school
//               management, students, teachers, non-teaching staff, parents and
//               more. Start with these tools to learn more about what our app can
//               do to make your school safer than ever.
//             </p>
//             <button className="btn text-light border-light btn-outline-type2 fw-bold rounded-pill px-4 py-2">
//               Explore features{" "}
//               <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* section3  */}
//       <div className="py-5 container">
//         <div>
//           <p className="fw-semibold text-muted lh-1">Training</p>
//           <h3 className="text-start ">
//             School safety is not a choice. Get started now.
//           </h3>
//           <p className="text-muted lh-1">
//             Explore foundational elements of school safety.
//           </p>
//         </div>
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
//           <CourseGrid allCourses={allCourse} />
//         </div>
//         <div>
//           <Link
//             to={"/courses"}
//             className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-3"
//           >
//             <span className="d-inline-block">
//               View all Courses
//               <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Media Coverage */}
//       <div className="container">
//         <div className="media-coverage">
//           <MediaCoverage />
//         </div>
//       </div>

//       {/* ============================= latest News===========================            */}
//       <LatestNews/>

//       {/* section4  */}
//       <div className="" style={{ background: " #194866" }}>
//         <div className="container py-5">
//           <div>
//             <div style={{ maxWidth: "800px" }}>
//               <p className="fs-5 mb-3 text-light">Blogs</p>
//               <h1 className="lh-1 fs-2 text-white ">
//                 What is the “ Whole School Approach ” and “ Multi-sectoral
//                 approach ” to school safety?
//               </h1>
//               <p className="text-white">
//                 School safety is not just about physical infrastructure but it
//                 encompasses psychosocial wellbeing, early intervention and
//                 advocacy.
//               </p>
//             </div>
//           </div>
//           <div>
//             <BlogSwiper />
//           </div>
//           <Link
//             to={"/blog"}
//             className="btn btn-outline-type2 fw-bold rounded-pill px-4 mt-4 py-3"
//           >
//             <span className="d-inline-block">
//               View all blogs
//               <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Chart */}
//       <section className="container my-5">
//         <h1 className="text-center mb-4 fw-bolder">
//           {" "}
//           We have covered <br />
//           almost every part of the india
//         </h1>
//         <GeoChart />
//       </section>

//       {/* section 5 */}
//       <div className="container py-5">
//         <div className="row row-cols-1 row-cols-lg-2 g-3 align-items-center">
//           <div className="col">
//             <p>Our community</p>
//             <h1 className="text-start heroSubHeading ">
//               Safe schools are growing in numbers.
//             </h1>
//             <div className="mx-auto">
//               <p className="text-justify text-secondary">
//                 SafeInSchool is more than just a platform for school safety –
//                 it's a community of educators, trainers, learners, parents and
//                 children apart from other stakeholders who are committed to
//                 making schools in India safer.
//               </p>
//               <p className="text-justify text-secondary">
//                 As more and more schools sign-up for our solutions, we are
//                 creating India’s most comprehensive school safety platform that
//                 is leading to homogenization of the safety process across all
//                 stakeholders by making them a part of each process.
//               </p>
//               <button className="btn btn-outline-type1 fw-bold rounded-pill  px-4 mt-4 py-3">
//                 Meet The SIS Community&nbsp;
//                 <i className="bi bi-arrow-right fs-6 pt-1"></i>
//               </button>
//             </div>
//           </div>
//           <div className="col">
//             <div className="row row-cols-1 row-cols-lg-2 g-3">
//               <div className="col">
//                 <div className="item d-flex flex-column mx-auto border rounded-4 p-4 h-100">
//                   <img
//                     src={homeimg8}
//                     alt=""
//                     style={{ height: "150px", objectFit: "contain" }}
//                   />
//                   <div>
//                     <h4 className="text-start ">Compliance Orientation</h4>
//                     <p>
//                       Access topics and resources on how to set up and comply
//                       with guidelines.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="item d-flex flex-column mx-auto border rounded-4 p-4 h-100">
//                   <img
//                     src={homeimg9}
//                     alt=""
//                     style={{ height: "150px", objectFit: "contain" }}
//                   />
//                   <div>
//                     <h4 className="text-start ">Parents for safety</h4>
//                     <p>
//                       Are you a parent who is concerned about school safety? Get
//                       involved and see how you can help audit safety at school
//                       through our app.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="item d-flex flex-column mx-auto border rounded-4 p-4 h-100">
//                   <img
//                     src={homeimg10}
//                     alt=""
//                     style={{ height: "150px", objectFit: "contain" }}
//                   />
//                   <div>
//                     <h4 className="text-start ">SafeInSchool Academy</h4>
//                     <p>
//                       Get experts to train your students and staff on how to
//                       become a safer school.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="item d-flex flex-column mx-auto border rounded-4 p-4">
//                   <img
//                     src={homeimg11}
//                     alt=""
//                     style={{ height: "150px", objectFit: "contain" }}
//                   />
//                   <div>
//                     <h4 className="text-start ">Safety Certifications</h4>
//                     <p>
//                       Get certified in a host of safety topics, access
//                       resources, training and much more.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* scroll */}
//       <LogoScroll />
//       {/* Testimonial  */}
//       <Testimonial />
//       {/* section 6  */}
//       <div className="container">
//         <div className="mb-5">
//           <div className="row g-4">
//             <div className="col-md-6">
//               <p>Our partners</p>
//               <h3 className="text-start ">Who’s using SafeInSchool?</h3>
//             </div>
//             <div className="col-md-5 text-secondary">
//               <p>
//                 SafeInSchool is already the platform of choice in thousands of
//                 schools. We have tie-ups with chains of schools across India and
//                 are already training millions of students, staff and parents
//                 through our solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//         <RecordsBar />
//       </div>

//       {/* section7 */}
//       <BottomCards />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import {
  homeimg1,

} from "../../resources/img.js";
import Testimonial from "pages/static/components/home/Testimonial.jsx";
import RecordsBar from "pages/static/components/home/RecordsBar.jsx";
import BottomCards from "pages/static/components/home/BottomCards.jsx";
import { Link } from "react-router-dom";
import { CourseGrid } from "pages/course/AllCourses.jsx";
import BlogSwiper from "../Blog/BlogSwiper.jsx";
import { Button } from "@mui/material";
import { ArrowForwardSharp } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import GeoChart from "../GeoChart/GeoChart.jsx";
import { LogoScroll } from "../LogoScroll/LogoScroll.jsx";
import { MediaCoverage } from "../MediaCoverage/MediaCoverage.jsx";
import Loader from "components/Loader/Loader.jsx";
import { LatestNews } from "../LatestArticle/LatestNews.jsx";

const Home = () => {
  const [allCourse, setAllCourses] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 Start as true to show loader immediately

  useEffect(() => {
    const FetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/course");
        console.log(response.data);

        if (response.status === 200) {
          let courses = response.data.courses || response.data;
          courses = courses.slice(0, 6); // limit to 6 courses
          setAllCourses(courses);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        toast.dismiss();
        toast.error(
          err.response?.data?.message ||
            "Something went wrong. Please check your network connection."
        );
        setError(true);
      } finally {
        setLoading(false); // 🔥 Stop loader
      }
    };

    FetchCourses();
  }, []);

  // 🔥 Full Page Loader while fetching data
if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        width: "100%",
        backgroundColor: "#fff", // optional
      }}
    >
      <Loader />
    </div>
  );
}


  return (
    <div>
      {/* Hero Section */}
      <div className="container">
        <div className="py-5 row justify-content-center">
          <div className="col-lg-7">
            <h3 className="text-start heroHeading lh-1">
              School safety, made Easy for Everyone
            </h3>
          </div>
          <div className="col-lg-5 p-3">
            <div className="mx-auto">
              <p className="text-justify text-secondary">
                SafeInSchool Learning is a one-stop junction for topics,
                training, resources and guidance on aspects of school safety
                created by school-system leaders for the K-12 community.
              </p>
              <Button
                className="rounded-4 text-capitalize"
                color="warning"
                size="large"
                variant="outlined"
                endIcon={<ArrowForwardSharp />}
              >
                <Link to="/registration" className="text-primary">
                  Get SafeInSchool
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SIS Compliance Section */}
      <div style={{ background: "#fff8f1" }}>
        <div className="container py-5">
          <div className="row justify-content-evenly align-items-center g-3">
            <div className="col-lg-6">
              <div
                className="rounded-5 p-0 m-0 imageContainer"
                style={{
                  overflow: "hidden",
                  objectPosition: "top",
                  maxHeight: "500px",
                }}
              >
                <img
                  src={homeimg1}
                  className="meditateImg"
                  alt="meditateImg"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="lh-1 text-muted fw-bold">SIS Compliance</p>
              <h4 className="text-start lh-1 fs-3">
                Building a deeply embedded safety culture in schools through
                government compliances
              </h4>
              <p className="text-secondary mt-4">
                At SafeInSchool, we strive to help schools adhere to Government
                of India mandated school safety and security standards through a
                one-of-a-kind technology solution...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="py-5 container">
        <div>
          <p className="fw-semibold text-muted lh-1">Training</p>
          <h3 className="text-start">School safety is not a choice. Get started now.</h3>
          <p className="text-muted lh-1">
            Explore foundational elements of school safety.
          </p>
        </div>

        {error ? (
          <p className="text-center text-danger">Failed to load courses.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
            <CourseGrid allCourses={allCourse} />
          </div>
        )}

        <div>
          <Link
            to={"/courses"}
            className="btn btn-outline-type1 fw-bold rounded-pill px-4 mt-4 py-3"
          >
            <span className="d-inline-block">
              View all Courses
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </span>
          </Link>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="container">
        <div className="media-coverage">
          <MediaCoverage />
        </div>
      </div>

      {/* Latest News */}
      <LatestNews />

      {/* Blogs */}
      <div className="" style={{ background: "#194866" }}>
        <div className="container py-5">
          <p className="fs-5 mb-3 text-light">Blogs</p>
          <h1 className="lh-1 fs-2 text-white">
            What is the “Whole School Approach” and “Multi-sectoral approach” to school safety?
          </h1>
          <p className="text-white">
            School safety is not just about physical infrastructure but also psychosocial wellbeing.
          </p>
          <BlogSwiper />
          <Link
            to={"/blog"}
            className="btn btn-outline-type2 fw-bold rounded-pill px-4 mt-4 py-3"
          >
            <span className="d-inline-block">
              View all blogs
              <i className="bi bi-arrow-right ms-2 fs-6 pt-1"></i>
            </span>
          </Link>
        </div>
      </div>

      {/* GeoChart */}
      <section className="container my-5">
        <h1 className="text-center mb-4 fw-bolder">
          We have covered <br /> almost every part of India
        </h1>
        <GeoChart />
      </section>

      {/* Community, Partners, BottomCards, Testimonials */}
      <LogoScroll />
      <Testimonial />
      <div className="container">
        <div className="mb-5">
          <div className="row g-4">
            <div className="col-md-6">
              <p>Our partners</p>
              <h3 className="text-start">Who’s using SafeInSchool?</h3>
            </div>
            <div className="col-md-5 text-secondary">
              <p>
                SafeInSchool is already the platform of choice in thousands of schools.
              </p>
            </div>
          </div>
        </div>
        <RecordsBar />
      </div>
      <BottomCards />
    </div>
  );
};

export default Home;
