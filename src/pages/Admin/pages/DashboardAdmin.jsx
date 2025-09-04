import { DeleteForever, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { apiJsonAuth } from "api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

const adminFormValidation = new Yup.object().shape({
  first_name: Yup.string().max(100).required("First Name is Required"),
  last_name: Yup.string().max(100).required("Last Name is Required"),
  email: Yup.string().email().required("Email is required"),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  role: Yup.string().required("Role is Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Password must match"),
});

const DashboardAdmin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  let [adminData, setAdminData] = useState([]);
  let [update, setUpdate] = useState(0);
  let [showModal, setShowModal] = useState(false);
  let [deleteId, setDeleteId] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    validationSchema: adminFormValidation,
    onSubmit: async (values, action) => {
      try {
        const res = await apiJsonAuth.post("admin/register", values);
        if (res.status === 200) {
          setUpdate(update + 1);
          toast.success("Registered Successfully");
          action.resetForm();
        }
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong");
      }
    },
  });

  async function getAdminsData() {
    try {
      const result = await apiJsonAuth.get("admin/data");
      if (result.status === 200) {
        console.log(result?.data?.result);
        setAdminData(result?.data?.result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAdmin() {
    try {
      const res = await apiJsonAuth.delete("admin/delete?id=" + deleteId);
      if (res.status === 200) {
        setUpdate(update + 1);
        toast.success("Deleted Successfully");
        handleHideModal()
      }
    } catch (err) {
      console.lor(err);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAdminsData();
  }, [update]);

  const handleShowModal = (id)=>{
    setDeleteId(id);
    setShowModal(true)
  }

  const handleHideModal = ()=>{
    setShowModal(false)
  }

  return (
    <>
      <div className="mb-3">
        <Button variant="contained" sx={{ p: 2 }} color="warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Admin User
        </Button>
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
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="First Name"
                        type="text"
                        onChange={formik.handleChange}
                        name="first_name"
                        error={formik.touched.first_name && formik.errors.first_name}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        // defaultValue="Hello World"
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        id="outlined"
                        label="Last Name"
                        type="text"
                        onChange={formik.handleChange}
                        name="last_name"
                        error={formik.touched.last_name && formik.errors.last_name}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                        // autoComplete="current-password"
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Email"
                        onChange={formik.handleChange}
                        type="email"
                        name="email"
                        error={formik.errors.email && formik.touched.email}
                        helperText={formik.touched.email && formik.errors?.email} // defaultValue="Hello World"
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        required
                        id="outlined"
                        onChange={formik.handleChange}
                        label="Contact"
                        type="number"
                        name="contact"
                        error={formik.errors.contact && formik.touched.contact}
                        helperText={formik.touched.contact && formik.errors.contact}
                        // autoComplete="current-password"
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                          fullWidth
                          required
                          onChange={formik.handleChange}
                          name="password"
                          id="outlined-adornment-password"
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText className="text-danger">{formik.touched.password && formik.errors.password}</FormHelperText>
                      </FormControl>
                    </div>
                    <div className="col-12 col-lg-6">
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                          fullWidth
                          required
                          onChange={formik.handleChange}
                          label="Confirm Password"
                          name="confirm_password"
                          error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText className="text-danger">{formik.touched.confirm_password && formik.errors.confirm_password}</FormHelperText>
                      </FormControl>
                    </div>
                    <div className="col-12 col-lg-6">
                      <select defaultValue="" onChange={formik.handleChange} required className="form-select py-3" name="role" aria-label="Default select example" error={formik.touched.role && formik.errors.role} helperText={formik.touched.first_name && formik.errors.first_name}>
                        <option value="" disabled>
                          Select Admin Role
                        </option>
                        <option value="subAdmin">Sub Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <Button color="success" variant="contained" className="py-3" size="large" fullWidth type="submit" data-bs-dismiss="modal">
                  Submit{" "}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive rounded border">
        <table class="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light">
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminData?.map((data, i) => {
              // console.log(data);
              return (
                <>
                  <tr className="border-bottom">
                    <td scope="row">
                      {i+1}
                    </td>
                    <td> {data?.first_name + " " + data?.last_name}</td>
                    <td>{data?.email}</td>
                    <td>{data?.contact}</td>
                    <td>{data?.role}</td>
                    <td>{data?.status}</td>
                    <td>
                      <IconButton
                        color="error"
                        onClick={() => {
                          // deleteAdmin(data?.id);
                          handleShowModal(data?.id)}
                        }>
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
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeB>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <button className="btn btn-primary me-2" onClick={deleteAdmin}>Yes</button>
          <button className="btn btn-outline-warning" onClick={handleHideModal}>No</button>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashboardAdmin;
// export  {AdminRoles};
