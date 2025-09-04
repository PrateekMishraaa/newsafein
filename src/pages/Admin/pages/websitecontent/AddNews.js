import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { apiAuth } from 'api';
import MyCKEditor from 'utils/CKEditor';

const AddNews = () => {
  let [newsContent, setNewsContent] = useState();
  const Formik = useFormik({
    initialValues: {
      title: "",
      heading: "",
      content: "",
      img: "",
      bgimg: "",
      author: "",
      publish_date: "",
    },
    onSubmit: async (values, action) => {
      console.log("values: ", values, newsContent);
      const data = { ...values, content: newsContent }
      console.log(data)
      try {
        const res = await apiAuth.post('admin/news', data);
        if (res.status == 200 || res?.success == 1) {
          window.history.back();

        }
      } catch (err) {
        console.log(err);
      }
    }
  })

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
  // chr(34)= ""
  // chr(32)= space
  //TODO: replace(chr(34) with chr(32) before sending data to database)
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("title:" + title, "heading" + heading, "content" + content, "img" + img, "bgImg" + bgImg, "author" + author);
  // }
  return (
    <>
      <div>
        <form onSubmit={Formik.handleSubmit}>
          <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={Formik.values.title} name='title' aria-describedby="title" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label for="heading" className="form-label">Description</label>
            <input type="text" className="form-control" name='heading' value={Formik.values.heading} id="heading" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label for="img" className="form-label">Image</label>
            <input type="file" className="form-control  pt-3" accept=".png, .jpg, .jpeg" name="files[]" id="img" onChange={(e) => {
              if (e.target.files.length) {
                Formik.setFieldValue("img", e.target.files[0])
              }
            }} />
          </div>
          {/* <div className="mb-3">
            <label for="bgimg" className="form-label">Background Image</label>
            <input type="file" className="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange} />
          </div> */}
          <div className="mb-3">
            <label for="author" className="form-label">Author</label>
            <input type="text" className="form-control" name='author' value={Formik.values.author} id="author" onChange={Formik.handleChange} />
          </div>

          <div className="mb-3">
            <label for="publishDate" className="form-label">Publish Date</label>
            <input type="date" className="form-control" name='publish_date' value={Formik.values.publish_date} id="publishDate" onChange={Formik.handleChange} />
          </div>
          <div className="mb-3">
            <label for="Content" className="form-label">Content</label>
            <MyCKEditor content={newsContent} setContent={setNewsContent} />

          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddNews