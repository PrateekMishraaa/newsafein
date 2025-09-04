import { api, getYouthGallery } from "api";
import BreadCrumb from "layout/BreadCrumb";
import { Popup } from "utils/Popup";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "swiper/css/pagination";
import { Facebook, FormatQuote, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";
import { UserRegisterForm } from "components/auth";
import { useQuery } from "hooks";

const InstitutePublicPage = () => {
  let type = new URLSearchParams(useLocation().search).get("type");
  const { slug, user } = useParams();
  const { userData } = useGlobalContext();
  const navigate = useNavigate();
  let query = useQuery();
  let userType = user || query.get("type");
  const [details, setDetails] = useState({});

  const fetchCollegBySlug = async () => {
    Popup("loading");
    try {
      const res = await api.get(`/public/institute?slug='${slug}'`);
      // console.log("Response", res);
      if (res.status == 200) {
        setDetails(res.data.result[0]);
        Popup();
      }
    } catch (error) {
      toast.dismiss();
      toast.warning(error.response.data.message);
      navigate("/error");
    }
  };
  useEffect(() => {
    if (userData) {
      if (!slug) {
        Popup("error", `Invalid link`);
      } else {
        fetchCollegBySlug();
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <BreadCrumb heading={details?.institution_name} />
      <div className="py-4 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-white">
                <div>
                  <div className="row g-0">
                    <div className="col-12 col-md-9 order-2">
                      <div className="p-2 p-lg-3">
                        <h4 className="fs-2">{details?.institution_name}</h4>
                        <span className="text-dark font-ubd fs-6">
                          {details?.institution_address ? (
                            <>
                              {" "}
                              {details?.institution_address}, {details?.state} {details?.pincode ? details?.pincode : ""}
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                        <div className="mt-2">
                          {details?.bio ? (
                            <>
                              <span className="text-dark fw-semibold fs-5">About Us :</span>
                              <p className="fs-6">{details?.bio}</p>
                            </>
                          ) : (
                            ""
                          )}
                          {details?.fb?.length ? (
                            <a href={details?.fb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "navy" }}>
                              <Facebook /> Facebook
                            </a>
                          ) : (
                            ""
                          )}
                          {details?.lkd?.length ? (
                            <a href={details?.lkd} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "blue" }}>
                              <LinkedIn /> Linkedin
                            </a>
                          ) : (
                            ""
                          )}
                          {details?.twitter?.length ? (
                            <a href={details?.twitter} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "skyblue" }}>
                              <Twitter /> Twitter
                            </a>
                          ) : (
                            ""
                          )}
                          {details?.ytb?.length ? (
                            <a href={details?.ytb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                              <YouTube /> Youtube
                            </a>
                          ) : (
                            ""
                          )}
                          {details?.insta?.length ? (
                            <a href={details?.insta} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                              <Instagram /> Instagram
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3  order-1">
                      <div className="p-2 p-lg-4">
                        <img
                          src={details?.logo && details?.logo !== "" ? details.logo : "https://yuvamanthan.s3.ap-south-1.amazonaws.com/development/data/profile/replace.webp"}
                          alt="Logo"
                          className="bg-white"
                          style={{
                            width: "100%",
                            maxHeight: 300,
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-0">
        <div className="mb-4 rounded border">
          {/* <!-- ========== Start Login ========== --> */}
          <div className="row g-0">
            <div className="col-12 col-lg-7">
              <div className="bg-light d-flex flex-column justify-content-center h-100">
                <div className="container py-5">
                  <p className="text-center">
                    <h2>Welcome to SafeInSchool</h2>
                    <br />
                    <small>
                      {type === "teacher"
                        ? `This is where you will create your SafeInSchool account as a
                                        teacher. Fill in the required details and follow simple steps and help
                                        make your school truly safe. By creating this account, you will have
                                        access to e-modules and professional certifications on various
                                        aspects of school safety.`
                        : `Hello Student! SafeInSchool is a place where you will get to learn
                                        and explore topics on school safety and your own safety at school.
                                        Fill in the required details and follow simple steps to create your
                                        account.`}
                    </small>
                  </p>
                  <img src="/img/schoolsafety.png" alt="" className="w-100" style={{ height: "350px", objectFit: "contain" }} />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 rounded">
              <div className="h-100 d-flex align-items-center justify-content-center py-5">
                {details ? (
                  <div className="container">
                    <UserRegisterForm user={userType} collegeId={String(details?.id)} />
                  </div>
                ) : (
                  "No Institute Found"
                )}{" "}
              </div>
            </div>
          </div>
          {/* <!-- ========== End Login ========== --> */}
        </div>
      </div>
      <div>
        <div className="row g-0 row-cols-1 row-cols-lg-2">
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePublicPage;
