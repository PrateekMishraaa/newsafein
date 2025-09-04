import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { Popup } from "utils/Popup";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { IconButton } from "@mui/joy";
import { ClassSharp, Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

export function CertificateForm({ id }) {
  let [certificateData, setCertificateData] = useState();
  let [CourseCertificates, setCourseCertificates] = useState([]);
  let [openeditForm, setOpenEditForm] = useState(false);
  let [certificate, setCertificate] = useState();
  const [states, setStates] = useState([]);
  const [courses, setCourses] = useState([]);
  let [update, setUpdate] = useState(0);
  const [showModal, setShowModal] = useState({
    add: false,
    edit: false,
  });
  const handleModal = (modal) => {
    if (modal == "add") {
      setShowModal({ ...showModal, add: !showModal.add });
    } else {
      setShowModal({ ...showModal, edit: !showModal.edit });
    }
  };
  let [state, setState] = useState();
  let { adminRoles } = useGlobalContext();

  const getCertificatesById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/certificate/${id}`);
      if (res.status == 200) {
        setCourseCertificates(res?.data?.result);
        setCertificateData(res?.data?.result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Formik = useFormik({
    initialValues: {
      cert_img: "",
      state: "",
      courseId: "",
    },
    onSubmit: async (values, action) => {
      try {
        toast.loading();
        const res = await apiAuth.post(`admin/certificate/${id}`, values);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", res.data.message, undefined, 1500);
          getCertificatesById();
          handleModal("add");
        }
      } catch (err) {
        Popup("error", err?.response?.data?.message);
        handleModal("add");
      }
    },
  });
  const FormikEdit = useFormik({
    initialValues: {
      certificate_url: certificate,
      state: state,
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      Popup("loading");
      try {
        const res = await apiAuth.put(`admin/certificate/${id}`, values);
        if (res.status == 200 || res?.success == 1) {
          Popup("success", res.data.message, undefined, 1500);
          getCertificatesById();
          setOpenEditForm(false);
        }
      } catch (err) {
        Popup("error", err?.response?.data?.message);
      }
    },
  });

  //======Delete certificate  handler======
  // const handleDelete = async () => {
  //   try {
  //     const res = await apiAuth.delete(`admin/certificate/${id}`);
  //     if (res) {
  //       toast.dismiss();
  //       toast.success("Deleted Successfully");
  //       getCertificatesById();
  //     }
  //   } catch (error) {
  //     console.log(error, "Certificate Delete====>");
  //   }
  // };

  const handleDeleteInsCert = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this certificate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiAuth.delete(`admin/certificate/${id}`);
          if (res) {
            toast.dismiss();
            toast.success("Deleted Successfully");
            getCertificatesById();
          }
        } catch (error) {
          console.log(error, "Certificate Delete====>");
        }
      }
    });
  };

  // Fetch States and Courses
  const fetchStatesCourses = async () => {
    const states = await apiAuth.get("/v2/public/state");
    if (states.status === 200) {
      setStates(states?.data?.states);
    }
    const courses = await apiJsonAuth.get("/course");
    if (courses?.status === 200) {
      setCourses(courses?.data.courses);
    }
  };
  // console.log({ states: states, courses: courses });

  useEffect(() => {
    getCertificatesById();
    fetchStatesCourses();
  }, [openeditForm]);

  return (
    <div>
      <div className="certificate">
        <div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4>Certificate Table</h4>
            <button className="btn" onClick={() => handleModal("add")}>
              Add Certificate
            </button>
          </div>
          {/* <img className="col-12" src={certificateData?.certificate_url} height="300px"></img> */}
          <div className="table-responsive border rounded-3">
            <table class="table table-striped ">
              <thead>
                <th>certificate Image</th>
                <th>State</th>
                <th>Course</th>
                <th>InstituteId</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {CourseCertificates?.map((courseCert, CertIndex) => (
                  <tr>
                    <td>
                      <img
                        src={courseCert?.certificate_url}
                        alt=""
                        width={150}
                        height={80}
                        className="border bg-white"
                        style={{ objectFit: "contain" }}
                      />
                    </td>
                    <td>{courseCert?.state}</td>
                    <td>{courseCert?.courseId}</td>
                    <td>{courseCert?.instituteId}</td>
                    <td>{courseCert?.createdAt}</td>
                    <td>{courseCert?.updatedAt}</td>
                    <td>
                      {/* <IconButton color="success" onClick={() => handleModal("edit")}>
                        <Edit />
                      </IconButton> */}
                      <IconButton
                        className="ms-2"
                        onClick={() => handleDeleteInsCert()}
                      >
                        <Delete />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add Certificate Modal */}
        <Modal show={showModal.add} onHide={() => handleModal("add")}>
          <Modal.Header closeButton>
            <Modal.Title>Add Certificate Template</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={Formik.handleSubmit}>
              <div className="mb-2">
                <label htmlFor="certificate" className="form-label text-dark">
                  Certificate Image
                </label>
                <input
                  type="file"
                  name="cert_img"
                  className="form-control"
                  id="cert_img"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Formik.setFieldValue("cert_img", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="State" className="form-label text-dark">
                  State
                </label>
                <select
                  type="text"
                  name="state"
                  className="form-select"
                  id="state"
                  value={Formik.values.state}
                  onChange={Formik.handleChange}
                >
                  <option value="">Select State</option>
                  {states.map((state, stateIndex) => (
                    <option key={stateIndex} value={state?.State}>
                      {state?.State}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="courseId" className="form-label text-dark">
                  Course
                </label>
                <select
                  type="text"
                  name="courseId"
                  className="form-select"
                  id="courseId"
                  value={Formik.values.courseId}
                  onChange={Formik.handleChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course, courseIndex) => (
                    <option key={courseIndex} value={course?.id}>
                      {course?.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn me-2"
                onClick={() => handleModal("add")}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/* Edit Certificate Modal */}
        <Modal show={showModal.edit} onHide={() => handleModal("edit")}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Certificate Template</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={FormikEdit.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="certificate" className="form-label">
                  Certificate
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="certificate_url"
                  className="form-control"
                  id="certificate"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      FormikEdit.setFieldValue(
                        "certificate_url",
                        e.target.files[0]
                      );
                    }
                  }}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="State" className="form-label text-dark">
                  State
                </label>
                <select
                  type="text"
                  name="state"
                  className="form-select"
                  id="state"
                  value={FormikEdit.values.state}
                  onChange={FormikEdit.handleChange}
                >
                  <option value="">Select State</option>
                  {states.map((state, stateIndex) => (
                    <option key={stateIndex} value={state?.State}>
                      {state?.State}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="courseId" className="form-label text-dark">
                  Course
                </label>
                <select
                  type="text"
                  name="courseId"
                  className="form-select"
                  id="courseId"
                  value={FormikEdit.values.courseId}
                  onChange={FormikEdit.handleChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course, courseIndex) => (
                    <option key={courseIndex} value={course?.id}>
                      {course?.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn me-2"
                onClick={() => handleModal()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
