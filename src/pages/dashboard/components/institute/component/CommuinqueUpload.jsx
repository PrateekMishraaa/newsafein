import { DeleteForever, Link } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { apiAuth } from 'api'
import { useFormik } from 'formik'
import NotFoundGif from 'layout/fallback/NotFoundGif'
import React, { memo, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

function CommuinqueUpload() {
  const [mediaPost, setMediapost] = useState(false);
  const model = useRef();

  useEffect(() => {
    async function fetchMedia() {
      try {
        const { data } = await apiAuth.get(
          `institute/institute-comque`
        );
        if (data?.status) {
          setMediapost(data.result)
          // console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!mediaPost) {
      fetchMedia();
    }
  }, [mediaPost])

  async function handelDelete(id) {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You wanted to delete this Resouorce!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await apiAuth.delete(`institute/institute-comque?id=${id}`);
            // console.log(res);
            if (res) {
              toast.success("Deleted Successfully..")
              setMediapost(false);
            }
          } catch (error) {
            toast.error("Somting went Wrong!!");
            console.log(error);
          }
        }
      })
    }
  }


  const form = useFormik({
    initialValues: {
      title: "",
      link: "",
      desc: "",
      file: "",
    },
    onSubmit: async function (values, actions) {
      try {
        if (values.title && values.desc && (values.link || values.file)) {
          const res = await apiAuth.post(
            `institute/institute-comque`,
            values,
          );
          if (res.status == 200) {
            actions.resetForm();
            toast.success("Media Post Uploaded..")
            setMediapost(false);
            model.current.click();
          } else {
            toast.error("All Fields are Required!")
          }
          console.log(values)
        } else {
          toast.warning("Please fill Required fields.")
        }
      } catch (err) {
        toast("error", "Something Went Worng..");
      }
    },
  })
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fs-3 mx-2">Commuinque</h2>
        <Button
          type="submit"
          variant="outlined"
          className="rounded-3"
          color="success"
          data-bs-toggle="modal"
          data-bs-target="#Commuinque"
        >
          Add More.
        </Button>
      </div>
      <div
        className="modal fade"
        id="Commuinque"
        tabIndex="-1"
        aria-labelledby="Commuinque"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={form.handleSubmit} onSubmitCapture={e => { e.target.img.value = null; }}>
              <div className="modal-header">
                <h1 className="modal-title fs-5"
                  id="Commuinque">
                  Upload Commuinque
                </h1>
                <button
                  type="button"
                  ref={model}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className='container' >
                  <TextField className='my-2' name='title' label='Document Name' value={form.values.title} onChange={form.handleChange} required fullWidth />
                  <TextField multiline minRows={1} className='my-2' name='desc' label='Document Details' value={form.values.desc} onChange={form.handleChange} required fullWidth />
                  <TextField className='my-2' name='link' label='Link' value={form.values.link} onChange={form.handleChange} fullWidth />
                  <p className='mx-5 my-0 lh-1 p-0'>OR</p>
                  <Button className='my-2' variant='outlined' >
                    <input id='img' accept=".png, .jpg, .jpeg" onClick={e => e.target.value = null} className='my-2' type='file' name='img' onChange={(e) => { if (e.target.files[0]?.size < 2000000) { form.setFieldValue('file', e.target.files[0]) } else { toast.error("File size too Large. \n Max Size 2MB."); e.target.value = null; } }} label='Image' />
                  </Button>
                </div>
              </div>
              <div className="modal-footer">
                <Button className='m-2' type='submit' variant="contained" data-bs-dismiss="modal" >Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 flex-wrap  justify-content-start'>
          {mediaPost?.length ? mediaPost?.map((media) => {
            // console.log({ media });
            return <div className='col' key={media?.id}>
              <div className='card m-3 shadow-lg border-4 position-relative overflow-hidden'>
                <div className='position-absolute top-0 end-0 shadow-lg ' onClick={() => { handelDelete(media?.id) }} ><DeleteForever sx={{ color: "red", fontSize: "50" }} /></div>
                <div className='my-4'>
                  <a target='_blank' href={media?.link || media?.file}>
                    <img
                      src="https://glcloud.in/images/static/media/document.jpeg"
                      alt=""
                      className=" p-3 w-100 d-block"
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                  </a>
                </div>
                <div className='container rounded text-center position-relative p-2'>
                  <p className='fs-5 p-1 lh-1 mb-0'>{media?.title}</p>
                  <small className='lh-1 pb-1 text-truncate line-clamp text-dark'>{media?.desc}</small>
                  {media?.link ? <Button variant='outlined' href={media?.file} target='_blank' className='mt-2'><Link /> Communique Link</Button> : ""}
                </div>
              </div>
            </div>
          }) :
            <div className="container text-center item-center mx-auto">
              <NotFoundGif text={"Documents Not Added Yet!!"} />
            </div>}
        </div>
      </div>
    </div >
  )
}

export default memo(CommuinqueUpload)
