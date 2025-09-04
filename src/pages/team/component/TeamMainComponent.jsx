import React from "react";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { apiJsonAuth, apiAuth } from "api";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";

const adminFormValidation = new Yup.object().shape({
  name: Yup.string().max(500).required("Name is Required"),
  degination: Yup.string().max(500).required("degination is Required"),
  profile: Yup.string(),
});

export const TeamMainComponent = () => {
  let [teamMember, setAdminmember] = useState([]);
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editActive, setEditActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      degination: "",
      profile: "",
    },
    validationSchema: adminFormValidation,
    onSubmit: async (values, action) => {
      const data = { ...values, profile: image};
      console.log(data);
      try {
        const res = await apiJsonAuth.post("admin/addNewMember", data);
        getAllMember();
        handleHide();
        setImage("");
        if (res.status === 200) {
          toast.success("Registered Successfully");
          action.resetForm();
        }
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong");
      }
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
      const result = await apiJsonAuth.get("admin/getAllMember");
      if (result.status === 200) {
        setAdminmember(result?.data?.getAllNewMember);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMember() {
    try {
      const res = await apiJsonAuth.delete(`admin/deleteMember/${editActive}`);
      if (res.status === 200) {
        toast.success("Deleted Successfully");
        getAllMember();
        handleHide();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllMember();
  }, []);

  const handleShow = (id) => {
    setEditActive(id);
    setShowModal(true);
  };
  const handleHide = () => {
    setShowModal(false);
  };
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4>Team Members</h4>
          <button className="btn btn-primary" sx={{ p: 2 }} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Team Member
          </button>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <form onSubmit={formik.handleSubmit}>
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Admin Registration
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {/* <div className="container"> */}
                  <div>
                    <div className="row g-3">
                      <div className="col-12 col-lg-6">
                        <input id="outlined-required" placeholder="Full Name" type="text" onChange={formik.handleChange} name="name" className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} required />
                        <span className="text-danger">{formik.touched.name && formik.errors.name}</span>
                      </div>
                      <div className="col-12 col-lg-6">
                        <input required id="degination" onChange={formik.handleChange} type="text" placeholder="Designation" name="degination" className={`form-control ${formik.touched.degination && formik.errors.degination ? "border-danger" : ""}`} />
                        <span className="text-danger">{formik.touched.degination && formik.errors?.degination}</span>
                      </div>
                      <div className="col-12 col-lg-6">
                        <input type="file" accept=".png, .jpg, .jpeg" class="form-control" name="profile" value={formik.values.profile} id="img" onChange={fileHandler} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button className="btn btn-danger" fullWidth type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="table-responsive rounded border">
          <table class="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Degination</th>
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
                      <td>{data?.degination}</td>
                      <td>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleShow(data?.id);
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
      <Modal show={showModal} onHide={handleHide}>
        <Modal.Header closeB>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <button className="btn btn-primary me-2" onClick={deleteMember}>Yes</button>
            <button className="btn btn-outline-warning" onClick={handleHide}>No</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
