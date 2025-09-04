import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiAuth, apiJsonAuth } from "api";
import DeleteIcon from "@mui/icons-material/Delete";
import { pop2 } from "utils/Popup";
import { toast } from "react-toastify";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import {
  Avatar,
  Button,
  Switch,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import slugify from "slugify";
import useError from "hooks/useError";
import MyCKEditor from "utils/CKEditor";

function AdminCoursesSection() {
  let [sections, setSections] = useState([]);
  let [courseBreif, setCourseBreif] = useState("");
  let [courseContent, setcourseContent] = useState("");
  const [courseOverview, setCourseOverview] = useState("");
  const [courseWhatYouWillLearn, setCourseWhatYouWillLearn] = useState("");
  const [courseWhoIsItFor, setCourseWhoIsItFor] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  let [update, setUpdate] = useState(0);
  let [videos, setVideos] = useState([]);

  let [courseDetails, setCourseDetails] = useState([]);
  const [desc, setDesc] = useState("");

  let id = useParams()?.id;
  let navigate = useNavigate();
  const { ErrorResponder } = useError();
  const getAdminCoursesSections = async () => {
    try {
      const res = await apiAuth.get("admin/course/section?id=" + id);
      if (res.status === 200) {
        setSections(res?.data?.result);
      }
    } catch (err) { }
  };
  const getAdminCoursesById = async () => {
    try {
      const res = await apiAuth.get("admin/courseId?id=" + id);
      if (res.status === 200) {
        console.log(res?.data?.result);
        setCourseDetails(res?.data?.result);
        setCourseBreif(res?.data?.result?.brief);
        setcourseContent(res?.data?.result?.content);
        setCourseOverview(res?.data?.result?.overview);
        setCourseWhatYouWillLearn(res?.data?.result?.whatYouWillLearn);
        setCourseWhoIsItFor(res?.data?.result?.whoIsItFor);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const Formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "active",
      courseId: "",
      order: "",
    },
    onSubmit: async (values, action) => {
      toast.loading("loading...");
      const data = { ...values, courseId: id, desc };
      try {
        console.log(data);
        const res = await apiJsonAuth.post("admin/course/section", data);
        if (res.status === 200) {
          console.log("Done Form Filled");
          console.log(res?.data?.result?.id);
          // action.resetForm();
          // dashboard/courses/sections/videos
          toast.dismiss();
          toast("Section Added Successfully");
          navigate(`videos/${res?.data?.result?.id}`);
        }
      } catch (err) {
        console.log(err);
        pop2("Error" + " " + err);
      }
    },
  });

  useEffect(() => {
    setDesc(courseDetails?.desc);
  }, [courseDetails]);
  const Editformik = useFormik({
    initialValues: {
      course_name: courseDetails?.course_name,
      slug: courseDetails?.slug,
      // desc: courseDetails?.desc,
      status: courseDetails?.status,
      thumbnail: courseDetails?.thumbnail,
      author: courseDetails?.author,
      duration: courseDetails?.duration,
      level: courseDetails?.level,
      role: courseDetails?.role,
      category: courseDetails?.category,
      video: courseDetails?.video,
    },
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      toast.loading("loading...");
      const data = {
        ...values,
        desc,
        brief: courseBreif,
        content: courseContent,
        overview: courseOverview,
        whatYouWillLearn: courseWhatYouWillLearn,
        whoIsItFor: courseWhoIsItFor,
        slug: slugify(Editformik.values.course_name).toLowerCase(),
        id: id,
      };
      try {
        console.log("data", data);
        const res = await apiAuth.put("admin/course", data);
        if (res.status === 200) {
          toast.dismiss();
          toast.success("Course Updated Successfully");
          setUpdate(update + 1);
        }
      } catch (err) {
        ErrorResponder(err);
      }
    },
  });
  const certificateFormik = useFormik({
    initialValues: {
      certificate: "",
    },
    onSubmit: async (values, actions) => {
      let data = { ...values, id: id };
      try {
        console.log("certificate", data);
        const res = await apiAuth.put("admin/course/certificate", data);
        if (res.status === 200) {
          toast.success("Uploaded Successfully");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong");
      }
    },
  });
  useEffect(() => {
    getAdminCoursesSections();
    getAdminCoursesById();
  }, []);
  const opts = {
    height: 400,
    width: 700,
    playerVars: {
      autoplay: true,
    },
  };

  const handleDeleteClick = (videoId) => {
    setVideoToDelete(videoId);
    setShowDeleteConfirm(true);  // Show confirmation modal or dialog
  };



  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        // Make the delete API call
        const res = await apiAuth.delete(`admin/delete/course-section/video/${videoToDelete}`);

        if (res.status === 200) {
          pop2.success("Video deleted successfully!");

          // Remove the deleted video from the list by filtering the sections array
          setSections((prevSections) =>
            prevSections.filter((section) => section.id !== videoToDelete)
          );

          // Optionally, clear the videoToDelete state
          setVideoToDelete(null);
        }
      } catch (err) {
        pop2.warning("Error deleting video: " + err.message);
      } finally {
        setShowDeleteConfirm(false);  // Close the confirmation modal
      }
    }
  };


  return (
    <div className="container">
      <Button onClick={() => window.history.back()} startIcon={<ArrowBack />}>
        Go Back
      </Button>
      <div className="shadow-sm p-3 p-lg-4 rounded-4">
        <h3 className=" text-capitalize">Edit Course </h3>
        <form onSubmit={Editformik.handleSubmit}>
          <div className="row g-3 mt-3">
            <div className="col-12 col-lg-6">
              <TextField
                fullWidth
                required
                id="course_name"
                name="course_name"
                label="Course Name"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={Editformik.values.course_name}
                onChange={Editformik.handleChange}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                fullWidth
                disabled
                id="slug"
                name="slug"
                label="Slug"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={slugify(
                  Editformik.values.course_name ?? ""
                ).toLowerCase()}
                onChange={Editformik.handleChange}
                InputProps={{
                  readOnly: true,
                }}
                helperText="Slug is auto generated and not editable"
              />
            </div>
            <div className="col-12">
              <small>Description</small>
              <MyCKEditor
                setContent={setDesc}
                content={desc}
              />
            </div>
            <div className="col-lg-6">
              <div className="d-flex">
                <Avatar
                  className="me-2"
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                  alt="thumbnail"
                  
                  src={Editformik.values.thumbnail}
                />
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
                      Editformik.setFieldValue("thumbnail", e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <TextField
                id="duration"
                name="duration"
                fullWidth
                label="Course Duration (in format 1hr 2min 10sec)"
                value={Editformik?.values?.duration}
                InputLabelProps={{ shrink: true }}
                type="text"
                onChange={Editformik.handleChange}
              />
            </div>
            <div className="col-12 col-lg-6">
              <span className="text-dark">Course Level</span>
              <select
                value={Editformik?.values?.level}
                onChange={Editformik.handleChange}
                name="level"
                id="level"
                className="form-select py-3"
              >
                <option value="">click to select</option>
                <option value="beginners">Beginners</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="col-12 col-lg-6">
              <span className="text-dark">This Course is for</span>
              <input type="text" className="form-control" name="role"
                id="role" onChange={Editformik.handleChange}
                value={Editformik.values.role} />
            </div>
            <div className="col-12 col-lg-6">
              <span className="text-dark">Course Category</span>
              <input
                onChange={Editformik.handleChange}
                value={Editformik.values.category}
                name="category"
                id="category"
                className="form-control py-3 px-2"
              />
            </div>
            <div className="col-12 col-lg-6">
              <span className="text-dark">Course Author</span>
              <TextField
                id="author"
                fullWidth
                name="author"
                value={Editformik.values.author}
                type="text"
                onChange={Editformik.handleChange}
              />
            </div>
            <div className="col-12 position-relative col-lg-6">
              <TextField
                fullWidth
                id="video"
                label="Preview Youtube Video Code"
                type="text"
                name="video"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={Editformik.handleChange}
              />
            </div>
            <div className="col-12 col-lg-6">
              <div class="form-check form-switch p-0">
                <label class="form-check-label fs-6 text-dark" htmlfor="status">
                  Course Status
                </label>
                <div className="d-flex align-items-center justify-content-start">
                  <Switch
                    color="success"
                    id="status"
                    value={Editformik?.values?.status}
                    className="text-start "
                    onClick={() => {
                      Editformik?.setFieldValue(
                        "status",
                        Editformik?.values?.status === "active"
                          ? "inactive"
                          : "active"
                      );
                    }}
                    checked={Editformik?.values?.status === "active"}
                  />
                  <span
                    className={`fs-6 text-center text-capitalize  bg-opacity-25 border rounded-pill px-3
                        ${Editformik?.values?.status === "active"
                        ? "text-success bg-success border-success"
                        : "text-danger bg-danger border-danger"
                      } `}
                  >
                    {" "}
                    {Editformik?.values?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <small>Course Brief</small>
                <MyCKEditor
                  content={courseBreif}
                  setContent={setCourseBreif}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <small>Course Content</small>
                <MyCKEditor
                  content={courseContent}
                  setContent={setcourseContent}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <small>Overview</small>
                <MyCKEditor
                  content={courseOverview}
                  setContent={setCourseOverview}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <small>What You Will Learn</small>
                <MyCKEditor
                  content={courseWhatYouWillLearn}
                  setContent={setCourseWhatYouWillLearn}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <small>Who Is It For</small>
                <MyCKEditor
                  content={courseWhoIsItFor}
                  setContent={setCourseWhoIsItFor}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <Button
                type="submit"
                color="success"
                variant="contained"
                size="large"
                fullWidth
                className="py-3"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="p-3 p-lg-4 shadow-sm rounded-4 mt-4">
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <img class="border w-100" src={courseDetails?.certification_img} />
          </div>
          <div className="col-12 col-lg-6">
            <div className="h-100 p-3">
              <form onSubmit={certificateFormik.handleSubmit}>
                <h3 className="">Upload Certificate</h3>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    id="certificate"
                    label="certificate"
                    type="file"
                    name="certificate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        certificateFormik.setFieldValue(
                          "certificate",
                          e.target.files[0]
                        );
                      }
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    type={"submit"}
                    color="success"
                    size="large"
                    className="rounded mt-3 py-3"
                  >
                    Upload&nbsp;Certificate
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <form onSubmit={certificateFormik.handleSubmit}>
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  EDIT COURSE
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="container shadow p-3 bg-body-tertiary rounded">
                  <p className="text-center fs-1 my-4"> Upload Certificate </p>
                  <div className="d-flex justify-content-center">
                    <TextField
                      className="col-5 my-3"
                      fullWidth
                      id="certificate"
                      label="certificate"
                      type="file"
                      name="certificate"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        if (e.target.files.length) {
                          certificateFormik.setFieldValue(
                            "certificate",
                            e.target.files[0]
                          );
                        }
                      }}
                    />
                    {/* <Button variant='outlined' type='submit' >Upload</Button> */}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-success" type="submit">
                  Upload
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <h4 className="">Course Sections</h4>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          className="rounded"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add&nbsp;New&nbsp;Section
        </Button>
      </div>
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light">
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Section&nbsp;Title
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Description
              </th>
              {/* <th scope="col" className='fw-semibold text-capitalize p-3'>Type</th> */}
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Order
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Status
              </th>
              <th
                scope="col"
                className="fw-semibold text-capitalize p-3"
                style={{ width: 100 }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sections?.map((section) => (
              <tr className="border-bottom" key={section.id}>
                <td className="p-2" width={50}>
                  {section?.title}
                </td>
                <td className="p-3 line-clamp">{section?.description}</td>
                <td className="p-3">{section?.order}</td>
                <td className="p-3" style={{ width: 150 }}>
                  <span
                    className={`${section.status === "active" ? "bg-success" : "bg-danger"} p-1 px-3 rounded-pill text-white`}
                  >
                    {section?.status || "inactive"}
                  </span>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      navigate(`videos/${section?.id}`);
                    }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    size="small"
                    startIcon={<AssistantDirectionIcon />}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mt-1"
                    fullWidth
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(section.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

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
      </div>
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
                Add Section
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
                      id="title"
                      name="title"
                      label="Section Title"
                      type="text"
                      value={Formik.values.title}
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      fullWidth
                      disabled
                      id="courseId"
                      name="courseId"
                      label="CourseId"
                      type="number"
                      value={id}
                      helperText="CourseId is auto generated and not editable"
                      onChange={Formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      id="description"
                      label="Description"
                      type="text"
                      name="description"
                      value={Formik.values.description}
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
                          className="text-start"
                          onClick={() => {
                            Formik.setFieldValue(
                              "status",
                              Formik.values.status === "active"
                                ? "inactive"
                                : "active"
                            );
                          }}
                          checked={Formik.values.status === "active"}
                        />
                        <span
                          className={`fs-6 text-center text-capitalize bg-opacity-25 border rounded-pill px-3
                        ${Formik.values.status === "active"
                              ? "text-success bg-success border-success"
                              : "text-danger bg-danger border-danger"
                            } `}
                        >
                          {" "}
                          {Formik?.values?.status}{" "}
                        </span>
                      </div>
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
                      data-bs-dismiss="modal"
                      variant="contained"
                      className="py-2 px-4 rounded"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoursesSection;
