import { Avatar, Button } from "@mui/material";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import NotFoundGif from "layout/fallback/NotFoundGif";
import useError from "hooks/useError";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TransparentBreadcrumb } from "components/layout";
const Studentheads = ["Profile", "First Name", "Last Name", "Certificate_key", "Accredited_by", "Endorsed by", "Date"];

const InstituteCertifiedUser = () => {
  const [certificates, setCertificates] = useState([]);
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const { role } = useParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // FetchCertificates
  const fetchCertificates = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(`/institute/certificates?role=${role}&search=${search}&sort=${sort}&page=${currentPage}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setCertificates(res.data.result);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        ErrorResponder(error);
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
    fetchCertificates();
  }, [role, sort, currentPage]);

  return (
    <>
      <TransparentBreadcrumb heading={`${role} Certifications`} />
      <div className="container py-4">
        {certificates.length ? (
          <div>
            <div className="row mb-2">
              <div className="col-12 col-md-8">
                <div className="d-flex input-group">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Write Your Name Here" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn btn-primary" type="button" id="button-addon2" onClick={fetchCertificates}>
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <select className="form-select bg-white fs-5 rounded h-100 border-warning" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="" disabled>
                    Sort Courses
                  </option>
                  <option value="recent">Recent</option>
                  <option value="atoz">A to Z</option>
                  <option value="ztoa">Z to A</option>
                </select>
              </div>
            </div>
            <div className="table-responsive rounded-3 shadow-sm border">
              <table className="table table-borderless table-striped table-light">
                <thead>
                  <tr>
                    {Studentheads.map((head, i) => {
                      return (
                        <th key={i} scope="col" className="fw-semibold text-capitalize p-3">
                          {head}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td className="p-2">
                          <Avatar alt={row.first_name} src={row?.profile} sx={{ width: 40, height: 40 }} />
                        </td>
                        {/* <td className="p-3">{row?.studentId}</td> */}
                        <td className="p-3">{row?.first_name}</td>
                        <td className="p-3">{row?.last_name}</td>
                        <td className="p-3">{row?.certificate_key}</td>
                        <td className="p-3">{row?.accredited_by}</td>
                        <td className="p-3">{row?.endorsed_by}</td>
                        <td className="p-3">{moment(row?.createdAt).calendar()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav aria-label="...">
              <ul className="pagination mt-5 mx-3">
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
        ) : (
          <NotFoundGif text={"No Certificates Issued Yet!"} />
        )}
      </div>
    </>
  );
};

export default InstituteCertifiedUser;
