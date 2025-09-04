import React from "react";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import { Download } from "@mui/icons-material";
import { Popup } from "utils/Popup";

const ShowCertificate = () => {
  const params = useParams();

  const { userData, token } = useGlobalContext();
  const [certData, setCertData] = useState({});
  const navigate = useNavigate();
  const getCertificate = async () => {
    Popup("loading");
    console.log("Getting Certificate");
    try {
      const res = await apiJson.get(
        `/course/public/certificate?certkey=${params.certkey}`
      );
      console.log("Response", res);
      if (res?.status == 200) {
        const resData = res?.data.result;
        setCertData(resData);
        Popup();
      }
    } catch (err) {
      Popup("error", err?.response?.data?.message);
    }
  };
  useEffect(() => {
    getCertificate();
  }, []);
  const [showCert, setShowCert] = useState(false);
  return (
    <div className="bg-dark-gray">
      <div className="container py-5">
        <div className="row gy-5 justify-content-between g-5">
          {/* Certificate Section  */}
          <div className="col-12 col-lg-7">
            <div
              id="certificate"
              className="certficate-container p-relative bg-white"
              style={{ boxShadow: "15px 15px 20px rgb(0,0,0,0.2) " }}
            >
              <div className="p-2 border">
                <img
                  src={certData?.img}
                  loading="lazy"
                  alt=""
                  onLoad={() => {
                    setShowCert(true);
                  }}
                  className={`w-100 fade ${showCert ? "show" : "hide"}`}
                />
              </div>
            </div>
          </div>
          {/* Sidebar  */}
          <div className="col-12 col-lg-4 border-start">
            <p>The Certificate is Presented to </p>
            <h5 className="fs-2 text-primary">
              {certData?.first_name} {certData?.last_name}
            </h5>
            <Button
              href={certData.img}
              fullWidth
              variant="contained"
              className="py-3"
              color="success"
            >
              <Download /> Download{" "}
            </Button>
            <hr />
            <h3 className="fs-3">Earn your Own Certificate</h3>
            <div className="mt-4">
              <div className="p-3 bg-green-grad border rounded-4">
                <img
                  src={certData?.thumbnail}
                  alt=""
                  className="w-100 rounded-3 "
                />
                <div className="mt-3">
                  <h5 className="fs-5 text-white">{certData?.course_name}</h5>
                  <p className="fs-6 text-white">
                    {certData?.desc?.slice(0, 150)}
                  </p>
                  {!token ? (
                    <button
                      className="btn btn-primary w-100 rounded-3  hover-ripple"
                      onClick={() => {
                        navigate("/login", {
                          state: {
                            nextRoute: `/course/${certData.slug}`,
                          },
                        });
                      }}
                    >
                      Register to Enroll
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100 rounded-3  hover-ripple"
                      onClick={() => {
                        navigate("/courses/" + certData?.slug);
                      }}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCertificate;
