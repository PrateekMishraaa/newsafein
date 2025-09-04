import React, { useRef } from "react";
import { Button, } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiAuth } from "api";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "global/context";
import { ContentCopyTwoTone, Download } from "@mui/icons-material";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ConfettiExplosion from "react-confetti-explosion";

const PrintCertificate = () => {
  const params = useParams();
  const { userData, token } = useGlobalContext();
  const [clicked, setClicked] = useState(false);
  const imgRef = useRef(null);
  const [shareableLink, setShareableLink] = useState("");
  // const history = useHistory();
  const [certData, setCertData] = useState({});
  const getCertificate = async () => {
    try {
      if (userData.id) {
        const res = await apiAuth.get(`/course/certificate?courseId=${params.courseId}&studentId=${userData.id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res?.status == 200) {
          const resData = res?.data.result;
          setCertData(resData);
          setShareableLink(process.env.REACT_APP_MAIN_URL + "courses/" + resData?.slug + "/certificates/" + resData?.certificate_key);
        }
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.message ? err?.response?.data?.message : "Something Went wrong check your internet connection");
      // history.push("/certificate");
    }
  };
  useEffect(() => {
    getCertificate();
  }, []);
  const [confettiActive, setConfettiActive] = useState(true);
  const [showCert, setShowCert] = useState(false);
  // const certificate = imgRef.current;
  useEffect(() => {
    // imgRef.onload()
    // window.onload(() => {
    //   setShowCert(true);
    // });
  });

  return (
    <div className="bg-dark-gray">
      <div className="container py-5">
        <div className="row gy-5 justify-content-between g-5">
          {/* Certificate Section  */}
          <div className="col-12 col-lg-7">
            {confettiActive && <ConfettiExplosion particleCount={250} duration={3000} force={0.8} width={1600} />}
            <div id="certificate" className="certficate-container p-relative bg-white" style={{ boxShadow: "15px 15px 20px rgb(0,0,0,0.2) " }}>
              <div className="p-2 border">
                <img
                  ref={imgRef}
                  src={certData?.img}
                  loading="lazy"
                  alt=""
                  onLoad={() => setShowCert(true)}
                  className={`w-100 fade ${showCert ? "show" : "hide"}`}
                />
              </div>
            </div>
          </div>
          {/* Sidebar  */}
          <div className="col-12 col-lg-4 border-start">
            <h3 className="fs-3">Share this Certificate</h3>
            <div className="d-flex align-items-center">
              <FacebookShareButton url={shareableLink} quote={"Model g20 India"} className="m-1">
                <FacebookIcon size={42} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareableLink} quote={"Model g20 India"} className="m-1">
                <TwitterIcon size={42} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareableLink} quote={"Model g20 India"} className="m-1">
                <LinkedinIcon size={42} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareableLink} quote={"Model g20 India"} className="mx-1">
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>
              <TelegramShareButton url={shareableLink} quote={"Model g20 India"} className="m-1">
                <TelegramIcon size={42} round />
              </TelegramShareButton>
            </div>
            <div className="mt-4">
              <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
                <div className="p-2 ps-4 bg-grey">
                  <p id="link" className="fs-5 line-clamp-link m-0">
                    {shareableLink.slice(0, 20) + "..."}
                  </p>
                </div>
                <Button
                  className="fw-bold rounded-0 px-2 px-lg-4"
                  variant="outlined"
                  color="success"
                  size="large"
                  onClick={() => {
                    setClicked(true);
                    navigator.clipboard.writeText(shareableLink);
                  }}
                >
                  {clicked ? (
                    <>
                      <ConfettiExplosion particleCount={30} duration={2200} force={0.4} width={400} />
                      <ContentCopyTwoTone /> Copied
                    </>
                  ) : (
                    <>
                      <ContentCopyTwoTone /> Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-5 row row-cols-2 row-cols-sm-2 row-cols-lg-2 align-items-center">
              <div className="col">
                <a target={"_blank"} href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME">
                  <img src="https://download.linkedin.com/desktop/add2profile/buttons/en_US.png" alt="" />
                </a>
              </div>
              <div className="col">
                <Button href={certData.img} fullWidth variant="contained" color="success" onClick={() => setConfettiActive(true)}>
                  <Download /> Download{" "}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="fs-5">{certData?.course_name}</h5>
              <p className="fs-6">{certData?.desc?.slice(0, 150)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCertificate;
