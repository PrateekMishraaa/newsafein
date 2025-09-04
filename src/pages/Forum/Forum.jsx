// import { HelpOutlineTwoTone, SearchTwoTone } from "@mui/icons-material";
// import { Button, Divider, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
// import { apiEksathi, apiForum, apiForum2, apiJsonAuth } from "api";
// import { useFormik } from "formik";
// import { useGlobalContext } from "global/context";
// import { Popup, pop2 } from "utils/Popup";
// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import AskQuestion from "./components/Questions/AskQuestion";
// import "./Forum.css";
// import AccessDenied from "layout/fallback/AccessDenied";
// import { ForumProvider } from "./forumContext/forumContext";
// import RegisterForum from "./components/Extras/RegisterForum";
// import WelcomePopup from "./components/Extras/WelcomePopup";
// import YuvaLoader from "../../layout/loader/Loader/YuvaLoader";
// import {SimpleBreadCrumb} from "components/ui";

// const Forum = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState();
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [forumAccess, setForumAccess] = useState(true);
//   const { userData } = useGlobalContext();
//   const [showFilterBox, setShowFilterBox] = useState(false);
//   const [pageHeading, setPageHeading] = useState("Recent Questions");
//   const [sort, setSort] = useState("");
//   const [filter, setFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [offset, setOffset] = useState();
//   const [categories, setCategories] = useState([]);
//   const [loadMore, setLoadMore] = useState(false);
//   const [showLoadBtn, setShowLoadBtn] = useState(true);
//   const [sortAndFilter, setSortAndFilter] = useState({});
//   const { token } = useGlobalContext();
//   const [filterCount, setFilterCount] = useState(0);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [isActivated, setIsActivated] = useState(true);
//   const [welcomeLayout, setWelcomeLayout] = useState(undefined);
//   const [stats, setStats] = useState();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const getQuestionsByQuery = async () => {
//     setLoading(true);
//     try {
//       const res = await apiForum2.get(`/v1/api/query?sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
//       if (res.status === 200) {
//         setQuestions(res?.data?.results);
//         if (sort) {
//           setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
//         }
//         setLoading(false);
//       }
//     } catch (error) {}
//   };

//   const getQuestionsByCategory = async (categoryId) => {
//     setLoading(true);
//     navigate("/dashboard/forum");
//     try {
//       const res = await apiForum2.get(`/v1/api/questions/category?categoryId=${categoryId}&sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
//       if (res.status === 200) {
//         setQuestions(res?.data?.results);
//         setLoading(false);
//       }
//     } catch (error) {}
//   };

//   const getCategories = async () => {
//     try {
//       const res = await apiForum2.get(`/v1/api/categories`);
//       if (res?.status === 200) {
//         setCategories(res?.data?.results);
//         console.log("Categories: ", res?.data?.results);
//       }
//     } catch (error) {
//       // console.log(error);
//       // pop2.error(error?.response?.data?.message);
//     }
//   };

//   const getQuestions = async () => {
//     setLoading(true);
//     pop2.loading();
//     try {
//       // const res = await apiForum.get(`/v1/api/questions`);
//       const res = await apiForum.get(`/v1/api/query?sort=&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
//       if (res.status === 200) {
//         setQuestions(res?.data?.results);
//         setPageHeading(`Recent Questions`);
//         console.log("Question Data: ", res?.data?.results);
//         setLoading(false);
//         setShowWelcome(false);
//         getStats();
//       }
//     } catch (error) {
//       // console.log(error.response.data.error);
//     }
//   };

