import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import QuestionCard from "../components/QuestionCard";
import { apiAuth, apiJson } from "api";
import MyCKEditor from "utils/CKEditor";
const AdminComplianceQuestion = () => {
  let { id } = useParams();
  const [options, setOptions] = useState([""]);
  const [questionArray, setQuestionArray] = useState([]);
  const [category, setCategory] = useState([]);

  // Duplicates with "edit" prefix
  const [editDescription, setEditDescription] = useState("");
  const [editQuestionType, setEditQuestionType] = useState("");
  const [editHint, setEditHint] = useState("");
  const [editText, setEditText] = useState("");

  const [editSelectedCategory, setEditSelectedCategory] = useState("");
  const [editSelectedCategoryId, setEditSelectedCategoryId] = useState(null);
  const [show, setShow] = useState(false);
  const [editRequired, seteditRequired] = useState(false);
  const [editImageRequired, seteditImageRequired] = useState(false);
  const [editcommentRequired, seteditcommentRequired] = useState(false);
  const [editfileRequired, seteditfileRequired] = useState(false);
  const [editmaxfile, seteditmaxfile] = useState(null);
  const [editmaximage, seteditmaximage] = useState(null);
  const [images, setImages] = useState([]);
  const [img, setImg] = useState(null);
  const [isSubQuesttion, setisSubQuesttion] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState([{ img: "", description: "" }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFormData(updatedData);
  };

  const handleAddInput = () => {
    setFormData([...formData, { img: "", description: "" }]);
  };

  const handleRemoveInput = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  const handleSubmit = async (e, questionTypes) => {
    e.preventDefault();
    if (!editSelectedCategory || !editSelectedCategoryId) {
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
    if (
      !isCorrect &&
      (questionTypes === "CheckBox" || questionTypes === "mcq")
    ) {
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
        toast.error("Add at least 2 options");
        return;
      }
    }
    const data = {
      complianceId: id,
      text: editText,
      description: editDescription,
      question_type: editQuestionType,
      // media_type: editMediaType,
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
      desc_modal: formData,
      // img:img,},
    };

    setIsLoading(true);

    try {
      await apiJson.post("admin/compliance_question", data);
      // console.log('question created:', response.data.result);
      setEditText("");
      setEditQuestionType("");
      toast.success("created successfully");
      // setEditMediaType("");
      setEditHint("");
      seteditImageRequired(false);
      seteditcommentRequired(false);
      seteditRequired(false);
      getAllQuestionByCompliance();
      handleClose();
      clearDataOffcanvas();
      setOptions([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating compliance:", error);
    }
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

  const filechangeHandlerDescModal = async (index, event) => {
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

  const deleteImage = (index) => {
    setImg('')
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
  const uploadButtonClickHandlerIndex = (index, event) => {
    event.preventDefault();
    document.getElementById(`img${index}jod`).click();
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
      // console.log("updated option", updatedOptions, value);
      return updatedOptions;
    });
  };

  const handleNumberChange = (index, value) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = {
        ...updatedOptions[index],
        value: value,
      };
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
        // console.log("this is all question", response.data.result);
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

  const clearDataOffcanvas = () => {
    setEditDescription("");
    setEditText("");
    // toast.dismiss();
    setEditQuestionType("");
    // setEditMediaType("");
    // Hide the modal
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
    seteditfileRequired(false);
    setisSubQuesttion(false);
    // setisedit(false);
    setImages(null);
    // setisSubQuesttion4option(false);
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
    } else if (e.target.value === "Number") {
      setOptions([
        { text: "Minimum", value: 0, risk: false, riskText: "", score: 0 },
        { text: "Maximum", value: 0, risk: false, riskText: "", score: 0 },
      ]);
    } else if (e.target.value === "Long" || e.target.value === "Short") {
      setOptions([{ text: "Long", risk: false, riskText: "", score: 0 }]);
    } else {
      setOptions([{ text: "", risk: false, riskText: "", score: 0 }]);
    }
  };

  useEffect(() => {
    // fetchTemplateInfo();
    getAllQuestionByCompliance();
    getAllCategoriesByComplianceId();
  }, []);
  return (
    <div style={{ margin: "34px" }}>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          handleShow();
          // refreshOffcanvasComponent()
          // setisedit(false);

          setisSubQuesttion(false);
        }}
      >
        Add Question
      </button>
      <br />
      <br />
      <br />

      <div>
        {category?.map((i) => (
          <div>
            {/* <hr /> */}
            <h4>{i.title}</h4>
            <hr></hr>
            <div>
              <QuestionCard
                i={i}
                questionArray={questionArray}
                getAllQuestionByCompliance={getAllQuestionByCompliance}
                id={id}
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <Offcanvas
        style={{ width: "825px" }}
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>{"Add Question"}</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "100%" }}>
          <div className="container">
            <form
              onSubmit={(e) => {
                // if (isedit) {
                //   handleEdit(e, questionId, editQuestionType);
                // } else if (isSubQuesttion) {
                //   handleSubQuestion(e, questionId, editQuestionType);
                // }
                // else if(isSubQuesttion4option){
                //   handleSubQuesttion4option(e, questionId, editQuestionType, index);
                // }
                // else {
                handleSubmit(e, editQuestionType);
                // }
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
          {isLoading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
              }}
              className="loader-overlay"
            >
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AdminComplianceQuestion;
