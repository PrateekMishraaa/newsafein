import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { pop2, Popup } from "utils/Popup";
import { apiJsonAuth } from "api";
import { CheckBoxOutlineBlank, CheckBoxRounded, Close, Delete, Edit, Remove } from "@mui/icons-material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

function StudentPoll() {
  const [options, setOptions] = React.useState({});
  const [question, setQuestion] = React.useState();
  const [count, setCount] = React.useState(2);
  const [pollList, setPollList] = React.useState([]);
  const [edit, setEdit] = useState();
  const [showPoll, setShowPoll] = useState(false);
  const rows = [];

  async function fetchData() {
    try {
      const response = await apiJsonAuth.get("student/editPoll");
      if (response) {
        setPollList(response?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handelpollEdit = async (id, todo, values) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiJsonAuth.post(`student/editPoll?todo=${todo}`, {
            id,
            values,
          });
          if (response) {
            toast.success(response?.data?.message);
            fetchData();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const uploadData = async (e) => {
    try {
      if (question && options) {
        const response = await apiJsonAuth.put("/admin/createPoll", {
          question,
          options: JSON.stringify(options),
        });
        // console.log(response);
        if (response) {
          Popup("success", "Poll Created..");
          e.target.reset();
          fetchData();
        }
      } else {
        pop2.warning({ title: "All Input Fields Required!!" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handelChange(e) {
    if (e.target.name === "ques") {
      setQuestion(e.target.value);
    } else {
      setOptions({ ...options, [e?.target?.name]: e?.target?.value });
    }
  }
  for (let i = 1; i <= count; i++) {
    rows.push(
      <div style={{ width: "400px" }}>
        <TextField fullWidth className="form-control my-2 input-group rounded" label={"Option " + i} required variant="outlined" key={i} type="text" name={"option" + i} onChange={handelChange} />
      </div>
    );
  }

  const hideEditBar = (id) => {
    document.getElementById(`edit${id}`).classList.add("d-none");
  };
  const showEditBar = (id) => {
    document.getElementById(`edit${id}`).classList.remove("d-none");
  };

  const EditPollContent = ({ poll }) => {
    const option = Object(JSON.parse(poll.options));
    const formik = useFormik({
      initialValues: {
        ques: poll.poll_ques,
        role: poll.role,
        option: option,
      },
      onSubmit: (values) => {
        handelpollEdit(poll.id, "UPDATE", values).then(() => {
          setEdit();
        });
      },
    });
    return (
      <div className="card bg-gradient bg-opacity-75 postion-relative  m-1 p-2">
        <div className="mx-auto position-absolute end-0 top-0  d-flex w-10 justify-content-around mt-3">
          <Tooltip title="Close" className="mx-2">
            <Close style={{ fontSize: "25px" }} type="button" onClick={() => setEdit()} />
          </Tooltip>
        </div>
        <Form className="container p-3" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <TextField required className="text-center" fullWidth multiline maxRows={4} label="Question" name="ques" value={formik.values.ques} onChange={formik.handleChange} variant="outlined" type="text" />
            <label htmlFor="role" className="fomr-label mt-2">
              Role
            </label>
            <input required className="form-control" id="role" name="role" value={formik.values.role} onChange={formik.handleChange} variant="outlined" type="text" />
          </div>
          <div>
            <div>
              {Object.values(option).map((opt, i) => {
                return (
                  <TextField
                    className="fs-6 text-wrap mb-2"
                    label={"Option " + (i + 1)}
                    required
                    key={i}
                    type="text"
                    name={"option" + i}
                    onChange={(e) => {
                      option["option" + (i + 1)] = e.target.value;
                    }}
                    multiline
                    maxRows={4}
                    fullWidth
                    size="sm"
                    variant="outlined"
                    defaultValue={opt}
                  />
                );
              })}
            </div>
          </div>
          <div className="container text-center mt-2">
            <Button color="success" variant="contained" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4>Manage Polls</h4>
          <button className="btn btn-primary" onClick={() => setShowPoll(true)}>
            Add Poll
          </button>
        </div>
        {/* Polls  */}
        <div className="row row-cols-1 row-cols-lg-2 g-3">
          {pollList?.map((poll) => {
            return (
              <div className="col">
                {edit !== poll.id && (
                  <div key={poll.id} className="card p-3 position-relative rounded-3 h-100" onMouseOver={() => showEditBar(poll.id)} onMouseLeave={() => hideEditBar(poll.id)}>
                    <div id={"edit" + poll.id} className=" position-absolute end-0 border rounded-start d-none bg-light bg-gradient bg-opacity-75 shadow-lg">
                      <div className=" position-static py-2">
                        <div className="m-2">{poll?.status === "ACTIVE" ? <CheckBoxRounded sx={{ color: "green" }} onClick={() => handelpollEdit(poll.id, "STATUS_INACTIVE")} /> : <CheckBoxOutlineBlank sx={{ color: "grey" }} onClick={() => handelpollEdit(poll.id, "STATUS_ACTIVE")} />}</div>
                        <div>
                          <Edit className="m-2" sx={{ color: "black" }} onClick={() => setEdit(poll.id)} />
                        </div>
                        <div className="m-2">
                          <Delete sx={{ color: "red" }} onClick={() => handelpollEdit(poll.id, "DELETE")} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6>{poll?.poll_ques}</h6>
                      <small className="border p-1 rounded bg-light d-inline-block mb-2">Roles : {poll?.role}</small>
                    </div>
                    {/* {console.log(Object.values(JSON.parse(poll.options)))} */}
                    <div className="px-2">
                      {Object.values(JSON.parse(poll.options)).map((option, i) => {
                        return (
                          <p className="lh-1 fs-6 mb-2" key={i}>
                            <span>{i + 1 + ". "}</span>
                            {option}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div>{edit === poll.id && <EditPollContent poll={poll} />}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Add Poll Modal  */}
      <Modal show={showPoll} onHide={() => setShowPoll(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              uploadData(e);
            }}>
            <div className="input-group mb-2">
              <TextField required className="text-center" fullWidth multiline rows={4} id="outlined-basic" label="Enter Question Here!" variant="outlined" type="text" name="ques" onChange={handelChange} />
            </div>
            <div>
              <div className="w-20 d-flex justify-content-center text-center item-center">
                <Button
                  className="py-1 px-5 m-1 rounded rounded-pill"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  size="small"
                  variant="outlined"
                  disabled={count === 8}
                  startIcon={<AddIcon />}>
                  OPTION
                </Button>
                <Button
                  className="py-1 px-5 m-1 rounded rounded-pill"
                  onClick={() => {
                    setCount(count - 1);
                    delete options[`option${count}`];
                  }}
                  size="small"
                  variant="outlined"
                  disabled={count === 2}
                  startIcon={<Remove />}>
                  OPTION
                </Button>
              </div>
            </div>
            <div>
              <div className="rounded mt-2 d-flex justify-content-around flex-wrap px-2 mx-auto">{rows}</div>
            </div>
            <div className="mx-auto d-flex justify-content-center">
              <button className="btn btn-success" type="submit">
                Create Poll
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentPoll;