//   const getMyQuestions = async () => {
//     setLoading(true);
//     try {
//       const res = await apiForum.get(`/v1/api/questions/my?email=${userData?.email}`);
//       if (res.status === 200) {
//         setQuestions(res?.data?.results);
//         setPageHeading(`My Questions`);
//         // console.log("Question Data: ", res);
//         setLoading(false);
//       }
//     } catch (error) {
//       // console.log(error.response.data.error);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       search: "",
//     },
//     onSubmit: async (values, action) => {
//       // console.log("Serching...  :", values);
//       setLoading(true);
//       navigate("/dashboard/forum");
//       try {
//         const response = await apiForum.get(`/v1/api/search?keyword=${values.search}`);
//         if (response.status === 200) {
//           // action.resetForm();
//           setQuestions(response?.data?.result);
//           setPageHeading(`Search Results (${response?.data?.result?.length})`);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   const createUser = async (isEksathiTNCAccepted) => {
//     try {
//       const resData = await apiJsonAuth.get("/student/detail", {
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (resData?.status === 200) {
//         let user = resData?.data?.result[0];
//         // setStudentData(user?.data?.result[0]);
//         console.log("User :", user?.data?.result[0]);
//         const createUserRes = await apiForum.post(`/v1/api/create-user`, {
//           name: user?.first_name + " " + user?.last_name,
//           email: user?.email,
//           profile_pic: user?.profile,
//           instituteName: user?.institution_name,
//           delegateCountry: user?.g20_country,
//           delegateDesignation: user?.g20_designation,
//         });
//         if (createUserRes?.status === 200) {
//           setIsActivated(true);
//           setForumAccess(true);
//           getQuestions();
//           setSort("top-questions");
//         }
//         if (isEksathiTNCAccepted) {
//           console.log("Creating new accout to Eksathi, Accepted TNC");
//           const createEksathiUser = await apiEksathi.post(`/app/user`, {
//             email: user?.email,
//             first_name: user?.first_name,
//             last_name: user?.last_name,
//             phone: user?.contact,
//             avatar_url: user?.profile,
//             role: "student",
//           });

//           if (createEksathiUser?.status === 200) {
//             Popup("success", `Congratualations! Your Eksathi account has been created successfully and your password has been sent on ${userData?.email}.`);
//             window.open("https://www.eksathi.com", "_blank");
//             console.log("Thanks for choosing Eksathi");
//             console.log("Eksathi User: " + createEksathiUser);
//           }
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//       if (error?.response?.status === 409) {
//         setForumAccess(true);
//         getQuestions();
//       } else {
//         setForumAccess(false);
//       }
//     }
//   };

//   const updateUser = async () => {
//     try {
//       const resData = await apiJsonAuth.get("/student/detail", {
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (resData?.status === 200) {
//         let user = resData?.data?.result[0];
//         // setStudentData(user?.data?.result[0]);
//         // console.log("User :", user?.data?.result[0]);
//         const updateUserRes = await apiForum.put(`/v1/api/update-user?email=${user?.email}`, {
//           name: user?.first_name + " " + user?.last_name,
//           email: user?.email,
//           profile_pic: user?.profile,
//           instituteName: user?.institution_name,
//           delegateCountry: user?.g20_country,
//           delegateDesignation: user?.g20_designation,
//         });
//         if (updateUserRes?.status === 200) {
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const verifyUser = async () => {
//     try {
//       const res = await apiForum2.post(`/v1/api/verify-user`, {
//         email: userData?.email,
//       });
//       if (res?.status === 200) {
//         // console.log("Verified User");
//         setForumAccess(true);
//         // setWelcomeLayout('center');
//         getQuestions();
//         updateUser();
//         setLoading(false);
//       }
//     } catch (error) {
//       // console.log(error);
//       setLoading(false);
//       if (error?.response?.status === 403) {
//         setIsActivated(false);
//       } else {
//         console.log(error);
//         setForumAccess(false);
//       }
//     }
//   };

//   const handleShowFilterBox = () => {
//     if (showFilterBox) {
//       setShowFilterBox(false);
//     } else {
//       setShowFilterBox(true);
//     }
//   };

//   const getStats = async () => {
//     try {
//       const res = await apiForum2.get(`/v1/api/s`);
//       if (res?.status === 200) {
//         console.log("Stats: ", res);
//         setStats(res?.data?.results);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     verifyUser();
//     getCategories();
//     async function fetch() {
//       console.log(
//         "User DATA : :  :",
//         await apiJsonAuth.get("/student/detail", {
//           headers: {
//             Authorization: token,
//           },
//         })
//       );
//     }
//     fetch();
//   }, []);

//   useEffect(() => {
//     console.log("Forum Component Questions");
//     if (sort && filter) {
//       setFilterCount(2);
//     } else if (filter || sort) {
//       setFilterCount(1);
//     } else {
//       setFilterCount(0);
//     }
//     getQuestionsByQuery();
//   }, [sort, filter]);

//   return (
//     <>
//       <SimpleBreadCrumb page={`QnA Portal`} />
//       <div className="container">
//         {loading && <YuvaLoader setShow={setLoading} />}
//         <ForumProvider>
//           <div>
//             {!isActivated ? (
//               <RegisterForum createUser={createUser} />
//             ) : forumAccess ? (
//               <div className="row my-3">
//                 <div className="col-lg-8">
//                   <FormControl variant="outlined" fullWidth className="mb-3 rounded">
//                     {/* <InputLabel htmlFor="search">Search</InputLabel> */}
//                     <OutlinedInput
//                       color="warning"
//                       id="search"
//                       type="text"
//                       className="rounded-4 px-3"
//                       name="search"
//                       value={formik.values.search}
//                       onChange={formik.handleChange}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <Typography variant="caption">
//                             Powered by <span className="text-info">EkSathi</span>
//                           </Typography>
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={formik.handleSubmit}
//                             // onMouseDown={handleMouseDownPassword}
//                             edge="end">
//                             {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
//                             <SearchTwoTone />
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       // label="Password"
//                       placeholder="Search..."
//                     />
//                   </FormControl>
//                   <Outlet
//                     context={[
//                       { questions, pageHeading, loading },
//                       {
//                         loading,
//                         questions,
//                         pageHeading,
//                         stats,
//                         setSort,
//                         filterCount,
//                         handleShowFilterBox,
//                         showFilterBox,
//                         sortAndFilter,
//                         setSortAndFilter,
//                         setFilter,
//                         setShowFilterBox,
//                         setPage,
//                         setPageHeading,
//                         getQuestions,
//                         showLoadBtn,
//                         setLoadMore,
//                         sort,
//                         filter,
//                         page,
//                         limit,
//                         offset,
//                         setQuestions,
//                         loadMore,
//                         handleClickOpen,
//                         setShowLoadBtn,
//                       },
//                     ]}
//                   />
//                   {/* <AllQuestions search={{ questions, pageHeading, loading }} /> */}
//                 </div>
//                 <div className="col-lg-4">
//                   <div className="mb-3">
//                     <Button variant="contained" color="success" fullWidth onClick={handleClickOpen} className="rounded py-2 fs-5 text-capitalize fw-bold">
//                       <HelpOutlineTwoTone />
//                       &nbsp;Ask Question
//                     </Button>
//                   </div>
//                   <div className="border rounded-4 p-4 mb-3">
//                     <nav class="nav nav-pills nav-fill flex-column">
//                       <h6>Navigation</h6>
//                       <ul className="nav-items">
//                         <li className="forum-nav-item my-2 p-2 border rounded-3" onClick={getQuestions}>
//                           Top Questions
//                         </li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3" onClick={getMyQuestions}>
//                           My Question
//                         </li>
//                       </ul>
//                       {categories?.length ? (
//                         <>
//                           <Divider className="my-3" />
//                           <h6>Categories</h6>
//                           <ul className="nav-items">
//                             {categories?.map((category) => {
//                               return (
//                                 <li
//                                   className="forum-nav-item my-2 p-2 border rounded-3"
//                                   onClick={() => {
//                                     setPage(1);
//                                     setPageHeading(category.name);
//                                     getQuestionsByCategory(category.id);
//                                   }}>
//                                   {category?.name}
//                                 </li>
//                               );
//                             })}
//                             {/* <Divider className='my-1'/>
//                             <li>
//                                 <FormControl fullWidth>
//                                   <InputLabel id="demo-simple-select-label">View All</InputLabel>
//                                   <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={category}
//                                     label="View All"
//                                     onChange={(e) => setCategory(e.target.value)}
//                                   >
//                                     {categories?.map((category) => {
//                                       return <MenuItem value={category?.name}
//                                         onClick={() => {
//                                           setPageHeading(category.name);
//                                           getQuestionsByCategory(category.id);
//                                         }}
//                                       >{category?.name}</MenuItem>
//                                     })}
//                                   </Select>
//                                 </FormControl>
//                             </li> */}
//                           </ul>
//                         </>
//                       ) : null}
//                     </nav>
//                   </div>
//                   <div className="border rounded-4 p-4">
//                     {/* <nav class="nav nav-pills nav-fill flex-column">
//                       <h6>Filters</h6>
//                       <ul className="nav-items">
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">My Question</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Top Questions</li>
//                       </ul>
//                       <Divider className='my-3' />
//                       <h6>Sorting</h6>
//                       <ul className="nav-items">
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Foreign Ministers Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Leaders Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Sherpa Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Finance Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">General Queries</li>
//                       </ul>

//                     </nav> */}
//                     <p className="fs-6">If you didn't got your desired answer or you want to ask question publically, Try EkSathi Now!</p>
//                     <div className="d-flex justify-content-between flex-wrap">
//                       <Link to="http://www.eksathi.com" target="_blank">
//                         <Button variant="outlined" color="success" className="text-center text-capitalize mb-2" size="small">
//                           Connect to Expert
//                         </Button>
//                       </Link>
//                       <div className="fs-6">
//                         Powered By{" "}
//                         <Link to="https://www.eksathi.com" target="_blank">
//                           EkSathi
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="border rounded-4 p-4">
//                     <nav class="nav nav-pills nav-fill flex-column">
//                       <h6>Filters</h6>
//                       <ul className="nav-items">
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">My Question</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Top Questions</li>
//                       </ul>
//                       <Divider className='my-3' />
//                       <h6>Sorting</h6>
//                       <ul className="nav-items">
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Foreign Ministers Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Leaders Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Sherpa Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">Finance Track</li>
//                         <li className="forum-nav-item my-2 p-2 border rounded-3">General Queries</li>
//                       </ul>
//                     </nav>
//                   </div> */}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <AccessDenied
//                   // title="Access Denied"
//                   img={"/images/questionnotfound.jpg"}
//                   message="It seems like you don't have access to the Q&A portal currently, Please contact your admin to activate the feature."
//                   contact="help@safeinschool.in"
//                 />
//               </>
//             )}
//           </div>
//           <AskQuestion open={open} handleClose={handleClose} getQuestions={getQuestions} categories={categories} />

//           <WelcomePopup layout={welcomeLayout} setLayout={setWelcomeLayout} canClose={!loading} />
//         </ForumProvider>
//       </div>
//     </>
//   );
// };

// export default Forum;



import { HelpOutlineTwoTone, SearchTwoTone } from "@mui/icons-material";
import { Button, Divider, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { apiEksathi, apiForum, apiForum2, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { Popup, pop2 } from "utils/Popup";
import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AskQuestion from "./components/Questions/AskQuestion";
import "./Forum.css";
import AccessDenied from "layout/fallback/AccessDenied";
import { ForumProvider } from "./forumContext/forumContext";
import RegisterForum from "./components/Extras/RegisterForum";
import WelcomePopup from "./components/Extras/WelcomePopup";
import YuvaLoader from "../../layout/loader/Loader/YuvaLoader";
import { SimpleBreadCrumb } from "components/ui";

const Forum = () => {
  const navigate = useNavigate();
  const { userData, token } = useGlobalContext();

  // State declarations
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [forumAccess, setForumAccess] = useState(true);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [pageHeading, setPageHeading] = useState("Recent Questions");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState();
  const [categories, setCategories] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const [sortAndFilter, setSortAndFilter] = useState({});
  const [filterCount, setFilterCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isActivated, setIsActivated] = useState(true);
  const [welcomeLayout, setWelcomeLayout] = useState(undefined);
  const [stats, setStats] = useState();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const getQuestionsByQuery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiForum2.get(`/v1/api/query?sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset || ''}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        if (sort) {
          setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions by query:", error);
      setLoading(false);
    }
  }, [sort, filter, page, limit, offset]);

  const getQuestionsByCategory = useCallback(async (categoryId) => {
    setLoading(true);
    navigate("/dashboard/forum");
    try {
      const res = await apiForum2.get(`/v1/api/questions/category?categoryId=${categoryId}&sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset || ''}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions by category:", error);
      setLoading(false);
    }
  }, [navigate, sort, filter, page, limit, offset]);

  const getCategories = useCallback(async () => {
    try {
      const res = await apiForum2.get(`/v1/api/categories`);
      if (res?.status === 200) {
        setCategories(res?.data?.results);
        console.log("Categories: ", res?.data?.results);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const getQuestions = useCallback(async () => {
    setLoading(true);
    pop2.loading();
    try {
      const res = await apiForum.get(`/v1/api/query?sort=&filter=${filter}&page=${page}&limit=${limit}&offset=${offset || ''}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`Recent Questions`);
        console.log("Question Data: ", res?.data?.results);
        setLoading(false);
        setShowWelcome(false);
        getStats();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  }, [filter, page, limit, offset]);

  const getMyQuestions = useCallback(async () => {
    if (!userData?.email) return;
    
    setLoading(true);
    try {
      const res = await apiForum.get(`/v1/api/questions/my?email=${userData.email}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`My Questions`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching my questions:", error);
      setLoading(false);
    }
  }, [userData?.email]);

  const getStats = useCallback(async () => {
    try {
      const res = await apiForum2.get(`/v1/api/s`);
      if (res?.status === 200) {
        console.log("Stats: ", res);
        setStats(res?.data?.results);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values, action) => {
      setLoading(true);
      navigate("/dashboard/forum");
      try {
        const response = await apiForum.get(`/v1/api/search?keyword=${values.search}`);
        if (response.status === 200) {
          setQuestions(response?.data?.result);
          setPageHeading(`Search Results (${response?.data?.result?.length || 0})`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setLoading(false);
      }
    },
  });

  const createUser = useCallback(async (isEksathiTNCAccepted) => {
    if (!token) return;

    try {
      const resData = await apiJsonAuth.get("/student/detail", {
        headers: {
          Authorization: token,
        },
      });
      
      if (resData?.status === 200) {
        let user = resData?.data?.result[0];
        console.log("User :", user);
        
        const createUserRes = await apiForum.post(`/v1/api/create-user`, {
          name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
          email: user?.email,
          profile_pic: user?.profile,
          instituteName: user?.institution_name,
          delegateCountry: user?.g20_country,
          delegateDesignation: user?.g20_designation,
        });
        
        if (createUserRes?.status === 200) {
          setIsActivated(true);
          setForumAccess(true);
          getQuestions();
          setSort("top-questions");
        }
        
        if (isEksathiTNCAccepted && user?.email) {
          console.log("Creating new account to Eksathi, Accepted TNC");
          const createEksathiUser = await apiEksathi.post(`/app/user`, {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.contact,
            avatar_url: user.profile,
            role: "student",
          });

          if (createEksathiUser?.status === 200) {
            Popup("success", `Congratulations! Your Eksathi account has been created successfully and your password has been sent to ${user.email}.`);
            window.open("https://www.eksathi.com", "_blank");
            console.log("Thanks for choosing Eksathi");
          }
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error?.response?.status === 409) {
        setForumAccess(true);
        getQuestions();
      } else {
        setForumAccess(false);
      }
    }
  }, [token, getQuestions, userData?.email]);

  const updateUser = useCallback(async () => {
    if (!token) return;

    try {
      const resData = await apiJsonAuth.get("/student/detail", {
        headers: {
          Authorization: token,
        },
      });
      
      if (resData?.status === 200) {
        let user = resData?.data?.result[0];
        
        await apiForum.put(`/v1/api/update-user?email=${user?.email}`, {
          name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
          email: user?.email,
          profile_pic: user?.profile,
          instituteName: user?.institution_name,
          delegateCountry: user?.g20_country,
          delegateDesignation: user?.g20_designation,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, [token]);

  const verifyUser = useCallback(async () => {
    if (!userData?.email) return;

    try {
      const res = await apiForum2.post(`/v1/api/verify-user`, {
        email: userData.email,
      });
      
      if (res?.status === 200) {
        setForumAccess(true);
        getQuestions();
        updateUser();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setLoading(false);
      if (error?.response?.status === 403) {
        setIsActivated(false);
      } else {
        setForumAccess(false);
      }
    }
  }, [userData?.email, getQuestions, updateUser]);

  const handleShowFilterBox = useCallback(() => {
    setShowFilterBox(prev => !prev);
  }, []);

  // Effects
  useEffect(() => {
    verifyUser();
    getCategories();
  }, [verifyUser, getCategories]);

  useEffect(() => {
    console.log("Forum Component Questions");
    if (sort && filter) {
      setFilterCount(2);
    } else if (filter || sort) {
      setFilterCount(1);
    } else {
      setFilterCount(0);
    }
    getQuestionsByQuery();
  }, [sort, filter, getQuestionsByQuery]);

  const categoryClickHandler = useCallback((category) => {
    setPage(1);
    setPageHeading(category.name);
    getQuestionsByCategory(category.id);
  }, [getQuestionsByCategory]);

  return (
    <>
      <SimpleBreadCrumb page="QnA Portal" />
      <div className="container">
        {loading && <YuvaLoader setShow={setLoading} />}
        <ForumProvider>
          <div>
            {!isActivated ? (
              <RegisterForum createUser={createUser} />
            ) : forumAccess ? (
              <div className="row my-3">
                <div className="col-lg-8">
                  <FormControl variant="outlined" fullWidth className="mb-3 rounded">
                    <OutlinedInput
                      color="warning"
                      id="search"
                      type="text"
                      className="rounded-4 px-3"
                      name="search"
                      value={formik.values.search}
                      onChange={formik.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography variant="caption">
                            Powered by <span className="text-info">EkSathi</span>
                          </Typography>
                          <IconButton
                            aria-label="search"
                            onClick={formik.handleSubmit}
                            edge="end"
                          >
                            <SearchTwoTone />
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Search..."
                    />
                  </FormControl>
                  <Outlet
                    context={[
                      { questions, pageHeading, loading },
                      {
                        loading,
                        questions,
                        pageHeading,
                        stats,
                        setSort,
                        filterCount,
                        handleShowFilterBox,
                        showFilterBox,
                        sortAndFilter,
                        setSortAndFilter,
                        setFilter,
                        setShowFilterBox,
                        setPage,
                        setPageHeading,
                        getQuestions,
                        showLoadBtn,
                        setLoadMore,
                        sort,
                        filter,
                        page,
                        limit,
                        offset,
                        setQuestions,
                        loadMore,
                        handleClickOpen,
                        setShowLoadBtn,
                      },
                    ]}
                  />
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={handleClickOpen}
                      className="rounded py-2 fs-5 text-capitalize fw-bold"
                    >
                      <HelpOutlineTwoTone />
                      &nbsp;Ask Question
                    </Button>
                  </div>
                  <div className="border rounded-4 p-4 mb-3">
                    <nav className="nav nav-pills nav-fill flex-column">
                      <h6>Navigation</h6>
                      <ul className="nav-items">
                        <li className="forum-nav-item my-2 p-2 border rounded-3" onClick={getQuestions}>
                          Top Questions
                        </li>
                        <li className="forum-nav-item my-2 p-2 border rounded-3" onClick={getMyQuestions}>
                          My Question
                        </li>
                      </ul>
                      {categories?.length ? (
                        <>
                          <Divider className="my-3" />
                          <h6>Categories</h6>
                          <ul className="nav-items">
                            {categories.map((category) => (
                              <li
                                key={category.id}
                                className="forum-nav-item my-2 p-2 border rounded-3"
                                onClick={() => categoryClickHandler(category)}
                              >
                                {category.name}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </nav>
                  </div>
                  <div className="border rounded-4 p-4">
                    <p className="fs-6">
                      If you didn't get your desired answer or you want to ask question publicly, Try EkSathi Now!
                    </p>
                    <div className="d-flex justify-content-between flex-wrap">
                      <Link to="https://www.eksathi.com" target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outlined"
                          color="success"
                          className="text-center text-capitalize mb-2"
                          size="small"
                        >
                          Connect to Expert
                        </Button>
                      </Link>
                      <div className="fs-6">
                        Powered By{" "}
                        <Link to="https://www.eksathi.com" target="_blank" rel="noopener noreferrer">
                          EkSathi
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AccessDenied
                img="/images/questionnotfound.jpg"
                message="It seems like you don't have access to the Q&A portal currently. Please contact your admin to activate the feature."
                contact="help@safeinschool.in"
              />
            )}
          </div>
          <AskQuestion
            open={open}
            handleClose={handleClose}
            getQuestions={getQuestions}
            categories={categories}
          />
          <WelcomePopup
            layout={welcomeLayout}
            setLayout={setWelcomeLayout}
            canClose={!loading}
          />
        </ForumProvider>
      </div>
    </>
  );
};

export default Forum;