import { Avatar, ButtonBase, TextField } from "@mui/material";
import { apiAuth, apiJson } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import { Popup } from "utils/Popup";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";

import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

function QuotesDataTable() {
  const [quoteData, setQuoteData] = useState();
  const [update, setUpdate] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1);
  let [img, setImg] = useState("");
  let [editTitle, setEditTitle] = useState();
  let [editQuote, setEditQuote] = useState();
  let [editImg, setEditImg] = useState();
  let [editQuoteBy, setEditQuoteBy] = useState();
  let [editId, setEditId] = useState();
  let { adminRoles } = useGlobalContext();
  const [show, setShow] = useState({
    add: false,
    edit: false,
  });

  //======================================
  //Handle Modal
  //=====================================
  const handleShowModal = (modal) => {
    if (modal === "add") {
      setShow({ ...show, add: !show.add });
    } else {
      setShow({ ...show, edit: !show.edit });
    }
  };

  const getAllQuotes = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get(
        `admin/quotes?limit=${limit}&offset=${offset}`
      );
      if (res.status === 200) {
        setQuoteData(res?.data);
      }
    } catch (error) {
      Popup("error", error.response.data.message);
    }
  };

  const Formik = useFormik({
    initialValues: {
      title: "",
      quote: "",
      quoteBy: "",
    },
    onSubmit: async (values, action) => {
      console.log("Values: ", values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("quote", values.quote);
      formData.append("quoteBy", values.quoteBy);
      formData.append("img", img);
      console.log(formData);
      try {
        const res = await apiAuth.post("admin/quotes", formData);
        if (res.status === 200 || res?.success === 1) {
          console.log("Create Quote Reszponse: ", res);
          Popup("success", "Added Successfully", undefined, 2000);
          setUpdate(update + 1);
          handleShowModal("add");
        }
      } catch (err) {
        Popup("error", err.response.data.message);
      }
    },
  });
  const FormikEdit = useFormik({
    initialValues: {
      edittitle: editTitle ? editTitle : "",
      editquote: editQuote ? editQuote : "",
      editquoteBy: editQuoteBy ? editQuoteBy : "",
      editid: editId ? editId : "",
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      console.log("Values: ", values);
      try {
        const res = await apiAuth.put("admin/quotes", {
          id: values.editid,
          title: values.edittitle,
          quote: values.editquote,
          img: editImg,
          quoteBy: values.editquoteBy,
        });
        if (res.status === 200 || res?.success === 1) {
          setUpdate(update + 1);
          Popup("success", res.data.message, undefined, 2000);
          handleShowModal("edit");
        }
      } catch (err) {
        Popup("error", err.response.data.message);
      }
    },
  });

  // console.log(editTitle);
  useEffect(() => {
    getAllQuotes();
  }, [update, limit, offset]);
  // console.log(quoteData)

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        console.log(result);
        try {
          const res = await apiJson.delete("/admin/quotes?id=" + id);
          if (res.status === 200) {
            setUpdate(update + 1);
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });
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
  };

  //========================Pagination code================\\
  const handlePaginationNext = () => {
    // console.log("sort", sort);
    // console.log(typeof offset, typeof limit);

    let increment = Number(offset) + Number(limit);
    console.log(increment);

    if (increment < quoteData?.count) {
      setOffset(increment);
      console.log("Pagination to next page " + offset);
    }
  };
  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    console.log(decrement);

    if (decrement > 0) {
      setOffset(decrement);
      console.log("Pagination to prev page " + offset);
    } else {
      setOffset(0);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Manage Quotes</h4>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleShowModal("add")}
        >
          Add Quote
        </Button>
      </div>
      {/* Add  Youth Resource Library modal */}

      <Modal show={show.add} onHide={() => handleShowModal("add")}>
        <form
          hidden={!(adminRoles() === 1)}
          onSubmit={Formik.handleSubmit}
          className="container ms-0"
          style={{ maxWidth: "550px" }}
        >
          <Modal.Header closeButton>
            <h4>Add Quote</h4>
          </Modal.Header>
          <div className="row row-cols-1">
            <div className="col">
              <TextField
                className="mt-2"
                fullWidth
                type="text"
                name="title"
                id="quoteTitle"
                label="Title"
                value={Formik.values.title}
                onChange={Formik.handleChange}
              />
            </div>
            {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" 
            data-text="I am posting yuvamanthanBlog" 
            data-via="yuvamanthan" 
            data-hashtags="yuvamanthan" 
            data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
            <div className="col">
              <TextField
                fullWidth
                className="mt-2"
                type="text"
                name="quote"
                multiline
                rows={4}
                label="Quote"
                value={Formik.values.quote}
                onChange={Formik.handleChange}
              />
            </div>
            <div className="col">
              <Button variant="outline" className="text-start mt-2 w-100">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setImg(e.target.files[0])}
                />{" "}
              </Button>
              {/* <TextField className="mt-2" fullWidth  type="file" placeholder="Image" onChange={(e) => setImg(e.target.files[0])} /> */}
            </div>
            {/* <div className="col">
              <TextField fullWidth className="mt-2" type="file" placeholder="Edit Image" onChange={(e) => setEditImg(e.target.files[0])} />
            </div> */}
            <div className="col">
              <TextField
                className="mt-2"
                fullWidth
                type="text"
                name="quoteBy"
                id="quoteby"
                label="QuoteBy"
                value={Formik.values.quoteBy}
                onChange={Formik.handleChange}
              />
            </div>
            {/* style={{ clipPath: "circle()" }} */}
            <div className="col-12 d-flex justify-content-center my-3">
              <Button
                className="text-capitalize p-3"
                variant="outline-success"
                type="submit"
                size="sm"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      {/* Edit Youth Resource Library modal */}
      <Modal show={show.edit} onHide={() => handleShowModal("edit")}>
        <form
          onSubmit={FormikEdit.handleSubmit}
          className="container ms-0"
          style={{ maxWidth: "550px" }}
        >
          <Modal.Header closeButton>
            <h4>Edit Quote</h4>
          </Modal.Header>
          <div className="row row-cols-1"></div>
          <div className="col">
            <input
              className="m-2"
              type="hidden"
              name="editid"
              placeholder="id"
              value={FormikEdit.values.editId}
              onChange={FormikEdit.handleChange}
              defaultValue={editId}
              disabled
            />
          </div>
          <div className="col">
            <TextField
              fullWidth
              className="mt-2"
              type="text"
              name="edittitle"
              id="editquoteTitle"
              placeholder="Edit Title"
              value={FormikEdit.values.editTitle}
              onChange={FormikEdit.handleChange}
              defaultValue={editTitle}
            />
          </div>
          <div className="col">
            <TextField
              fullWidth
              multiline
              rows={5}
              className="mt-2"
              type="text"
              name="editquote"
              id="editquote"
              placeholder="Edit Quote"
              value={FormikEdit.values.editQuote}
              onChange={FormikEdit.handleChange}
              defaultValue={editQuote}
            />
          </div>
          <div className="col mt-2">
            <Button className="w-100" variant="outline">
              <input
                fullWidth
                className="mt-2"
                type="file"
                placeholder="Edit Image"
                onChange={(e) => setEditImg(e.target.files[0])}
              />
            </Button>
          </div>
          <div className="col">
            <TextField
              fullWidth
              className="mt-2"
              type="text"
              name="editquoteBy"
              id="editquoteby"
              placeholder="Edit QuoteBy"
              value={FormikEdit.values.editQuoteBy}
              onChange={FormikEdit.handleChange}
              defaultValue={editQuoteBy}
            />
          </div>
          <div className="col-12 d-flex justify-content-center my-3">
            <Button
              className="text-capitalize p-3"
              variant="outline-success"
              type="submit"
              size="sm"
            >
              Edit
            </Button>
          </div>
        </form>
      </Modal>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <br />
      <div className="table-responsive border pb-0">
        <table className="table designed-table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Quote</th>
              <th scope="col">Created</th>
              <th scope="col">Quote By</th>
              <th hidden={adminRoles() === 5} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quoteData?.result?.map((value, index) => {
              //       console.log(value)
              return (
                <>
                  <tr key={index}>
                    <td>
                      <Avatar
                        src={value?.img}
                        alt=""
                        style={{ objectPosition: "top" }}
                      />
                    </td>
                    <td scope="row">{value?.id}</td>
                    <td>{value?.title}</td>
                    <td>{value?.quote?.slice(0, 20)}...</td>
                    <td>{moment(value?.created_at).fromNow()}</td>
                    <td>{value?.quoteBy}</td>
                    <td hidden={adminRoles() === 5}>
                      <Button
                        type="button"
                        onClick={() => {
                          handleShowModal("edit");
                          setEditTitle(value?.title);
                          setEditQuote(value?.quote);
                          setEditImg(value?.img);
                          setEditQuoteBy(value?.quoteBy);
                          setEditId(value?.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        hidden={adminRoles() === 3}
                        variant="outlined"
                        color="error"
                        type="button"
                        onClick={() => {
                          handleDelete(value?.id);
                        }}
                        className="ms-2 border"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="bg-light p-3">
          <div className="d-flex justify-content-between">
            <span className="text-dark">
              Showing {quoteData?.result?.length} out of {quoteData?.count}
            </span>
            <div className="d-flex align-items-center">
              <select
                name="limit"
                className="form-select"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
              <Button
                size="sm"
                variant="outline-primary"
                disabled={Number(offset) < Number(limit) ? true : false}
                onClick={handlePaginationPrev}
                className="text-capitalize h-100 mx-2"
              >
                prev
              </Button>
              <ButtonBase>{offset ? offset / limit + 1 : 1}</ButtonBase>
              <Button
                size="sm"
                onClick={handlePaginationNext}
                disabled={
                  Number(offset) + Number(limit) + 1 > quoteData?.count
                    ? true
                    : false
                }
                variant="outline-primary"
                className="text-capitalize h-100 ms-2"
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuotesDataTable;
