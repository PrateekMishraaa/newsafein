import {Button} from '@mui/material';
import { apiForum, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AskQuestion from './components/Questions/AskQuestion';
import QuestionSkeleton from './components/Skeleton/QuestionSkeleton';
import "./Forum.css";
import useError from 'hooks/useError';
import AccessDenied from 'layout/fallback/AccessDenied';
import ReportContent from './components/Modals/ReportContent';
import SingleQuestion from './components/Questions/SingleQuestion';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const SingleForumPage = () => {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [forumAccess, setForumAccess] = useState(true);
  const { userData } = useGlobalContext();
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [pageHeading, setPageHeading] = useState('Top Questions');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const [sortAndFilter, setSortAndFilter] = useState({});
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [openReport, setOpenReport] = React.useState(false);
  const { slug } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getQuestionsByCategory = async (categoryId) => {
    setLoading(true);
    try {
      const res = await apiForum.get(`/v1/api/questions/category?categoryId=${categoryId}&sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        // if (sort) {
        //   setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
        // }
        // setPageHeading(`${category}`);
        console.log("Category Data: ", res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  }

  const getCategories = async () => {
    try {
      const res = await apiForum.get(`/v1/api/categories`);
      if (res?.status === 200) {
        setCategories(res?.data?.results);
        console.log("Categories: ", res?.data?.results);
      }
    } catch (error) {
      console.log(error);
      // pop2.error(error?.response?.data?.message);
    }
  }

  const getQuestions = async () => {
    setLoading(true);
    try {
      // const res = await apiForum.get(`/v1/api/questions`);
      const res = await apiForum.get(`/v1/api/question/${slug}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`Top Questions`);
        console.log("Question Data: ", res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const getMyQuestions = async () => {
    setLoading(true);
    try {
      const res = await apiForum.get(`/v1/api/questions/my?email=${userData?.email}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`My Questions`);
        console.log("Question Data: ", res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: async (values, action) => {
      console.log("Serching...  :", values);
      setLoading(true);
      try {
        const response = await apiForum.get(`/v1/api/search?keyword=${values.search}`);
        if (response.status === 200) {
          action.resetForm();
          setQuestions(response?.data?.result);
          setPageHeading(`Search Results (${response?.data?.result?.length})`);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const verifyUser = async () => {
    try {
      const res = await apiForum.post(`/v1/api/verify-user`, {
        email: userData?.email,
      });
      if (res?.status === 200) {
        console.log("Verified User");
        setForumAccess(true);
        getQuestions();
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        try {
          const resData = await apiJsonAuth.get("/student/detail", {
            headers: {
              Authorization: token,
            },
          });
          if (resData?.status === 200) {
            let user = resData?.data?.result[0];
            // setStudentData(user?.data?.result[0]);
            console.log("User :", user?.data?.result[0]);
            const createUserRes = await apiForum.post(`/v1/api/create-user`, {
              name: user?.first_name + " " + user?.last_name,
              email: user?.email,
              profile_pic: user?.profile,
              instituteName: user?.institution_name,
              delegateCountry: user?.g20_country,
              delegateDesignation: user?.g20_designation
            });
            if (createUserRes?.status === 200) {
              setForumAccess(true);
              getQuestions();
              setSort('top-questions');
            }
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 409) {
            setForumAccess(true);
            getQuestions();
          } else {
            setForumAccess(false);
          }
        }
      }
    }
  }

  const handleShowFilterBox = () => {
    if (showFilterBox) {
      setShowFilterBox(false);
    } else {
      setShowFilterBox(true);
    }
  }


  useEffect(() => {
    verifyUser();
    getCategories();
  }, []);

  // useEffect(() => {
  //   getQuestionsByQuery();
  // }, [sort, filter]);




  return (
    <>
      <div className="">
        <Link to='/dashboard/forum' className='mb-5'><ArrowBackTwoToneIcon /> Back</Link>
        {
          forumAccess ?
            <div >
              {
                loading ?
                  <>

                    <QuestionSkeleton />
                    <QuestionSkeleton />
                    <QuestionSkeleton />
                  </>
                  :
                  questions ?
                    <>
                      <SingleQuestion question={questions} getQuestions={getQuestions} />
                    </> :
                    <>
                      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                        <img src="/images/questionnotfound.jpg" alt="" className='w-100' style={{ maxWidth: "400px", objectFit: "contain" }} />
                        <h3>No Questions Found2</h3>
                        <p>It seems like you are lost, but you can ask now!</p>
                        <Button varient="outlined" className="border text-capitalize fs-5 px-4 rounded-3" size="large" color="success" onClick={handleClickOpen}>Ask Question Now</Button>
                      </div>
                    </>
              }
            </div>
            :
            <>
              <AccessDenied
                // title="Access Denied"
                message="It seems like you don't have access to the Q&A portal currently, Please contact your admin to activate the feature."
                contact="support@yuvamanthan.org"
              />
            </>
        }
      </div>
      <AskQuestion open={open} handleClose={handleClose} getQuestions={getQuestions} categories={categories} />
      <ReportContent open={openReport} setOpen={setOpenReport} />
    </>
  )
}

export default SingleForumPage;