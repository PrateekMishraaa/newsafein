import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiJsonAuth } from "api";
import { Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
const moment = require("moment");

function QuizComponent({ quizInfo, responseData, question, studentResult, setStudentResult, reload }) {
  const [answer, setAnswer] = useState(localStorage.getItem("CurrectQuiz") === null ? {} : JSON.parse(localStorage.getItem("CurrectQuiz")));

  // Move isValidJson function here to make it available
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const uploadData = async (totalQuestions, totalAttemted, totalCorrected, result) => {
    try {
      toast.loading("Calculating Result..");
      const response = await apiJsonAuth.put("/course/quiz/", {
        quizId: responseData?.data?.id,
        totalQuestions,
        totalAttemted,
        totalCorrected,
        studentResult: result,
        progress: JSON.stringify(answer),
        date: moment().format(),
      });
      if (response.status === 200) {
        toast.dismiss();
        localStorage.removeItem("CurrectQuiz");
        setStudentResult({ ...studentResult, reattempt: true });
        reload();
      } else {
        toast.dismiss();
        toast.error("Something Went Wrong!!!!!");
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something Went Wrong!!!!!");
    }
  };

  const calResult = (ques, ans, passing_criteria) => {
    ans = Object(ans);
    const totalQuestions = ques.length;
    const totalAttemted = Object.keys(ans).length;
    let totalCorrected = 0;

    ques.forEach((question) => {
      const key = question.id;
      let correctAnswer = question.ans;

      // If correctAnswer is a JSON-encoded string, parse it
      if (isValidJson(correctAnswer)) {
        correctAnswer = JSON.parse(correctAnswer);
      }

      const userAnswer = ans[key] ? ans[key].toString().trim().toLowerCase() : null;
      const formattedCorrectAnswer = correctAnswer ? correctAnswer.toString().trim().toLowerCase() : null;

      console.log(
        `Comparing: User Answer: ${JSON.stringify(userAnswer)}, Correct Answer: ${JSON.stringify(formattedCorrectAnswer)}`
      );

      // Compare both as strings after trimming and converting to lowercase
      if (userAnswer === formattedCorrectAnswer) {
        totalCorrected++;
        console.log(`Match found for id: ${key}`, `Correct Answer: ${formattedCorrectAnswer}`);
      } else {
        console.log(`No match for id: ${key}`, `Correct Answer: ${formattedCorrectAnswer}`);
      }
    });

    const result = (totalCorrected / totalQuestions) * 100 >= passing_criteria ? "PASS" : "FAIL";
    return { totalQuestions, totalAttemted, totalCorrected, result };
  };

  const updateAns = (value, id, type) => {
    let answerCopy = { ...answer };
    let currentAnswer = answerCopy[id];

    if (type === 3) {
      const included = currentAnswer?.includes(value);
      if (included) {
        let answerIndex = currentAnswer.indexOf(value);
        if (answerIndex > -1) {
          currentAnswer.splice(answerIndex, 1);
        }
      } else {
        answerCopy[id] ? answerCopy[id].push(value) : (answerCopy[id] = [value]);
      }
    } else {
      answerCopy[id] = value;
    }
    setAnswer(answerCopy);
    localStorage.setItem("CurrectQuiz", JSON.stringify(answerCopy));
  };

  const handelSubmit = async (e) => {
    try {
      if (Object?.keys(answer)?.length < question.length) {
        toast.error("Sorry you cannot submit, you should answer all questions first.");
        return;
      }
      const { totalQuestions, totalAttemted, totalCorrected, result } = calResult(question, answer, responseData.data.passing_criteria);
      uploadData(totalQuestions, totalAttemted, totalCorrected, result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-3">
      <div className="bg-light border border-bottom container py-3">
        {quizInfo?.title ? <h5>{quizInfo?.title}</h5> : ""}
        <p className="mb-0">{quizInfo?.desc}</p>
      </div>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          {question?.map((ques, index) => {
            switch (ques.type) {
              case 1:
                return (
                  <Card className="container border-0" key={index}>
                    <Card.Header className="border-0 bg-white">
                      <div className="d-flex fw-semibold text-dark">
                        Q{index + 1}. <div dangerouslySetInnerHTML={{ __html: ques.ques }}></div>
                      </div>
                      {Boolean(ques?.image?.length) && isValidJson(ques?.image) && (
                        <div className="row row-cols-1 row-cols-lg-2 g-2">
                          {JSON.parse(ques?.image).map((img, idx) => (
                            <div className="col" key={idx}>
                              <img className="w-100" src={img} alt={`image-${idx}`} />
                            </div>
                          ))}
                        </div>
                      )}
                    </Card.Header>
                    <Card.Body>
                      <h6>Options :</h6>
                      <RadioGroup name="case-1-radio" className="row row-cols-1 p-2 g-1" onChange={(e) => updateAns(e.target.value, ques.id, ques.type)}>
                        {isValidJson(ques?.options) &&
                          JSON.parse(ques?.options).map((option, idx) => (
                            <FormControlLabel
                              key={idx}
                              value={option}
                              className="border border-1 rounded py-2"
                              control={
                                <Radio
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 28,
                                    },
                                    "&.Mui-checked": {
                                      color: "green",
                                    },
                                  }}
                                />
                              }
                              label={<small className="text-dark text-capitalize me-2 d-block lh-sm">{option}</small>}
                            />
                          ))}

                      </RadioGroup>
                    </Card.Body>
                  </Card>
                );
              // Similar cases for type 3, 4, and 5...
              default:
                return null; // Handle default case if necessary
            }
          })}
          <div className="text-center ">
            <Button onClick={(e) => handelSubmit(e)} type="submit" variant="contained" className="text-capitalize py-2 px-4 rounded" color="success">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default QuizComponent;
