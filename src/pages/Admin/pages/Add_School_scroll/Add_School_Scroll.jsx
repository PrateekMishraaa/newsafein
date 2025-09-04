import React from "react";
import { DeleteForever, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { apiJsonAuth, apiAuth } from "api";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";

const adminFormValidation = new Yup.object().shape({
  name: Yup.string().max(500).required("Name is Required"),
  // degination: Yup.string().max(500).required("degination is Required"),
  profile: Yup.string(),
});

export const Add_School_Scroll = () => {
  let [teamMember, setAdminmember] = useState([]);
  const [image, setImage] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [conditionCheck, setconditionCheck] = useState("");
  const [editId, seteditId] = useState(null);


  const formik = useFormik({
    initialValues: {
      name: "",
      // degination: "",
      profile: "",
    },
    validationSchema: adminFormValidation,
    onSubmit: async (values, {resetForm}) => {
      const data = { ...values, profile: image};
      if(conditionCheck === "Add"){
        try {
          const res = await apiJsonAuth.post("admin/addSchool", data);
          getAllMember();
          setImage("");
          if (res.status === 200) {
            toast.dismiss()
            toast.success("Registered Successfully");
            resetForm();
          }
        } catch (err) {
          console.log(err);
          toast.error("Something Went Wrong");
        }
      }
      else if(conditionCheck === "Edit"){
        try {
          const res = await apiJsonAuth.patch(`admin/UpdateSchool/${editId}`, data);
          if (res.status === 200) {
            toast.dismiss()
            toast.success("Edit Successfully");
            getAllMember();
          setImage("");

          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        }
      }
      resetForm()
    },
  });

  const fileHandler = (event) => {
    apiAuth
      .post("/admin/temp", { img: event.target.files[0] })
      .then((res) => {
        setImage(res.data?.file?.Location);
      })
      .catch((error) => console.log(error));
  };


  async function getAllMember() {
    try {
      const result = await apiJsonAuth.get("admin/getAllSchool");
      if (result.status === 200) {
        setAdminmember(result?.data?.getAllNewSchool);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMember() {
    try {
      const res = await apiJsonAuth.delete(`admin/deleteSchool/${editActive}`);
      if (res.status === 200) {
        toast.success("Deleted Successfully");
        getAllMember();
        handleDeleteHide();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllMember();
  }, []);

  const handleShowDelete = (id) => {
    setEditActive(id);
    setShowModal(true);
  };
  const handleDeleteHide = () => {
    setShowModal(false);
  };

  const handleAddModal = () => {
    setconditionCheck("Add") 
    setShowAddModal(true);
  };
  const handleCloseAddModal = () => {
    formik.setErrors({});
    formik.handleReset();
    setShowAddModal(false) 
  };

  const selectedSchool = (editSchool)=>{
    console.log(editSchool);
    formik.setValues({
      name : editSchool?.name,
    })
    setImage(editSchool?.profile || '')
  }


  const handleEditClick = (id) => {
    setconditionCheck("Edit");
    seteditId(id) 
    const filterSchool = teamMember?.find((ele) => ele?.id === id);
    selectedSchool(filterSchool)
    setShowEditModal(true)
  };
  const handleEditClose = () => {
    formik.setErrors({});
    formik.handleReset();
    setShowEditModal(false)
  };

  return (
    <div>
      <div className='container'>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4>Add Schools</h4>
          <button className="btn btn-primary" onClick={handleAddModal} sx={{ p: 2 }}y>
            Add Schools
          </button>
        </div>

        <div className="table-responsive rounded border">
          <table class="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {teamMember?.map((data, i) => {
                return (
                  <>
                    <tr className="border-bottom">
                      <td scope="row">{i + 1}</td>
                      <td>
                        <div style={{ height: "100px", display: "flex", alignItems: "center"}}>
                          <img className="h-75" width="75" style={{objectFit: "cover" }} src={data?.profile} alt="" />
                        </div>
                      </td>
                      <td>{data?.name}</td>
                      {/* <td>{data?.degination}</td> */}
                      <td>
                      <IconButton color="warning" onClick={() => {
                            handleEditClick(data?.id)
                          }}>
                          <Edit/>
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleShowDelete(data?.id);
                          }}>
                          <DeleteForever />
                        </IconButton>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
          
          {
            conditionCheck === "Add" ? (
            <Modal show={showAddModal} onHide={handleCloseAddModal} aria-labelledby="contained-modal-title-vcenter"
            centered
      >
              <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <div class="">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row g-3">
                          <div className="col-12 col-lg-6">
                            <input id="outlined-required" placeholder="Full Name" type="text" onChange={formik.handleChange} name="name" className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} required />
                            <span className="text-danger">{formik.touched.name && formik.errors.name}</span>
                          </div>
                          {/* <div className="col-12 col-lg-6">
                            <input required id="degination" onChange={formik.handleChange} type="text" placeholder="Designation" name="degination" className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} />
                            <span className="text-danger">{formik.touched.degination && formik.errors?.degination}</span>
                          </div> */}
                          <div className="col-12 col-lg-6">
                            <input type="file" accept=".png, .jpg, .jpeg" class="form-control" name="profile" value={formik.values.profile} id="img" onChange={fileHandler} />
                          </div>
                          <div class="modal-footer">
                        <button className="btn btn-danger" fullWidth type="submit">
                          Submit
                        </button>
                    </div>
                        </div>
                      </form>
                    </div>
              </Modal.Body>
            </Modal>
            ) : conditionCheck === "Edit" && (
              <Modal show={showEditModal} onHide={handleEditClose} aria-labelledby="contained-modal-title-vcenter"
              centered
        >
              <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <div class="">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row g-3">
                          <div className="col-12 col-lg-6">
                            <input id="outlined-required" placeholder="Full Name" type="text" onChange={formik.handleChange} name="name" value={formik.values.name} className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} required />
                            <span className="text-danger">{formik.touched.name && formik.errors.name}</span>
                          </div>
                          {/* <div className="col-12 col-lg-6">
                            <input required id="degination" onChange={formik.handleChange} type="text" placeholder="Designation" name="degination" className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} />
                            <span className="text-danger">{formik.touched.degination && formik.errors?.degination}</span>
                          </div> */}
                          <div className="col-12 col-lg-6">
                            <input type="file" accept=".png, .jpg, .jpeg" class="form-control" name="profile" value={formik.values.profile} id="img" onChange={fileHandler} />
                          </div>
                          <div class="modal-footer">
                        <button className="btn btn-danger" fullWidth type="submit">
                          Edit
                        </button>
                    </div>
                        </div>
                      </form>
                    </div>
              </Modal.Body>
            </Modal>
            )
          }

      <Modal show={showModal} onHide={handleDeleteHide}>
        <Modal.Header closeB>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <button className="btn btn-primary me-2" onClick={deleteMember}>Yes</button>
            <button className="btn btn-outline-warning">No</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
