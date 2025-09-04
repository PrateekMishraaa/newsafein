import { DeleteForever, EditTwoTone, Person } from "@mui/icons-material";
import { Avatar, TextField } from "@mui/material";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { Popup } from "utils/Popup";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const AddEditYouthGallery = () => {
  const [gallery, setGallery] = useState([]);
  const { adminRoles, token } = useGlobalContext();
  let [idd, setId] = useState();
  let [namee, setNamee] = useState();
  let [orderr, setOrder] = useState();
  let [profile, setProfile] = useState();
  let [subInfo, setSubInfo] = useState();
  let [contentt, setContent] = useState();
  let [updater, setUpdater] = useState(0);

  const [show, setShow] = useState({
    add: false,
    edit: false,
  });

  async function Updation(attr, values, id) {
    try {
      if (attr == "update" || attr == "add") {
        // console.log(attr, "Values", values)
        const response = await apiAuth.post(
          "/admin/youthgallery?attr=" + attr,
          values
        );
        if (response.status == 200) {
          fetchYouthGallery();
        }
      } else {
        // console.log(attr, "Valuesjbjbj", values)
        const formData = new FormData();
        formData.append("id", id);
        const response = await apiAuth.post(
          "/admin/youthgallery?attr=" + attr,
          formData
        );
        if (response.status == 200) {
          fetchYouthGallery();
        }
      }
    } catch (error) {
      Popup("error", error.response.data.message);
    }
  }
  //=======================
  //Handle  Add Formik
  //=======================
  const addFormik = useFormik({
    initialValues: {
      name: "",
      subinfo: "",
      order: "",
      content: "",
    },
    onSubmit: async (values, actions) => {
      // console.log("IMG",image);
      // console.log("success", "added", (values));
      Updation("add", values);
      actions.resetForm();
      handleShow("add");
    },
  });
  const editFormik = useFormik({
    initialValues: {
      name: namee,
      subinfo: subInfo,
      order: orderr,
      content: contentt,
      id: idd,
    },
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      console.log("success", "added", values.img);
      //  let data = {...values, id}
      Updation("update", values);
      handleShow("edit");
      // actions.resetForm();
      // setForm();
    },
  });

  const handleShow = (modal) => {
    if (modal === "add") {
      setShow({ ...show, add: !show.add });
    } else {
      setShow({ ...show, edit: !show.edit });
    }
  };
  const fetchYouthGallery = async () => {
    try {
      const response = await apiJsonAuth.get("/content/youthgallery");
      if (response.status === 200) {
        setGallery(response?.data?.resources);
      }
    } catch (error) {
      Popup("error", error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (token) {
      fetchYouthGallery();
    }
  }, []);
  return (
    <div className="conatiner">
      <div class="d-md-flex justify-content-between mb-3">
        <h5>Added Youths</h5>
        <Button variant="primary" size="sm" onClick={() => handleShow("add")}>
          Add Youth Gallery
        </Button>
      </div>
      <div className="table-responsive border pb-0">
        <table className="table designed-table mb-0 table-borderless">
          <thead>
            <tr className="p-3 bg-light">
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Sub Info</th>
              <th hidden={adminRoles() === 5} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {gallery?.map((ele, i) => {
              {
                /* console.log(ele); */
              }
              return (
                <tr>
                  <td scope="row">
                    <Avatar src={ele?.img} sx={{ backgroundColor: "orange" }}>
                      <Person />
                    </Avatar>
                  </td>
                  <td>{ele.name}</td>
                  <td>{ele.subinfo}</td>
                  <td hidden={adminRoles() === 5}>
                    {/* <IconButton sx={{ color: "indigo" }}>
                          <EditTwoTone />
                        </IconButton> */}
                    <IconButton
                      hidden={adminRoles() === 3}
                      sx={{ color: "tomato" }}
                      onClick={async () => {
                        // Updation("delete", undefined,ele?.id);
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You wanted to delete this student!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            try {
                              Updation("delete", undefined, ele?.id);
                              Swal.fire({
                                icon: "success",
                              });
                              setUpdater(updater + 1);
                            } catch (error) {
                              Swal.fire({
                                width: 400,
                                title: error?.response?.data?.message
                                  ? error?.response?.data?.message
                                  : "Something Went Wrong Check  your Network Connection",
                                icon: "error",
                              });
                            }
                          }
                        });
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                    <IconButton
                      //   onClick={() => handleShow("edit"),

                      //       setNamee(ele.name);
                      //       setProfile(ele?.img);
                      //       setSubInfo(ele.subinfo);
                      //       setContent(ele.content);
                      //       setId(ele.id);
                      //       setOrder(ele.orderInt)}
                      onClick={() => {
                        handleShow("edit");
                        setNamee(ele.name);
                        setProfile(ele?.img);
                        setSubInfo(ele.subinfo);
                        setContent(ele.content);
                        setId(ele.id);
                        setOrder(ele.orderInt);
                        // console.log(ele.img);
                        // console.log(orderr);
                      }}
                    >
                      <EditTwoTone />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Youth Gallary modal */}

      <Modal show={show.add} onHide={() => handleShow("add")}>
        <div hidden={!(adminRoles() === 1)} className="col">
          <div className="container">
            <Modal.Header closeButton>
              <h5 className="text-center ml-3">Add a youth to Youth Gallery</h5>
            </Modal.Header>
            <form className="mt-2 px-3" onSubmit={addFormik.handleSubmit}>
              <div className="row gy-3">
                <div className="col-lg-12">
                  <TextField
                    name="name"
                    fullWidth
                    label="Youth Name"
                    value={addFormik.values.name}
                    onChange={addFormik.handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    name="subinfo"
                    fullWidth
                    label="Youth Information"
                    value={addFormik.values.subinfo}
                    onChange={addFormik.handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <Button size="lg" variant="outline" className="w-100">
                    <input
                      type="file"
                      name="img"
                      accept=".png, .jpg, .jpeg"
                      id="img"
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      onChange={(e) => {
                        console.log("logged", e.target.files);
                        if (e.target.files.length) {
                          addFormik.setFieldValue("img", e.target.files[0]);
                        }
                      }}
                    />
                  </Button>
                </div>
                <div className="col-lg-12">
                  <TextField
                    type="text"
                    name="order"
                    label="Order"
                    fullWidth
                    value={addFormik.values.order}
                    onChange={addFormik.handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    name="content"
                    label="Content for the Youth"
                    fullWidth
                    multiline
                    rows={4}
                    value={addFormik.values.content}
                    onChange={addFormik.handleChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-center my-3">
                  <Button
                    className="text-capitalize p-3"
                    variant="outline-success"
                    type="submit"
                    size="sm"
                  >
                    Add to Youth Gallery
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* Add Youth Gallary modal End */}

      {/* Edit Youth Gallary modal */}

      <Modal show={show.edit} onHide={() => handleShow("edit")}>
        <div hidden={!(adminRoles() === 1)} className="col">
          <div className="container">
            <Modal.Header closeButton>
              <h5 className="text-center ml-3">Edit a Youth Gallery</h5>
            </Modal.Header>
            <form className="mt-2 px-3" onSubmit={editFormik.handleSubmit}>
              <div className="row gy-3">
                <div className="col-lg-12">
                  <TextField
                    name="name"
                    fullWidth
                    label="Youth Name"
                    value={editFormik.values.name}
                    onChange={editFormik.handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    name="subinfo"
                    fullWidth
                    label="Youth Information"
                    value={editFormik.values.subinfo}
                    onChange={editFormik.handleChange}
                  />
                </div>
                <div className="d-flex col-lg-12">
                  <img className="me-3" src={profile} width={50} height={50} />
                  <TextField
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="files[]"
                    fullWidth
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        // console.log("loghhj",e.target.files[0] )
                        editFormik.setFieldValue("img", e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    type="text"
                    name="order"
                    label="Order"
                    fullWidth
                    value={editFormik.values.order}
                    onChange={editFormik.handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    name="content"
                    label="Content for the Youth"
                    fullWidth
                    multiline
                    rows={4}
                    value={editFormik.values.content}
                    onChange={editFormik.handleChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-center my-3">
                  <Button
                    className="text-capitalize p-3"
                    variant="outline-success"
                    type="submit"
                    size="sm"
                  >
                    Edit Youth Gallery
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddEditYouthGallery;
