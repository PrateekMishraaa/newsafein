import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StudentProfileCard from "./component/StudentProfileCard";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "global/context";
import NotFoundGif from "layout/fallback/NotFoundGif";
import StudentBulkLogin from "./component/StudentBulkLogin";
import useError from "hooks/useError";
import { TransparentBreadcrumb } from "components/layout";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstituteRegisteredUser = () => {
  const { ErrorResponder } = useError();
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({});
  const { token, userData } = useGlobalContext();
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [data,setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [analyticsData, setAnalyticsData] = useState({});
  const [teacherCertificateData, setteacherCertificateData] = useState([]);
  const [enrollCertificateData, setEnrollCertificateData] = useState([]);

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete");
    if (confirmation) {
      if (token) {
        try {
          const res = await apiAuth.delete(
            "/institute/student?studentId=" + id,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.status == 200) {
            toast.dismiss();
            toast.success(res.data.message);
            fetchStudents();
          }
        } catch (error) {
          ErrorResponder(error);
          toast.dismiss();
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };
  // Fetch Details
  const fetchDetails = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get(
          `/institute?instituteId=${userData?.instituteId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res?.data && res?.status === 200) {
          setDetails(res.data.result[0]);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  // FetchStudents
  const fetchStudents = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get(
          `/institute/data?type=students&search=${searchTerm}&role=${role}&page=${currentPage}&instituteId=${userData?.instituteId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setUsers(res.data.result);
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
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : null}
        >
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    if (pageItems.length > 1)
      return (
        <nav aria-label="...">
          <ul className="pagination mt-5">
            <li className="page-item disabled">
              <a className="page-link" onClick={handlePrevious}>
                Prev
              </a>
            </li>
            {pageItems}
            <li className="page-item">
              <a className="page-link" onClick={handleNext}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      );
  };
  useEffect(() => {
    fetchStudents();
  }, [role, currentPage]);
  useEffect(() => {
    fetchDetails();
  }, []);

  // Count api
  // const getTotalTeacherCount = ()=>{
  //   setIsLoading(true)
  //       axios.get(`institute/getAllTeacherCount/role/${userData?.role}/${userData?.id}`)
  //           .then((res) => {
  //             setIsLoading(false)
  //             setAnalyticsData(res?.data)
  //           })
  //           .catch((err) => {
  //               console.log("err", err);
  //           })
  // }

  //   useEffect(()=>{
  //     getTotalTeacherCount()
  //   },[])


  useEffect(()=>{
      const fetchData =async()=>{
          const response = await axios.get(`http://localhost:3100/api/institute/getAllTeacherCount/role/${userData?.role}/${userData?.id}`)
          console.log("sutututu",response)
          setData(response.data)
      }
      fetchData()
  },[])

  const renderCard = (title, value) => {
    return (
      <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title">{title}</h5>
        {data?.count !== undefined ? (
          <p className="card-text fs-2 fw-bold">{data.count}</p>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
    );
  };

  return (
    <div>

      <TransparentBreadcrumb heading={`Safety ${role}s`} />

      <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 mt-2">
            {analyticsData && (
              <>
                <div className="col" style={{cursor: "pointer"}} onClick={()=> navigate("/All-Teacher")}>{renderCard("Total Teacher", analyticsData?.totalTeachers)}</div>
                <div className="col" style={{cursor: "pointer"}} onClick={()=> navigate("/certified-Teacher")}>{renderCard("Certified Teacher", analyticsData?.result)}</div>
                <div className="col" style={{cursor: "pointer"}} onClick={()=> navigate("/uncertified-Teacher")}>{renderCard("Active Course", analyticsData?.enrollresult)}</div>
                <div className="col" style={{cursor: "pointer"}} >{renderCard("Total Pending", analyticsData?.count)}</div>
              </>
            )}
          </div>
          </div>

      <div className="py-3">
        <StudentBulkLogin
          role={role}
          details={details}
          data={users}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          reload={fetchStudents}
        />
      </div>
      <div className="container py-2">
        <p className="fs-6 text-capitalize">
          Total {role + "s"} is {users?.length}
        </p>
        {users.length ? (
          <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-1 g-md-2 g-lg-3 row-cols-lg-4">
              {users.map((student, i) => {
                return (
                  <StudentProfileCard
                    role={role}
                    key={i}
                    details={details}
                    student={student}
                    reload={fetchStudents}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
            {renderPageItems()}
          </div>
        ) : (
          <NotFoundGif text={`No ${role} Has Registered Yet!`} />
        )}
      </div>
    </div>
  );
};
export default InstituteRegisteredUser;
