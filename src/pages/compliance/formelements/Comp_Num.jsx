import { IconButton, Menu, Tooltip } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CommentIcon from "@mui/icons-material/Comment";
import React, { useState } from "react";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import SignaturePad from "pages/compliance/components/SignaturePad";
import { Alert, Card, Carousel, Form, Modal } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

const Comp_Num = ({ question, answerReport,reportId, changeAnswer, index, key, totalQuestion, required, submit }) => {
  const [hint, setHint] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [description, setDescription] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const [long, setLong] = useState("");
  const [signature, setSignature] = useState(null);
  const [descModal, setDescModal] = useState(false);
  const [indexCrousel, setIndexCrousel] = useState(0);
  const [continueAnswer, setContinueAnswer] = useState([])

  const fetchAnswerArray = ()=>{
    if(reportId){
      axios.get(process.env.REACT_APP_API_BASE_URL+"admin/compliance_answer/"+reportId)
    .then((res)=>{
      setContinueAnswer(res.data.result.answer);
    }).catch((error)=>{
      console.log(error.message);
    })
    }else{
      setContinueAnswer(answerReport)
    }
  }
  useEffect(()=>{
    if(reportId){
      fetchAnswerArray();
    }
  },[reportId])
  // useEffect(()=>{
  //   if(answerReport.length>0){
  //     fetchAnswerArray();
  //   }
  // },[answerReport])

  const fetchAnswer = ()=>{
    let answer ={}
    // console.log("inside the fetchAnswer", question.id)
      answer = continueAnswer.find((ans)=>{
        // console.log('question.id of ans', ans.questionId)
        return ans.questionId === question.id;    
    })
    if(answer){
      setText(answer.text)
      setSignature(answer.signature)
    }
    // console.log("sssssssssssssssss",answer)
  }
  useEffect(()=>{
    fetchAnswer()
  },[continueAnswer])

  const getSignature = (data) => {
    setSignature(data);
  };
  const handleChange = () => {
    // console.log("this is signature", signature)

    handleAnswerSelection(question.id, question.options[0], comment, image, signature);
  };
  useEffect(() => {
    if (signature !== null) {
      handleChange();
    }
  }, [signature]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleOptionSelect = (e) => {
  //   e.preventDefault();
  //   setshowlink(true);
  //   // Handle option selection here
  //   // console.log(option);
  //   // handleMenuClose();
  // };

  const handleAnswerSelection = (questionId, option, comment, image, signature) => {
    let max = 0;
    const riskArray = question.options.filter((i) => {
      return i.risk === true;
    });
    let riskFlag = false;
    riskArray.forEach((i) => {
      if (i.text === option.text) {
        setShowRisk(i.riskText);
        riskFlag = true;
      }
      if (!riskFlag) {
        setShowRisk(null);
      }
    });
    let maxScore = question.options.find((o) => {
      if (max < o.score) {
        max = o.score;
      }
      return Number(max);
    });
    if (!maxScore) {
      maxScore = question.options[0];
    }

    changeAnswer(question.categoryId, questionId, option.score, Number(maxScore.score), comment, image, index, signature);
  };

  const handleSelect = (selectedIndex) => {
    setIndexCrousel(selectedIndex);
  };

  return (
    <>
      <Card
        className={`mb-4 rounded-0 bg-white border ${(submit && required) ? "border-danger":""}`}>
        <Card.Body className={submit && required ? "" : ""} style={{}}>
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div className="">
              <label style={{ fontSize: "13px", userSelect: "none", cursor: "default" }}>
                Question {index + 1} of {totalQuestion}
              </label>
              <br />
              <span
                style={{
                  color: "black",
                  fontSize: "18px",
                  padding: "3px",
                  marginBottom: "15px",
                  userSelect: "none",
                  cursor: "default",
                }}
                className="">
                {" "}
                <div dangerouslySetInnerHTML={{ __html: question.text }} />
              </span>
              {question.description && (
                <Tooltip title="Description" placement="top">
                  <IconButton onClick={() => setDescription(!description)}>
                    <LiveHelpIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="d-flex align-items-start">
              {question.hint && (
                <Tooltip title="Hint" placement="top">
                  <IconButton onClick={() => setHint(!hint)}>
                    <LiveHelpIcon />
                  </IconButton>
                </Tooltip>
              )}
              <div>
                {question.images_required && (
                  <Tooltip title="Add Photo" placement="top">
                    <IconButton onClick={handleMenuOpen}>
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      // left: "1083px !important",
                      padding: "12px",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                  {/* {!showLink && <MenuItem onClick={(e) => handleOptionSelect(e)}>Link</MenuItem>} */}
                  {
                    <div>
                      <input className="form-control" value={image} onChange={(e) => setImage(e.target.value)} type="input" placeholder="Paste your link here" />
                      <button className="btn-sm btn-success btn mt-3" onClick={() => handleMenuClose()}>
                        Upload
                      </button>
                    </div>
                  }
                </Menu>
              </div>
              {question.comment_required && (
                <Tooltip title="Add Comment" placement="top">
                  <IconButton>
                    <CommentIcon onClick={() => setShowComment(!showComment)} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          {hint && question.hint && (
            <Alert variant="success" className="mb-1">
            <div className="d-flex justify-content-between">
             <span>Hint:</span>  <div dangerouslySetInnerHTML={{ __html: question.hint }} />
             </div>
            </Alert>
          )}

          {showRisk && (
            <Alert variant="danger" className="mb-2">
              RISK: {showRisk}
            </Alert>
          )}
          <div>
            {description && question.description && (
              <div>
                <Card>
                  <Card.Body>
                  <div dangerouslySetInnerHTML={{ __html: question.description }} />
                  </Card.Body>
                </Card>
                <br />
              </div>
            )}
          </div>
          {/* {for number} */}
          {question.question_type === "Number" && (
            <div className="">
              <input
                className="text-align-center form-control"
                style={{
                  textAlign: "center",
                  width: "220px",
                }}
                type="number"
                value={number}
                onChange={(e) => {
                  setNumber(parseInt(e.target.value));
                  handleAnswerSelection(question.id, question.options[0], comment, image);
                }}
              />
              <div className="mt-4">
                {showComment && (
                  <Form.Control
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      handleAnswerSelection(question.id, score, text, e.target.value, image, index);
                    }}
                    as="textarea"
                    rows={1}
                  />
                )}
              </div>
            </div>
          )}

          {(question.question_type === "Long" || question.question_type === "Short") && (
            <div className="">
              <textarea
                className="text-align-center form-control"
                // style={{
                //   textAlign: "center",
                //   width: "220px",
                // }}
                // type="number"
                value={long}
                onChange={(e) => {
                  setLong(e.target.value);

                  handleAnswerSelection(question.id, question.options[0], comment, image);
                }}
              />
              <div>
                {showComment && (
                  <Form.Control
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      handleAnswerSelection(question.id, score, text, e.target.value, image, index);
                    }}
                    as="textarea"
                    rows={1}
                  />
                )}
              </div>
            </div>
          )}
          {question.question_type === "Signature" && (
            <div className=" ">
              <SignaturePad initialSign={signature}  getSignature={getSignature} user={true} />
              <div>
                {showComment && (
                  <Form.Control
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      handleAnswerSelection(question.id, score, text, e.target.value, image, index);
                    }}
                    as="textarea"
                    rows={1}
                  />
                )}
              </div>
            </div>
          )}

          {question?.images && (
            <Card onClick={() => (window.location.href = question.images)} style={{ width: "500px", height: "200px", cursor: "pointer" }}>
              <Card.Body style={{ height: "100%" }}>
                <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={question.images} alt={"file"} />
              </Card.Body>
            </Card>
          )}
          {submit && required && (
            <Card
              style={{
                border: "2px solid red",
                width: "160px",
                height: "37px",
                transform: "scale(.7)",
              }}>
              <Card.Body
                style={{
                  padding: "6px 18px 14px 24px",
                }}>
                <h6 style={{ color: "red" }}>{<WarningAmberOutlinedIcon />}Required</h6>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
      {question?.desc_modal?.length > 0 ? (
        <Modal
          size="lg"
          className="p-3"
          show={descModal}
          onHide={() => {
            setDescModal(false);
          }}>
          <Modal.Title className="p-4">Description</Modal.Title>
          <Modal.Body className="p-3">
            <div className="d-flex justify-content-center">
              <Card
                style={{
                  border: "none",
                  height: "490px",
                  width: "100%",
                }}>
                <Card.Body>
                  <Carousel controls={true} variant={"dark"} activeIndex={indexCrousel} onSelect={handleSelect} style={{ height: "370px" }}>
                    {question.desc_modal.map((modal, index) => (
                      <Carousel.Item style={{ height: "500px" }} key={index}>
                        <div
                          className="mb-4"
                          style={{
                            height: "300px",
                            width: "100%",
                          }}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                              borderRadius: "12px",
                            }}
                            src={modal.img}
                            alt="img"
                          />
                        </div>

                        <div className="mt-6" style={{ margin: "12px 0 0 0" }}>
                          <p>
                            <br />
                          </p>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div>
                    <h4>Description</h4>
                  </div>
                  <Carousel controls={false} variant={"dark"} indicators={false} activeIndex={indexCrousel} onSelect={handleSelect}>
                    {question.desc_modal.map((modal, index) => (
                      <Carousel.Item key={index}>
                        <div className="mt-6" style={{ margin: "12px 0 0 0" }}>
                          <p>{modal.description}</p>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
};

export default Comp_Num;
