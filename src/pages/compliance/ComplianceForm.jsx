import React, { useEffect, useState } from "react";
import Comp_MCQ from "./formelements/Comp_MCQ";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "global/context";
import SubQuestion4option from "./formelements/SubQuestion4option";
import Comp_Num from "./formelements/Comp_Num";
import ComplianceProgress from "./components/ComplianceProgress";
// import { LastPage } from "@mui/icons-material";

const ComplianceForm = ({ complianceId, reportId }) => {
  const location = useLocation();
  const { page } = useParams();

  const navigate = useNavigate();
  const { userData } = useGlobalContext();
  const [compliance, setCompliance] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answerReport, setAnswerReport] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showArray, setshowArray] = useState([]);
  const [prev, setprev] = useState(0);
  const [lastPrev, setLastprev] = useState(0);
  const [textArray, setTextArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requiredQuestions, setRequiredQuestions] = useState([]);
  const [requiredArray, setRequireArray] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [instituteData, setInstituteData] = useState({});
  const [continueAnswer, setContinueAnswer] = useState([]);
  const [attemptQuestion, setAttemptQuestion] = useState([]);
  const [progress, setProgress] = useState(0);
  // const [isFormSaved, setisFormSaved] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [editUrl, setEditUrl] = useState(false);
  // const [pageWiseData, setPageWiseData] = useState([]);

  const getPageWiseData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "categoryWiseData/compliance/" + complianceId)
      .then((res) => {
        // setPageWiseData(res.data.pageWiseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getPageWiseData();
  }, []);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEditUrl(true);
    }
  }, [location]);

  const calculateProgress = () => {
    let pro = 0;
    let totalQuestion = questions?.length;
    let doneQuestion = attemptQuestion.filter((i) => i === true).length;
    pro = (doneQuestion / totalQuestion) * 100;
    console.log("done", doneQuestion, totalQuestion);
    console.log("calculate prooooooo", pro.toFixed());
    if (!pro) {
      pro = 0;
    }
    setProgress(pro);
  };

  const prefillAttemptQuestion = () => {
    if (continueAnswer.length > 0) {
      let answer = continueAnswer;
      let allQuestion = changeQuestionOrder();
      let booleanArray = new Array(allQuestion.length).fill(false);

      for (let index = 0; index < answer.length; index++) {
        const { questionId } = answer[index];

        const questionIndex = allQuestion.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          booleanArray[questionIndex] = true;
        }
      }
      console.log("booooleeean array", booleanArray);
      setAttemptQuestion(booleanArray);
    }
  };

  const fetchAnswerArray = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer/" + reportId)
      .then((res) => {
        setContinueAnswer(res.data.result.answer);
        setAnswerReport(res.data.result.answer);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (reportId !== null || reportId !== undefined) {
      fetchAnswerArray();
    }
  }, [reportId]);

  const handleUpdateReport = () => {};

  const fetchingDetail = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/institute/" + userData.id).then((res) => {
      // console.log(res.data);
      setInstituteData(res.data.result);
    });
  };
  useEffect(() => {
    fetchingDetail();
  }, []);
  // console.log("showing again", prev);

  const changeQuestionOrder = () => {
    // console.log("inside new ");
    let newQuesArray = [];

    if (questions.length > 0) {
      const allQuestion = questions;

      if (category.length > 0) {
        let n = category.length;
        for (let index = 0; index < n; index++) {
          let ques = allQuestion.filter((q) => q.categoryId === category[index]?.id);
          newQuesArray = newQuesArray.concat(ques);
        }
      }
    }

    // console.log("newques", newQuesArray);
    return newQuesArray;
  };

  const missingQuestionId = () => {
    let indexArray = [];
    const newQuesArray = changeQuestionOrder();
    const requiredids = requiredQuestions.map((q) => q.id);
    // console.log("required ids in missing question", requiredids)
    const answerIds = answerReport.map((q) => q.questionId);
    const missingId = requiredids.filter((id) => !answerIds.includes(id));
    // console.log("answer idsand missing aids",answerIds, missingId)
    if (missingId.length > 0) {
      let temp = [...requiredArray];
      // console.log("this is temp of missing ", temp)
      indexArray = missingId.map((id) => {
        const index = newQuesArray.findIndex((q) => q.id === id);
        if (index !== -1) {
          temp[index] = true;
          return { no: index + 1, id: id };
        }
      });
      setRequireArray(temp);
      // console.log("inside the missingQuestion",temp)
      // setIndexArrays(indexArray)
    }

    return indexArray;
  };

  const handleSubmit = () => {
    // setIsLoading(true);
    // setisFormSaved(true)
    setIsSubmit(true);
    const missingQuestion = missingQuestionId();

    // console.log("these are missing question", missingQuestion);
    if (missingQuestion.length > 0) {
      toast.dismiss();
      const allMissingQuestionNos = missingQuestion.map((item) => item.no).join(", ");

      const missingQuestionMessage = "Question no. " + allMissingQuestionNos + " is Required";

      toast.error(missingQuestionMessage);
      return;
    }
    setIsLoading(true);
    let tempScore = 0;
    let tempTotalScore = 0;
    let tempTotalScore2 = 0;
    // console.log("this is institute id", userData.id);
    answerReport.forEach((ans) => {
      tempScore += Number(ans.score);
    });
    questions.forEach((q) => {
      let tempMax = 0;
      q.options.forEach((i) => {
        if (tempMax < i.score) {
          tempMax = Number(i.score);
        }
      });
      tempTotalScore += Number(tempMax);
    });
    answerReport.forEach((i) => {
      let tempMax = 0;
      if (tempMax < i.max_score) {
        tempMax = Number(i.max_score);
      }
      tempTotalScore2 += Number(tempMax);
    });

    // setTotalScore(tempTotalScore >= tempTotalScore2 ? tempTotalScore : tempTotalScore2);
    // setTotalAnswered(answerReport.length);
    if (!reportId) {
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer", {
          complianceId,
          answer: answerReport,
          total_answered: answerReport.length,
          total_score: tempTotalScore > tempTotalScore2 ? tempTotalScore : tempTotalScore2,
          score: tempScore,
          name: instituteData.first_name + " " + instituteData.last_name,
          instituteId: userData.id,
          status: "Done",
          // responseId: responseId,
        })
        .then((response) => {
          setIsLoading(false);
          navigate("/dashboard/school-compliance/report/" + response.data.result.id);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      axios
        .put(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer/" + reportId, {
          complianceId,
          answer: answerReport,
          total_answered: answerReport.length,
          total_score: tempTotalScore > tempTotalScore2 ? tempTotalScore : tempTotalScore2,
          score: tempScore,
          name: instituteData.first_name + " " + instituteData.last_name,
          instituteId: userData.id,
          status: "Done",
          // responseId: responseId,
        })
        .then((response) => {
          setIsLoading(false);
          navigate("/dashboard/school-compliance/report/" + response.data.result.id);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };
  const handleSaveProgress = () => {
    // setIsSubmit(true);
    setAnswerLoading(true);

    let tempScore = 0;
    let tempTotalScore = 0;
    let tempTotalScore2 = 0;
    answerReport.forEach((ans) => {
      tempScore += Number(ans.score);
    });
    questions.forEach((q) => {
      let tempMax = 0;
      q.options.forEach((i) => {
        if (tempMax < i.score) {
          tempMax = Number(i.score);
        }
      });
      tempTotalScore += Number(tempMax);
    });
    answerReport.forEach((i) => {
      let tempMax = 0;
      if (tempMax < i.max_score) {
        tempMax = Number(i.max_score);
      }
      tempTotalScore2 += Number(tempMax);
    });

    // setTotalScore(tempTotalScore >= tempTotalScore2 ? tempTotalScore : tempTotalScore2);
    // setTotalAnswered(answerReport.length);
    if (!reportId || editUrl) {
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer", {
          complianceId,
          answer: answerReport,
          total_answered: answerReport.length,
          total_score: tempTotalScore > tempTotalScore2 ? tempTotalScore : tempTotalScore2,
          score: tempScore,
          instituteId: userData.id,
          status: "Pending",
          // responseId: responseId,
        })
        .then((response) => {
          setEditUrl(false);
          setAnswerLoading(false);
          // setisFormSaved(true);
          navigate("/dashboard/school-compliance/" + complianceId + "/continue/" + response.data.result.id);
          // toast.success("Successfully Save");
          // navigate("/dashboard");
        })
        .catch((err) => {
          setAnswerLoading(false);
          // toast.error('internal server error')
          console.log(err);
        });
    } else {
      axios
        .put(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer/" + reportId, {
          complianceId,
          answer: answerReport,
          total_answered: answerReport.length,
          total_score: tempTotalScore > tempTotalScore2 ? tempTotalScore : tempTotalScore2,
          score: tempScore,
          instituteId: userData.id,
          status: "Pending",
          // responseId: responseId,
        })
        .then((response) => {
          setAnswerLoading(false);
          // setisFormSaved(true);
          // navigate("/dashboard/school-compliance/report/" + response.data.result.id);
          // toast.success("Successfully Save");
          // navigate("/dashboard");
        })
        .catch((err) => {
          setAnswerLoading(false);
          console.log(err);
        });
    }
  };

  const isRequired = (questionNo, id) => {
    let required = false;

    required = id.includes(questionNo);
    return required;
  };

  useEffect(() => {
    missingQuestionId();
  }, [requiredQuestions]);

  useEffect(() => {
    prefillAttemptQuestion();
  }, [questions]);

  useEffect(() => {
    if (answerReport.length > 0) {
      handleSaveProgress();
    }
  }, [answerReport]);

  useEffect(() => {
    calculateProgress();
  }, attemptQuestion);

  useEffect(() => {
    if (questions.length > 0 && !reportId) {
      setRequiredQuestions(
        questions.filter((q) => {
          return q.required === true;
        })
      );
    } else {
      let requiredQ = questions.filter((q) => {
        return q.required === true;
      });

      if (questions.length > 0 && reportId && requiredQ.length > 0) {
        // requiredQ = continueAnswer.filter((anwer))
        requiredQ = requiredQ.filter((q) => {
          return continueAnswer.some((answer) => answer.questionId !== q.id);
        });
      }
      console.log("required question", requiredQ);
      setRequiredQuestions(requiredQ);
    }
  }, [questions, reportId]);

  const handleShowSub = (index) => {};

  const getAllCategoriesByComplianceId = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category/compliance/" + complianceId).then((response) => {
      setCategory(response.data.result);
    });
  };
  const updateScoreSubQuestion = (questionId, complianceId, subQuestionId, score, maxScore, comment, image, showSubQuestion) => {
    let updatedAnswerReport = [...answerReport];
    const questionIndex = updatedAnswerReport.findIndex((question) => question.subQuestionId === subQuestionId);
    // console.log(questionIndex,"questionIndex");
    if (!score) {
      score = 0;
    }
    if (!maxScore) {
      maxScore = 1;
    }
    if (questionIndex !== -1) {
      updatedAnswerReport[questionIndex].score = score;
      updatedAnswerReport[questionIndex].comment = comment;
      updatedAnswerReport[questionIndex].image = image;
    } else {
      updatedAnswerReport.push({
        subQuestionId: subQuestionId,
        questionId: questionId,
        complianceId: complianceId,
        score: score,
        max_score: maxScore,
        comment: comment,
        image: image,
      });
    }
    // setshowSubQuestion(showSubQuestion);
    setAnswerReport(updatedAnswerReport);
  };

  const updateScore = (categoryId, questionId, score, maxScore, comment, image, index, subQuestion, text, indexOfOption) => {
    // console.log("updateScore", answerReport)
    console.log("this is comment", comment, "this is image", image);
    // making require array false if question have some changes
    let tempRequireArray = [...requiredArray];

    tempRequireArray[index] = false;

    setRequireArray(tempRequireArray);
    // console.log("tempRequireArray,requiredArray, "index",index)
    let updatedAnswerReport = [...answerReport];
    const questionIndex = updatedAnswerReport.findIndex((question) => question.questionId === questionId);
    if (!score) {
      score = 0;
    }
    if (!maxScore) {
      maxScore = 1;
    }
    if (questionIndex !== -1) {
      updatedAnswerReport[questionIndex].score = score;
      updatedAnswerReport[questionIndex].comment = comment;
      updatedAnswerReport[questionIndex].image = image;
      updatedAnswerReport[questionIndex].text = text;
    } else {
      updatedAnswerReport.push({
        categoryId: categoryId,
        complianceId: complianceId,
        questionId: questionId,
        score: score,
        max_score: maxScore,
        comment: comment,
        image: image,
        text: text,
      });
    }

    if (index >= 0 && subQuestion) {
      const indexArray = [...showArray];
      indexArray[index] = true;
      setshowArray(indexArray);
    } else if (subQuestion === false) {
      const indexArray = [...showArray];
      indexArray[index] = false;
      setshowArray(indexArray);
    }
    if (text && indexOfOption >= 0 && subQuestion) {
      const temp = [...textArray];
      temp[index] = { text, ind: indexOfOption };
      setTextArray(temp);
    } else {
      const temp = [...textArray];
      temp[index] = { text: "", ind: -1 };
      setTextArray(temp);
    }
    let attemptss = [...attemptQuestion];
    attemptss[index] = true;
    setAttemptQuestion(attemptss);
    // console.log(showArray);
    calculateProgress();
    setAnswerReport(updatedAnswerReport);
  };
  const updateScoreNumber = (categoryId, questionId, score, maxScore, comment, image, index, signature) => {
    // console.log("updateScoreNumber", questionId, score, maxScore, comment, image)
    let tempRequireArray = [...requiredArray];

    tempRequireArray[index] = false;

    setRequireArray(tempRequireArray);
    let updatedAnswerReport = [...answerReport];
    const questionIndex = updatedAnswerReport.findIndex((question) => question.questionId === questionId);
    if (!score) {
      score = 0;
    }
    if (!maxScore) {
      maxScore = 1;
    }
    if (questionIndex !== -1) {
      updatedAnswerReport[questionIndex].score = score;
      updatedAnswerReport[questionIndex].comment = comment;
      updatedAnswerReport[questionIndex].signature = signature;
    } else {
      updatedAnswerReport.push({
        categoryId: categoryId,
        complianceId: complianceId,
        questionId: questionId,
        score: score,
        max_score: maxScore,
        comment: comment,
        image: image,
        signature: signature,
      });
    }
    let attemptss = [...attemptQuestion];
    attemptss[index] = true;
    setAttemptQuestion(attemptss);
    calculateProgress();
    setAnswerReport(updatedAnswerReport);
  };

  const getCompliance = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance/" + complianceId)
      .then((response) => {
        setCompliance(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getQuestions = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_question/compliance/" + complianceId)
      .then((response) => {
        setQuestions(response.data.result);
        setshowArray(Array(response.data.result.length).fill(false));
        setAttemptQuestion(Array(response.data.result.length).fill(false));
        setTextArray(Array(response.data.result.length).fill({}));
        setRequireArray(Array(response.data.result.length).fill(false));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // useEffect(()=>)

  useEffect(() => {
    getCompliance();
    getQuestions();
    getAllCategoriesByComplianceId();
    // console.log("reload again")
  }, []);

  useEffect(() => {
    getQuestions();
  }, [complianceId]);

  const handleNextPage = () => {
    setIsSubmit(true);

    const missingQuestion = missingQuestionId();
    // console.log("this is missing question",missingQuestion);
    const categoryQuestion = questions.filter((q) => q.categoryId === category[currentPage - 1]?.id);
    const thisPageId = categoryQuestion.filter((q) => {
      // id required
      if (q.required) {
        return q.id;
      }
    });
    const tempMissing = missingQuestion.filter((i) => thisPageId.some((q) => q.id === i.id));
    // console.log("this is tempMissing", tempMissing, thisPageId, categoryQuestion, missingQuestion);
    if (tempMissing.length > 0) {
      toast.dismiss();
      const allMissingQuestionNos = tempMissing.map((item) => item.no).join(", ");

      const missingQuestionMessage = "Question no. " + allMissingQuestionNos + " is Required";

      toast.error(missingQuestionMessage);
      return;
    }
    // console.log(questionSoFar)
    setCurrentPage(currentPage + 1);
    let questionLastPage = questions.filter((q) => q.categoryId === category[currentPage + 1 - 2]?.id).length;
    setLastprev(prev);   
    setprev(questionLastPage + prev);

    setIsSubmit(false);
    console.log("ajflkasfjlasdkfjdk", questionSoFar())

  };

  const questionSoFar=()=>{
    let totalQuestion = 0
    console.log('=>> current page ', currentPage-2)
    for(let i=0; i<=currentPage-2;i++){
     let question= questions.filter((q) => q.categoryId === category[i-1]?.id).length;
     totalQuestion+=question
     console.log('total question',totalQuestion, '>>>>>>', i)
    }
    return totalQuestion;
  }
  const handlePrevPage = () => {
    if (currentPage === 1) {
      toast.dismiss();
      toast.error("There is no Previous page");
      return;
    }
    let questionLastPage = questions.filter((q) => q.categoryId === category[currentPage  - 2]?.id).length;
    
    // console.log("question last page", questionLastPage,'current page', currentPage-1) //currentpage 2 // questionlastpage -4 // 
    // console.log('questionLastPage-prev',questionLastPage,prev, questionLastPage-prev)
    // setprev(lastPrev);
    console.log("ajflkasfjlasdkfjdk", questionSoFar())
    setprev(questionSoFar())
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === category.length;
  // console.log(answerReport);

  return (
    <>
      {/* Header  */}
      <div className="py-3 bg-light border-bottom border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end">
            {/* Name */}
            <div>
              <span>
                Compliance
              </span>
              <h4 className="text-darkprime fw-bold">{compliance.title}</h4>
            </div>
            {/* Next,Previous Buttons  */}
            <div className="d-flex justify-content-between">
              {/* Save Progress Button */}
              {/* {(!isFormSaved || reportId) && (
                <button onClick={handleSaveProgress} className="btn btn-outline-primary btn-lg rounded-0 px-3 me-1">
                  Save Progress
                </button>
              )} */}
              {
                <div>
               { !isFirstPage && <button onClick={handlePrevPage} className="btn btn-outline-primary rounded-0 px-3 me-1">
                    <i className="bi bi-arrow-left"></i> Prev
                  </button>}
                  <button onClick={handleNextPage} className="btn btn-outline-primary  rounded-0 px-3 me-1">
                    Next <i className="bi bi-arrow-right"></i>
                  </button>
                {isLastPage&&  <button onClick={handleSubmit} className="btn btn-outline-primary  rounded-0 px-3">
                  Submit
                </button>}
                </div>
               }

              {isLastPage ? (
                <div>
                  <div className="footer mt-4"></div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* Content  */}
      <div className="container py-2">
        <div className="row g-1">
          <div className="col-12 col-lg-9">
            <div className="overflow-scroller">
              <div className="complianceForm">
                <div className="">
                  <h5 className="text-capitalize bg-darkprime p-3 fw-semibold text-white mb-2">{category[currentPage - 1]?.title}</h5>
                  {questions
                    .filter((q) => q.categoryId === category[currentPage - 1]?.id)
                    .map((q, index) => {
                      let questionNO = index + prev;
                      return (
                        <div key={q.id} id={"question-" + (questionNO + 1)}>
                          { ["YesNo","YesNONa","mcq"].includes(q.question_type)
                           && 
                           <Comp_MCQ loading={answerLoading} answerReport={answerReport} reportId={reportId} key={q.id} index={questionNO} question={q} changeAnswer={updateScore} totalQuestion={questions.length} required={requiredArray[questionNO]} submit={isSubmit} />}

                          {
                          ["Number","Long","Short","Signature"].includes(q.question_type)
                           && 
                           <Comp_Num loading={answerLoading} answerReport={answerReport} key={q.id} index={questionNO} reportId={reportId} question={q} changeAnswer={updateScoreNumber} totalQuestion={questions.length} required={requiredArray[questionNO]} submit={isSubmit} />}

                          {showArray[questionNO] &&
                            q.options.map((i, index) => {
                              let count = 0;
                              return textArray[index].text === i.text && i.sub_question ? (
                                <div>
                                  <SubQuestion4option key={i.sub_question.subQuestion4optionId} index={questionNO} indexA={count++} question={i.sub_question} changeAnswer={updateScoreSubQuestion} totalQuestion={questions.length} />
                                </div>
                              ) : null;
                            })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="overflow-scroller">
              <div className="card p-3 border rounded-0 w-100 border-purple-2">
                <div className="body">
                  <div className="progress-show p-2">
                    <ComplianceProgress value={progress} />
                  </div>
                  <div className="mt-3">
                    <p className="text-capitalize text-dark lh-sm fw-semibold">{category[currentPage - 1]?.title}</p>
                    <small className="fw-bold">Questions</small>
                    <div className="row row-cols-6 g-1 ">
                      {questions
                        .filter((q) => q.categoryId === category[currentPage - 1]?.id)
                        .map((ques, index) => {
                          let questionNO = index + prev;
                          return (
                            <div className="col" key={index}>
                              <ButtonNavQuestion ques={ques} index={questionNO} answerReport={answerReport} />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          className="loader-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
  );
};

export default ComplianceForm;

const ButtonNavQuestion = ({ ques, index, answerReport }) => {
  const filter = answerReport.filter((data) => data.questionId == ques.id)[0];
  return (
    <a className={`btn border rounded-0 m-0 w-100 ${filter ? (filter?.max_score > filter?.score ? "btn-danger text-white" : "btn-success text-white") : ""}`} href={"#question-" + (index + 1)}>
      <small className="text-nowrap" style={{ textWrap: "nowrap !important" }}>
        {index + 1}
      </small>
    </a>
  );
};
