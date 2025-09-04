import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AccessDenied from "layout/fallback/AccessDenied";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { ArrowOutwardTwoTone } from "@mui/icons-material";
import { SimpleBreadCrumb } from "components/ui";

const CertficateComponent = ({ cert }) => {
  const [isMouse, setIsMouse] = useState(false);
  return (
    <div id="certificate" onMouseEnter={() => setIsMouse(true)} onMouseLeave={() => setIsMouse(false)} className="certificate-card certficate-container rounded-3 border-0 shadow p-relative" style={{ overflow: "hidden" }}>
      <img src={cert.img} alt="safeinschool certification rounded-3" className="w-100" />
      <div className={`link-container`}>
        <Link className={`link text-center fade ${isMouse ? "show" : ""}`} to={`/dashboard/certificate/${cert.courseId}`}>
          <ArrowOutwardTwoTone />
          <br />
          View
        </Link>
      </div>
    </div>
  );
};
const LoadingSkelton = () => {
  return (
    <>
      <Card sx={{ maxWidth: 385, m: 2 }}>
        {<Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />}
        <CardHeader avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />} title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />} subheader={<Skeleton animation="wave" height={10} width="40%" />} />
      </Card>
    </>
  );
};

const IssuedCertificates = () => {
  const [loading, setLoading] = useState(true);
  const [certificates, setcertificates] = useState([]);
  const { userData, token } = useGlobalContext();
  const [courseParameter, setCourseParameter] = useState({
    search: "",
    sort: "recent",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getCertificatesByuserId = async () => {
    if (token) {
      if (userData.id) {
        try {
          const res = await apiAuth.get(`/course/allcertificates?studentId=${userData.id}&search=${courseParameter.search}&sort=${courseParameter.sort}&page=${currentPage}`, {
            headers: {
              Authorization: token,
            },
          });
          if (res?.status === 200) {
            setcertificates(res?.data?.result);
            setTotalPages(res.data.totalPages);
            setLoading(false);
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err?.response?.data?.message ? err?.response?.data?.message : "Something Went wrong check your internet connection");
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`} aria-current={currentPage === i ? "page" : null}>
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageItems;
  };

  useEffect(() => {
    if (token) {
      getCertificatesByuserId();
    }
  }, [token, currentPage]);
  return (
    <>
      <SimpleBreadCrumb page={`My Certificates`} />
      <div className="container py-4">
        {loading ? (
          <LoadingSkelton />
        ) : certificates.length === 0 ? (
          <AccessDenied img={"https://glcloud.in/images/static/graphics/certificatefallback.webp"} message={"No Certificate Found"} />
        ) : (
          <div>
            <div className="row mt-2 mb-4">
              <div className="col-12 col-md-8">
                <div className="d-flex input-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write Course Name Here"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={(e) =>
                        setCourseParameter({
                          ...courseParameter,
                          search: e.target.value,
                        })
                      }
                    />
                    <button className="btn btn-primary rounded-0" type="button" id="button-addon2" onClick={getCertificatesByuserId}>
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <select
                  className="form-select bg-white fs-5 rounded h-100 border-warning"
                  value={courseParameter.sort}
                  onChange={(e) =>
                    setCourseParameter({
                      ...courseParameter,
                      sort: e.target.value,
                    })
                  }>
                  <option value="" disabled>
                    Sort Courses
                  </option>
                  <option value="recent">Recent</option>
                  <option value="atoz">A to Z</option>
                  <option value="ztoa">Z to A</option>
                </select>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {certificates?.map((data, i) => {
                return (
                  <div className="col" key={i}>
                    <CertficateComponent cert={data} />
                  </div>
                );
              })}
            </div>

            <nav aria-label="...">
              <ul className="pagination mt-5">
                <li className="page-item disabled">
                  <a className="page-link" onClick={handlePrevious}>
                    Prev
                  </a>
                </li>

                {renderPageItems()}

                <li className="page-item">
                  <a className="page-link" onClick={handleNext}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
export default IssuedCertificates;
