import {
  Clear,
  Download,
  FilePresentTwoTone,
  Search,
} from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { apiJsonAuth } from "api";
import { Popup } from "utils/Popup";
import React, { useEffect, useRef, useState } from "react";
import * as xlsx from "xlsx";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import StudentSingleRegister from "./StudentSingleRegister";
import BulkDataFormat from "./BulkDataFormat";
import YuvaLoader from "layout/loader/Loader/YuvaLoader";

function StudentBulkLogin({
  details,
  data,
  searchTerm,
  setSearchTerm,
  reload,
  role,
}) {
  const [fileName, setFileName] = React.useState();
  const [file, setFile] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = React.useState();
  const [dataSaved, setDataSaved] = React.useState();
  const [dataFailed, setDataFailed] = React.useState();
  const { token } = useGlobalContext();
  const closeBtn = useRef();

  const { ErrorResponder } = useError();
  let [update, setUpdate] = useState(0);
  const setStudentData = async () => {
    if (file && fileData && token) {
      try {
        const formData = new FormData();
        formData.append("file", file, file.originalname);
        formData.append("role", role);
        const responce = await apiJsonAuth.post(
          "institute/bulklogin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        Popup("success", responce?.data?.message);
        if (responce.data.dataSaved) {
          setDataSaved(responce?.data?.dataSaved);
          setUpdate(update + 1);
        }
        if (responce.data.dataFailed) {
          setDataFailed(responce?.data?.dataFailed);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    } else {
      Popup("warning", "File Not Found!");
    }
  };
  const convertFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let fileType = file?.name.split(".").slice(-1);
      console.log(fileType[0]);
      if (
        file &&
        (fileType[0] === "csv" ||
          fileType[0] === "xlsx" ||
          fileType[0] === "xls")
      ) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "buffer", skiprows: 0 });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = xlsx.utils.sheet_to_json(worksheet);
          if (json.length === 0) {
            Popup("error", "Data Not Found!");
            setFile();
          } else if (json.length > 1000) {
            Popup("error", "Exceed Data Limit !!! \n Data Limit : 1000");
            setFile();
          } else if (
            !json[0]?.First_name &&
            !json[0]?.Contact &&
            !json[0]?.Email
          ) {
            Popup("error", "File Format Incorrect");
            setFile();
          } else {
            setFileData(json);
          }
        };
      } else {
        Popup("error", "File Format is not Suported!!");
      }
    }
  };
  function handleClose() {
    setDataSaved();
    setDataFailed();
    setFileData();
    setFileName();
    setFile();
  }

  function downloadSavedData() {
    let savelist = [];
    dataSaved.map((data) => {
      savelist.push({
        ID: data?.id,
        First_name: data?.first_name,
        Last_name: data?.last_name,
        Email: data?.email,
        Password: data?.password,
      });
    });
    downloadExcel(savelist);
  }
  const downloadExcel = (data) => {
    if (data) {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
      xlsx.writeFile(workbook, "SampleData.xlsx");
    }
  };
  useEffect(() => {
    if (token) {
      if (searchTerm === "") {
        reload();
      }
    }
  }, [searchTerm]);

  // Participants
  useEffect(() => {
    reload();
  }, [update]);
  // console.log(searchTerm);

  // Related To BUlk Auto Assigner
  let [eligibleCandidates, setEligibleCandidates] = useState([]);
  useEffect(() => {
    data?.forEach((student, index) => {
      if (student?.certified) {
        const arrayCheck = eligibleCandidates.map((candidate, index) => {
          return candidate.id;
        });
        if (!arrayCheck?.includes(student?.id)) {
          setEligibleCandidates([...eligibleCandidates, student]);
        }
      }
    });
    // console.log("ELIGIBLE", eligibleCandidates);
  }, [data, reload]);
  return (
    <div>
      <div className="container">
        <div className="row g-2">
          <div className="col-12 col-lg-6 rounded">
            <div className="input-group">
              <input
                className="form-control"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    reload();
                  }
                }}
                value={searchTerm}
                placeholder={`Search ${role} Name Here....`}
              />
              {Boolean(searchTerm.length) && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setSearchTerm("");
                    reload();
                  }}
                >
                  <Clear style={{ fontSize: 18 }} /> Clear
                </button>
              )}
              <button
                className="btn btn-primary"
                onClick={() => {
                  reload();
                }}
              >
                <Search style={{ fontSize: 18 }} /> Search
              </button>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center h-100 flex-wrap">
              <button
                type="button"
                className="btn btn-outline-dark rounded-3 h-100"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLong"
              >
                Add&nbsp;{role}
              </button>
              {role !== "coordinator" && (
                <button
                  type="button"
                  className="btn btn-outline-dark rounded-3 ms-2 h-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <FilePresentTwoTone />
                  Upload&nbsp;CSV
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ minWidth: "800px" }}>
            <div className="modal-header">
              <h5
                className="modal-title text-capitalize"
                id="exampleModalLongTitle"
              >
                Register School Safety {role}
              </h5>
              <button
                ref={closeBtn}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body  p-0">
              <StudentSingleRegister
                role={role}
                closeBtn={closeBtn}
                collegeId={details.id}
                reload={reload}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Upload Modal  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header border-0">
              <h1
                className="modal-title font-weight-bold fs-5"
                id="exampleModalLabel"
              >
                {role} Bulk Register
              </h1>
              <button
                type="button"
                onClick={handleClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid p-0 p-lg-2">
                {!dataSaved && (
                  <div>
                    {!fileData ? (
                      <div>
                        <div className="text-center item-center text-danger">
                          <span className="font-weight-bold">NOTE</span>
                          <br />
                          <span className="lh-1 fw-semibold">
                            1. Only the Provided Format is allowed for file
                            upload <br /> 2. Data limit is 1000 Users per
                            Upload.{" "}
                          </span>{" "}
                          <br />
                          <Tooltip title="Use Provided file format to upload the student details">
                            <Button
                              className="mt-2 rounded"
                              variant="contained"
                              color="success"
                              href="https://yuvamanthan.s3.ap-south-1.amazonaws.com/uploads/bulkregister-template.xlsx"
                              target="_blank"
                              startIcon={<Download />}
                            >
                              Download&nbsp;Template
                            </Button>
                          </Tooltip>
                        </div>
                        <div
                          className="rounded-4 pb-3 mt-4 mx-auto"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            maxWidth: "500px",
                            border: "2px dashed grey",
                          }}
                        >
                          <input
                            className="fade"
                            style={{
                              minHeight: 240,
                              width: "100%",
                              zIndex: 200,
                              position: "relative",
                            }}
                            type="file"
                            onClick={(e) => {
                              setFileData();
                              setFile();
                              e.target.value = null;
                            }}
                            onChange={(e) => {
                              setIsLoading(true);
                              setFile(e.target.files[0]);
                              convertFile(e);
                              setIsLoading(false);
                            }}
                            id="fileData"
                          />
                          {/* show Loading on file Uploda */}
                          {isLoading && <YuvaLoader />}
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 100,
                            }}
                            className="w-100 h-100"
                          >
                            <div className="h-100 w-100 bg-light">
                              <div className="py-4 text-center">
                                <h4>Drag and drop or Click To Add File.</h4>
                                <img
                                  src="/images/upload-cloud-folder.png"
                                  alt=""
                                  width={200}
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <BulkDataFormat
                        data={fileData}
                        setFileData={setFileData}
                        setFile={setFile}
                        upload={setStudentData}
                      />
                    )}
                  </div>
                )}
              </div>
              <div
                hidden={!dataSaved || !dataSaved}
                className="container text-center item-center m-2 p-2"
              >
                <p className=" text-decoration-underline lh-1">
                  {" "}
                  Download the Data in Excel File{" "}
                </p>
                <p
                  className="text-decoration-underline lh-1"
                  style={{ color: "red", fontSize: "15px" }}
                >
                  {" "}
                  (*Only Available once.){" "}
                </p>
                <Button
                  hidden={!dataSaved?.length}
                  className="rounded border mx-2"
                  color="success"
                  onClick={downloadSavedData}
                >
                  Registered Data
                </Button>
                <Button
                  hidden={!dataFailed?.length}
                  className="rounded border mx-2"
                  onClick={() => {
                    downloadExcel(dataFailed);
                  }}
                >
                  Unregistered Data
                </Button>
              </div>
              {/* Table for Student Registered */}
              {dataSaved && !!Object.keys(dataSaved).length && (
                <div className="container mx-auto my-4 align-items-center text-center">
                  <h5 className="font-weight-bold text-center">
                    Student Registered {Object.keys(dataSaved).length}{" "}
                  </h5>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSaved &&
                        dataSaved.map(
                          ({
                            id,
                            first_name,
                            last_name,
                            contact,
                            email,
                            password,
                          }) => {
                            return (
                              <tr>
                                <td>{id}</td>
                                <td>{first_name}</td>
                                <td>{last_name} </td>
                                <td>{contact}</td>
                                <td>{email}</td>
                                <td>{password}</td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Table For Student Not Registered */}
              {dataFailed && !!Object.keys(dataFailed).length && (
                <div className="container mx-auto my-4 aline-cengter text-center">
                  <h5 className="font-weight-bold text-center">
                    Student Failed To Register
                  </h5>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataFailed &&
                        dataFailed.map(
                          ({
                            First_name,
                            Last_name,
                            Contact,
                            Email,
                            Error,
                          }) => {
                            return (
                              <tr>
                                <td>{First_name}</td>
                                <td>{Last_name} </td>
                                <td>{Contact}</td>
                                <td>{Email}</td>
                                <td className="text-danger font-weight-bold">
                                  {Error}
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentBulkLogin;
