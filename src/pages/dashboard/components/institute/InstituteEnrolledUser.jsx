import { Avatar, Button } from "@mui/material";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import SimpleBreadCrumb from "components/ui/breadcrumb/SimpleBreadCrumb";
import NotFoundGif from "layout/fallback/NotFoundGif";
import useError from "hooks/useError";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TransparentBreadcrumb } from "components/layout";
const Studentheads = ["Course", "Title", "Full Name", "Enrollment Date"];

const InstituteEnrolledUser = () => {
  const [Enrollments, setEnrollments] = useState([]);
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const { role } = useParams();
  const [Parameter, setParameter] = useState({
    search: "",
    sort: "recent",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // FetchEnrollments
  const fetchEnrollments = async () => {
    if (token) {
      try {
        // const res = await apiAuth.get(`/institute/enrollments?role=` + role, {
        const res = await apiAuth.get(`/institute/enrollments?role=${role}&search=${Parameter.search}&sort=${Parameter.sort}&page=${currentPage}`, {
          headers: {
            Authorization: token,
          },
        });
        // });
        if (res?.data?.status === "success") {
          setTotalPages(res.data.totalPages);
        }
        switch (res?.data?.status) {
          case "success":
            setEnrollments(res.data.result);
            break;
          case "warning":
            toast.warning(res?.data?.message);
            break;
          case "error":
            toast.error(res?.data?.message);
            break;
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
    fetchEnrollments();
  }, [role, Parameter.sort, currentPage]);
  return (
    <>
      <TransparentBreadcrumb heading={`${role} Enrollments`} />
      <div className="container py-4">
        {Enrollments.length ? (
          <div>
            <div className="row mb-3">
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
                        setParameter({
                          ...Parameter,
                          search: e.target.value,
                        })
                      }
                    />
                    <button className="btn btn-primary" type="button" id="button-addon2" onClick={fetchEnrollments}>
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <select
                  className="form-select bg-white rounded h-100"
                  value={Parameter.sort}
                  onChange={(e) =>
                    setParameter({
                      ...Parameter,
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
            <div className="table-responsive border shadow-sm rounded-3">
              <table className="table table-borderless table-striped table-light ">
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
                  {Enrollments.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td className="p-2 p-relative">
                          <Avatar className="rounded-1" alt={row?.course_name} src={row?.thumbnail} sx={{ width: 76, height: 46 }} />
                          <Avatar
                            alt={row.first_name}
                            src={row?.profile}
                            sx={{ width: 26, height: 26 }}
                            style={{
                              bottom: "0px",
                              left: "0px",
                              position: "absolute",
                            }}
                          />
                        </td>
                        {/* <td className="p-3">{row?.studentId}</td> */}
                        <td className="p-3">{row?.course_name}</td>
                        <td className="p-3">{row?.first_name + " " + row?.last_name}</td>
                        <td className="p-3">{moment(row?.createdAt).calendar()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav aria-label="...">
              <ul className="pagination mt-4">
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
          <NotFoundGif text={"No Enrollments Found!"} />
        )}
      </div>
    </>
  );
};

export default InstituteEnrolledUser;
