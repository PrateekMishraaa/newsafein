import { Button, Divider, TextField } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function QuizControl() {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState();
  const [show, setShow] = useState(false);
  const { token } = useGlobalContext();
  const [quiz, setQuiz] = useState({
    title: "",
    duration: "",
    level: "Easy",
    passing_criteria: "",
    sectionId: "",
    desc: "",
  });
  function fetchQuizs() {
    if (token)
      apiAuth
        .get("/course/quiz/fetch")
        .then((res) => {
          // console.log(res?.data.result)
          setQuizList(res?.data.result);
        })
        .catch((err) => {
          console.error(err);
        });
  }
  useEffect(() => {
    fetchQuizs();
  }, [token]);

  function createQuiz() {
    // console.log(quiz);
    if ((quiz.title && quiz.level && quiz.duration, quiz.sectionId)) {
      toast.loading("Creating Quiz.");
      apiJsonAuth
        .post("/course/quiz/create", quiz)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 200) {
            toast.dismiss();
            toast.success("Quiz is Created!");
            setQuiz({
              title: "",
              duration: "",
              level: "Easy",
              passing_criteria: "",
              sectionId: "",
              desc: "",
            });
            setShow(!show);
            fetchQuizs();
          } else {
            toast.dismiss();
            toast.warning("Something Went Wrong!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast.warning("All Fileds are required..");
    }
  }

  return (
    <div className="py-3">
      <Divider />
      <div className="d-flex align-items-center justify-content-between mt-2">
        <h4>Course Quizzes</h4>
        <Button
          variant="outlined"
          className="rounded-0"
          onClick={() => {
            setShow(!show);
          }}>
          Add Quiz
        </Button>
      </div>
      {/* Data Containing Table  */}
      <div>
        <div className="table-responsive mt-4">
          <table class="designed-table  table overflow-scroll table-hover table-bordered">
            <thead className="bg-light">
              <tr>
                <th>#Id</th>
                <th>Title</th>
                <th>Desc</th>
                <th>Duration(Min)</th>
                <th>Level</th>
                <th>Passing(%)</th>
              </tr>
            </thead>
            <tbody>
              {quizList?.map((item) => (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/admin/quiz/${item.id}`, { state: item });
                  }}>
                  <td>{item.id}</td>
                  <td>{item.sectionId}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>{item.duration}</td>
                  <td>{item.level}</td>
                  <td>{item.passing_criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Quiz Modal  */}
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-2">
            <div className="col-12">
              <TextField
                fullWidth
                className="rounded-0"
                label="Title"
                name="title"
                value={quiz.title}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, title: e.target.value };
                  })
                }
              />
            </div>
            <div className="col-12 ">
              <TextField
                maxRows={3}
                multiline
                className={"rounded-0"}
                label="Descriptions"
                name="title"
                fullWidth
                value={quiz.desc}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, desc: e.target.value };
                  })
                }
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                className="rounded-0"
                label="Duration (Min)"
                name="title"
                value={quiz.duration}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, duration: e.target.value };
                  })
                }
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                fullWidth
                className={"rounded-0"}
                label="Passing Criteria (%)"
                name="title"
                value={quiz.passing_criteria}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, passing_criteria: e.target.value };
                  })
                }
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                fullWidth
                className={"rounded-0"}
                label="Section Id"
                name="title"
                value={quiz.sectionId}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, sectionId: e.target.value };
                  })
                }
              />
            </div>
            <div className="col-12">
              <select
                className="form-select form-select-lg rounded-0"
                value={quiz.level}
                onChange={(e) =>
                  setQuiz((value) => {
                    return { ...value, level: e.target.value };
                  })
                }
                defaultValue="">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div className="col-12">
              <Button className="px-4 p-2 rounded-0" color="success" onClick={createQuiz} variant="contained">
                Create
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuizControl;
