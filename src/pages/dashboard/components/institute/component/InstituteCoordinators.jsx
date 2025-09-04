import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, List, TextField } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import { pop2 } from "utils/Popup";
import { apiJsonAuth } from "api";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import { toast } from "react-toastify";


const Coordinators = ({ details }) => {
  const [coordArray, setCoordArray] = useState([]);
  const { token, userData } = useGlobalContext();
  const { ErrorResponder } = useError()
  const closeModal = useRef();

  // Fetch All Coordinators
  const fetchCoordinators = async () => {
    // console.log("Coordinator Check", token);
    if (token) {
      try {
        const res = await apiJsonAuth.get("/institute/coordinator/all", {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setCoordArray(res.data.result);
          // console.log("===============Fetched Coordinators===============", res);
        }
      } catch (error) {
        ErrorResponder(error)
        // console.log("===============Error Coordinator===============", error);
      }
    }
  };
  //Delete Coordinators
  const deleteCoordinator = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiJsonAuth.delete(`/institute/coordinator?id=${id}`, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            pop2.success({ title: res.data.message, timer: 1500 });
            fetchCoordinators();
          }
        } catch (error) {
          ErrorResponder(error);
          // Popup("error", error.response.data.message);
        }
      }
    });
  };
  const validationSchema = yup.object().shape({
    name: yup.string().max(100).required("First Name is Required"),
    email: yup.string().email().required("Email is required"),
    contact: yup
      .string()
      .required("Phone Number is Required")
      .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
    designation: yup.string().required("Gender is required"),
  });
  //AddCoordinators
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      designation: "",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await apiJsonAuth.post("/institute/coordinator", values, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          switch (response?.data?.status) {
            case "success":
              toast.dismiss();
              toast.success(response.data.message);
              closeModal.current.click();
              actions.resetForm();
              fetchCoordinators();
              break;
            case "warning":
              toast.dismiss();
              toast.warning(response.data.message);
              break;
            case "error":
              toast.dismiss();
              toast.error(response.data.message);
              break;
          }
        }
      } catch (error) {
        ErrorResponder(error);
      }
    },
  });
  useEffect(() => {
    fetchCoordinators();
  }, [token]);
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <p className="mt-2 fs-5 fw-semibold">{"Teacher / Faculty Coordinators"}</p>
        {
          !coordArray?.length &&
          <Button className="text-capitalize" variant="outlined" color="warning" data-bs-toggle="modal" data-bs-target="#addCoordinator">
            Add Teacher Coordinator
          </Button>
        }
      </div>

      {/* Compliance Table */}



      <List
        className="row g-2"
        sx={{
          width: "100%",
          bgcolor: "white",
        }}
      >
        {coordArray?.map((coordinator, index) => {
          return (
            <div className="col-12">
              <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/teacher-4975949-4159835.png?f=webp" alt="teacher" className={"d-block w-100"} style={{ maxHeight: 200, objectFit: "contain" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" style={{ position: "relative" }}>
                      <div className="d-flex align-items-center" >
                        <h4 className="card-title">{coordinator?.name} </h4>
                      </div>
                      <IconButton
                        onClick={() => deleteCoordinator(coordinator?.id)}
                        fullWidth
                        variant="outlined"
                        color="error"
                        style={{ position: "absolute", top: "10px", right: "10px" }}
                      >
                        <DeleteForever />
                      </IconButton>
                      <div>
                        <p className="fs-5 lh-sm">{coordinator?.contact}<br />{coordinator?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </List>
      {/* Add Coordinator  */}
      <div className="modal fade" id="addCoordinator" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Add Coordinator</h1>
              <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit} className="row g-2 row-cols-1">
                <div className="col">
                  {/* <span className="form-label text-dark">Coordinator Name</span> */}
                  <TextField
                    fullWidth
                    name="name"
                    className="my-1"
                    label="Coordinator Name"
                    size="large"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="col">
                  {/* <span className="form-label text-dark">Coordinator Email</span> */}
                  <TextField
                    fullWidth
                    className="my-1"
                    name="email"
                    label="Coordinator Email"
                    size="large"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div className="col">
                  {/* <span className="form-label text-dark">Coordinator Contact</span> */}
                  <TextField
                    fullWidth
                    className="my-1"
                    name="contact"
                    label="Coordinator Contact"
                    size="large"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                    helperText={formik.touched.contact && formik.errors.contact}
                  />
                </div>
                <div className="col">
                  {/* <span className="form-label text-dark">Coordinator Designation</span> */}
                  <TextField
                    fullWidth
                    className="my-1"
                    name="designation"
                    label="Coordinator Designation"
                    size="large"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}
                  />
                </div>
                <div className="div">
                  <Button type="button" variant="outlined" className="m-1" data-bs-dismiss="modal">
                    Close
                  </Button>
                  <Button type="submit" className="m-1" variant="contained" color="warning">
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinators;
