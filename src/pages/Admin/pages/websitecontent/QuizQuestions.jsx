import { CheckBox, Delete } from "@mui/icons-material";
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Tooltip } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MyCKEditor from "utils/CKEditor";

function QuizQuestions() {
  const { quiz } = useParams();
  const [quizInfo, setQuizInfo] = useState();
  const [show, setShow] = useState(true);
  const [type, setType] = useState(2);
  const [question, setQuestion] = useState(null);
  const [checked, setChecked] = useState([]);
  const [options, setOptions] = useState({});
  const [count, setCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [quesList, setQuesList] = useState();
  let emptyEditObject = {
    id: "",
    quizId: "",
    type: "",
    ques: "",
    ans: "",
    options: "",
    desc: "",
    image: "",
  };
  const [editQuestion, setEditQuestion] = useState(emptyEditObject);
  const [image, setImage] = useState([]);
  const rows = [];
  let answer = [];
  const { token } = useGlobalContext();
  useEffect(() => {
    if (token)
      apiAuth
        .get(`/course/quiz/questions?id=${quiz}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setQuizInfo(res.data?.quiz);
          setQuesList(res.data?.result);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [token, loading]);
  if (type) {
    for (let i = 1; i <= count; i++) {
      rows.push(
        <div className="col" key={i}>
          <div className="input-group">
            <TextField
              className=""
              id={"input" + i}
              required={type != 2}
              label={type == 5 ? `Image Url ${i}` : `Option ${i}`}
              size="small"
              value={options[i]}
              key={i}
              onChange={(e) => {
                setOptions((opt) => {
                  return { ...opt, [i]: e.target.value };
                });
              }}
            />
            <Tooltip hidden={type == 4} enterNextDelay={2000} className="col-2" title="Set option as a correct answer.">
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    name={"checkbox" + i}
                    value={false}
                    onChange={(e) => {
                      e.currentTarget.checked ? checked.push(i) : checked.pop(i);
                      setChecked(checked);
                      // console.log(checked)
                    }}
                  />
                }
              />
            </Tooltip>
          </div>
        </div>
      );
    }
  }
  function validateDate() {
    switch (Number(type)) {
      case 1:
        if (checked.length !== 1) {
          toast.warning("Select single Answer");
          break;
        } else {
          return true;
        }
      case 2:
        return true;
        break;
      case 3:
        if (checked.length < 2) {
          toast.warning("Select more then one Answer");
          break;
        } else {
          return true;
        }
      case 4:
        if (checked.length !== 0) {
          toast.warning("Select single Answer");
          break;
        } else {
          return true;
        }
      case 5:
        if (checked.length !== 1) {
          toast.warning("Select single Answer");
          break;
        } else {
          return true;
        }
      default:
        return false;
    }
    return false;
  }
  function createQuestion(e) {
    if (validateDate()) {
      setShow(!show);
      setLoading(true);
      if (checked.length) {
        if (checked.length === 1) {
          answer = options[checked[0]];
        } else {
          checked.map((i) => answer.push(options[i]));
        }
      }
      apiJsonAuth
        .post("/course/quiz/questions", {
          quizId: quiz,
          type: type,
          ques: question,
          image: JSON.stringify(image),
          ans: type == 2 || type == 4 ? null : JSON.stringify(answer),
          options: type ? JSON.stringify(Object.values(options)) : null,
        })
        .then((res) => {
          if (res.data?.status === 200) {
            setLoading(false);
            toast.success("Question Created.");
            setQuestion("");
            setOptions({});
            e.target.reset();
          } else {
            console.log(res);
            toast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something Went Wrong");
        });
    }
  }
  function CheckType(type) {
    switch (type) {
      case 1:
        return "Single Answer MCQ";
        break;
      case 2:
        return "Written";
        break;
      case 3:
        return "Mutiple Answer MCQ";
        break;
      case 4:
        return "Sample Single Answer MCQ";
        break;
      case 5:
        return "Image Single Answer MCQ";
        break;
      default:
        return "Unknown";
    }
  }
  function handelDelete(id) {
    Swal.fire({
      title: "Are You Sure ?",
      text: "You want to delete this Question.",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setLoading(true);
        apiJsonAuth.delete("/course/quiz/questions?id=" + id).then((res) => {
          toast.success(res.data?.message);
          setLoading(false);
        });
      }
    });
  }
  // console.log(state)
  return (
    <div>
      <div className="row justify-content-around g-2">
        <div className="col-12 col-lg-6">
          <div className="card p-2 text-dark p-lg-3 rounded-0 border border-dark bg-light">
            <h6>Title :</h6> <span>{quizInfo?.title}</span>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-2 text-dark p-lg-3 rounded-0 border border-dark bg-light">
            <h6>Level :</h6> <span>{quizInfo?.level}</span>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-2 text-dark p-lg-3 rounded-0 border border-dark bg-light">
            <h6>Duration : </h6>
            <span>{quizInfo?.quiz_duration} Min</span>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-2 text-dark p-lg-3 rounded-0 border border-dark bg-light">
            <h6>Passing % :</h6>
            <span> {quizInfo?.passing_criteria}</span>
          </div>
        </div>
        <div className="col-12">
          <div hidden={!quizInfo?.desc} className="card  text-dark p-lg-3 rounded-0 border border-dark bg-light">
            Desc : {quizInfo?.desc}
          </div>
        </div>
      </div>
      {/* Add Question */}
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            setShow(!show);
          }}>
          Add Question
        </Button>
      </div>
      {/* Questions List */}
      <div>
        {quesList?.map((item) => (
          <div key={item?.id} className="card rounded-0 my-2 p-2 w-100 position-relative">
            <div className="input-group top-0 end-0 position-absolute justify-content-end">
              <button
                className=" text-decoration-none border-0 bg-light"
                title="Delete"
                onClick={() => {
                  handelDelete(item.id);
                }}>
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="text-decoration-none border-0 bg-light"
                title="Delete"
                onClick={() => {
                  handelDelete(item.id);
                }}>
                &#10062;
              </button>
            </div>
            <small className="fw-bold">{CheckType(item.type)}</small>
            <p className="container px-2 fs-6 m-0 ">Q. {item?.ques}</p>
            <div>{item?.image?.length ? JSON.parse(item?.image).map((img) => <img src={img} height={200} style={{ objectFit: "contain", width: "auto" }} />) : ""}</div>
            {item?.options
              ? JSON.parse(item?.options)?.map((option, i) => (
                  <small key={i} className="text-dark lh-1 m-1 px-2">
                    &nbsp;{++i + ") "}&nbsp;{option}
                  </small>
                ))
              : ""}
            <small className="m-2 ">
              Answer :{(item?.type === 1 || item?.type === 5) && <span className="card shadow-sm bg-success text-light m-1 p-1 d-inline px-2">{JSON.parse(item?.ans)}</span>}
              {item?.type === 3 &&
                JSON.parse(item?.ans).map((i) => (
                  <span key={Math.random(3)} className="card m-1 p-1 d-inline shadow-sm bg-success text-light px-2">
                    {i}
                  </span>
                ))}
            </small>
          </div>
        ))}
      </div>

      {/* Modals  */}
      {/* Add Quiz Question */}
      <Modal size="lg" show={!show} onHide={() => setShow(!show)}>
        <Modal.Header>Create Question</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createQuestion(e);
            }}>
            <div>
              <h6>Question</h6>
              <MyCKEditor content={question} setContent={setQuestion} />
              <hr />
              <div className="d-flex align-items-center justify-content-between my-3">
                <h6>Image</h6>
                <div className="input-group justify-content-end">
                  {Boolean(image.length) && (
                    <button
                      type="button"
                      className="btn btn-sm rounded-0 bg-primary fw-light text-white"
                      onClick={() => {
                        let tempArr = [...image];
                        tempArr.pop();
                        setImage(tempArr);
                      }}>
                      remove
                    </button>
                  )}
                  <button type="button" className="btn btn-sm rounded-0 bg-primary fw-light text-white" onClick={() => setImage([...image, ""])}>
                    add image
                  </button>
                </div>
              </div>
              {image?.length
                ? image.map((img, index) => (
                    <input
                      className="form-control rounded-0 p-2 mb-1"
                      value={image[index]}
                      onChange={(e) => {
                        let newImgArr = [...image];
                        newImgArr[index] = e.target.value;
                        setImage(newImgArr);
                      }}
                    />
                  ))
                : ""}
              <div className=" mt-2">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label text-dark">Question Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}>
                    <FormControlLabel value="1" control={<Radio />} label="MCQ" />
                    <FormControlLabel value="2" control={<Radio />} label="Written" />
                    <FormControlLabel value="3" control={<Radio />} label="Multiple-MCQ" />
                    <FormControlLabel value="4" control={<Radio />} label="Sample - MCQ " />
                    <FormControlLabel value="5" control={<Radio />} label="Image MCQ" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div hidden={type == 2}>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <h6>Options</h6>
                  <div className="input-group justify-content-end">
                    <button
                      className="p-1 px-3 btn btn-sm rounded-0 btn-outline-dark"
                      onClick={() => {
                        setCount(count - 1);
                        delete options[count];
                      }}
                      disabled={count == 2}>
                      -
                    </button>
                    <button
                      className="p-1 px-3 btn btn-sm rounded-0 btn-outline-dark"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                      disabled={count == 20}>
                      +
                    </button>
                  </div>
                </div>
                <div className="row row-cols-1 g-2">{rows}</div>
              </div>
              <Button type="submit" className="text-center rounded-0 p-3 mt-2" fullWidth color="success" variant="contained" disabled={loading}>
                Add
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuizQuestions;
