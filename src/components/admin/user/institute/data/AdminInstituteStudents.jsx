import React, { useState } from "react";
import { AdminStudentRegistration, StudentBulkLoginAdmin } from ".";
import { Button } from "@mui/material";
import { LocalFireDepartmentSharp } from "@mui/icons-material";
import useError from "hooks/useError";
import { useGlobalContext } from "global/context";
import { apiJsonAuth } from "api";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/joy";
import moment from "moment";
import { useEffect } from "react";

export const AdminInstituteStudents = () => {
  let [datas, setData] = useState("");
  const [userRole, setUserRole] = useState("student");
  let [limit, setLimit] = useState(10);
  let [dataStudent, setDataStudent] = useState([]);
  let [update, setUpdate] = useState(0);
  let [searchTerm, setSearchTerm] = useState("");
  let { adminRoles } = useGlobalContext();
  let [students, setStudents] = useState([]);
  const { ErrorResponder } = useError();
  let param = useParams();
  let instituteId = param.id;
  
  const fetchStudents = async () => {
    try {
      const res = await apiJsonAuth.get(`/institute/data?type=students&instituteId=${instituteId}&search=${searchTerm}&role=${userRole}`, {});
      if (res.status === 200) {
        setStudents(res.data.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [userRole]);
  return (
    <div>
      <div className="row row-cols-1 row-cols-lg-2 mb-2">
        <div className="col">
          <div className="input-group">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchStudents();
                }
              }}
              className="form-control"
              value={searchTerm}
              label="Search Student Name Here...."
            />
            <div className="d-flex"></div>
            {searchTerm.length ? (
              <button
                className="btn btn-outline-danger "
                onClick={() => {
                  setSearchTerm("");
                  fetchStudents();
                }}>
                <i className="bi bi-trash"></i> clear
              </button>
            ) : (
              ""
            )}
            <button
              className="btn btn-success border-success"
              sx={{ background: "orange", color: "white" }}
              onClick={() => {
                fetchStudents();
              }}>
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex">
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="form-select d-inline-block me-2">
              <option>student</option>
              <option>teacher</option>
              <option>coordinator</option>
            </select>
            <AdminStudentRegistration hidden={!(adminRoles() === 1)} collegeId={instituteId} update={update} setUpdate={setUpdate} />
            <StudentBulkLoginAdmin instituteId={datas?.instituteId} />
          </div>
        </div>
      </div>
      <div className="student-data table-responsive rounded-3 border">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col" className="p-3 px-2">
                Profile
              </th>
              <th scope="col" className="p-3 px-2">
                Student&nbsp;Name
              </th>
              <th scope="col" className="p-3 px-2">
                Guardian&nbsp;name
              </th>
              <th scope="col" className="p-3 px-2">
                Address
              </th>
              <th scope="col" className="p-3 px-2">
                Email
              </th>
              <th scope="col" className="p-3 px-2">
                Contact
              </th>
              <th scope="col" className="p-3 px-2">
                Resume
              </th>
              <th scope="col" className="p-3 px-2">
                Status
              </th>
              <th scope="col" className="p-3 px-2">
                DOB
              </th>
              <th scope="col" className="p-3 px-2">
                Gender
              </th>
              <th scope="col" className="p-3 px-2">
                Facebook
              </th>
              <th scope="col" className="p-3 px-2">
                Twitter
              </th>
              <th scope="col" className="p-3 px-2">
                Instagram
              </th>
              <th scope="col" className="p-3 px-2">
                LinkedIn
              </th>
              <th scope="col" className="p-3 px-2">
                Youtube
              </th>
              <th scope="col" className="p-3 px-2">
                Created&nbsp;At
              </th>
              <th scope="col" className="p-3 px-2">
                Updated&nbsp;At
              </th>
            </tr>
          </thead>
          <tbody>
            {(students.length ? students : dataStudent).map((data, index) => {
              if (index < limit)
                return (
                  <tr>
                    <td>
                      <Avatar src={data?.profile} alt={data?.first_name}></Avatar>
                    </td>
                    <td>
                      {data?.first_name} {data?.last_name}
                    </td>
                    <td>{data?.father_name}</td>
                    <td>
                      {data?.district} {data?.state} {data?.pincode}
                    </td>
                    <td>{data?.email}</td>
                    <td>{data?.contact}</td>
                    <td>{data?.resume}</td>
                    <td>{data?.status}</td>
                    <td>{moment(data?.dob).calendar()}</td>
                    <td>{data?.gender}</td>
                    <td>{data?.fb}</td>
                    <td>{data?.twitter}</td>
                    <td>{data?.insta}</td>
                    <td>{data?.lkd}</td>
                    <td>{data?.ytb}</td>
                    <td>{data?.created_At}</td>
                    <td>{data?.updated_At}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
        <div className="d-flex align-items-center p-2 mt-3">
          <span className="text-dark me-2">
            Showing {limit < dataStudent.length ? limit : dataStudent.length} of {dataStudent.length}
          </span>
          <Button
            variant="outlined"
            color="success"
            className="me-2"
            onClick={() => {
              setLimit(limit + 5);
            }}>
            Load More <LocalFireDepartmentSharp className="fs-6" />
          </Button>
          <Button
            className="me-2"
            variant="outlined"
            color="error"
            onClick={() => {
              setLimit(10);
            }}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
