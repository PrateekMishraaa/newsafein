import { apiAuth, apiJson } from "api";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyCKEditor from "utils/CKEditor";

function EditNews() {
  let id = useParams();
  console.log(id.id);
  let idToSend = id.id;
  let [newsData, setNewsData] = useState("");

  let [newsContent, setNewsContent] = useState();

  const getNewsById = async () => {
    console.log("Fetching Quites Data ");
    try {
      console.log(`admin/news/edit/${id.id}`);
      const res = await apiJson.get(`admin/news/edit/${id.id}`);
      console.log(res, id);
      if (res.status == 200) {
        console.log("All news Data: ", res.data.result);
        setNewsData(res?.data?.result);
        setNewsContent(res?.data?.result?.content);
      }
    } catch (error) {
      console.log("All News Error: ", error);
    }
  };
  useEffect(() => {
    console.log(newsData);
    getNewsById();
  }, []);

  const Formik = useFormik({
    initialValues: {
      title: newsData.title ? newsData.title : "",
      heading: newsData.heading ? newsData.heading : "",
      content: newsData.content ? newsData.content : "",
      img: "",
      bgimg: "",
      author: newsData.author ? newsData.author : "",
    },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      console.log("values: ", values, newsContent);
      const data = { ...values, content: newsContent, id: idToSend };
      console.log(data);
      try {
        const res = await apiAuth.put("admin/news", data);
        if (res.status == 200 || res?.success == 1) {
          window.history.back();
        }
      } catch (err) {
        console.log(err);
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
      <h4>Edit News</h4>
      <div>
        <form onSubmit={Formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
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
            <label htmlFor="heading" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" name="heading" value={Formik.values.heading} id="heading" onChange={Formik.handleChange} />
          </div>
          <label htmlFor="img" className="form-label">
            Image
          </label>
          <div className="mb-3 d-flex justify-content-around">
            <img className="me-2" src={newsData.img} width="200" />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="form-control pt-3"
              name="files[]"
              id="img"
              onChange={(e) => {
                if (e.target.files.length) {
                  Formik.setFieldValue("img", e.target.files[0]);
                }
              }}
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="bgimg" className="form-label">Background Image</label>
            <input type="file" className="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange} />
          </div> */}
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input type="text" className="form-control" name="author" value={Formik.values.author} id="author" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Content" className="form-label">
              Content
            </label>
            <MyCKEditor
              setContent={setNewsContent}
              content={newsContent}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditNews;
