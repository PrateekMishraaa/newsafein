import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { apiAuth } from "api";
import { Popup } from "utils/Popup";
import { toast } from "react-hot-toast";
import MyCKEditor from "utils/CKEditor";

const AddBlog = (props) => {
  let [blogContent, setBlogContent] = useState();
  const Formik = useFormik({
    initialValues: {
      title: "",
      heading: "",
      content: "",
      img: "",
      bgimg: "",
      author: "",
    },
    onSubmit: async (values, action) => {
      Popup("loading");
      if (blogContent.length) {
        const data = { ...values, content: blogContent };
        try {
          const res = await apiAuth.post("admin/blogs", data);
          if (res.status == 200 || res?.success == 1) {
            window.history.back();
            Popup("success", res?.data?.message, undefined, 1500);
          }
        } catch (err) {
          Popup("error", err?.response?.data?.message);
        }
      } else{
        toast.error("All fields are Required!!");
      }

    },
  });

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["clean"],
    ],
  };
  return (
    <>
      <div>
        <form onSubmit={Formik.handleSubmit}>
          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={Formik.values.title}
              name="title"
              aria-describedby="title"
              onChange={Formik.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="heading" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" name="heading" value={Formik.values.heading} id="heading" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label for="img" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control pt-3"
              name="files[]"
              id="img"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                if (e.target.files.length) {
                  Formik.setFieldValue("img", e.target.files[0]);
                }
              }}
            />
          </div>
          {/* <div className="mb-3">
            <label for="bgimg" className="form-label">Background Image</label>
            <input type="file" className="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange} />
          </div> */}
          <div className="mb-3">
            <label for="author" className="form-label">
              Author
            </label>
            <input type="text" className="form-control" name="author" value={Formik.values.author} id="author" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label for="Content" className="form-label">
              Content
            </label>
            <MyCKEditor content={blogContent} setContent={setBlogContent} placeholder="Content goes here..." />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
