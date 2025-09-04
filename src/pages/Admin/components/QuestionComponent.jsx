import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

const QuestionComponent = ({question, id}) => {

    
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([""]);
    const [questionArray, setQuestionArray] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
  
    // Duplicates with "edit" prefix
    const [editDescription, setEditDescription] = useState("");
    const [editQuestionType, setEditQuestionType] = useState("");
    const [editMediaType, setEditMediaType] = useState("");
    const [editHint, setEditHint] = useState("");
    const [editText, setEditText] = useState("");
  
    const [editSelectedCategory, setEditSelectedCategory] = useState("");
    const [editSelectedCategoryId, setEditSelectedCategoryId] = useState(null);
    const [show, setShow] = useState(false);
    const [refreshOffcanvas, setRefreshOffcanvas] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [editRequired, seteditRequired] = useState(false);
    const [editImageRequired, seteditImageRequired] = useState(false);
    const [editcommentRequired, seteditcommentRequired] = useState(false);
    const [editfileRequired, seteditfileRequired] = useState(false);
    const [editmaxfile, seteditmaxfile] = useState(null);
    const [editmaximage, seteditmaximage] = useState(null);
    const [isedit, setisedit] = useState(false);
    const [number, setNumber] = useState(0);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [imageLink, setImageLink] = useState(null);
    const [isSubQuesttion, setisSubQuesttion] = useState(false);
    const [isSubQuesttion4option, setisSubQuesttion4option] = useState(false);
    const [subQuestion, setSubQuestion] = useState([]);
    const [subQuestion4option, setSubQuestion4option] = useState([]);
    const [index ,setIndex] = useState(null);
  
  
  
    const handleSubQuesttion4option =(e, questionId, questionTypes,index)=>{
      e.preventDefault();
      const question =  questionArray.find((i)=>i.id ===questionId)
      if (!editText) {
        toast.dismiss();
        toast.error("You have to Write Question");
        return;
      }
      const isCorrect = options.find((i) => i.correct === true);
      if (!isCorrect) {
        toast.dismiss();
        toast.error("Atleast Choose 1 Correct Answer");
        return;
      }
      if (questionTypes === "CheckBox" || questionTypes === "mcq") {
        const checkEmpty = options.find((i) => i.text === "");
        if (checkEmpty) {
          toast.dismiss();
          toast.error("Can't send Blank Option");
          return;
        }
        if (options.length < 2) {
          toast.dismiss();
          toast.error("Add atleast 2 options");
          return;
        }
      }
      let option = question.options;
      
      // let tempArray =[ ...option[index]]
      let tempQuestion = {
        subQuestion4optionId:Date.now().toString(36) + Math.random().toString(36).substr(2),
        text: editText,
        questionId:questionId,
        complianceId:id,
        description: editDescription,
        question_type: editQuestionType,
        media_type: editMediaType,
        options: options,
        hint: editHint,
        images_required: editImageRequired,
        comment_required: editcommentRequired,
        required: editRequired,
        image_max: editmaximage,
        files_required: false,
        file_max: editmaxfile,
        images: images,
      };
      option[index].sub_question = tempQuestion;
      
      
      
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${questionId}`,
          {
            options: option,
          }
        )
        .then((response) => {
          console.log("quesiont created:", response.data.result);
          setDescription("");
          setEditText("");
          // toast.dismiss();
          setEditQuestionType("");
          toast.success("created successfully");
          setEditMediaType("");
          // Hide the modal
          setEditHint("");
          seteditImageRequired(false);
          seteditcommentRequired(false);
          seteditRequired(false);
          getAllQuestionByCompliance();
          handleClose();
          setOptions([]);
  
          setShowModal(false);
        });
    }
  
    const handleDeleteSubQuestion4option = async (e, id,index) => {
      e.preventDefault();
      const question =  questionArray.find((i)=>i.id ===id)
      console.log(question);
      let option = question.options
      console.log(option, "thi si option");
      option[index].sub_question=null
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${id}`,{
            options:option,
          }
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        setDescription(""); 
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
        setShowModal(false);
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
    };
    const handleDeleteSubQuestion = async (e, id,index) => {
      e.preventDefault();
      let tempSubQuestion = [...subQuestion]
      tempSubQuestion.splice(index, 1);
      setSubQuestion(tempSubQuestion);
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${id}`,{
            sub_question:tempSubQuestion,
          }
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        setDescription(""); 
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
        setShowModal(false);
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
    };
  
  
    const handleDelete = async (e, id) => {
      e.preventDefault();
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${id}`
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        setDescription("");
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
        setShowModal(false);
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
    };
    const handleSubmit = async (e, questionTypes) => {
      e.preventDefault();
  
      if(!editSelectedCategory || !editSelectedCategoryId){
        toast.dismiss();
        toast.error("You have to Select Category");
        return;
      }
  
  
      if (!editText) {
        toast.dismiss();
        toast.error("You have to Write Question");
        return;
      }
      const isCorrect = options.find((i) => i.correct === true);
      if (!isCorrect) {
        toast.dismiss();
        toast.error("Atleast Choose 1 Correct Answer");
        return;
      }
      if (questionTypes === "CheckBox" || questionTypes === "mcq") {
        const checkEmpty = options.find((i) => i.text === "");
        if (checkEmpty) {
          toast.dismiss();
          toast.error("Can't send Blank Option");
          return;
        }
        if (options.length < 2) {
          toast.dismiss();
          toast.error("Add atleast 2 options");
          return;
        }
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question`,
          {
            complianceId: id,
            text: editText,
            description: editDescription,
            question_type: editQuestionType,
            media_type: editMediaType,
            options: options,
            category: editSelectedCategory,
            categoryId: editSelectedCategoryId,
            hint: editHint,
            images_required: editImageRequired,
            comment_required: editcommentRequired,
            required: editRequired,
            image_max: editmaximage,
            files_required: false,
            file_max: editmaxfile,
            images: images,
          }
        );
        console.log("quesiont created:", response.data.result);
        setDescription("");
        setEditText("");
        // toast.dismiss();
        setEditQuestionType("");
        toast.success("created successfully");
        setEditMediaType("");
        // Hide the modal
        setEditHint("");
        seteditImageRequired(false);
        seteditcommentRequired(false);
        seteditRequired(false);
        getAllQuestionByCompliance();
        handleClose();
        setOptions([]);
  
        setShowModal(false);
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
    };
    const handleEdit = async (e, idd, questionTypes) => {
      e.preventDefault();
  
      if (!editText) {
        toast.dismiss();
        toast.error("You have to Write Question");
        return;
      }
      const isCorrect = options.find((i) => i.correct === true);
      if (!isCorrect) {
        toast.dismiss();
        toast.error("Atleast Choose 1 Correct Answer");
        return;
      }
      if (questionTypes === "CheckBox" || questionTypes === "mcq") {
        const checkEmpty = options.find((i) => i.text === "");
        if (checkEmpty) {
          toast.dismiss();
          toast.error("Can't send Blank Option");
          return;
        }
        if (options.length < 2) {
          toast.dismiss();
          toast.error("Add atleast 2 options");
          return;
        }
      }
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${idd}`,
          {
            complianceId: id,
            text: editText,
            description: editDescription,
            question_type: editQuestionType,
            media_type: editMediaType,
            options: options,
            category: editSelectedCategory,
            categoryId: editSelectedCategoryId,
            hint: editHint,
            images_required: editImageRequired,
            comment_required: editcommentRequired,
            required: editRequired,
            image_max: editmaximage,
            files_required: false,
            file_max: editmaxfile,
            images: images,
          }
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        setDescription("");
        setEditText("");
        toast.dismiss();
        setEditQuestionType("");
        toast.success("edit success");
        setEditMediaType("");
        // Hide the modal
        setEditHint("");
        seteditImageRequired(false);
        seteditcommentRequired(false);
        seteditRequired(false);
        getAllQuestionByCompliance();
        handleClose();
        setShowModal(false);
        setOptions([]);
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
    };
  
    const handleSubQuestion = (e, questionId, questionTypes) => {
      e.preventDefault();
      if (!editText) {
        toast.dismiss();
        toast.error("You have to Write Question");
        return;
      }
      const isCorrect = options.find((i) => i.correct === true);
      if (!isCorrect) {
        toast.dismiss();
        toast.error("Atleast Choose 1 Correct Answer");
        return;
      }
      if (questionTypes === "CheckBox" || questionTypes === "mcq") {
        const checkEmpty = options.find((i) => i.text === "");
        if (checkEmpty) {
          toast.dismiss();
          toast.error("Can't send Blank Option");
          return;
        }
        if (options.length < 2) {
          toast.dismiss();
          toast.error("Add atleast 2 options");
          return;
        }
      }
      let tempArray = [...subQuestion];
      let tempQuestion = {
        text: editText,
        description: editDescription,
        question_type: editQuestionType,
        media_type: editMediaType,
        options: options,
        subQuestionId:Date.now().toString(36) + Math.random().toString(36).substr(2),
        hint: editHint,
        images_required: editImageRequired,
        comment_required: editcommentRequired,
        required: editRequired,
        image_max: editmaximage,
        files_required: false,
        file_max: editmaxfile,
        images: images,
      };
      tempArray.push(tempQuestion);
      setSubQuestion(tempArray);
  
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${questionId}`,
          {
            sub_question: tempArray,
          }
        )
        .then((response) => {
          console.log("quesiont created:", response.data.result);
          setDescription("");
          setEditText("");
          // toast.dismiss();
          setEditQuestionType("");
          toast.success("created successfully");
          setEditMediaType("");
          // Hide the modal
          setEditHint("");
          seteditImageRequired(false);
          seteditcommentRequired(false);
          seteditRequired(false);
          getAllQuestionByCompliance();
          handleClose();
          setOptions([]);
  
          setShowModal(false);
        });
    };
  
    const filechangeHandler = (event) => {
      const files = event.target.files;
  
      const newImages = Array.from(files).map((file) => {
        const imageUrl = URL.createObjectURL(file);
        return {
          file: file,
          name: file.name,
          link: imageUrl,
        };
      });
  
      setImages((prevImages) => [...prevImages, ...newImages]);
    };
  
    const deleteImage = (index) => {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages.splice(index, 1);
        return updatedImages;
      });
    };
  
    //   const file = event.target.files[0];
    //   setImage(file);
  
    //   if (file) {
    //     convertToLink(file);
    //   }
    // };
  
    // const convertToLink = (file) => {
    //   const imageUrl = URL.createObjectURL(file);
    //   setImageLink(imageUrl);
    // };
  
    const uploadButtonClickHandler = (event) => {
      event.preventDefault();
      document.getElementById("img").click();
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const increaseNumber = () => {
      setNumber(number + 1);
    };
  
    const decreaseNumber = () => {
      setNumber(number - 1);
    };
  
    const handleClose = () => {
      setShow(false);
      clearDataOffcanvas();
    };
    const handleShow = () => setShow(true);
  
   
  
    const handleOptionChange = (index, value) => {
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],
          text: value,
          risk: false,
          riskText: "",
          score: 0,
        };
        return updatedOptions;
      });
    };
    const handleScoreChange = (index, value) => {
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],
          score: value,
        };
        console.log("updated option", updatedOptions, value);
        return updatedOptions;
      });
    };
    const handleRishTxtChange = (index, value) => {
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],
          riskText: value,
          risk: true,
        };
        return updatedOptions;
      });
    };
  
    const handleCorrectChange = (index, isChecked) => {
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],
          correct: isChecked,
        };
        return updatedOptions;
      });
    };
    const handleAddOption = () => {
      if (options.length > 0 && options[options.length - 1].text === "") {
        return; // Don't add option if last option's text is empty
      }
      setOptions([...options, { text: "", correct: false }]);
    };
  
    const handleRemoveOption = (index) => {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1); // Remove option at the specified index
      setOptions(updatedOptions);
    };
  
    const getAllQuestionByCompliance = () => {
      axios
        .get(
          process.env.REACT_APP_API_BASE_URL +
            "admin/compliance_question/compliance/" +
            id
        )
        .then((response) => {
          console.log("this is all question", response.data.result);
          setQuestionArray(response.data.result);
        })
        .catch(() => {
          toast.dismiss();
          toast.error("something went wrong");
        });
    };
  
    const getAllCategoriesByComplianceId = () => {
      axios
        .get(
          process.env.REACT_APP_API_BASE_URL +
            "admin/compliance_category/compliance/" +
            id
        )
        .then((response) => {
          setCategory(response.data.result);
        });
    };
  
    const getEditDataSubQues = (q) => {
      console.log("inside the subquestion");
      setSelectedCategory(q.category);
      setEditSelectedCategoryId(q.categoryId);
      setQuestionId(q.id);
    };
  
    const getEditData = (q) => {
      setEditDescription(q.description);
      setEditText(q.text);
      setEditQuestionType(q.question_type);
      setEditMediaType(q.media_type);
      setSelectedCategory(q.category);
      setEditSelectedCategoryId(q.categoryId);
      // Hide the modal
      setQuestionId(q.id);
      setEditHint(q.hint);
  
      seteditImageRequired(q.images_required);
      seteditcommentRequired(q.comment_required);
      seteditRequired(q.comment_required);
      // handleClose()
      setEditSelectedCategory(q.category);
      setOptions(q.options);
      seteditmaxfile(q.file_max);
      seteditmaximage(q.image_max);
      // setNumber(0);
      seteditfileRequired(q.files_required);
    };
  
    const clearDataOffcanvas = () => {
      setEditDescription("");
      setEditText("");
      // toast.dismiss();
      setEditQuestionType("");
      setEditMediaType("");
      // Hide the modal
      setQuestionId(null);
      setEditHint("");
      setEditSelectedCategoryId(null);
      seteditImageRequired(false);
      seteditcommentRequired(false);
      seteditRequired(false);
      // handleClose()
      setEditSelectedCategory("");
      setOptions([]);
      seteditmaxfile(null);
      seteditmaximage(null);
      setNumber(0);
      seteditfileRequired(false);
      setisSubQuesttion(false);
      setisedit(false);
      setisSubQuesttion4option(false);
    };
  
    const handleSelection = (e) => {
      if (e.target.value === "YesNo") {
        setOptions([
          { text: "Yes", correct: false, risk: false, riskText: "", score: 0 },
          { text: "No", correct: false, risk: false, riskText: "", score: 0 },
        ]);
      } else if (e.target.value === "YesNONa") {
        setOptions([
          { text: "Yes", correct: false, risk: false, riskText: "", score: 0 },
          { text: "No", correct: false, risk: false, riskText: "", score: 0 },
          { text: "NA", correct: false, risk: false, riskText: "", score: 0 },
        ]);
      } else if (e.target.value === "mcq" || e.target.value === "CheckBox") {
        setOptions([{ text: "", correct: false, risk: false, riskText: "" }]);
      } else {
        setOptions([{ text: "", correct: false, risk: false, riskText: "" }]);
      }
    };
  
    useEffect(() => {
      // fetchTemplateInfo();
      getAllQuestionByCompliance();
      getAllCategoriesByComplianceId();
    }, []);








  return (  <Card
    style={{
      minHeight: "100px",
      background: "#e8edf8",
      boxShadow: " rgba(0, 0, 0, 0.3) 0px 0px 25px -5px",
    }}
    className="question-card"
  >
    <Card.Body>
      <div style={{ fontSize: "19px" }} className="text-capitalize">
        {question.text}
      </div>
      <div
        className="text-capitalize "
        style={{
          marginTop: "18px",
        }}
      >
        {question.question_type === "YesNo" ? (
          <div>
            <input className="mr-4" type="radio" name={question.id} />
            <span
              className="text-capitalize "
              style={{ marginRight: "12px" }}
            >
              Yes
              <AddIcon
                onClick={() => {
                  handleShow();
                  setIndex(0);
                  setisSubQuesttion4option(true);
                  setQuestionId(question.id);
                  getEditDataSubQues(question);
                }}
              />
            </span>

            <input className="mr-4" type="radio" name={question.id} />
            <span
              className="text-capitalize "
              style={{ marginRight: "12px" }}
            >
              No
              <AddIcon
                onClick={() => {
                  handleShow();
                  setIndex(1);
                  setisSubQuesttion4option(true);
                  setQuestionId(question.id);
                  getEditDataSubQues(question);
                }}
              />
            </span>
          </div>
        ) : question.question_type === "YesNONa" ? (
          <div>
            <input className="mr-4" type="radio" name={question.id} />
            <span
              className="text-capitalize "
              style={{ marginRight: "12px" }}
            >
              Yes
              <AddIcon
                onClick={() => {
                  handleShow();
                  setIndex(0);
                  setisSubQuesttion4option(true);
                  setQuestionId(question.id);
                  getEditDataSubQues(question);
                }}
              />
            </span>

            <input className="mr-4" type="radio" name={question.id} />
            <span
              className="text-capitalize "
              style={{ marginRight: "12px" }}
            >
              No
              <AddIcon
                onClick={() => {
                  handleShow();
                  setIndex(1);
                  setisSubQuesttion4option(true);
                  setQuestionId(question.id);
                  getEditDataSubQues(question);
                }}
              />
            </span>
            <input className="mr-4" type="radio" name={question.id} />
            <span
              className="text-capitalize "
              style={{ marginRight: "12px" }}
            >
              NA
              <AddIcon
                onClick={() => {
                  handleShow();
                  setIndex(2);
                  setisSubQuesttion4option(true);
                  setQuestionId(question.id);
                  getEditDataSubQues(question);
                }}
              />
            </span>
          </div>
        ) : question.question_type === "Long" ||
          question.question_type === "Short" ? (
          <div>
            <textarea
              className="form-control"
              style={{ height: "70px" }}
              id="description"
              rows="3"
              placeholder="Enter Answer"
              value={""}
              onChange={""}
            ></textarea>
          </div>
        ) : question.question_type === "Number" ? (
          <div className="d-flex ">
            <button
              style={{ marginRight: "12px" }}
              className="btn btn-sm btn-success mr-4"
              onClick={decreaseNumber}
            >
              -
            </button>
            <input
              className="text-align-center"
              style={{
                textAlign: "center",
                width: "67px",
              }}
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <button
              style={{ marginLeft: "12px" }}
              className="btn btn-sm btn-success ml-4"
              onClick={increaseNumber}
            >
              +
            </button>
          </div>
        ) : question.question_type === "Date" ? (
          <div>
            <label htmlFor="dateInput">Select a date:</label>
            <input
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        ) : null}
        {question.options.length > 0
          ? question.options.map((ans, ansIndex) => {
              return (
                <div
                  className="d-inline mr-3"
                  style={{ marginRight: "12px" }}
                >
                  {question.question_type === "CheckBox" ||
                  question.question_type === "mcq" ? (
                    <div>
                      <input type="radio" name={question.id} />
                      <span key={ansIndex} className="text-capitalize ">
                        {ans.text}
                        <AddIcon
                          onClick={() => {
                            handleShow();
                            setIndex(ansIndex);
                            setisSubQuesttion4option(true);
                            setQuestionId(question.id);
                            getEditDataSubQues(question);
                          }}
                        />
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })
          : "no answer"}
      </div>

      <div className="row mb-4">
        {question.images?.map((image, index) => {
          return (
            <div className="col-4 mb-3">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between" key={index}>
                    <div
                      style={{
                        overflow: "hidden",
                        height: "240px",
                      }}
                      className="d-flex justify-content-around"
                    >
                      <img src={image.link} alt={image.name} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-end">
        <span
          onClick={() => {
            handleShow();
            setisSubQuesttion(true);
            setQuestionId(question.id);
            getEditDataSubQues(question);
          }}
          style={{ marginRight: "12px" }}
        >
          <AddIcon />
        </span>

        <span
          onClick={() => {
            handleShow();
            // refreshOffcanvasComponent();
            setQuestionId(question.id);
            setisedit(true);
            setisSubQuesttion(false);
            getEditData(question);
            setSubQuestion(question.sub_question);
          }}
          style={{ marginRight: "12px" }}
        >
          <Edit />{" "}
        </span>

        <span onClick={(e) => handleDelete(e, question.id)}>
          <Delete />{" "}
        </span>
      </div>
    </Card.Body>
  </Card>);
};

export default QuestionComponent;
