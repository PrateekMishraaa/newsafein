import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteForever, EditTwoTone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { pop2, Popup } from "utils/Popup";
import Swal from "sweetalert2";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";
import { Modal } from "react-bootstrap";

export function AdminInstituteGallery() {
  let [galleryData, setGalleryData] = useState();
  const { ErrorResponder } = useError();
  let [update, setupdate] = useState();
  let [openAddForm, setOpenAddForm] = useState(false);
  const { id } = useParams();
  const { adminRoles } = useGlobalContext();
  const getGalleryById = async () => {
    // console.log("Fetching Resources Data ", id);
    try {
      const res = await apiAuth.get(`admin/institute-gallery/${id}`);
      console.log(`admin/institute-gallery/${id}`);

      if (res.status == 200) {
        console.log(res?.data?.result);
        setGalleryData(res?.data?.result);
        // console.log(galleryData)
      }
    } catch (error) {
      ErrorResponder(error);
      // console.log("All Quotes Error: ", error);
    }
  };

  useEffect(() => {
    getGalleryById();
  }, [update]);

  const Formik = useFormik({
    initialValues: {
      img: "",
      alttext: "",
    },
    onSubmit: async function (values, actions) {
      if (values.img) {
        if (!values.alttext.length) {
          values.alttext = values?.img?.name;
        }
        try {
          const res = await apiAuth.post(`admin/institute-gallery/${id}`, values);
          if (res.status == 200) {
            actions.resetForm();
          }
          setupdate(update + 1);
        } catch (err) {
          ErrorResponder(err);
        }
      } else {
        pop2.warning({ title: "please fill all the fields" });
      }
    },
  });

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4>Gallery</h4>
          <button
            hidden={!(adminRoles() === 1)}
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              openAddForm ? setOpenAddForm(false) : setOpenAddForm(true);
            }}>
            Add Images
          </button>
        </div>
        <div className="resources-data table-responsive rounded-3 border">
          <table className="table">
            <thead className="table-danger">
              <tr>
                <th scope="col">id</th>
                <th scope="col">image</th>
                <th scope="col">alttext</th>

                <th hidden={adminRoles() === 3 || adminRoles() === 5} scope="col">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {galleryData?.map((data) => {
                {
                  /* console.log(data) */
                }
                return (
                  <>
                    <tr>
                      <th scope="row">{data?.id} </th>
                      <td>
                        {" "}
                        <img src={data?.img} height="100px" />{" "}
                      </td>
                      <td>{data?.alttext} </td>
                      <td hidden={adminRoles() === 3 || adminRoles() === 5}>
                        <IconButton
                          sx={{ color: "tomato" }}
                          onClick={async () => {
                            // Updation("delete", undefined,ele?.id);
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You wanted to delete this Resouorce!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                try {
                                  // console.log(data.id)
                                  const res = await apiJsonAuth.delete(`admin/institute-gallery?id=${data?.id}`);
                                  if (res?.status == 200) {
                                    Swal.fire({
                                      title: res.data.message,
                                      icon: "success",
                                    });
                                    setupdate(update + 1);
                                  }
                                } catch (error) {
                                  ErrorResponder(error);
                                }
                              }
                            });
                          }}>
                          <DeleteForever fontSize="large" />
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
      {/* Add Image Modal */}
      <Modal show={openAddForm} onHide={() => setOpenAddForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark fs-5">Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div hidden={!(adminRoles() === 1)}>
            <form onSubmit={Formik.handleSubmit}>
              <div class="mb-3">
                <label for="img" class="form-label">
                  Image
                </label>
                <input
                  type="file"
                  name="img"
                  accept=".png, .jpg, .jpeg"
                  className="form-control"
                  id="img"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Formik.setFieldValue("img", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="alttext" class="form-label">
                  AltText
                </label>
                <input type="text" name="alttext" className="form-control " id="alttext" value={Formik.values.alttext} onChange={Formik.handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
