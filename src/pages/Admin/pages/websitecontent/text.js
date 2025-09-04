import { Quickreply } from '@mui/icons-material'
import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useFormik } from 'formik';
import { apiJson } from 'api';
import MyCKEditor from 'utils/CKEditor';


const AddBlog = (props) => {
  let [blogTitle, setBlogTitle] = useState("");
  let [blogHeading, setBlogHeading] = useState("");
  let [blogContent, setBlogContent] = useState();
  let [blogImg, setBlogImg] = useState();
  let [blogBgImg, SetBlogBgImg] = useState();
  let [blogAuthor, setBlogAuthor] = useState("");


  const Formik = useFormik({
    initialValues:{
      title:"",
      heading:"",
      content:"",
      img:"",
      bgimg:"",
      author:"",
    },
    onSubmit: async(values, action)=>{
      console.log("values: ", values);
      try{
        const res = await apiJson.post('admin/blogs', values);
        if(res.status == 200 || res?.success == 1){
          
        }
      }catch(err){
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
      <div>AddBlog</div>
      <div>
        <form onSubmit={Formik.handleChange}>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" value={Formik.values.title} name='title' aria-describedby="title" onChange={Formik.handleChange}  />

          </div>
          <div class="mb-3">
            <label for="heading" class="form-label">Heading</label>
            <input type="text" class="form-control" name='heading' value={Formik.values.heading} id="heading" onChange={Formik.handleChange} />
          </div>
          <div class="mb-3">
            <label for="img" class="form-label">Image</label>
            <input type="file" accept=".png, .jpg, .jpeg" class="form-control pt-3" name="img" value={Formik.values.img} id="img" onChange={Formik.handleChange}/>
          </div>
          <div class="mb-3">
            <label for="bgimg" class="form-label">Background Image</label>
            <input type="file" accept=".png, .jpg, .jpeg" class="form-control pt-3" name='bgimg' value={Formik.values.bgimg} id="bgimg" onChange={Formik.handleChange}/>
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Author</label>
            <input type="text" class="form-control" name='author' value={Formik.values.author} id="author" onChange={Formik.handleChange}/>
          </div>
          <div class="mb-3">
            <label for="Content" class="form-label">Content</label>
            <MyCKEditor content={blogContent} setContent={setBlogContent} />

          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddBlog