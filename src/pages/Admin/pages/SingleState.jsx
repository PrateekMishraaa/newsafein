import { Upload, YouTube } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { apiJsonAuth } from "api";
import { useFormik } from "formik";
import { pop2, Popup } from "utils/Popup";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SingleState() {
  const { id } = useParams();
  const ContectForm = useFormik({
    initialValues: {
      qoute: "",
      qouteBy: "",
      link: "",
    },
    onSubmit: async function (values, actions) {
      Popup("loading...");
      console.log("ID", id);
      if ((values.qouteBy && values.qoute) || values.link) {
        try {
          const res = await apiJsonAuth.post(
            `/public/adminState?state=${id}`,
            values
          );
          if (res.status == 200) {
            pop2.success({ title: "Data Uploaded..." })
            actions.resetForm();
            console.log(res);
          }
        } catch (err) {
          console.log(err);
          Popup("error", err?.response?.data?.message);
        }
      } else {
        pop2.warning({ title: "All Fields Required!" });
      }
    },
  });
  //   const VideoFormik = useFormik({
  //     initialValues: {
  //       videolink: "",
  //       videotitle: "",
  //     },
  //     onSubmit: async function (values, actions) {
  //       Popup("loading...");
  //       console.log(values, "IDDD");
  //       if (values.videotitle && values.videolink) {
  //         try {
  //           const res = await apiAuth.post(`admin/institute-gallery/`, values);
  //           if (res.status == 200) {
  //             actions.resetForm();
  //             setupdate(update + 1);
  //           }
  //         } catch (err) {
  //           Popup("error", err?.response?.data?.message);
  //         }
  //       } else {
  //         pop2.warning({ title: "please fill all the fields" });
  //       }
  //     },
  //   });
  //   const GalleryFormik = useFormik({
  //     initialValues: {
  //       videolink: "",
  //       videotitle: "",
  //     },
  //     onSubmit: async function (values, actions) {
  //       Popup("loading...");
  //       console.log(values, "IDDD");
  //       if (values.videotitle && values.videolink) {
  //         try {
  //           const res = await apiAuth.post(`admin/institute-gallery/`, values);
  //           if (res.status == 200) {
  //             actions.resetForm();
  //             setupdate(update + 1);
  //           }
  //         } catch (err) {
  //           Popup("error", err?.response?.data?.message);
  //         }
  //       } else {
  //         pop2.warning({ title: "please fill all the fields" });
  //       }
  //     },
  //   });
  return (
    <div>
      <h3 className="text-center fs-4">Student Login Page Content</h3>
      <div className="container border rounded-4">
        <div
          className=" container-md  h-100 text-center item-center rounded-4 p-3"
          style={{ maxWidth: "800px" , }}
        >
          <Box>
            <h5 className="fs-5 text-decoration-underline">Add inspirational quotes </h5>
            <FormControl fullWidth className="mx-auto">
              <TextField
                rows={4}
                multiline
                value={ContectForm.values.qoute}
                onChange={ContectForm.handleChange}
                label="Add Qoute..."
                name="qoute"
                variant="outlined"
              />
            </FormControl>
            <FormControl className="mx-auto mt-2">
              <TextField
                label="Qoute Given By"
                value={ContectForm.values.qouteBy}
                onChange={ContectForm.handleChange}
                name="qouteBy"
                variant="outlined"
              />
            </FormControl>
            <div className="m-2 ">
              <Button
                onClick={ContectForm.handleSubmit}
                variant="outlined"
                endIcon={<Upload />}
              >
                Upload
              </Button>
            </div>

          </Box>
        </div>
        <div
          className=" container-md border rounded-5 shadow p-3 item-center mt-2 mb-5"
          style={{ maxWidth: "800px" }}
        >
          <Box>
            <h5 className="fs-5 text-decoration-underline">Add Youtube Video</h5>
            <FormControl fullWidth className="mx-2 mt-2 px-2">
              <Tooltip
                title="Double Click To Paste Link.."
                placement="bottom-start"
              >
                <Input
                  id={"link"}
                  placeholder={"Add Embed Link Here."}
                  value={ContectForm.values.link}
                  onChange={ContectForm.handleChange}
                  name={"link"}
                  onDoubleClick={(e) =>
                    navigator.clipboard
                      .readText()
                      .then((link) => ContectForm.setFieldValue("link", link))
                  }
                  variant={"filled"}
                  startAdornment={
                    <InputAdornment position="start">
                      <YouTube fontSize="medium" sx={{ color: "red" }} />
                    </InputAdornment>
                  }
                />
              </Tooltip>
            </FormControl>
            <div className="container-sm text-center item-center mt-5">
              <Button
                onClick={ContectForm.handleSubmit}
                variant="outlined"
                endIcon={<Upload />}
              >
                Upload
              </Button>
            </div>
          </Box>

        </div>
      </div>

      {/* <div className="border rounded-4 p-3 mt-4">
        <h2 className="fs-3">Add Youtube</h2>
        <form onSubmit={Formik.handleSubmit}>
          <div class="mb-3">
            <label for="videotitle" class="form-label">
              Title
            </label>
            <input
              type="text"
              name="videotitle"
              className="form-control "
              id="videotitle"
              value={VideoFormik.values.videotitle}
              onChange={VideoFormik.handleChange}
            />
          </div>
          <div class="mb-3">
            <label for="videolink" class="form-label">
              Link
            </label>
            <input
              type="text"
              name="videolink"
              className="form-control "
              id="videolink"
              value={VideoFormik.values.videolink}
              onChange={VideoFormik.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>

      <div className="border rounded-4 p-3 mt-4">
        <h2 className="fs-3">Add Image To Gallery</h2>
        <form onSubmit={GalleryFormik.handleSubmit}>
          <div class="mb-3">
            <label for="galleryimg" class="form-label">
              Image
            </label>
            <input
              type="file"
              name="galleryimg"
              className="form-control pt-3"
              id="galleryimg"
              onChange={(e) => {
                if (e.target.files.length) {
                  GalleryFormik.setFieldValue("galleryimg", e.target.files[0]);
                }
              }}
            />
          </div>
          <div class="mb-3">
            <label for="gallerytitle" class="form-label">
              Title
            </label>
            <input
              type="text"
              name="gallerytitle"
              className="form-control "
              id="gallerytitle"
              value={GalleryFormik.values.gallerytitle}
              onChange={GalleryFormik.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default SingleState;
