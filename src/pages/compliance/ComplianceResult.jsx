import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useGlobalContext } from "global/context";
import { FileDownload } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import ComplianceResultQuestionTable from "./components/ComplianceResultQuestionTable";
import {TransparentBreadcrumb} from "components/layout";

const ComplianceResult = () => {
  const { resultid } = useParams();
  const { userData } = useGlobalContext();
  // const [responseData, setResponseData] = useState(null);
  const [resultData, setresultData] = useState(null);
  const [colorClass, setcolorClass] = useState("bg-success bg-opacity-25 border-success");
  // const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [compliance, setCompliance] = useState({});
  const [categoryArray, setCategoryArray] = useState([]);
  const [temparray, settemparray] = useState([]);
  const [signature, setSignature] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [scoreArray, setScoreArray] = useState([]);
  const [maxScore, setmaxScore] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);
  const [mappedQuestionAnswers, setmappedQuestionAnswers] = useState([]);

  const getMappedQuestionAnswer = () => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/complianceMapedData/answer/" + resultid)
      .then((res) => {
        setmappedQuestionAnswers(res.data.mappedDataQuestionAnswer);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };
  useEffect(() => {
    getMappedQuestionAnswer();
  }, []);

  const getCategoryNameArray = (categoryArray) => {
    const array = categoryArray.map((i) => i.title);
    const score = categoryArray.map((i) => {
      console.log("iiiiiiiiiiiiiiiii", i.score);
      return calculateGrade(i.score, i.totalScore) + "%";
    });
    console.log("array", categoryArray, array, score);
    setCategoryName(array);
    setScoreArray(score);
  };

  useEffect(() => {
    setmaxScore(Math.max(...scoreArray));

  }, [scoreArray]);

  const chartData = {
    options: {
      chart: {
        id: "basic-line",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: categoryName,
      },
    },
    series: [
      {
        name: compliance.title,
        data: scoreArray,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: true,

    // Chart Title
    title: {
      display: true,
      text: "Sample Chart",
      fontSize: 24,
    },
  };

  const getCompliance = () => {
    if (resultData) {
      axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance/" + resultData.complianceId).then((res) => {
        setCompliance(res.data.result);
      });
    }
  };

  const getSignature = () => {
    if (resultData) {
      const signature = resultData?.answer?.filter((ans) => {
        return ans.signature;
      });
      setSignature(signature);
    }
  };

  useEffect(() => {
    // console.log("use 2")

    if (resultData) {
      getCompliance();
      getQuestions();
      getSignature();
    }
  }, [resultData]);

  useEffect(() => {
    // console.log("use 3")

    if (questions.length > 0) {
      categorySet();
    }
  }, [questions]);

  useEffect(() => {
    // console.log("use 4")

    if (categoryArray.length > 0) {
      categoryWiseScore();
    }
  }, [temparray]);

  const categoryWiseScore = () => {
    let updated = [...categoryArray];
    updated.forEach((cat, index) => {
      let catAnwer = resultData?.answer?.filter((q) => q.categoryId === cat.id);
      let total = 0;
      catAnwer.forEach((ans) => {
        total += Number(ans.score);
      });
      updated[index].score = total;
    });
    console.log("this is update", updated);
    setCategoryArray(updated);
    getCategoryNameArray(updated);
  };

  const getQuestions = () => {
    if (resultData) {
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_question/compliance/" + resultData.complianceId)
        .then((response) => {
          setQuestions(response.data.result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const generatePDF = () => {
    setIsLoading(true);

    const input = document.getElementById("component-to-pdf");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const maxSinglePageHeight = 297;
      const padding = 50;

      let yOffset = 0;
      let pageCounter = 1;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      while (yOffset + maxSinglePageHeight + padding < pdfHeight) {
        pdf.addPage();
        pageCounter++;
        yOffset += maxSinglePageHeight + padding;
        pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, pdfHeight);
      }

      pdf.save(`${userData.institution_name}_${pageCounter}pages.pdf`);
      setIsLoading(false);
    });
  };

  const categorySet = () => {
    const allQuestion = [...questions];

    const category = allQuestion.reduce((result, q) => {
      const existingCategory = result.find((item) => item.id === q.categoryId);

      if (!existingCategory) {
        const catQuestions = allQuestion.filter((ques) => ques.categoryId === q.categoryId);
        let total = 0;
        catQuestions.forEach((q) => {
          let tempMax = 0;
          q.options.forEach((i) => {
            if (tempMax < i.score) {
              tempMax = Number(i.score);
            }
          });
          total += tempMax;
        });
        result.push({
          id: q.categoryId,
          title: q.category,
          totalScore: total,
        });
      }

      return result;
    }, []);

    console.log("this is category", category);
    setCategoryArray(category);
    settemparray(category);
  };

  const getAnswerData = () => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer/" + resultid)
      .then((response) => {
        // console.log("this is result ",response.data.result);
        setresultData(response.data.result);
        console.log("get answer ...............................response.data.result", response.data.result);
        totalQuestion(response.data.result.complianceId);
        setAnswerArray(response.data.result.answer);
        // console.log("getting result id",response.data.result.responseId)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.message);
      });
  };
  const getResponseData = (id) => {
    if (id) {
      // console.log("got response of", id);
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_response/" + id)
        .then((response) => {
          // setResponseData(response.data.result);
          // console.log(responseData,"get data of response")
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const totalQuestion = (id) => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_question/compliance/" + id)
      .then((response) => {
        // setQuestion(response.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const calculateGrade = (score, totalScore) => {
    let percentage = Math.ceil((score / totalScore) * 100).toFixed();
    // console.log(percentage, "this is percentage")
    // if (percentage >= 90) {
    //   return 'A+';
    // } else if (percentage >= 80) {
    //   return 'A';
    // } else if (percentage >= 70) {
    //   return 'B';
    // } else if (percentage >= 60) {
    //   return 'C';
    // } else if (percentage >= 50) {
    //   return 'D';
    // } else {
    //   return 'F';
    // }
    if (percentage <= 0) {
      percentage = 0;
    } else if (percentage >= 100) {
      percentage = 100;
    }
    return percentage ? percentage + "%" : "0%";
  };

  const calculatecolor = (score, totalScore) => {
    const percentage = (score / totalScore) * 100;
    // console.log(percentage, 'this is percentage');

    if (percentage >= 90) {
      return "bg-success bg-opacity-50 border-success";
    } else if (percentage >= 80) {
      return "bg-success bg-opacity-25 border-success"; // Change color as desired
    } else if (percentage >= 70) {
      return "bg-warning bg-opacity-75 border-warning"; // Change color as desired
    } else if (percentage >= 60) {
      return "bg-warning bg-opacity-50 border-warning"; // Change color as desired
    } else if (percentage >= 50) {
      return "bg-danger bg-opacity-50 border-danger text-danger"; // Change color as desired
    } else {
      return "bg-danger bg-opacity-50 border-danger text-danger"; // Change color as desired
    }
  };

  useEffect(() => {
    // console.log("use 5")

    getAnswerData();
  }, []);

  useEffect(() => {
    // console.log("use 6")

    if (resultData) {
      const newColorClass = calculatecolor(resultData.score, resultData.total_score);
      setcolorClass(newColorClass);
    }
  }, [resultData]);

  return (
    <div>
      <TransparentBreadcrumb
        heading={"Compliance Report"}
        rightCol={
          <button className="btn rounded-0" onClick={generatePDF} disabled={isLoading}>
            {isLoading ? (
              <span>
                <Spinner size="sm" /> Generating PDF...
              </span>
            ) : (
              <span>
                <FileDownload />
                Download PDF
              </span>
            )}
          </button>
        }
      />
      <div id="component-to-pdf" className="container-fluid p-4">
        <div className="">
          <div className="bg-white border">
            {/* //Header  */}
            <div className="border-bottom p-2 p-lg-3 bg-light">
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <div className="header text-start">
                    <h3 className="text-capitalize ">{userData && userData.institution_name}</h3>
                    <h5 className="text-capitalize">{compliance.title}</h5>
                  </div>
                  <div className="subheader text-start">
                    <h5 className="text-capitalize">{userData && userData.institution_address}</h5>
                    <h5>Date: {resultData && resultData.createdAt.substring(0, 10)}</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={`div me-0 h-100 container rounded-0 text-center border border-3 ${colorClass}`} style={{ maxWidth: "400px" }}>
                    <div className="d-flex h-100 align-items-center justify-content-between">
                      <div className="p-2">
                        <h3 className="fw-bold">Score</h3>
                      </div>
                      <div className="p-2">
                        <h1 className="fw-bold">{resultData && calculateGrade(resultData.score, resultData.total_score)}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              {
                // question wise data start here

                categoryArray.length > 0 &&
                  categoryArray.map((cat, index) => {
                    return (
                      <div className="mb-4" key={cat.id}>
                        <ComplianceResultQuestionTable
                          page={index + 1}
                          resultId={resultid}
                          mappedQuestion={mappedQuestionAnswers.filter((ques) => {
                            return ques.question.categoryId === cat.id;
                          })}
                          answers={answerArray?.filter((ans) => {
                            return ans.categoryId === cat.id;
                          })}
                          questions={questions?.filter((ques) => {
                            return ques.categoryId === cat.id;
                          })}
                          category={cat}
                        />
                      </div>
                    );
                  })
              }
            </div>
            {signature.length > 0 && (
              <div className="d-flex flex-column align-items-end m-4">
                <div style={{ width: "100px", border: "none", height: "60px" }}>
                  <div>
                    <img style={{ width: "100%", height: "100%" }} src={signature[0].signature} alt="signature" />
                  </div>
                </div>
                <div>
                  <h6>{resultData.name}</h6>
                  <span> Date: {resultData && resultData.createdAt.substring(0, 10)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="position-fixed top-0 start-0 d-flex justify-content-center align-items-center w-100 h-100" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceResult;
