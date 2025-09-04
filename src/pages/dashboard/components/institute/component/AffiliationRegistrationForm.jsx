import { FilePresentTwoTone } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { apiJson } from "../../../../../api";
import Swal from "sweetalert2";
import { pop2, Popup } from "utils/Popup";
import { useOutletContext } from 'react-router-dom';
import { useGlobalContext } from 'global/context';

function AffiliationInstituteRegistration() {
  const [
    // details,
    // students,
    // fetchStudents,
    // fetchDelegates,
    // certificates,
    // delegates,
    // shareableLink,
    // DownloadQR,
    // fetchStdCoordinate,
    // StdCoordinate,
    // searchTerm,
    // setSearchTerm,
    // fetchDetails,
    affiliated,
    // setAffiliated,
    // isAffiliated,
    // setIsAffiliated,
    // getAffiliateInstitute,
  ] = useOutletContext();
  const [state, setState] = useState(0);
  const closeBtn = useRef();
  let { userData } = useGlobalContext();
  const [submitState, setSubmitState] = React.useState(false);
  const onSubmit = async (values, action) => {
    try {
      setSubmitState(true);
      Popup("loading");
      // captchaRef.current.reset();
      const registerto = await apiJson.post("/register/institutionAffiliation?affiliate_id=" + affiliated[0].id + "&institution_name=" + userData?.institution_name, { ...values, pincode: String(values.pincode) });
      if (registerto) {
        setSubmitState(false)
      }
      if (registerto.status === 200) {
        Swal.fire({
          title: "Registered",
          text: "Successfullsy",
          icon: "success",
        });
        action.resetForm();
        closeBtn.current.click();
        pop2("Registered Successfully")
        window.location.reload();
        //   // window.location.reload();
        //   // navigator("/");
      }


    } catch (error) {
      setSubmitState(false)
      if (error?.response?.status === 400 || error?.response?.status === 409 || error?.response?.status === 403) {
        pop2.warning({ title: "Warning", description: error?.response?.data?.message });
        // } else {
        //   pop2.error({ title: "Error", description: error?.response?.data?.message });
      }
    }
  };
  const { values, errors, touched, handleSubmit, handleChange, submitForm } = useFormik({
    initialValues: {
      title: "Mr.",
      first_name: "",
      last_name: "",
      institute_name: "",
      institute_address: "",
      state: "",
      district: "",
      pincode: "",
      email: "",
      confirm_email: "",
      contact: "",
    },
    // validationSchema: instituteregisterSchema,
    onSubmit,


  });
  const [states, setStates] = useState([]);
  const fetchStates = async () => {
    try {
      const res = await apiJson.get("/public/stateanddistrict");
      if (res.status === 200) {
        setStates(res.data.data);
      }
    } catch (error) {
      Popup("error", "Error Geting States", "Please try again later or reload the website");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStates();
  }, []);
  const setActiveState = (id) => {
    setState(states.findIndex((x) => x?.state === id));
  };

  // captcha Load
  // console.log("TOUCHED", touched);
  return (
    <div className='h-100'>
      <Button
        type="button"
        variant="outlined"
        color="success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className="text-capitalize py-2 rounded-3 h-100 px-4"
      // data-bs-toggle="modal"
      // data-bs-target="#exampleModal"
      // onClick={() => {
      //   navigate('/registration')
      // }}
      >
        <FilePresentTwoTone />
        Insitute Register
      </Button>
      <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Yuvamanthan</h5>
              <button type="button" ref={closeBtn} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: "1100px" }}>
                      <div className="row g-3 gy-2 text-dark fw-semibold">
                        <div className="col-4 col-lg-2">
                          <span className="form-label">Title </span>
                          <select
                            required
                            id="title"
                            value={values.title}
                            onChange={handleChange}
                            className={errors.title && touched.title ? "form-select py-3 ps-3 pe-3 border-danger" : "form-select py-3 ps-3 pe-3"}
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                        </div>
                        <div className="col-8 col-lg-5">
                          <span className="form-label">
                            First Name <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            type="text"
                            id="first_name"
                            value={values.first_name}
                            onChange={handleChange}
                            className={errors.first_name && touched.first_name ? "form-control border-danger" : "form-control"}
                          />
                          {errors.first_name && touched.first_name && <span className="text-danger fnt-small">{errors.first_name}</span>}
                        </div>
                        <div className="col-12 col-md-12 col-lg-5">
                          <span className="form-label">
                            Last Name <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            type="text"
                            id="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                            className={errors.last_name && touched.last_name ? "form-control border-danger" : "form-control"}
                          />
                          {touched.last_name && <span className="text-danger fnt-small">{errors.last_name}</span>}
                        </div>

                        <div className="col-12 ">
                          <span className="form-label">
                            Institution/College Name where the event will be organised <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            type="text"
                            id="institute_name"
                            value={values.institute_name}
                            onChange={handleChange}
                            className={errors.institute_name && touched.institute_name ? "form-control border-danger" : "form-control"}
                          />
                          {errors.institute_name && touched.institute_name && <span className="text-danger fnt-small">{errors.institute_name}</span>}
                        </div>
                        <div className="col-12">
                          <span className="form-label">
                            Institution/College Address <b className="text-danger">*</b>
                          </span>
                          <input

                            required
                            type="text"
                            id="institute_address"
                            value={values.institute_address}
                            onChange={handleChange}
                            className={errors.institute_address && touched.institute_address ? "form-control border-danger" : "form-control"}
                          />
                          {errors.institute_address && touched.institute_address && <span className="text-danger fnt-small">{errors.institute_address}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            State <b className="text-danger">*</b>
                          </span>
                          <select
                            required
                            id="state"
                            name="state"
                            onChange={handleChange}
                            onChangeCapture={(e) => {
                              setActiveState(e.target.value);
                            }}
                            className={touched.state && errors.state ? "form-control border-danger" : "form-control"}
                            type="text"
                          >
                            <option value={""}>--Select State--</option>
                            {states?.map((state, i) => {
                              return (
                                <option key={i} value={state?.state}>
                                  {state?.state}
                                </option>
                              );
                            })}
                          </select>
                          {errors.state && touched.state && <span className="text-danger fnt-small">{errors.state}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            District <b className="text-danger">*</b>
                          </span>
                          <select
                            required
                            id="district"
                            name="district"
                            value={values.district}
                            onChange={handleChange}
                            className={errors.district && touched.district ? "form-control border-danger" : "form-control"}
                            type="text"
                          >
                            <option value={""}>--Select District--</option>
                            {states[state]?.District.map((district, i) => {
                              return (
                                <option key={i} value={district?.district}>
                                  {district?.district}
                                </option>
                              );
                            })}
                          </select>
                          {errors.district && touched.district && <span className="text-danger fnt-small">{errors.district}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            Pincode <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            id="pincode"
                            name="pincode"
                            value={values.pincode}
                            onChange={handleChange}
                            className={errors.pincode && touched.pincode ? "form-control border-danger" : "form-control"}
                            type="number"
                          />
                          {errors.pincode && touched.pincode && <span className="text-danger fnt-small">{errors.pincode}</span>}
                        </div>
                        {/* contact Information  */}
                        <div className="col-12">
                          <hr className="my-4" />
                          <h5>Contact Information</h5>
                        </div>
                        <div className="col-12 col-lg-6">
                          <span className="form-label">Email <b className="text-danger">*</b></span>
                          <input
                            required
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className={errors.email && touched.email ? "form-control border-danger" : "form-control"}
                            type="email"
                          />
                          {errors.email && touched.email && <span className="text-danger fnt-small">{errors.email}</span>}
                        </div>
                        <div className="col-12 col-lg-6">
                          <span className="form-label">
                            Confirm Email <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            id="confirm_email"
                            name='confirm_email'
                            value={values.confirm_email}
                            onChange={handleChange}
                            className={errors.confirm_email ? "form-control border-danger" : "form-control"}
                            type="email"
                          />
                          {errors.confirm_email && touched.confirm_email && <span className="text-danger fnt-small">{errors.confirm_email}</span>}
                        </div>
                        <div className="col-12">
                          <span className="form-label">
                            Contact Number <b className="text-danger">*</b>
                          </span>
                          <input
                            required
                            id="contact"
                            value={values.contact}
                            onChange={handleChange}
                            className={errors.contact && touched.contact ? "form-control border-danger" : "form-control"}
                            type="tel"
                          />
                          {errors.contact && touched.contact && <span className="text-danger fnt-small">{errors.contact}</span>}
                        </div>

                        <div className="col-12">
                          <Button
                            type="submit"
                            variant="contained"
                            color="warning"
                            fullWidth
                            size="large"
                            className={submitState ? "hover-ripple text-capitalize py-3 bg-success" : "hover-ripple text-capitalize py-3"}
                            
                          >
                            {submitState ? <div className="d-flex justify-content-around text-light"> <div class="spinner-border" role="status">
                              <span class="visually-hidden">loading...</span>
                            </div><span className="text-light mx-3 text-capitalize">Registering...</span> </div> : "Register Now"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>


              </div>

              {/* <!-- background shape --> */}

            </div>
            <div class="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              {/* <button type="button" class="btn btn-primary">Understood</button>
               */}
              {/* <div className="col-12">
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              className="hover-ripple text-capitalize py-3"
            >
              REGISTER NOW
            </Button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AffiliationInstituteRegistration
