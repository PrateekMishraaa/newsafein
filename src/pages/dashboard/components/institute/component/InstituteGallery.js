import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { pop2, Popup } from "utils/Popup";
import { useGlobalContext } from "global/context";
import Swal from "sweetalert2";
import { Button, IconButton, Tooltip } from "@mui/material";
import { DeleteForever, EditTwoTone } from "@mui/icons-material";
import useError from "hooks/useError";
import MediaCoverages from "./MediaCoverages";
import NotFoundGif from "layout/fallback/NotFoundGif";
import CommuinqueUpload from "./CommuinqueUpload";
import { toast } from "react-toastify";

function InstituteGallery() {
  const { userData, token } = useGlobalContext();
  let [galleryData, setGalleryData] = useState();
  let [updater, setUpdater] = useState(0);
  let [openAddForm, setOpenAddForm] = useState(false);
  const [img, setImg] = useState();
  let id = userData.id;
  const { ErrorResponder } = useError();
  const [disbleButton, setDisbleButton] = useState(true);

  const getGalleryById = async () => {
    // console.log("Fetching Resources Data ", id);
    try {
      const res = await apiAuth.get(`admin/institute-gallery/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(`admin/institute-gallery/${id}`);

      if (res.status == 200) {
        // console.log(res?.data?.result);
        setGalleryData(res?.data?.result);
        // console.log(galleryData);
      }
    } catch (error) {
      ErrorResponder(error);
      // console.log("All Quotes Error: ", error);
    }
  };
  useEffect(() => {
    if (token) {
      getGalleryById();
    }
  }, [updater, token]);

  const Formik = useFormik({
    initialValues: {
      img: "",
      alttext: "",
    },
    onSubmit: async function (values, actions) {
      toast.loading("Submitting the Images");
      setDisbleButton(false);
      // console.log(values, "IDDD", id);
      if (img) {
        values.img = img;
        if (token) {
          try {
            const res = await apiAuth.post(
              `institute/institute-gallery/${id}`,
              values,
              {
                header: {
                  Authorization: token,
                },
              }
            );
            if (res.status == 200) {
              actions.resetForm();
              setDisbleButton(true);
              getGalleryById();
              toast.dismiss();
              toast.success("Added Image Successfully");
            }
          } catch (err) {
            ErrorResponder(err);
            setDisbleButton(true);
            // Popup("error", err?.response?.data?.message);
          }
        }
      } else {
        pop2.warning({ title: "please fill all the fields" });
      }
    },
  });
  return (
    <>
      <div className="container p-3 mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="fs-3">
            Events Gallery <small>(max 6 images)</small>
          </h2>
          <Button
            type="submit"
            variant="outlined"
            className="rounded-3"
            color="success"
            data-bs-toggle="modal"
            data-bs-target="#addImageModal"
            disabled={galleryData?.length >= 6}
            onClick={() => {
              openAddForm ? setOpenAddForm(false) : setOpenAddForm(true);
            }}
          >
            Add Images
          </Button>
        </div>
        <div className="resources-data " style={{ minHeight: "400px" }}>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {galleryData?.length ? (
              galleryData?.map((data) => {
                return (
                  <div className="col">
                    <div
                      className="card rounded-3 shadow"
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <img src={data.img} className="card-img-top" alt="..." />
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{
                            background: "whitesmoke",
                            position: "absolute",
                            color: "tomato",
                            top: 5,
                            right: 5,
                            height: 30,
                            width: 30,
                            fontSize: 15,
                          }}
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
                                  // console.log(data.id);
                                  const res = await apiJsonAuth.delete(
                                    `admin/institute-gallery?id=${data?.id}`
                                  );
                                  if (res?.status == 200) {
                                    Swal.fire({
                                      title: res.data.message,
                                      icon: "success",
                                    });
                                    setUpdater(updater + 1);
                                  }
                                } catch (error) {
                                  ErrorResponder(error);
                                }
                              }
                            });
                          }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="container text-center item-center mx-auto">
                <NotFoundGif text={"Image Not Available!!"} />
              </div>
            )}
          </div>
        </div>
        <hr />
        <MediaCoverages />
        <hr />
        <CommuinqueUpload />
      </div>

      {/* <<!-- Modal --> */}
      <div
        className="modal fade"
        id="addImageModal"
        tabIndex="-1"
        aria-labelledby="addImageModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={Formik.handleSubmit}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addImageModalLabel">
                  Add Image To Gallery
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="rounded-4 ">
                  {/* <h2 className="fs-3">Add Image To Gallery</h2> */}

                  <div className="mb-3">
                    <label
                      htmlFor="img"
                      className="form-label text-dark text-dark"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      name="img"
                      accept=".png, .jpg, .jpeg"
                      className="form-control pt-3"
                      id="img"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          if (e.target.files[0].size < 2000000) {
                            setImg(e.target.files[0]);
                          } else {
                            e.target.value = null;
                            toast.warning("File size too Large. \n Max Size 2MB.")
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="alttext"
                      className="form-label text-dark text-dark"
                    >
                      Alt Text
                    </label>
                    <input
                      type="text"
                      name="alttext"
                      className="form-control "
                      id="alttext"
                      value={Formik.values.alttext}
                      onChange={Formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                  Discard
                </button> */}
                <Button
                  type="button"
                  className="m-2"
                  color="error"
                  data-bs-dismiss="modal"
                  variant="outlined"
                >
                  Discard
                </Button>
                {/* <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                  Add Image
                </button> */}
                <Button
                  type="submnit"
                  className="m-2"
                  color="success"
                  data-bs-dismiss="modal"
                  variant="outlined"
                  disabled={Formik.isSubmitting || !disbleButton}
                >
                  Add Image
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default InstituteGallery;
