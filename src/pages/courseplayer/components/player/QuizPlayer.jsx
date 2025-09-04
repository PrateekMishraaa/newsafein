import React from "react";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiJsonAuth } from "api";
import QuizComponent from "../content/QuizComponent";
import { QuizResultSummary } from "components/course";

const QuizPlayer = ({ content, activeContentId, postProgress, progress, fetchNextStop }) => {
  const [quizInfo, setQuizInfo] = React.useState({});
  const [responseData, setResponse] = React.useState({});
  const [studentResult, setStudentResult] = React.useState({ reattempt: true });
  const [question, setQuestion] = React.useState([]);

  async function fetchData() {
    try {
      const response = await apiJsonAuth.post("/course/quiz/", {
        quizId: content?.path,
      });
      console.log({ response: response?.data });
      setResponse(response?.data);
      setQuizInfo(response?.data?.data);
      setQuestion(response?.data?.data?.question);

      if (response?.data?.result) {
        setStudentResult(response?.data?.result);

        // Check if the result is "PASS" and update progress
        if (response?.data?.result?.result === "PASS" && !progress?.includes(content?.id)) {
          fetchNextStop(4);
          postProgress(content?.id);
        }
      } else {
        setStudentResult({ reattempt: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [content?.path]);

  return (
    <div className="d-flex align-items-top justify-content-center" style={{ height: 600, overflowY: "auto" }}>
      <div className="w-100 p-2">
        {console.log({ question, result: Boolean(studentResult?.progress) && studentResult?.progress })}

        {/* Check if the student has completed the quiz */}
        {studentResult?.result ? (
          <div>
            <div className="container item-center px-3 mx-auto m-5" style={{ maxWidth: "550px" }}>
              {/* Success or Failure based on the result */}
              {studentResult.result === "FAIL" ? (
                <div className="text-center">
                  <img src="http://glcloud.in/uploads/Yuvamanthan/course/64f9b391abc92.jpg" className="w-100 mx-auto d-block" alt="" style={{ maxWidth: 300 }} />
                  <h4 className="mt-3 text-danger">You Have to Retake This Activity</h4>
                </div>
              ) : (
                <div className="text-center">
                  {/* Success case when the quiz is passed */}
                  <img src="http://glcloud.in/uploads/Yuvamanthan/course/64f9b367c31a3.jpg" className="w-100 mx-auto d-block" alt="" style={{ maxWidth: 300 }} />
                  <h4 className="mt-3 text-success">You Have Successfully Completed This Activity</h4>
                </div>
              )}

              {/* ReAttempt Button */}
              <div className="container item-center text-center">
                {studentResult.result === "FAIL" && (
                  <Button
                    onClick={() => {
                      setStudentResult({ reattempt: true });
                    }}
                    variant="outlined"
                    color="error"
                    size="large"
                    className="mx-auto text-capitalize rounded-3 fw-semibold">
                    Reattempt
                  </Button>
                )}
              </div>
            </div>

            {/* Show summary for the quiz if passed */}
            {studentResult.result === "PASS" && (
              <div className="container border-top pt-4">
                <h5>Summary:</h5>
                <QuizResultSummary questions={question} response={studentResult?.progress} /> {/* Pass directly without JSON.parse */}
              </div>
            )}
          </div>
        ) : studentResult?.reattempt ? (
          <div className="container item-center py-4" style={{ maxWidth: "550px" }}>
            <div className="table-responsive rounded-4 border overflow-hidden mb-3">
              <table className="table w-100 table-borderless">
                <thead>
                  <tr className="bg-light">
                    <td colSpan={2} className="text-center">
                      <h6>{quizInfo?.title}</h6>
                      <p>{quizInfo?.desc}</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Duration</td>
                    <td>{quizInfo?.quiz_duration} Min</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <div>
                        <b>Note: You Must Attempt All Questions</b>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Begin Quiz Button */}
            <div className="container item-center text-center">
              <Button
                onClick={() => {
                  setStudentResult({ reattempt: false });
                }}
                variant="outlined"
                color="success"
                size="large"
                className="mx-auto text-capitalize rounded">
                Let's Begin
              </Button>
            </div>
          </div>
        ) : (
          <QuizComponent
            quizInfo={quizInfo}
            responseData={responseData}
            reload={fetchData}
            question={question}
            studentResult={studentResult}
            setStudentResult={setStudentResult}
          />
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
