import { DeleteForever } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import { apiAuth } from 'api'
import { useFormik } from 'formik'
import NotFoundGif from 'layout/fallback/NotFoundGif'
import React, { memo, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

function MediaCoverages() {
  const [mediaPost, setMediapost] = useState(false);
  const model = useRef();

  useEffect(() => {
    async function fetchMedia() {
      try {
        const { data } = await apiAuth.get(
          `institute/institute-media`
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
            const res = await apiAuth.delete(`institute/institute-media?id=${id}`);
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
      img: "",
    },
    onSubmit: async function (values, actions) {
      toast.loading("Adding Media Coverage");
      try {
        if (values.title && values.desc && values.img) {
          const res = await apiAuth.post(
            `institute/institute-media`,
            values,
          );
          if (res.status == 200) {
            actions.resetForm();
            toast.dismiss();
            toast.success("Media Post Uploaded..")
            setMediapost(false);
            model.current.click();
          } else {
            toast.dismiss();
            toast.error("Something Went Wrong!!")
          }
        } else {
          toast.dismiss();
          toast.warning("Image is Required!")
        }
      } catch (err) {
        toast.dismiss();
        toast("error", "Something Went Worng..");
      }
    },
  })
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fs-3 mx-2">Media Coverage</h2>
        <Button
          type="submit"
          variant="outlined"
          className="rounded-3"
          color="success"
          data-bs-toggle="modal"
          data-bs-target="#mediaCoverages"
        >
          Add More.
        </Button>
      </div>
      <div
        className="modal fade"
        id="mediaCoverages"
        tabIndex="-1"
        aria-labelledby="mediaCoverages"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={form.handleSubmit} onSubmitCapture={e => { e.target.img.value = null; }}>
              <div className="modal-header">
                <h1 className="modal-title fs-5"
                  id="mediaCoverages">
                  Media Coverage
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
                  <TextField className='my-2' name='title' label='Title' value={form.values.title} onChange={form.handleChange} required fullWidth />
                  <TextField multiline minRows={2} className='my-2' name='desc' label='Description' value={form.values.desc} onChange={form.handleChange} required fullWidth />
                  <TextField className='my-2' name='link' label='Link' value={form.values.link} onChange={form.handleChange} fullWidth />
                  <Button className='my-2' variant='outlined' >
                    <input id='img' onClick={e => e.target.value = null} className='my-2' accept=".png, .jpg, .jpeg" type='file' name='img' onChange={(e) => { if (e.target.files[0]?.size < 2000000) { form.setFieldValue('img', e.target.files[0]) } else { toast.error("File size too Large. \n Max Size 2MB."); e.target.value = null; } }} label='Image' />
                  </Button>
                </div>
              </div>
              <div className="modal-footer">
                <Button className='m-2' type='submit' variant="contained" data-bs-dismiss="modal">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4'>
          {mediaPost?.length ? mediaPost?.map((media) => {
            return <div className='col' key={media?.id}>
              <div className='card m-3 shadow-lg border-4 overflow-hidden p-2 p-lg-3'>
                <img style={{ height: "220px", objectFit: "cover" }} src={media?.img} alt="" className='w-100 d-block' />
                <div className='container rounded position-relative p-2'>
                  <IconButton className='position-absolute top-0 end-0 ' onClick={() => { handelDelete(media?.id) }} ><DeleteForever sx={{ color: "tomato", fontSize: "50" }} /></IconButton>
                  <p className='fs-5 lh-1'>{media?.title}</p>
                  <small className='lh-1 line-clamp'>{media?.desc}</small>
                </div>
              </div>
            </div>
          }) :
            <div className="container text-center item-center mx-auto">
              <NotFoundGif text={"Media Coverage Not Added Yet!!"} />
            </div>}
        </div>
      </div>
    </div >
  )
}

export default memo(MediaCoverages)