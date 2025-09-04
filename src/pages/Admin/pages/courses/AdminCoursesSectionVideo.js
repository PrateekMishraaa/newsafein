import {
  ArrowBack,
  DeleteForever,
  Edit,

} from "@mui/icons-material";
import {
  Button,
  Switch,
  TextField,

} from "@mui/material";

import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { pop2 } from "utils/Popup";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminCoursesSectionVideo() {
  let [status, setStatus] = useState("active");
  let [videos, setVideos] = useState([]);
  const [showContentAdd, setShowContentAdd] = useState(false);
  const [showQuizAdd, setShowQuizAdd] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // To hold the video to edit
  const [open, setOpen] = useState(false); // Modal open state
  const [newLink, setNewLink] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);


  const [currentVideo, setCurrentVideo] = useState(null);
  let [update, setUpdate] = useState(0);
  let location = useLocation();
  let navigate = useNavigate();
  const { token } = useGlobalContext();
  //   console.log(location.pathname.split("/"));
  let pathArr = location.pathname.split("/");
  //   console.log(pathArr[pathArr.length - 1]);
  let id = pathArr[pathArr.length - 1];
  const Formik = useFormik({
    initialValues: {
      title: "",
      courseId: id,
      path: "",
      type: "1",
      status: "",
      order: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      toast.loading("loading");
      const data = { ...values, status, sectionId: id };
      try {
        const res = await apiJsonAuth.post("admin/course/section/video", data);
        if (res.status === 200) {
          toast.dismiss();
          toast("Video Added Successfully");
          setVideos((prev) => [...prev, res.data.result]);
          action.resetForm(); // Reset the form fields
          setShowContentAdd(false); // Close the modal after successful submission
        }
      } catch (err) {
        pop2.warning("Error: " + err.message);
      }
    },
  });


  const getCoursesVideos = async () => {
    try {
      const res = await apiAuth.get(`admin/course/section/video?id=${id}`);
      if (res.status === 200) {
        setVideos(res.data.result);
      }
    } catch (err) {
      pop2.warning("Error: " + err.message);
    }
  };

  useEffect(() => {
    getCoursesVideos();
  }, [id]);


  const handleEditClick = async (video) => {
    console.log("Editing video ID:", video.id); // Log the ID being used for fetching

    try {
      const res = await apiAuth.get(`admin/course/section/video/by/${video.id}`);

      if (res.status === 200) {
        const fetchedVideo = res.data.result; // Assuming the API sends the video details here.
        setCurrentVideo(fetchedVideo);  // Set the video data in state
        setStatus(fetchedVideo.status || "active");  // Set the status of the video
        setEditContent(true);  // Show the edit modal
      }
    } catch (err) {
      pop2.warning("Error fetching video details: " + err.message);
    }
  };


  const handleSaveClick = async (values) => {
    try {
      const res = await apiAuth.put(`admin/course/section/video/updated/${currentVideo.id}`, {
        ...values,
        status,
      });

      if (res.status === 200) {
        pop2.success("Video updated successfully!");

        // Update the video list with the newly updated video data
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === currentVideo.id ? { ...video, ...values, status } : video
          )
        );

        setEditContent(false);  // Close the modal
      }
    } catch (err) {
      pop2.warning("Error updating video: " + err.message);
    }
  };



  const handleDeleteClick = (videoId) => {

    setVideoToDelete(videoId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {

    if (videoToDelete) {

      try {
        const res = await apiAuth.delete(`admin/delete/course/section/video/${videoToDelete}`);
        if (res.status === 200) {
          pop2.success("Video deleted successfully!");
          setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoToDelete));
        }
      } catch (err) {
        pop2.warning("Error deleting video: " + err.message);
      }
      setShowDeleteConfirm(false);
      setVideoToDelete(null);
    }
  };








  const quizFormik = useFormik({
    initialValues: {
      title: "",
      quiz_duration: "",
      level: "Easy",
      passing_criteria: "",
      sectionId: id,
      desc: "",
      order: "",
      type: "3",
      status: "active",
    },
    onSubmit: async (value, action) => {
      toast.loading("Creating Quiz.");
      apiJsonAuth
        .post("/course/quiz/create", value, {
          headers: {
            Authorization: token,
          },
        })
        .then(async (res) => {
          toast.dismiss();
          if (res.data.status === 200) {
            value.path = res.data?.result?.id;
            await apiJsonAuth
              .post("admin/course/section/video", value)
              .catch((err) => {
                console.log(err);
                toast.warning("Something Went Wrong!");
              });
            action.resetForm();
            setUpdate(update + 1);
            toast.success("Quiz is Created!");
            setShowQuizAdd(false)
          } else {
            console.log(res);
            toast.warning("Something Went Wrong!");
          }
        })
        .catch((err) => {
          toast.dismiss();
          console.error(err);
        });
    },
  });

  // const getCoursesVideos = async () => {
  //   try {
  //     const res = await apiAuth.get("admin/course/section/video?id=" + id);
  //     if (res.status === 200) {
  //       // console.log("Data Fetched")
  //       setVideos(res?.data?.result);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     pop2.warning("Error" + " " + err);
  //   }
  // };
  // useEffect(() => {
  //   getCoursesVideos();
  // }, [update]);
  //   console.log(videos);
  const contentTypeProvider = (type) => {
    switch (type) {
      case 1:
        return "vedio";
      case 2:
        return "pdf";
      case 3:
        return "quiz";
      default:
        return "invalid";
    }
  };
  return (
    <>
      <div className="container">
        <Button onClick={() => window.history.back()} startIcon={<ArrowBack />}>
          Go Back
        </Button>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4>Section Content</h4>
              <Button onClick={() => setShowQuizAdd(true)} variant="outlined" color="primary">
                Add New Quiz
              </Button>
              <Button onClick={() => setShowContentAdd(true)} variant="outlined" color="primary">
                Add New Content
              </Button>
            </div>
            <div className="table-responsive border rounded mt-3">
              <table className="designed-table table table-borderless align-middle mb-0">
                <thead>
                  <tr className="bg-light">
                    <th className="fw-semibold p-3">Title</th>
                    <th className="fw-semibold p-3">Url</th>
                    <th className="fw-semibold p-3">Type</th>
                    <th className="fw-semibold p-3">Order</th>
                    <th className="fw-semibold p-3">Status</th>
                    <th className="fw-semibold p-3" style={{ width: 100 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((content) => (
                    <tr className="border-bottom" key={content.id}>
                      <td className="p-2">{content.title}</td>
                      <td className="p-3 line-clamp">
                        {content.type === 3 ? <Link to={content.path}>Go to Quiz</Link> : content.path}
                      </td>
                      <td className="p-3">{contentTypeProvider(content.type)}</td>
                      <td className="p-3">{content.order}</td>
                      <td className="p-3">
                        <span className={`${content.status === 'active' ? 'bg-success' : 'bg-danger'} p-1 px-3 rounded-pill text-white`}>
                          {content.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="success"
                          size="small"
                          startIcon={<Edit />}
                          onClick={() => handleEditClick(content)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mt-1"
                          fullWidth
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteForever />}
                          onClick={() => handleDeleteClick(content.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Delete Confirmation Modal */}
              <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure you want to delete this video?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outlined" color="error" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="success" onClick={confirmDelete}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Edit Modal */}
              <Modal show={editContent} onHide={() => setEditContent(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Course Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const values = {
                        title: e.target.title.value,
                        path: e.target.path.value,
                        order: e.target.order.value,
                        type: e.target.type.value,
                      };
                      handleSaveClick(values);
                    }}
                    autoComplete="off"
                  >
                    <div className="row row-cols-2 g-2">
                      <div className="col-12">
                        <TextField
                          fullWidth
                          id="title"
                          label="Title"
                          type="text"
                          name="title"
                          defaultValue={currentVideo?.title || ""}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          fullWidth
                          required
                          id="path"
                          name="path"
                          label="Path"
                          type="text"
                          defaultValue={currentVideo?.path || ""}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          id="order"
                          label="Order"
                          type="number"
                          name="order"
                          defaultValue={currentVideo?.order || ""}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="type">Type</label>
                        <select
                          className="form-select py-2"
                          name="type"
                          id="type"
                          defaultValue={currentVideo?.type || "1"}
                        >
                          <option value="1">Video</option>
                          <option value="2">PDF</option>
                          <option value="3">Quiz</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <Switch
                          checked={status === "active"}
                          onChange={() => setStatus(status === "active" ? "inactive" : "active")}
                        />
                        <span>{status === "active" ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <Button type="submit" variant="contained" color="success">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>

            </div>
          </div>
        </div>
      </div>
      <Modal show={showContentAdd} onHide={() => setShowContentAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="">Add Course Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={Formik.handleSubmit} autoComplete="off">
            <div className="row row-cols-2 g-2">
              <div className="col-12">
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  type="text"
                  name="title"
                  value={Formik.values.title}
                  onChange={Formik.handleChange}
                />
              </div>
              <div className="col-12">
                <input
                  disabled
                  id="courseId"
                  name="courseId"
                  type="hidden"
                  value={Formik?.courseId}
                  onChange={Formik.handleChange}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  required
                  id="path"
                  name="path"
                  label="Path"
                  type="text"
                  value={Formik.values.path}
                  onChange={Formik.handleChange}
                />
              </div>
              <div className="col">
                <TextField
                  id="order"
                  fullWidth
                  name="order"
                  label="Order"
                  value={Formik.values.order}
                  type="number"
                  onChange={Formik.handleChange}
                />
              </div>
              <div className="col">
                <span className="text-dark">Content Type</span>
                <select
                  required
                  name="type"
                  id="type"
                  value={Formik.values.type}
                  onChange={Formik.handleChange}
                  className="form-select py-2"
                >
                  <option value="1">
                    Youutube Vedio Link</option>
                  <option value="2">Pdf Link</option>
                </select>
              </div>
              <div className="col">
                <div class="form-check form-switch p-0 ms-2">
                  <label
                    class="form-check-label fs-6 text-dark"
                    htmlfor="status"
                  >
                    Course Status
                  </label>
                  <div className="d-flex align-items-center justify-content-start">
                    <Switch
                      color="success"
                      id="status"
                      className="text-start "
                      onClick={() => {
                        setStatus(status === "active" ? "inactive" : "active");
                      }}
                      defaultChecked
                    />
                    <span
                      className={`fs-6 text-center text-capitalize  bg-opacity-25 border rounded-pill px-3
                        ${status === "active"
                          ? "text-success bg-success border-success"
                          : "text-danger bg-danger border-danger"
                        } `}
                    >
                      {" "}
                      {status}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-end mt-3">
                <Button
                  onClick={() => {
                    setShowContentAdd(false);
                    Formik?.resetForm();
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  color="error"
                  variant="outlined"
                  className="py-2 px-4 rounded me-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  className="py-2 px-4 rounded"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Create Quiz Model */}
      <Modal show={showQuizAdd} onHide={() => setShowQuizAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="">Add Course Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={quizFormik.handleSubmit} autoComplete="off">
            <div className="container">
              <TextField
                className="my-2"
                required
                size="small"
                label="Title"
                name="title"
                fullWidth
                value={quizFormik.values.title}
                onChange={quizFormik.handleChange}
              />
              <TextField
                className="my-2"
                maxRows={3}
                multiline
                size="small"
                label="Descriptions"
                name="desc"
                fullWidth
                value={quizFormik.values.desc}
                onChange={quizFormik.handleChange}
              />
              <TextField
                type="number"
                className="my-2 px-1 w-50"
                size="small"
                label="Duration (Min)"
                required
                name="quiz_duration"
                value={quizFormik.values.quiz_duration}
                onChange={quizFormik.handleChange}
              />
              <TextField
                type="number"
                className="my-2 px-1 w-50"
                size="small"
                label="Passing Criteria (%)"
                required
                name="passing_criteria"
                value={quizFormik.values.passing_criteria}
                onChange={quizFormik.handleChange}
              />
              <TextField
                type="number"
                className="my-2 px-1 w-50"
                size="small"
                label="Order"
                required
                name="order"
                value={quizFormik.values.order}
                onChange={quizFormik.handleChange}
              />
              <select
                name="level"
                className="text-dark px-1 w-25 p-2 my-2 border-1 rounded-2 border-secondary"
                value={quizFormik.values.level}
                onChange={quizFormik.handleChange}
                defaultValue=""
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <div className="w-25 px-2 d-inline-block py-1">
                <input
                  type="checkbox"
                  class="btn-check p-0 m-0"
                  id="btn-check-outlined"
                  autocomplete="off"
                  name="status"
                  checked={quizFormik.values.status === "active"}
                  onChange={() => {
                    quizFormik.setFieldValue(
                      "status",
                      quizFormik.values.status === "active"
                        ? "inactive"
                        : "active"
                    );
                  }}
                />
                <label
                  class="btn px-3 py-1 m-1 btn-outline-success"
                  for="btn-check-outlined"
                >
                  Active
                </label>
              </div>
              <Button
                type="submit"
                className="px-4 w-25 mx-2 p-2"
                variant="outlined"
              >
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminCoursesSectionVideo;
