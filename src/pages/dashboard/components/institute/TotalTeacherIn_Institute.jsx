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

export const TotalTeacherIn_Institute = () => {
    const { userData } = useGlobalContext();
    const [totalTeacher, setTotalTeacher] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [showCertificateImg, setShowCertificateImg] = useState("");

        //   Get all Teacher
        const getTeacherCertificates = () => {
            setIsLoading(true)
            apiJsonAuth.get(`institute/getAllTeacherins/role/${userData?.role}/${userData?.id}`)
                .then((res) => {
                    setIsLoading(false)
                    setTotalTeacher(res?.data?.getTeacher)
                })
                .catch((err) => {
                    console.log("err", err);
                })
        }
    
        useEffect(() => {
            getTeacherCertificates();
        }, []);

        const handleShowCertificateModal = (img) => {
            setShowCertificateImg(img)
            setShowCertificateModal(true)
        }
        const handleCloseCertificateModal = () => {
            setShowCertificateModal(false)
        }
  return (
    <div>
          <TransparentBreadcrumb heading={`Total Teachers`} />

          <div className="container mt-3">
              <p className="fs-6 text-capitalize">
                  Total {"Certified Teachers"} is {totalTeacher?.length}
              </p>
          </div>

          <div className=" table-responsive mt-3" style={{ padding: "0 30px 35px 30px" }}>
              {/* <h4>Total Teachers</h4>
              <br></br> */}
              {totalTeacher?.length > 0 ? (
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
                                  {/* <th>Certificate</th> */}
                              </tr>
                          </thead>
                          <tbody>
                              {totalTeacher?.map((ele, index) => (
                                  <tr style={{ cursor: "pointer" }}>
                                      <td>{index + 1}</td>
                                      <td>
                                          <Avatar
                                              alt={ele.userName}
                                              src={ele?.profile}
                                              sx={{ width: 46, height: 46, bgcolor: red[500] }}
                                          />
                                      </td>
                                      <td>{ele?.first_name+" "+ele?.last_name}</td>
                                      <td>{ele?.contact}</td>
                                      <td>{ele?.email}</td>
                                      <td>{ele?.gender}</td>
                                      <td>{ele?.dob}</td>
                                      {/* <td><button className="border-0 rounded-1 py-2" style={{ fontSize: "15px", background: "#f88d35", color: "white" }} onClick={() => handleShowCertificateModal(ele?.img)}>View Certificate</button></td> */}
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

          {/* <Modal show={showCertificateModal} onHide={handleCloseCertificateModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      Certificate
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div style={{ width: "100%" }}><img className="w-100 h-100" src={showCertificateImg} alt="Teacher Certificate" /></div>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={handleCloseCertificateModal}>Close</Button>
              </Modal.Footer>
          </Modal> */}

    </div>
  )
}
