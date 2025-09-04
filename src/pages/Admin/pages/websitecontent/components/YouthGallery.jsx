import { DeleteForever, EditTwoTone } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { Popup } from "utils/Popup";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import { useGlobalContext } from "global/context";
import AddEditYouthGallery from "./AddEditYouthGallery";
import { Button, Modal } from "react-bootstrap";

const YouthGallery = () => {
  const [resourcesLibrary, setResourceslibrary] = useState([]);

  const { token } = useGlobalContext();
  let [updater, setUpdater] = useState(0);
  const { adminRoles } = useGlobalContext();

  let [idd, setId] = useState();
  let [groupId, setgroupId] = useState();
  let [groupName, setgroupName] = useState();
  let [Title, setTitle] = useState();
  let [Description, setDescription] = useState();
  let [Pdf, setPdf] = useState();
  const [show, setShow] = useState({
    add: false,
    edit: false,
  });
  const handleShow = (modal) => {
    if (modal === "add") {
      setShow({ ...show, add: !show.add });
    } else {
      setShow({ ...show, edit: !show.edit });
    }
  };

  const fetchResourcesLibrary = async () => {
    try {
      const response = await apiJsonAuth.get("/admin/content/resource-library");
      console.log(response);
      if (response.status === 200) {
        setResourceslibrary(response.data.result);
      }
    } catch (error) {
      Popup("error", error);
    }
  };
  // fetchYouthGallery();
  useEffect(() => {
    if (token) {
      fetchResourcesLibrary();
    }
  }, [updater]);
  // console.log(resourcesLibrary);

  const addResourceFormik = useFormik({
    initialValues: {
      group_id: "",
      group_name: "",
      title: "",
      description: "",
      pdf: "",
    },
    onSubmit: async (values, actions) => {
      console.log("success", values);
      const res = await apiAuth.post("admin/content/resource-library", values);
      if (res.status == 200 || res?.success == 1) {
        actions.resetForm();
        setUpdater(updater + 1);
        handleShow("add");
      }

      actions.resetForm();
    },
  });
  // console.log("Formik", addResourceFormik);

  const editResourceFormik = useFormik({
    initialValues: {
      group_id: groupId,
      group_name: groupName,
      title: Title,
      description: Description,
      pdf: Pdf,
    },

    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      console.log("success", values);
      //  let data = {...values, id}
      // Updation("update", values);
      const res = await apiAuth.put(
        `/admin/content/resource-library/${idd}`,
        values
      );
      if (res.status == 200 || res?.success == 1) {
        actions.resetForm();

        setUpdater(updater + 1);
        handleShow("edit");
      }

      console.log("group_name", groupName);
    },
  });

  return (
    <>
      <div>
        <AddEditYouthGallery />
      </div>
      <hr />
      {/* RESOURCES LIBRARY  */}
      <div>
        <div className="">
          <div className="">
            <div className="d-flex justify-content-between mb-3">
              <h5>Added Resources</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShow("add")}
              >
                Add Youth Gallery
              </Button>
            </div>
            <div className="table-responsive border pb-0">
              <table className="table designed-table mb-0 ">
                <thead>
                  <tr className="p-3 bg-light">
                    <th scope="col">file</th>
                    <th scope="col">group_id</th>
                    <th scope="col">group_name</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">posted_at</th>
                    <th hidden={adminRoles() === 5} scope="col">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resourcesLibrary?.map((ele, i) => {
                    //   console.log(ele);
                    return (
                      <tr>
                        {/* {console.log(ele.pdf)} */}
                        <td scope="row">
                          <Link to={ele.pdf} target={"_blank"}>
                            <ArticleIcon />
                          </Link>

                          {/* <a href={ele.pdf} download target={"_blank"} >
                        <ArticleIcon />
                        </a> */}
                        </td>
                        <td>{ele?.group_id}</td>
                        <td>{ele?.group_name}</td>
                        <td>{ele?.title}</td>
                        <td>{ele?.description}</td>
                        <td>{ele?.posted_at}</td>
                        <td hidden={adminRoles() === 5}>
                          <IconButton
                            hidden={adminRoles() === 3}
                            sx={{ color: "tomato" }}
                            onClick={() => {
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
                                    const res = await apiAuth.delete(
                                      `/admin/content/resource-library/${ele.id}`
                                    );
                                    if (res.status == 200) {
                                      Swal.fire({
                                        icon: "success",
                                      });
                                      setUpdater(updater + 1);
                                    }
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
                            onClick={() => {
                              handleShow("edit");

                              setgroupId(ele?.group_id);
                              setgroupName(ele?.group_name);
                              setTitle(ele?.title);
                              setDescription(ele?.description);
                              setPdf(ele.pdf);
                              setId(ele.id);
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
          </div>
          {/* Add Youth Resource Library modal */}
          <Modal show={show.add} onHide={() => handleShow("add")}>
            <div hidden={!(adminRoles() === 1)} className="">
              <div className="container">
                <Modal.Header closeButton>
                  <h5 className="text-center ml-3">Add a Resource Library</h5>
                </Modal.Header>

                <form onSubmit={addResourceFormik.handleSubmit}>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <TextField
                        name="group_id"
                        fullWidth
                        label="Group Id"
                        value={addResourceFormik.values.group_id}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="group_name"
                        fullWidth
                        label="Group Name"
                        value={addResourceFormik.values.group_name}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="title"
                        fullWidth
                        label="title"
                        value={addResourceFormik.values.title}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="description"
                        fullWidth
                        label="Description"
                        value={addResourceFormik.values.description}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="pdf"
                        fullWidth
                        onChange={(e) => {
                          console.log(addResourceFormik.values);
                          addResourceFormik.setFieldValue(
                            "pdf",
                            e.target.files[0]
                          );
                        }}
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-center my-3">
                      <Button
                        className="text-capitalize p-3"
                        variant="outline-success"
                        type="submit"
                        size="sm"
                      >
                        Add Resources Library
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          {/* Add Youth Resource Library modal end */}

          {/* Edit Youth Resource Library modal */}
          <Modal show={show.edit} onHide={() => handleShow("edit")}>
            <div className="col">
              <div className="container">
                <Modal.Header closeButton>
                  <h5 className="text-center">Edit a Resource Library</h5>
                </Modal.Header>

                <form onSubmit={editResourceFormik.handleSubmit}>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <TextField
                        name="group_id"
                        fullWidth
                        label="Group Id"
                        value={editResourceFormik.values.group_id}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="group_name"
                        fullWidth
                        label="Group Name"
                        value={editResourceFormik.values.group_name}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="title"
                        fullWidth
                        label="title"
                        value={editResourceFormik.values.title}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="description"
                        fullWidth
                        label="Description"
                        value={editResourceFormik.values.description}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        type="file"
                        name="pdf"
                        fullWidth
                        onChange={(e) => {
                          console.log(editResourceFormik.values);
                          editResourceFormik.setFieldValue(
                            "pdf",
                            e.target.files[0]
                          );
                        }}
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
      </div>
    </>
  );
};

export default YouthGallery;
