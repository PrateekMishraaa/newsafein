import axios from "axios";
import React from "react";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizPage from "./QuizPage";
import { apiJsonAuth } from "api";
const baseURL = "http://localhost:2100/course/quiz";

const NewQuizComponent = ({ file, viewIndex, series, postProgress, progress }) => {
  const [quizInfo, setQuizInfo] = React.useState({});
  const [responseData, setResponse] = React.useState({});
  const [studentResult, setStudentResult] = React.useState({ reattempt: true });
  const [question, setQuestion] = React.useState([]);

  async function fetchData() {
    try {
      // const response = await apiJsonAuth.post("/course/quiz", {
      const response = await apiJsonAuth.post("/course/quiz/", {
        quizId: file,
      });
      setResponse(response?.data);
      setQuizInfo(response?.data?.data);
      setQuestion(response?.data?.data?.question);
      if (response?.data?.result) {
        if (response?.data?.result?.result === "PASS")
          if (!progress?.includes(series[viewIndex].seriesId)) {
            postProgress(series[viewIndex].seriesId);
          }
        setStudentResult(response?.data?.result);
      } else setStudentResult({ reattempt: true });
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [file]);

  return (
    <div className="border border-3 border-success d-flex align-items-top justify-content-center" style={{ height: 550, overflowY: "auto" }}>
      <div className="w-100">
        {studentResult?.result ? (
          <div className="container item-center px-3 mx-auto m-5" style={{ maxWidth: "550px" }}>
            <table className="table table-bordered text-center mx-auto table-striped" style={{ borderRadius: "10px" }}>
              <thead>
                <tr className={studentResult.result == "PASS" ? "bg-success text-white" : "bg-danger text-white"}>
                  <th colSpan="2" className="p-3">
                    RESULT
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-start p-3">Total Question</th>
                  <td className="text-center p-3">{studentResult.total_question}</td>
                </tr>
                <tr>
                  <th className="text-start p-3">Totall Attemted</th>
                  <td className="text-center p-3">{studentResult.total_attemted}</td>
                </tr>
                <tr>
                  <th className="text-start p-3">Totall Correct</th>
                  <td className="text-center p-3">{studentResult.total_correct}</td>
                </tr>
                <tr>
                  <th className="text-start p-3">Result</th>
                  <td className={studentResult.result == "PASS" ? "bg-success text-white text-center p-3" : "bg-danger text-white text-center p-3"}>{studentResult.result}</td>
                </tr>
              </tbody>
            </table>
            <div className="container item-center text-center">
              {studentResult.result === "FAIL" && (
                <Button
                  onClick={() => {
                    setStudentResult({ reattempt: true });
                  }}
                  variant="outlined"
                  color="success"
                  size="large"
                  className="mx-auto text-capitalize rounded">
                  Reattempt Quiz
                </Button>
              )}
            </div>
          </div>
        ) : studentResult.reattempt ? (
          <div className="container item-center py-4" style={{ maxWidth: "550px" }}>
            <table className="table w-100 table-bordered border text-center">
              <thead>
                <tr className="bg-light">
                  <th colSpan={2}>Quiz Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Total Question</th>
                  <td>{quizInfo?.question?.length}</td>
                </tr>
                <tr>
                  <th>Quiz Duration</th>
                  <td>
                    {quizInfo?.quiz_duration}
                    <span>Min</span>
                  </td>
                </tr>
                <tr>
                  <th>Passing Criteria</th>
                  <td>
                    {quizInfo?.passing_criteria}
                    <span>%</span>{" "}
                  </td>
                </tr>
                {quizInfo.desc && (
                  <tr>
                    <td colSpan="3">{quizInfo.desc}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="container item-center text-center">
              <Button
                onClick={() => {
                  setStudentResult({ reattempt: false });
                }}
                variant="outlined"
                color="success"
                size="large"
                className="mx-auto text-capitalize rounded">
                Lets begin
              </Button>
            </div>
          </div>
        ) : (
          <QuizPage responseData={responseData} reload={fetchData} question={question} studentResult={studentResult} setStudentResult={setStudentResult} />
        )}
      </div>
    </div>
  );
};

export default NewQuizComponent;