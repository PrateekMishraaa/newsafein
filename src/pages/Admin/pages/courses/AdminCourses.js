import {
  AddCircleOutline,
  EditAttributesOutlined,
  LocationCity,
  ModeEditOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { pop2 } from "utils/Popup";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import AdminCoursesSection from "./AdminCoursesSection";
import QuizControl from "../QuizControl";
import { Modal } from "react-bootstrap";

function AdminCourses() {
  let [status, setStatus] = useState("active");
  let [courses, setCourses] = useState([]);
  let [update, setUpdate] = useState(0);
  let [sectionsRoute, setSectionRoute] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const navigate = useNavigate();
  const getCourses = async () => {
    try {
      const res = await apiAuth.get("admin/course");
      if (res.status === 200) {
        setCourses(res?.data?.result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const Formik = useFormik({
    initialValues: {
      course_name: "",
      slug: "",
      desc: "",
      status: "",
      thumbnail: "",
      author: "",
      course_duration: "",
      course_level: "",
      role: "",
      category: "",
      video: "",
    },
    onSubmit: async (values, action) => {
      toast.loading("loading...");
      const data = {
        ...values,
        status: status,
        slug: slugify(Formik.values.course_name).toLowerCase(),
      };
      try {
        console.log("data", data);
        const res = await apiAuth.post("admin/course", data);
        if (res.status === 200) {
          console.log("Done Form Filled");
          console.log(res.data);
          // navigate('sections?id='+ res?.data?.result?.id)
          toast.dismiss();
          toast.success("Course Added Successfully");
          setSectionRoute(res?.data?.result?.id);
          navigate(`sections/${res?.data?.result?.id}`);
        }
      } catch (err) {
        console.log(err);
        pop2.warning("Error" + " " + err);
      }
    },
  });
  useEffect(() => {
    getCourses();
  }, [update]);




  // const handleDeleteClick = (videoId) => {
  //   setVideoToDelete(videoId);
  //   setShowDeleteConfirm(true);  // Show confirmation modal or dialog
  // };



  // const confirmDelete = async () => {
  //   if (videoToDelete) {
  //     try {
  //       // Make the delete API call
  //       const res = await apiAuth.delete(`admin/course/${videoToDelete}`);

  //       if (res.status === 200) {
  //         pop2.success("Video deleted successfully!");

  //         // Remove the deleted video from the list by filtering the sections array
  //         setCourses((prevSections) =>
  //           prevSections.filter((section) => section.id !== videoToDelete)
  //         );

  //         // Optionally, clear the videoToDelete state
  //         setVideoToDelete(null);
  //       }
  //     } catch (err) {
  //       pop2.warning("Error deleting video: " + err.message);
  //     } finally {
  //       setShowDeleteConfirm(false);  // Close the confirmation modal
  //     }
  //   }
  // };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="fs-3">Courses</h3>
        <Button
          type="button"
          variant="outlined"
          color="warning"
          className="text-capitalize rounded"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add&nbsp;New&nbsp;Course
        </Button>
      </div>
      {/* Table For Showing Courses  */}
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light ">
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Thumbnail
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Course&nbsp;Name
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Level
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Course&nbsp;For
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Category
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Author
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Status
              </th>
              <th
                scope="col"
                className="fw-semibold text-capitalize p-3"
                style={{ width: 100 }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((data) => {
              return (
                <>
                  <tr className="border-bottom">
                    <td className="p-2" width={50}>
                      <Avatar
                        alt={data.course_name}
                        src={data?.thumbnail}
                        className="rounded-0 w-100"
                        sx={{
                          height: 66,
                          backgroundColor: "orange",
                          objectFit: "contain",
                        }}
                      ></Avatar>
                    </td>
                    <td className="p-3">{data?.course_name}</td>
                    <td className="p-3">{data?.level}</td>
                    <td className="p-3">{data?.role}</td>
                    <td className="p-3">{data?.category}</td>
                    <td className="p-3">{data?.author}</td>
                    <td className="p-3" style={{ width: 150 }}>
                      <span
                        className={`${data.status == "active" ? "bg-success" : "bg-danger"
                          } p-1 px-3 rounded-pill text-white`}
                      >
                        {data?.status ? data.status : "incative"}
                      </span>
                    </td>
                    <td className="">
                      <Tooltip title="Edit Course">
                        <Link to={`sections/${data?.id}`}>
                          <Button
                            fullwidth
                            variant="outlined"
                            color="success"
                            size="small"
                            className="fs-6 rounded w-100"
                          >
                            <ModeEditOutline className="fs-5 text-success" />
                            &nbsp;Edit
                          </Button>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete The Course">
                        {/*<Button
                          className="mt-1"
                       fullWidth
                         variant="outlined"
                          color="error"
                         size="small"
                         startIcon={<DeleteIcon />}
                         onClick={() => handleDeleteClick(courses.id)}
                        >
                        Delete
                       </Button> */}

                      </Tooltip>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        {/*<Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
          <Modal.Header closeButton >
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
        </Modal>*/}
      </div>
      <QuizControl />
      {/* Add Courses Modal  */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Add Course
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={Formik.handleSubmit} autoComplete="off">
                <div className="row row-cols-2 g-3">
                  <div className="col">
                    <TextField
                      fullWidth
                      required
                      id="course_name"
                      name="course_name"
                      label="Course Name"
                      type="text"
                      value={Formik.values.course_name}
                      onChange={Formik.handleChange}
                    // defaultValue="Hello World"
                    />
                  </div>
                  <div className="col">
                    <TextField
                      fullWidth
                      disabled
                      id="slug"
                      name="slug"
                      label="Slug"
                      type="text"
                      value={slugify(Formik.values.course_name).toLowerCase()}
                      helperText={
                        <>
                          <span className="text-danger">Note*</span> Slug is
                          auto generated and not editable
                        </>
                      }
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      id="desc"
                      label="Description"
                      type="text"
                      name="desc"
                      value={Formik.values.desc}
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      id="thumbnail"
                      label="Thumbnail"
                      type="file"
                      name="thumbnail"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        if (e.target.files.length) {
                          Formik.setFieldValue("thumbnail", e.target.files[0]);
                        }
                      }}
                    />
                    {Formik?.values.thumbnail && (
                      <img
                        src={
                          Formik?.values.thumbnail
                            ? URL.createObjectURL(Formik?.values.thumbnail)
                            : ""
                        }
                        alt=""
                        className="w-100 mt-2"
                        style={{ height: 200 }}
                      />
                    )}
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      id="video"
                      label="Preview Youtube Video Code"
                      type="text"
                      name="video"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      id="author"
                      name="author"
                      fullWidth
                      label="Author Name"
                      value={Formik.values.author}
                      type="text"
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      id="course_duration"
                      name="course_duration"
                      fullWidth
                      label="Course Duration (in format 1hr 2min 10sec)"
                      value={Formik?.values?.course_duration}
                      type="text"
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col">
                    <span className="text-dark">Course Level</span>
                    <select
                      value={Formik.values.course_level}
                      onChange={Formik.handleChange}
                      name="course_level"
                      id="course_level"
                      className="form-select py-2"
                    >
                      <option value="beginners">Beginners</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="col">
                    <span className="text-dark">This Course is for</span>
                    <select
                      onChange={Formik.handleChange}
                      value={Formik.values.role}
                      name="role"
                      id="role"
                      className="form-select py-2"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                  <div className="col">
                    <span className="text-dark">Course Category</span>
                    <select
                      onChange={Formik.handleChange}
                      value={Formik.values.category}
                      name="category"
                      id="category"
                      className="form-select py-2"
                    >
                      <option value="data science">Data Science</option>
                      <option value="web development">Web Development</option>
                      <option value="sexual abuse">Sexual Abuse</option>
                      <option value="child harrasment">Child Harrasment</option>
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
                            setStatus(
                              status === "active" ? "inactive" : "active"
                            );
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
                  <div className="col-12">
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={Formik?.resetForm}
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
                        data-bs-dismiss="modal"
                        className="py-2 px-4 rounded"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCourses;
