import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CommentIcon from "@mui/icons-material/Comment";
import React, { useState } from "react";
import { Alert, Card, Form, ToggleButton } from "react-bootstrap";
import SignaturePad from "signature_pad";
import { LiveHelpOutlined } from "@mui/icons-material";

const SubQuestion4option = ({ question, changeAnswer, index, key, indexA, totalQuestion }) => {
  const [hint, setHint] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [description, setDescription] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // useEffect(() => {
  //   setScore(0);
  //   setText("");
  //   setComment("");
  //   setImage("");
  //   setShowComment(false);
  //   setAnchorEl(null);

  // }, [question]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    // Handle option selection here
    // console.log(option);
    handleMenuClose();
  };
  const getSignature = (data) => {
  };

  const handleAnswerSelection = (questionId, complianceId, subQuestionId, score, text, comment, image) => {
    // setSelectedAnswer({ questionId, score });
    let max = 0;
    const riskArray = question.options.filter((i) => {
      return i.risk === true;
    });
    let riskFlag = false;
    riskArray.forEach((i) => {
      if (i.text == text) {
        // console.log("your text is ", text, "but i have ", i.text);
        // console.log(i.riskText, "risktext");
        setShowRisk(i.riskText);
        riskFlag = true;
      }
      if (!riskFlag) {
        setShowRisk(null);
      }
    });

    const maxScore = question.options.find((o) => {
      if (max < o.score) {
        max = o.score;
      }
      return Number(max);
    });
    changeAnswer(questionId, complianceId, subQuestionId, score, Number(maxScore.score), comment, image);
  };

  return (
    <Card className={`mb-2 rounded-0 shadow-hover-sm transition border`}>
      <Card.Body style={{}}>
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <small className="">
              Question {index + 1}({String.fromCharCode(97 + indexA)}) of {totalQuestion}
              of {totalQuestion}
            </small>
            <br />
            <span className="fw-semibold fs-5 text-dark">{question.text}</span>
            {question.description && (
              <Tooltip title="Description" placement="top">
                <IconButton className="text-primary" onClick={() => setDescription(!description)}>
                  <LiveHelpOutlined />
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
                    padding: "8px 12px",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                {/* {!showLink && <MenuItem onClick={(e) => handleOptionSelect(e)}>Link</MenuItem>} */}
                {
                  <div>
                    <input className="form-control shadow-none rounded-0 p-2" value={image} onChange={(e) => setImage(e.target.value)} type="url" placeholder="Paste your link here" />
                    <button className="btn-sm btn mt-2 border border-2 border-dark rounded-0" onClick={() => handleMenuClose()}>
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
        {/* Description, Hint and RIsk  */}
        <div>
          {/* Description */}
          {description && question.description && (
            <div>
              <p>{question.description}</p>
            </div>
          )}

          {/* Hint */}
          {hint && question.hint && (
            <Alert variant="success" className="mb-1 border border-success p-1 px-2 d-inline-block fw-semibold text-success bg-white rounded-0 me-2">
              <small>HINT: {question.hint}</small>
            </Alert>
          )}
          {/* Risk*/}
          {showRisk && (
            <Alert className="mb-1 border border-danger p-1 px-2 d-inline-block fw-semibold text-danger bg-white rounded-0 me-2">
              <small> RISK: {showRisk}</small>
            </Alert>
          )}
        </div>

        <div className="">
          {question.question_type === "YesNo" || question.question_type === "YesNONa" || question.question_type === "mcq" || question.question_type === "CheckBox" ? (
            <div className="d-flex">
              {question.options.length > 0 &&
                question.options.map((option, index) => (
                  <div key={option.id} className="mb-1">
                    <ToggleButton
                      className="me-2 text-capitalize border border-2 border-primary px-4 py-2"
                      id={`option-${question.id}index-${index}`}
                      type={question.question_type === "CheckBox" ? "checkbox" : "radio"}
                      variant="outline-primary"
                      name={`option-${question.id}`}
                      value={option.score}
                      checked={question.question_type === "CheckBox" ? selectedCheckboxes.includes(option.text) : text === option.text}
                      onClick={() => {
                        if (question.question_type === "CheckBox") {
                          const updatedCheckboxes = [...selectedCheckboxes];

                          if (updatedCheckboxes.includes(option.text)) {
                            const indexToRemove = updatedCheckboxes.indexOf(option.text);
                            updatedCheckboxes.splice(indexToRemove, 1);
                          } else {
                            updatedCheckboxes.push(option.text);
                          }
                          // console.log("inside the question", updatedCheckboxes)

                          setSelectedCheckboxes(updatedCheckboxes);
                        }
                        handleAnswerSelection(question.questionId, question.complianceId, question.subQuestion4optionId, option.score, option.text, comment, image);
                        setScore(option.score);
                        setText(option.text);
                      }}>
                      {option.text}
                    </ToggleButton>
                  </div>
                ))}
            </div>
          ) : null}

          {question.question_type === "Number" && (
            <div className="">
              <input
                className="text-align-center form-control"
                style={{
                  textAlign: "center",
                  width: "220px",
                }}
                type="number"
                // value={number}
                onChange={(e) => {
                  // setNumber(parseInt(e.target.value));
                  // handleAnswerSelection(
                  //   question.id,
                  //   question.options[0],
                  //   comment,
                  //   image
                  // );
                }}
              />
              <div className="mt-4">
                {showComment && (
                  <Form.Control
                    // value={comment}
                    onChange={(e) => {
                      // setComment(e.target.value);
                      // handleAnswerSelection(question.id, score, text, e.target.value, image, index);
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
                // value={long}
                onChange={(e) => {
                  // setLong(e.target.value);
                  // handleAnswerSelection(
                  //   question.id,
                  //   question.options[0],
                  //   comment,
                  //   image
                  // );
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
              <SignaturePad getSignature={getSignature} user={true} />
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
          <div>
            {showComment && (
              <Form.Control
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  handleAnswerSelection(question.subQuestion4optionId, score, text, e.target.value, image);
                }}
                as="textarea"
                rows={1}
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SubQuestion4option;
