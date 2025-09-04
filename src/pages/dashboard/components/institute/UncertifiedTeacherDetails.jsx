import { apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import { TransparentBreadcrumb } from "components/layout";
import { Table } from "react-bootstrap";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from "react-bootstrap";

export const UncertifiedTeacherDetails = () => {
    const { userData } = useGlobalContext();
    const [teacherCertificateData, setteacherCertificateData] = useState([]);
    const [enrollCertificateData, setEnrollCertificateData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [showCertificateImg, setShowCertificateImg] = useState("");

    //  Get Enroll for course
    const enrollTeacherCertificates = () => {
        setIsLoading(true)
        apiJsonAuth.get(`institute/getEnrollCourses/role/${userData?.role}/${userData?.id}`)
            .then((res) => {
                setIsLoading(false)
                setEnrollCertificateData(res?.data?.enrollData)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    useEffect(() => {
        enrollTeacherCertificates()
    }, []);

    const handleShowCertificateModal = (img) => {
        setShowCertificateImg(img)
        setShowCertificateModal(true)
    }
    const handleCloseCertificateModal = () => {
        setShowCertificateModal(false)
    }
// console.log(enrollCertificateData)
  return (
    <div>
          <TransparentBreadcrumb heading={`UnCertified Teachers`} />

         <div className="container mt-3">
              <p className="fs-6 text-capitalize">
                  Total {"UnCertified Teachers"} is {enrollCertificateData?.length}</p>
          </div>

          <div className=" table-responsive mt-3" style={{ padding: "0 30px 0 30px" }}>
              {/* <h4>UnCertified Teachers</h4>
              <br></br> */}
              {enrollCertificateData?.length > 0 ? (
                  <div className="table-responsive rounded-3 border">
                      <Table striped hover>
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Profile</th>
                                  <th>Name</th>
                                  <th>Contact</th>
                                  <th>Email</th>
                                  <th>Gender</th>
                                  <th>D.O.B</th>
                              </tr>
                          </thead>
                          <tbody>
                              {enrollCertificateData?.map((ele, index) => (
                                  <tr style={{ cursor: "pointer" }}>
                                      <td>{index + 1}</td>
                                      <td>
                                          <Avatar
                                              alt={ele.first_name+" "+ele.last_name}
                                              src={ele?.profile}
                                              sx={{ width: 46, height: 46, bgcolor: red[500] }}
                                          />
                                      </td>
                                      <td>{ele.first_name+" "+ele.last_name}</td>
                                      <td>{ele?.contact}</td>
                                      <td>{ele?.email}</td>
                                      <td>{ele?.gender}</td>
                                      <td>{ele?.dob}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </Table>
                  </div>
              ) : isLoading ? (
                  " "
              ) : (
                  <span style={{ fontSize: "20px" }}>No Data</span>
              )}
          </div>

    </div>
  )
}
