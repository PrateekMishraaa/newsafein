import { IconButton, Menu, Tooltip } from "@mui/material";
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import React, { useState } from "react";
import {
  Alert,
  Card,
  Carousel,
  Form,
  Modal,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comp_MCQ = ({
  question,
  loading,
  answerReport,
  reportId,
  changeAnswer,
  submit,
  index,
  key,
  totalQuestion,
  required,
}) => {
  // const navigate = useNavigate();
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
  const [descModal, setDescModal] = useState(false);

  const [indexCrousel, setIndexCrousel] = useState(0);
  const [continueAnswer, setContinueAnswer] = useState([])
  const [answerloading, setanswersetLoading] = useState(false);
  const [isLoading, setIsloading] = useState(true);

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
    
    // console.log("question llll ", question.desc_modal)
    
   if(question){
    setIsloading(false)
   }

  },[question])

  const fetchAnswer = ()=>{
    let answer ={}
      answer = continueAnswer.find((ans)=>{
        return ans.questionId === question.id;    
    })
    if(answer){
      setText(answer.text)
      setSelectedCheckboxes([answer.text])
    }
  }
  useEffect(()=>{
    fetchAnswer()
  },[continueAnswer])

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

  const handleSelect = (selectedIndex) => {
    setIndexCrousel(selectedIndex);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    if(answerloading===true){
      setanswersetLoading(false)
    }
  },[loading])
  

  const handleAnswerSelection = (
    questionId,
    option,
    comment,
    image,
    indexOfOption
  ) => {
    let isSubQuestion = null;
    setanswersetLoading(true)
    if (option.sub_question && indexOfOption >= 0) {
      isSubQuestion = indexOfOption;
    }

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
      if (max <= o.score) {
        max = o.score;
      }

      return Number(max);
    });
    if (!maxScore) {
      maxScore = question.options[0];
    }
    if (isSubQuestion >= 0 && isSubQuestion != null) {
      changeAnswer(
        question.categoryId,
        questionId,
        option.score,
        Number(maxScore.score),
        comment,
        image,
        index,
        true,
        option.text,
        indexOfOption
      );
    } else {
      changeAnswer(
        question.categoryId,
        questionId,
        option.score,
        Number(maxScore.score),
        comment,
        image,
        index,
        false,
        option.text,
        null
      );
    }
  };
  useEffect(() => {
    // console.log("this is question", question.desc_modal);
  }, []);

  return (
    <>
      <Card
        className={`mb-2 rounded-0 shadow-hover-sm transition border ${
          submit && required ? " border-danger" : ""
        }`}
       
      >
        <Card.Body className={submit && required ? "" : ""}  style={{ position: "relative" }}>
         {isLoading?
         <div className="d-flex justify-content-center align-items-center">
          <Spinner/>
          </div>: <>
          <div style={{
      position: "relative",
      filter:  answerloading ? "blur(5px)" : "none", 
    }}>
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <small className="">
                Question {index + 1} of {totalQuestion}
              </small>
              <br />
                <div dangerouslySetInnerHTML={{ __html: question.text }} />

            </div>
            <div className="d-flex align-items-start">
            {question.description && (
                <Tooltip title="Description" placement="top">
                  <IconButton
                    className="text-dark"
                    onClick={() => setDescription(!description)}
                  >
                    <DescriptionOutlinedIcon />
                  </IconButton> 
                </Tooltip>
              )}
              {question.hint && (
                <Tooltip title="Hint" placement="top">
                  <IconButton className="text-dark" onClick={() => setHint(!hint)}>
                    <LiveHelpOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              {question?.desc_modal?.length>1 && (
                <Tooltip title="Crousel Description" placement="top">
                  <IconButton className="text-dark" onClick={() => setDescModal(!descModal)}>
                    <SlideshowIcon />
                  </IconButton>
                </Tooltip>
              )}
              <div>
                {question.images_required && (
                  <Tooltip title="Add Photo" placement="top">
                    <IconButton className="text-dark" onClick={handleMenuOpen}>
                      <InsertPhotoOutlinedIcon />
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
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  {/* {!showLink && <MenuItem onClick={(e) => handleOptionSelect(e)}>Link</MenuItem>} */}
                  {
                    <div>
                      <input
                        className="form-control shadow-none rounded-0 p-2"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="url"
                        placeholder="Paste your link here"
                      />
                      <button
                        className="btn-sm btn mt-2 border border-2 border-dark rounded-0"
                        onClick={() => handleMenuClose()}
                      >
                        Upload
                      </button>
                    </div>
                  }
                </Menu>
              </div>
              {question.comment_required && (
                <Tooltip title="Add Comment" placement="top">
                  <IconButton className="text-dark">
                    <InsertCommentOutlinedIcon onClick={() => setShowComment(!showComment)} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          {/* Description, Hint and RIsk  */}
          <div>
            {/* Description */}
            {description && question.description && (
              <div className="card rounded-3 border-2">
                <div className="card-body">
              
                 
                  <div dangerouslySetInnerHTML={{ __html: question.description }} />

                </div>
              </div>
            )}

            {/* Hint */}
            {hint && question.hint && (
              <Alert
                variant="success"
                className="mb-1 border border-success p-1 px-2 d-inline-block fw-semibold text-success bg-white rounded-0 me-2"
              >
             <div className="d-flex justify-content-between">
             <span>Hint:</span>  <div dangerouslySetInnerHTML={{ __html: question.hint }} />
             </div>

              </Alert>
            )}
            {/* Risk*/}
            {showRisk && (
              <Alert className="mb-1 border border-danger p-1 px-2 d-inline-block fw-semibold text-danger bg-white rounded-0 me-2">
                <small> RISK: {showRisk}</small>
              </Alert>
            )}
          </div>
          {question?.images && (
            <Card
              onClick={() => (window.location.href = question.images)}
              style={{ width: "500px", height: "200px", cursor: "pointer" }}
            >
              <Card.Body style={{ height: "100%" }}>
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={question.images}
                  alt={"file"}
                />
              </Card.Body>
            </Card>
          )}

          {/* Type Based Question  */}
          {question.question_type === "YesNo" ||
          question.question_type === "YesNONa" ||
          question.question_type === "mcq" ||
          question.question_type === "CheckBox" ? (
            <div>
              {question.options.length > 0 &&
                question.options.map((option, index) => (
                  <div key={option.id} className="mt-2 d-inline-block">
                    <ToggleButton
                      className="me-2 text-capitalize border border-2 border-primary px-4 py-2"
                      // key={idx}
                      id={`option-${question.id}index-${index}`}
                      type={
                        question.question_type === "CheckBox"
                          ? "checkbox"
                          : "radio"
                      }
                      // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                      variant="outline-primary"
                      name={`option-${question.id}`}
                      value={option.score}
                      checked={
                        question.question_type === "CheckBox"
                          ? selectedCheckboxes.includes(option.text)
                          : text === option.text
                      }
                      onClick={() => {
                        if (question.question_type === "CheckBox") {
                          const updatedCheckboxes = [...selectedCheckboxes];

                          if (updatedCheckboxes.includes(option.text)) {
                            const indexToRemove = updatedCheckboxes.indexOf(
                              option.text
                            );
                            updatedCheckboxes.splice(indexToRemove, 1);
                          } else {
                            updatedCheckboxes.push(option.text);
                          }
                          // console.log("inside the question", updatedCheckboxes)

                          setSelectedCheckboxes(updatedCheckboxes);
                        }
                        handleAnswerSelection(
                          question.id,
                          option,
                          comment,
                          image,
                          index
                        );
                        setScore(option.score);
                        setText(option.text);
                      }}
                    >
                      {option.text}
                    </ToggleButton>
                  </div>
                ))}
              <div className="d-block">
                {showComment && (
                  <div className="mt-2">
                    <h6>Comments :</h6>
                    <Form.Control
                      className="d-block p-2 shadow-none"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        handleAnswerSelection(
                          question.id,
                          score,
                          // text,
                          e.target.value,
                          image,
                          index
                        );
                      }}
                      style={{ height: 80 }}
                      as="textarea"
                      rows={1}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null}

         
          {/* Required Message  */}
          </div>
          {( answerloading) && (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1",
      }}
    >
      <div className="spinner-border text-primary"></div>
    </div>
  )}
          </>}
        </Card.Body>
        <div>
          {submit && required && (
            <small className=" d-inline-block text-danger pb-1 px-2 fs-6 rounded">
              {<WarningAmberOutlinedIcon className="fs-6" />}&nbsp;Required
            </small>
          )}
        </div>
        
      </Card>
      
      {question?.desc_modal?.length > 0 ? (
        <Modal
          size='lg'
          className="p-3"
          show={descModal}
          onHide={() => {
            setDescModal(false);
          }}
        >
        <Modal.Title className="p-4">Description</Modal.Title>
          <Modal.Body className="p-3">
            <div className="d-flex justify-content-center">
              <Card
                style={{
                  border: "none",
                  height: "490px",
                  width: "100%",
                }}
              >
                <Card.Body>
               
                  <Carousel
                    controls={true}
                    variant={'dark'}
                   activeIndex={indexCrousel} onSelect={handleSelect}
                   style={{height:'370px'}}
                   >
                  
                    {question.desc_modal.map((modal, index) => (
                      <Carousel.Item style={{height:'500px'}} key={index}>
                          <div 
                          className="mb-4"
                          style={{
                            height:'300px',
                            width:'100%',
                           }}
                          >
                            <img style={{
                              height:'100%',
                              width:'100%',
                              borderRadius:'12px'
                            }} src={modal.img} alt="img" />
                          </div>
                          
                        <div className="mt-6" style={{margin:'12px 0 0 0'}}>
                        <p><br/></p>

                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div>
                    <h4>Description</h4>
                  </div>
                  <Carousel
                    controls={false}
                    variant={'dark'}
                    indicators={false}
                   activeIndex={indexCrousel} onSelect={handleSelect}>
                  
                    {question.desc_modal.map((modal, index) => (
                      <Carousel.Item key={index}>
                        <div className="mt-6" style={{margin:'12px 0 0 0'}}>
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

export default Comp_MCQ;
