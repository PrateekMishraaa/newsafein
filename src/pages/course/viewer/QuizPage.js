import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiJsonAuth } from "api";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
const moment = require("moment");

function QuizPage({
  responseData,
  question,
  studentResult,
  setStudentResult,
  reload,
}) {
  const [answer, setAnswer] = React.useState(
    localStorage.getItem("CurrectQuiz") === null
      ? {}
      : JSON.parse(localStorage.getItem("CurrectQuiz"))
  );

  const uploadData = async (
    totalQuestions,
    totalAttemted,
    totalCorrected,
    result
  ) => {
    // console.log(responseData?.data.id);
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
    const totalAttemted = Object.keys(ans).length; // ans
    var totalCorrected = 0;
    ques.map((list) => {
      switch (list.type) {
        case 1:
          if (ans[list.id]?.trim() === JSON.parse(list.ans).trim()) {
            totalCorrected++;
          }
          break;
        case 3:
          if (ans[list.id]) {
            totalCorrected++;
          }
          break;
        default:
          if (ans[list.id]) {
            totalCorrected++;
          }
      }
    });
    let result =
      (totalCorrected / totalQuestions) * 100 >= passing_criteria
        ? "PASS"
        : "FAIL";
    console.log(
      "Result",
      totalQuestions,
      totalAttemted,
      totalCorrected,
      result
    );
    return { totalQuestions, totalAttemted, totalCorrected, result };
  };

  const handelSubmit = async (e) => {
    const { totalQuestions, totalAttemted, totalCorrected, result } = calResult(
      question,
      answer,
      responseData.data.passing_criteria
    );
    uploadData(totalQuestions, totalAttemted, totalCorrected, result);
  };

  const updateAns = (value, id, type) => {
    if (type === 3) {
      answer[id]
        ? answer[id].includes(value)
          ? answer[id].pop(value)
          : answer[id].push(value)
        : (answer[id] = [value]);
    } else {
      answer[id] = value;
    }
    setAnswer(answer);
    localStorage.setItem("CurrectQuiz", JSON.stringify(answer));
  };

  return (
    <>
      <div className="container p-3">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {question?.map((ques, index) => {
            switch (ques.type) {
              case 1:
                return (
                  <Card className="container border-0">
                    <Card.Header className="border-0 bg-white">
                      <h5 className="fs-5">
                        Q{index + 1}. {ques.ques}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <h6>Answers :</h6>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        className="p-2"
                        name="radio-buttons-group"
                        row
                        //   className="row row-cols-1 row-cols-lg-2"
                        onChange={(e) =>
                          updateAns(e.target.value, ques.id, ques.type)
                        }
                      >
                        {JSON.parse(ques.options).map((option) => {
                          return (
                            <>
                              <FormControlLabel
                                value={option}
                                className="border border-1 rounded py-2 col-12 col-lg-5 mb-1"
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
                                label={
                                  <span className="text-dark">{option}</span>
                                }
                              />
                            </>
                          );
                        })}
                      </RadioGroup>
                    </Card.Body>
                  </Card>
                );
                break;
              case 3:
                return (
                  <Card className="container border-0">
                    <Card.Header className="border-0 bg-white">
                      <h5 className="fs-5">
                        Q{index + 1}. {ques.ques}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <h6>Answers :</h6>
                      <FormGroup
                        className="p-2"
                        row
                        //   className="row row-cols-1 row-cols-lg-2"
                        onChange={(e) =>
                          updateAns(e.target.value, ques.id, ques.type)
                        }
                      >
                        {JSON.parse(ques.options).map((option) => {
                          return (
                            <>
                              <FormControlLabel
                                value={option}
                                className="border border-1 rounded py-2 col-12 col-lg-5 mb-1"
                                control={
                                  <Checkbox
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
                                label={
                                  <span className="text-dark">{option}</span>
                                }
                              />
                            </>
                          );
                        })}
                      </FormGroup>
                    </Card.Body>
                  </Card>
                );
                break;
              case 4:
                return (
                  <Card className="container border-0">
                    <Card.Header className="border-0 bg-white">
                      <h5 className="fs-5">
                        Q{index + 1}. {ques.ques}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <h6>Answers :</h6>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        className="p-2"
                        name="radio-buttons-group"
                        row
                        //   className="row row-cols-1 row-cols-lg-2"
                        onChange={(e) =>
                          updateAns(e.target.value, ques.id, ques.type)
                        }
                      >
                        {JSON.parse(ques.options)?.map((option) => {
                          return (
                            <>
                              <FormControlLabel
                                value={option}
                                className="border border-1 rounded py-2 col-12 col-lg-5 mb-1"
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
                                label={
                                  <span className="text-dark">{option}</span>
                                }
                              />
                            </>
                          );
                        })}
                      </RadioGroup>
                    </Card.Body>
                  </Card>
                );
                break;
              case 5:
                return (
                  <Card className="container border-0">
                    <Card.Header className="border-0 bg-white">
                      <h5 className="fs-5">
                        Q{index + 1}. {ques.ques}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <h6>Answers :</h6>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        className="p-2"
                        name="radio-buttons-group"
                        row
                        //   className="row row-cols-1 row-cols-lg-2"
                        onChange={(e) =>
                          updateAns(e.target.value, ques.id, ques.type)
                        }
                      >
                        {JSON.parse(ques?.options)?.map((option) => {
                          return (
                            <>
                              <FormControlLabel
                                value={option}
                                className="border justify-content-center border-1 rounded py-2 col-12 col-lg-5 mb-1"
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
                                label={
                                  <img
                                    className="card shadow-sm mx-auto d-block"
                                    style={{
                                      height: 200,
                                      objectFit: "contain",
                                      objectPosition: "center",
                                    }}
                                    src={option}
                                    alt={option}
                                  />
                                }
                              />
                            </>
                          );
                        })}
                      </RadioGroup>
                    </Card.Body>
                  </Card>
                );
                break;
              default:
                return (
                  <Card className="container my-3  border-0">
                    <Card.Header className="border-0 bg-white">
                      <h5>
                        Q{index + 1}. {ques.ques}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <TextField
                        id={ques.id}
                        label="Enter You Answer Here!"
                        value={answer[ques.id]}
                        onChange={(e) => updateAns(e.target.value, ques.id)}
                        multiline
                        rows={5}
                        fullWidth
                      />
                    </Card.Body>
                  </Card>
                );
            }
          })}
          <div className="text-center ">
            <Button
              onClick={(e) => handelSubmit(e)}
              type="submit"
              variant="contained"
              className="text-capitalize py-2 px-4 rounded"
              color="success"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default QuizPage;
