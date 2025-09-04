import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import SignaturePad from "../../compliance/components/SignaturePad";
import { apiAuth } from "api";
import MyCKEditor from "utils/CKEditor";
const QuestionCard = ({i,id,questionArray,getAllQuestionByCompliance}) => {
    

    const [options, setOptions] = useState([""]);
    const [category, setCategory] = useState([]);
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
    // const [refreshOffcanvas, setRefreshOffcanvas] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [editRequired, seteditRequired] = useState(false);
    const [editImageRequired, seteditImageRequired] = useState(false);
    const [editcommentRequired, seteditcommentRequired] = useState(false);
    const [editfileRequired, seteditfileRequired] = useState(false);
    const [editmaxfile, seteditmaxfile] = useState(null);
    const [editmaximage, seteditmaximage] = useState(null);
    const [isedit, setisedit] = useState(false);
    const [number, setNumber] = useState(0);
    const [images, setImages] = useState(null);
    const [isSubQuesttion, setisSubQuesttion] = useState(false);
    const [isSubQuesttion4option, setisSubQuesttion4option] = useState(false);
    const [subQuestion, setSubQuestion] = useState([]);
    const [index ,setIndex] = useState(null);
    const [img, setImg] = useState(null);
    const [formData, setFormData] = useState([{ img: "", description: "" }]);
  
    const handleAddInput = () => {
      setFormData([...formData, { img: "", description: "" }]);
    };
  
    const handleRemoveInput = (index) => {
      const updatedData = [...formData];
      updatedData.splice(index, 1);
      setFormData(updatedData);
    };

    const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const updatedData = [...formData];
      updatedData[index] = { ...updatedData[index], [name]: value };
      setFormData(updatedData);
    };


    const handleSubQuesttion4option =(e, questionId, questionTypes,index)=>{
      e.preventDefault();
      const question =  questionArray.find((i)=>i.id ===questionId)
      if (!editText) {
        toast.dismiss();
        toast.error("You have to Write Question");
        return;
      }
      
      const isCorrect = options.find((i) => i.correct === true);
      if (!isCorrect && (questionTypes === "CheckBox" || questionTypes === "mcq")) {
        toast.dismiss();
        toast.error("At least Choose 1 Correct Answer");
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
        images: img,
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
  
        });
    }
    
    const handleDeleteSubQuestion4option = async (e, id,index) => {
      e.preventDefault();
      const question =  questionArray.find((i)=>i.id ===id)
      console.log(question);
      let option = question.options
      console.log(option, "thi si option");
      option[index].sub_question=null
      console.log(index, "this is index")
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${id}`,{
            options:option,
          }
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
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
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
      } catch (error) {
        console.error("Error creating compliance:", error);
      }
     };
    
     const filechangeHandlerDescModal = async (index,event) => {
      const file = event.target.files[0];
      try {
        const res = await apiAuth.post("/admin/temp", { img: file });
        const updatedData = [...formData];
        updatedData[index] = {
          ...updatedData[index],
          img: res.data?.file?.Location, 
        };
        setFormData(updatedData);
      } catch (error) {
        console.log(error);
      }
  
      // setImages((prevImages) => [...prevImages, ...newImages]);
    };
    const uploadButtonClickHandlerIndex = (index,event) => {
      event.preventDefault();
      document.getElementById(`img${index}jod`).click();
    };
    
    const handleDelete = async (e, id) => {
      e.preventDefault();
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}admin/compliance_question/${id}`
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
        toast.dismiss();
        toast.success("Question Delete successfully");
        // Hide the modal
        getAllQuestionByCompliance();
  
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
      desc_modal:formData,

          }
        );
        console.log("quesiont created:", response.data.result);
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
      if (!isCorrect && (questionTypes === "CheckBox" || questionTypes === "mcq")) {
        toast.dismiss();
        toast.error("At least Choose 1 Correct Answer");
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
            images: img,
            desc_modal:formData,
          }
        );
        console.log("quesiont created:", response.data.result);
        // Reset the form
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
  
        });
    };
    
    const filechangeHandler = (event) => {
      apiAuth
        .post("/admin/temp", { img: event.target.files[0] })
        .then((res) => {
          setImg(res.data?.file?.Location);
        })
        .catch((error) => console.log(error));
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImages({...images,
        file: file,
        name: file.name,
        link: imageUrl,
      });
  
      // setImages((prevImages) => [...prevImages, ...newImages]);
    };
    
    const deleteImage = () => {
      setImg('')
    };
    
    
    
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
    const handleNumberChange = (index, value) =>{
      setOptions((prevOptions)=>{
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = {
          ...updatedOptions[index],value:value
        }
        return updatedOptions
      })
    }
    
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
  
    // const getAllQuestionByCompliance = () => {
    //   axios
    //     .get(
    //       process.env.REACT_APP_API_BASE_URL +
    //         "admin/compliance_question/compliance/" +
    //         id
    //     )
    //     .then((response) => {
    //       console.log("this is all question", response.data.result);
    //       setQuestionArray(response.data.result);
    //     })
    //     .catch(() => {
    //       toast.dismiss();
    //       toast.error("something went wrong");
    //     });
    // };
  
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
      setEditSelectedCategoryId(q.categoryId);
      setQuestionId(q.id);
    };
  
    const getEditData = (q) => {
      setEditDescription(q.description);
      setEditText(q.text);
      setEditQuestionType(q.question_type);
      setEditMediaType(q.media_type);
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
      setImages(null)
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
      } else if(e.target.value ==='Number'){
        setOptions([
          {text:"Minimum",value:0, risk:false, riskText:"", score:0}, 
          {text:"Maximum",value:0, risk:false, riskText:"", score:0}
  
        ])
      }
      
      else {
        setOptions([{ text: "", correct: false, risk: false, riskText: "" }]);
      }
    };
  
    useEffect(() => {
      // fetchTemplateInfo();
      // getAllQuestionByCompliance();
      getAllCategoriesByComplianceId();
    }, []);





  return (
    <div>
                {questionArray.length > 0 ? (
                  questionArray
                    .filter((question) => question.categoryId === i.id)
                    .map((question, index) => {
                      let count =0

                      return (
                        <div className="mt-4" key={index}>
                          <Card
                            style={{
                              minHeight: "100px",
                              background: "#e8edf8",
                              boxShadow:" rgba(0, 0, 0, 0.3) 0px 0px 25px -5px",
                            }}
                            className="question-card"
                          >
                            <Card.Body>
                              <div className="d-flex">
                              <span> Q{index+1}.</span>
                <div dangerouslySetInnerHTML={{ __html: question.text }} />

                              </div>
                              <div
                                className="text-capitalize "
                                style={{
                                  marginTop: "18px",
                                  marginBottom:"12px"
                                }}
                              >
                                {question.question_type === "YesNo" ? (
                                  <div >
                                    <input
                                      className="mr-4"
                                      type="radio"
                                      name={question.id}
                                    />
                                    <span
                                      className="text-capitalize "
                                      style={{ marginRight: "12px" }}
                                    >
                                      Yes
                                    <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(0);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
                                    </span>


                                    <input
                                      className="mr-4"
                                      type="radio"
                                      name={question.id}
                                    />
                                    <span
                                      className="text-capitalize "
                                      style={{ marginRight: "12px" }}
                                    >
                                      No
                                      <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(1);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
                                    </span>
                                  </div>
                                ) : question.question_type === "YesNONa" ? (
                                  <div>
                                    <input
                                      className="mr-4"
                                      type="radio"
                                      name={question.id}
                                    />
                                    <span
                                      className="text-capitalize "
                                      style={{ marginRight: "12px" }}
                                    >
                                      Yes
                                      <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(0);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
                                    </span>

                                    <input
                                      className="mr-4"
                                      type="radio"
                                      name={question.id}
                                    />
                                    <span
                                      className="text-capitalize "
                                      style={{ marginRight: "12px" }}
                                    >
                                      No
                                      <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(1);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
                                    </span>
                                    <input
                                      className="mr-4"
                                      type="radio"
                                      name={question.id}
                                    />
                                    <span
                                      className="text-capitalize "
                                      style={{ marginRight: "12px" }}
                                    >
                                      NA
                                      <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(2);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
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
                                      // value={""}
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
                                      onChange={(e) =>
                                        setNumber(parseInt(e.target.value))
                                      }
                                    />
                                    <button
                                      style={{ marginLeft: "12px" }}
                                      className="btn btn-sm btn-success ml-4"
                                      onClick={increaseNumber}
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : question.question_type === "Signature" ? (
                                  <div>
                                    <SignaturePad/>
                                  </div>
                                ) : null}
                                {question.options.length > 0
                                  ? question.options.map((ans, ansIndex) => {
                                      return (
                                        <div
                                          className="d-inline mr-3"
                                          style={{ marginRight: "12px" }}
                                        >
                                          {question.question_type ===
                                            "CheckBox" ||
                                          question.question_type === "mcq" ? (
                                            <div className="d-inline">
                                              <input
                                                type="radio"
                                                name={question.id}
                                              />
                                              <span
                                                key={ansIndex}
                                                className="text-capitalize "
                                              >
                                                {ans.text}
                                                <AddIcon  onClick={() => {
                                    handleShow();
                                    setIndex(ansIndex);
                                    setisSubQuesttion4option(true);
                                    setQuestionId(question.id);
                                    getEditDataSubQues(question);
                                  }}/>
                                              </span>
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })
                                  : "no answer"}
                              </div>

                           

                              <div className="d-flex justify-content-end">
                               

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

                                <span
                                  onClick={(e) => handleDelete(e, question.id)}
                                >
                                  <Delete />{" "}
                                </span>
                              </div>
                             { question?.images && 
                             <Card onClick={()=>window.location.href = question.images}
                              style={{width:"500px" , height:'200px', cursor:'pointer'}}>
                                <Card.Body style={{height:'100%'}}>
                                  <img style={{height:'100%', width:'100%', objectFit:'cover'}}
                                   src={question.images}
                                    alt={"file"} />
                                </Card.Body>
                              </Card>
                              }
                            </Card.Body>
                          </Card>
                          {question.sub_question?.length? <h4>SubQuestion</h4>:null}
                          {
                            //sub question start here
                            
                            question.sub_question?.map((ques, indexa) => {
                              return (
                                <div key={indexa}>
                                  <Card
                                    style={{
                                      minHeight: "100px",
                                      background: "#e8edf8",
                                      boxShadow:
                                        " rgba(0, 0, 0, 0.3) 0px 0px 25px -5px",
                                    }}
                                    className="question-card"
                                  >
                                    <Card.Body>
                                      <div
                                        style={{ fontSize: "19px" }}
                                        className="text-capitalize"
                                      >
                                        {ques.text}
                                      </div>
                                      <div
                                        className="text-capitalize "
                                        style={{
                                          marginTop: "18px",
                                        }}
                                      >
                                        {ques.question_type === "YesNo" ? (
                                          <div>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              Yes
                                            </span>

                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              No
                                            </span>
                                          </div>
                                        ) : ques.question_type ===
                                          "YesNONa" ? (
                                          <div>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              Yes
                                            </span>

                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              No
                                            </span>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              NA
                                            </span>
                                          </div>
                                        ) : ques.question_type === "Long" ||
                                          ques.question_type === "Short" ? (
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
                                        ) : ques.question_type ===
                                          "Number" ? (
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
                                              onChange={(e) =>
                                                setNumber(
                                                  parseInt(e.target.value)
                                                )
                                              }
                                            />
                                            <button
                                              style={{ marginLeft: "12px" }}
                                              className="btn btn-sm btn-success ml-4"
                                              onClick={increaseNumber}
                                            >
                                              +
                                            </button>
                                          </div>
                                        ) : ques.question_type ===
                                          "Signature" ? (
                                          <div>
                                            signature
                                          </div>
                                        ) : null}

                    {/* option for mcq and checkbox */}

                                        {ques.options.length > 0
                                          ? ques.options.map(
                                              (ans, ansIndex) => {
                                                return (
                                                  <div
                                                    className="d-inline mr-3"
                                                    style={{
                                                      marginRight: "12px",
                                                    }}
                                                  >
                                                    {ques.question_type ===
                                                      "CheckBox" ||
                                                    ques.question_type ===
                                                      "mcq" ? (
                                                      <div>
                                                        <input
                                                          type="radio"
                                                          name={index}
                                                        />
                                                        <span
                                                          key={ansIndex}
                                                          className="text-capitalize "
                                                        >
                                                          {ans.text}
                                                        </span>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                );
                                              }
                                            )
                                          : "no options"}
                                      </div>


                                      <div className="row mb-4">
                                        {question.images?.map(
                                          (image, index) => {
                                            return (
                                              <div className="col-4 mb-3">
                                                <Card>
                                                  <Card.Body>
                                                    <div
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <div
                                                        style={{
                                                          overflow: "hidden",
                                                          height: "240px",
                                                        }}
                                                        className="d-flex justify-content-around"
                                                      >
                                                        <img
                                                          src={image.link}
                                                          alt={image.name}
                                                        />
                                                      </div>
                                                    </div>
                                                  </Card.Body>
                                                </Card>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>

                                      <div className="d-flex justify-content-end">
                                        <span
                                          onClick={(e) =>
                                            handleDeleteSubQuestion(e, question.id, index)
                                          }
                                        >
                                          <Delete />{" "}
                                        </span>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })
                          }
                          {/* {question.options.find((i) => i.sub_question) && <span>Sub Question for {index+1}</span>} */}


                          {question.options.map((option,indexb)=>{
                            // subquestion 4 option start here
                            return <>
                              { option.sub_question &&
                                <div className="mt-3" key={indexb} style={{transform:"scale(.9)"}}>
                                  <Card
                                    style={{
                                      minHeight: "70px",
                                      background: "#ffdada",
                                      boxShadow:
                                        " rgba(0, 0, 0, 0.3) 0px 0px 25px -5px",
                                    }}
                                    className="question-card"
                                  >
                                  {/* subquestion body */}
                                    <Card.Body>
                                      <div
                                        style={{ fontSize: "19px" }}
                                        className="text-capitalize"
                                      >
                                        Q{index+1}{String.fromCharCode(97 + count++)}. {option.sub_question.text}
                                      </div>
                                      <div
                                        className="text-capitalize "
                                        style={{
                                          marginTop: "18px",
                                        }}
                                      >
                                        {option.sub_question.question_type === "YesNo" ? (
                                          <div>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              Yes
                                            </span>

                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              No
                                            </span>
                                          </div>
                                        ) : option.sub_question.question_type ===
                                          "YesNONa" ? (
                                          <div>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              Yes
                                            </span>

                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              No
                                            </span>
                                            <input
                                              className="mr-4"
                                              type="radio"
                                              name={index}
                                            />
                                            <span
                                              className="text-capitalize "
                                              style={{ marginRight: "12px" }}
                                            >
                                              NA
                                            </span>
                                          </div>
                                        ) : option.sub_question.question_type === "Long" ||
                                        option.sub_question.question_type === "Short" ? (
                                          <div>
                                            <textarea
                                              className="form-control"
                                              style={{ height: "70px" }}
                                              id="description"
                                              rows="3"
                                              placeholder="Enter Answer"
                                              value={""}
                                              // onChange={""}
                                            ></textarea>
                                          </div>
                                        ) : option.sub_question.question_type ===
                                          "Number" ? (
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
                                              onChange={(e) =>
                                                setNumber(
                                                  parseInt(e.target.value)
                                                )
                                              }
                                            />
                                            <button
                                              style={{ marginLeft: "12px" }}
                                              className="btn btn-sm btn-success ml-4"
                                              onClick={increaseNumber}
                                            >
                                              +
                                            </button>
                                          </div>
                                        ) : option.sub_question.question_type ===
                                          "Date" ? (
                                          <div>
                                            <label htmlFor="dateInput">
                                              Select a date:
                                            </label>
                                            <input
                                              type="date"
                                              id="dateInput"
                                              value={selectedDate}
                                              onChange={handleDateChange}
                                            />
                                          </div>
                                        ) : null}
                                        {option.sub_question.options.length > 0
                                          ? option.sub_question.options.map(
                                              (ans, ansIndex) => {
                                                return (
                                                  <div
                                                    className="d-inline mr-3"
                                                    style={{
                                                      marginRight: "12px",
                                                    }}
                                                  >
                                                    {option.sub_question.question_type ===
                                                      "CheckBox" ||
                                                      option.sub_question.question_type ===
                                                      "mcq" ? (
                                                      <div>
                                                        <input
                                                          type="radio"
                                                          name={index}
                                                        />
                                                        <span
                                                          key={ansIndex}
                                                          className="text-capitalize "
                                                        >
                                                          {ans.text}
                                                        </span>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                );
                                              }
                                            )
                                          : "no answer"}
                                      </div>

                                    {option?.sub_question?.images && 
                                      <Card onClick={()=>window.location.href = option?.sub_question.images} style={{width:"500px" , height:'200px', cursor:'pointer'}}>
                                        <Card.Body style={{height:'100%'}}>
                                          <img style={{height:'100%', width:'100%', objectFit:'cover'}} src={option?.sub_question.images} alt={"files"} />
                                        </Card.Body>
                                      </Card>
                                     }

                                      <div className="d-flex justify-content-end">
                                        <span
                                          onClick={(e) =>
                                            handleDeleteSubQuestion4option(e, question.id, indexb)
                                          }
                                        >
                                          <Delete />{" "}
                                        </span>
                                      </div>
                                      
                                    </Card.Body>
                                  </Card>
                                 </div>
                              }
                            </>
                          })}
                        </div>
                      );
                    })
                ) : (
                  <div>No questions</div>
                )}

                <Offcanvas
        style={{ width: "825px" }}
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>
              {isedit
                ? "Edit Question"
                : isSubQuesttion
                ? "Add Sub-Question"
                : isSubQuesttion4option
                ?"Add Sub-Question for Option"
                : "Add Question"}
            </h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "100%" }}>
          <div className="container">
            <form
              onSubmit={(e) => {
                if (isedit) {
                  handleEdit(e, questionId, editQuestionType);
                } else if (isSubQuesttion) {
                  handleSubQuestion(e, questionId, editQuestionType);
                } 
                  else if(isSubQuesttion4option){
                    handleSubQuesttion4option(e, questionId, editQuestionType, index);
                  }
                  else {
                  handleSubmit(e, editQuestionType);
                }
              }}
            >
              <div className="row">
                <div
                  className=" row rounded-3 p-2 mb-3"
                  style={{
                    background: "#ffd3b624",
                  }}
                >
                  {!isSubQuesttion ? (
                    <div className="form-group mb-3 col-6">
                      <h6 htmlFor="category">Category * :</h6>
                      <select
                        className="form-control"
                        id="category"
                        value={
                          editSelectedCategoryId ? editSelectedCategoryId : ""
                        }
                        onChange={(e) => {
                          const categoryId = e.target.value;
                          setEditSelectedCategoryId(categoryId);
                          const selectedCategory = category.find(
                            (option) => option.id === parseInt(categoryId)
                          );
                          setEditSelectedCategory(
                            selectedCategory ? selectedCategory.title : ""
                          );
                        }}
                      >
                        <option value="">{"Select Category"}</option>
                        {category.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {
                    <div className="form-group col-6">
                      <h6 htmlFor="questionType">Question Type *:</h6>
                      <select
                        className="form-control"
                        id="questionType"
                        value={editQuestionType}
                        onChange={(e) => {
                          setEditQuestionType(e.target.value);
                          handleSelection(e);
                        }}
                      >
                        <option value="">Select Question Type *</option>

                        <option value="YesNONa">Yes No Na</option>
                        <option value="YesNo">Yes No</option>

                        <option value="mcq">Multiple Choice</option>
                        <option value="CheckBox">Check Box</option>
                        <option value="Number">Number</option>
                        <option value="Long">Long Text</option>
                        <option value="Short">Short Text</option>
                        <option value="Date">Date</option>
                        <option value="Time">Time</option>
                        <option value="Upload">Upload</option>
                        <option value="Signature">Signature</option>
                      </select>
                    </div>
                  }
                  <div className="form-group col-12 mb-3">
                    <h6 htmlFor="text">Question * :</h6>
                    <MyCKEditor content={editText} setContent={setEditText} placeholder="Content goes here..." />

                  </div>
                  <div className="form-group col-12 mb-4">
                    <h6 htmlFor="description">Description:</h6>
                    
                    <MyCKEditor content={editDescription} setContent={setEditDescription} placeholder="Content goes here..." />
                  </div>
                  <div className="col-7 mt-3 mb-3">
                    <button
                      className="btn px-2 py-1 btn-outline-primary btn-sm mb-3"
                      onClick={uploadButtonClickHandler}
                    >
                      Upload Image 
                    </button>
                    <input
                      type="file"
                      id="img"
                      name="files[]"
                      accept=".png, .jpg, .jpeg"
                      style={{ display: "none" }}
                      onChange={filechangeHandler}
                    />
                    {img && (
                      <Card>
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div
                              style={{ overflow: "hidden", height: "53px" }}
                              className="d-flex justify-content-around"
                            >
                              <img
                                src={img}
                                alt={images.name}
                                style={{ height: "50px" }}
                              />
                              <p
                                style={{
                                  margin: "0 0 0 12px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: "350px",
                                }}
                              >
                                {images?.name?.length > 28
                                  ? `${images.name.substring(0, 28)}...`
                                  : images.name}
                              </p>
                            </div>
                            <div>
                              <button
                                style={{}}
                                className="ml-3 px-2 py-1  btn btn-outline-danger btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteImage();
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                </div>
                <div
                  className="card mb-4 border-0 rounded-3"
                  style={{
                    background: "#0003ff14",
                  }}
                >
                  <h6 className="mb-2 mt-3">Add Canvas Modal :</h6>
                  <div className="form-group card-body ">
                    <div>
                      {formData.map((data, index) => (
                        <Card className="mb-4">
                          <Card.Body>
                            <div key={index} className="row">
                              <div className="col-6 mb-4">
                                <button
                                  className="btn px-2 py-1 btn-outline-primary btn-sm"
                                  onClick={(e) =>
                                    uploadButtonClickHandlerIndex(index, e)
                                  }
                                >
                                  upload image
                                </button>
                                <input
                                  type="file"
                                  id={`img${index}jod`}
                                  name="files[]"
                                  accept=".png, .jpg, .jpeg"
                                  style={{ display: "none" }}
                                  onChange={(e) => {
                                    filechangeHandlerDescModal(index, e);
                                  }}
                                />
                              </div>
                              {formData[index].img && (
                                <div className="col-6">
                                  <img src={formData[index].img} alt={"img"} />
                                </div>
                              )}
                              <div className="col-12 mb-4">
                                <textarea
                                  className="form-control"
                                  name="description"
                                  value={data.description}
                                  onChange={(e) => handleInputChange(index, e)}
                                  style={{
                                    resize: "none",
                                  }}
                                />
                              </div>
                              <div className="col-5">
                                {formData.length > 1 && (
                                  <button
                                    className="btn px-2 py-1 btn-outline-danger btn-sm"
                                    variant="danger"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemoveInput(index);
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}

                      <button
                        className="btn px-2 py-1 btn-outline-success btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddInput();
                        }}
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="form-group col-3">
                                        <h6 htmlFor="mediaType">Media Type:</h6>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="mediaType"
                                          placeholder="Enter media type"
                                          value={editMediaType}
                                          onChange={(e) => setEditMediaType(e.target.value)}
                                        />
                                      </div> */}
                <div
                  className="card border-0 rounded-3 mb-3"
                  style={{ background: "#ff8a8a33" }}
                >
                  <div className="card-body">
                    <div className=" mt-4 d-flex justify-content-around align-item-center form-group col-12 ">
                      <div style={{ transform: "scale(0.8)" }}>
                        <Toggle
                          style={{ transform: "scale(0.8)" }}
                          id="toggleSwitch"
                          checked={editRequired}
                          onChange={() => seteditRequired(!editRequired)}
                        />
                        <span className="d-block" htmlFor="toggleSwitch">
                          Mandatory Question
                        </span>
                      </div>

                      <div style={{ transform: "scale(0.8)" }}>
                        <Toggle
                          id="toggleSwitch"
                          checked={editcommentRequired}
                          onChange={() =>
                            seteditcommentRequired(!editcommentRequired)
                          }
                        />
                        <span className="d-block" htmlFor="toggleSwitch">
                          Comment Required
                        </span>
                      </div>
                      <div style={{ transform: "scale(0.8)" }}>
                        <Toggle
                          id="toggleSwitch"
                          checked={editImageRequired}
                          onChange={() =>
                            seteditImageRequired(!editImageRequired)
                          }
                        />
                        <span className="d-block" htmlFor="toggleSwitch">
                          Image Required
                        </span>
                      </div>

                      <div style={{ transform: "scale(0.8)" }}>
                        <Toggle
                          id="toggleSwitch"
                          checked={editfileRequired}
                          onChange={() =>
                            seteditfileRequired(!editfileRequired)
                          }
                        />
                        <span className="d-block" htmlFor="toggleSwitch">
                          Files Required
                        </span>
                      </div>
                      <div className="col-6 d-flex">
                        {editImageRequired ? (
                          <input
                            type="Number"
                            className="form-control"
                            id="maxFile"
                            placeholder="Max Image"
                            value={editmaxfile}
                            onChange={(e) => seteditmaxfile(e.target.value)}
                          />
                        ) : null}

                        {editfileRequired ? (
                          <input
                            type="Number"
                            className="form-control"
                            id="maxFile"
                            placeholder="Max File"
                            value={editmaximage}
                            onChange={(e) => seteditmaximage(e.target.value)}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* option start here */}
                {/* options for mcq and checkbox */}
                {(editQuestionType && editQuestionType === "mcq") ||
                (editQuestionType && editQuestionType === "CheckBox") ? (
                  <div className="form-group col-12">
                    <h6>Options:</h6>

                    {options.map((option, index) => (
                      <Card className="mb-3" style={{ background: "#f1f1ff" }}>
                        <Card.Body>
                          <div key={index} className="row align-items-center">
                            <div className="col-8">
                              <input
                                placeholder="Enter Options"
                                className="form-control mb-3"
                                type="text"
                                value={option.text}
                                onChange={(event) =>
                                  handleOptionChange(index, event.target.value)
                                }
                              />
                            </div>
                            <div className="col-1 ">
                              <label>
                                <Form.Check
                                  type={"checkbox"}
                                  checked={option.correct}
                                  onChange={(event) =>
                                    handleCorrectChange(
                                      index,
                                      event.target.checked
                                    )
                                  }
                                />
                                Correct
                              </label>
                            </div>
                            <div className="col-3">
                              <input
                                className="form-control mb-3"
                                placeholder="Enter Score"
                                type="number"
                                value={option.score}
                                onChange={(event) =>
                                  handleScoreChange(index, event.target.value)
                                }
                              />
                            </div>

                            <div className="col-8">
                              <textarea
                                style={{
                                  height: "45px",
                                }}
                                className="form-control mb-3"
                                id="description"
                                rows="5"
                                placeholder="Enter Risk"
                                value={option.riskText}
                                onChange={(e) =>
                                  handleRishTxtChange(index, e.target.value)
                                }
                              ></textarea>
                            </div>

                            {index > 0 ? (
                              <div className="col-1">
                                <button
                                  className="btn btn-sm btn-primary"
                                  type="button"
                                  onClick={() => handleRemoveOption(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                    <button
                      className="btn btn-sm btn-primary mt-2 mb-3"
                      type="button"
                      onClick={handleAddOption}
                    >
                      Add Option
                    </button>
                  </div>
                ) : (editQuestionType && editQuestionType === "YesNo") ||
                  (editQuestionType && editQuestionType === "YesNONa") ? (
                  <div className="col-12">
                    <h6>Options:</h6>

                    {options.length > 0
                      ? options.map((option, index) => {
                          return (
                            <Card
                              className="mb-3"
                              style={{ background: "#f1f1ff" }}
                            >
                              <Card.Body>
                                <div className="row">
                                  <div className="col-8">
                                    <input
                                      className="form-control"
                                      readOnly
                                      type="text"
                                      value={option.text}
                                      onChange={(event) =>
                                        handleOptionChange(
                                          index,
                                          event.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-1 ">
                                    <label>
                                      <Form.Check
                                        type={"checkbox"}
                                        checked={option.correct}
                                        onChange={(event) =>
                                          handleCorrectChange(
                                            index,
                                            event.target.checked
                                          )
                                        }
                                      />
                                      Correct
                                    </label>
                                  </div>
                                  <div className="col-3 mb-3">
                                    <input
                                      className="form-control"
                                      type="number"
                                      placeholder="Enter Score"
                                      value={option.score}
                                      onChange={(event) => {
                                        handleScoreChange(
                                          index,
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="col-12 ">
                                    <textarea
                                      style={{
                                        height: "45px",
                                      }}
                                      className="form-control"
                                      id="description"
                                      rows="3"
                                      placeholder="Enter Risk"
                                      value={option.riskText}
                                      onChange={(e) =>
                                        handleRishTxtChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          );
                        })
                      : null}
                  </div>
                ) : editQuestionType && editQuestionType === "Number" ? (
                  <div className="col-12">
                    <Card>
                      <Card.Body>
                        <div>
                          <h5>Data Validation</h5>
                        </div>
                        <div className="row justify-content-between">
                          <div className="col-5">
                            <FloatingLabel
                              label="Minimum Number"
                              className="mb-3"
                            >
                              <Form.Control
                                type="number"
                                placeholder="Minimum Number"
                                onChange={(e) => {
                                  handleNumberChange(0, e.target.value);
                                  // setMinNumber(e.target.value)
                                  // console.log(e.target.value)
                                }}
                              />
                            </FloatingLabel>
                          </div>

                          <div className="col-5">
                            <FloatingLabel label="Maximum Number">
                              <Form.Control
                                type="number"
                                placeholder="Maximum Number"
                                onChange={(e) =>
                                  handleNumberChange(1, e.target.value)
                                }
                              />
                            </FloatingLabel>
                          </div>
                          <div className="col-5">
                            <FloatingLabel label="Score">
                              <Form.Control
                                type="number"
                                placeholder="Score"
                                onChange={(e) => {
                                  handleScoreChange(0, e.target.value);
                                  handleScoreChange(1, e.target.value);
                                }}
                              />
                            </FloatingLabel>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (editQuestionType && editQuestionType === "Long") ||
                  (editQuestionType && editQuestionType === "Short") ? (
                  <div className="row mb-3">
                    <div className="col-5">
                      {/* continue adding long and short here */}
                      <FloatingLabel label="Score">
                        <Form.Control
                          type="number"
                          placeholder="Score"
                          onChange={(e) => {
                            handleScoreChange(0, e.target.value);
                            // handleScoreChange(1,e.target.value)
                          }}
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                ) : editQuestionType && editQuestionType === "Signature" ? (
                  <div className="row mb-3">
                    <div className="col-5">
                      {/* continue adding long and short here */}
                      <FloatingLabel label="Score">
                        <Form.Control
                          type="number"
                          placeholder="Score"
                          onChange={(e) => {
                            handleScoreChange(0, e.target.value);
                            // handleScoreChange(1,e.target.value)
                          }}
                        />
                      </FloatingLabel> 
                    </div>
                  </div>
                ) : null}
                <div className="form p-2 group col-12 rounded-3 border-0 " style={{
                  background:'#d3d3d34a'
                }}>
                  <h6 htmlFor="hint">Hint:</h6>
                  
                    <MyCKEditor content={editHint} setContent={setEditHint} placeholder="Content goes here..." />

                </div>
                <br />
                <br />
                <div className="col-9"></div>
                <button
                  type="submit "
                  className="btn btn-sm btn-success mt-4 col-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
              </div>
  )
}

export default QuestionCard
