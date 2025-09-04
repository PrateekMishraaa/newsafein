import { FilePresentTwoTone } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { apiJsonAuth } from "api";
import React, { useEffect, useRef, useState } from "react";
import * as xlsx from "xlsx";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
// import { Suspense } from "react";
import { toast } from "react-toastify";
import LoaderSplash from "layout/loader/LoaderSplash";
import { Popup } from "utils/Popup";
import BulkDataFormat from "pages/dashboard/components/institute/component/BulkDataFormat";
// import { fetchStudents } from "pages/college/DashboardInstitute";

export const StudentBulkLoginAdmin = ({ instituteId }) => {
  const [fileName, setFileName] = React.useState();
  const [file, setFile] = React.useState();
  const [fileData, setFileData] = React.useState();
  const [dataSaved, setDataSaved] = React.useState();
  const [dataFailed, setDataFailed] = React.useState();
  const [role, setRole] = React.useState("student");
  const [emailProcess, setEmailProcess] = React.useState(true);
  const { token } = useGlobalContext();
  const closeBtn = useRef();
  const { ErrorResponder } = useError();
  let [update, setUpdate] = useState(0);

  useEffect(() => {
    console.log(emailProcess);
  }, [emailProcess]);
  const setStudentData = async () => {
    if (!instituteId) {
      return toast.warning("Institute Id Not found!!");
    }
    if (file && fileData && token) {
      try {
        const formData = new FormData();
        formData.append("file", file, file.originalname);
        formData.append("role", role);
        formData.append("instituteId", instituteId);
        formData.append("emailProcess", emailProcess);
        const responce = await apiJsonAuth.post("institute/bulklogin-admin", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });

        // console.log(responce);
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
      // console.log(fileType[0]);
      if (file && (fileType[0] === "csv" || fileType[0] === "xlsx" || fileType[0] === "xls")) {
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
          } else if (!json[0]?.First_Name && !json[0]?.Contact && !json[0]?.Email) {
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
        First_Name: data?.first_name,
        Last_Name: data?.last_name,
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

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button className="btn me-2 h-100" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn d-flex">
        Bulk&nbsp;Registration
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content w-100" style={{ minWidth: "100%" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {role} Register
              </h5>
              <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Upload Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h1 className="modal-title font-weight-bold fs-5" id="exampleModalLabel">
                {role} Bulk Register
              </h1>
              <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                {!dataSaved && (
                  <div>
                    {!fileData ? (
                      <div className="container mx-auto">
                        <div className="text-center item-center text-danger">
                          <span className="font-weight-bold text-decoration-underline">NOTE</span>
                          <br />
                          <span className="lh-1">
                            1. Only the Provided Format is allowed for file upload <br /> 2. Data limit is 1000 Users per Upload.{" "}
                          </span>{" "}
                          <br />
                          <Tooltip title="Use Provided file format to upload the student details">
                            <Button
                              className="mt-2"
                              variant="outlined"
                              color="info"
                              href="https://yuvamanthan.s3.ap-south-1.amazonaws.com/uploads/Student+Registration+Format.xlsx" ///"https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/TempletFile.xlsx"
                              target="_blank">
                              Template Sheet
                            </Button>
                          </Tooltip>
                          <div className="d-flex justify-centent-center my-3">
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select text-center content-center fs-5 w-50 mx-auto" aria-label="Default select example">
                              <option disabled>Select Type</option>
                              <option value="student">Student</option>
                              <option value="teacher">Teacher</option>
                            </select>
                          </div>
                          <FormControlLabel control={<Checkbox defaultChecked={emailProcess} value={emailProcess} onChange={(e) => setEmailProcess(e.target.checked)} />} label="Send Email with Password" />
                        </div>

                        <div className="border rounded-3 mt-4" style={{ position: "relative", overflow: "hidden" }}>
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
                              setFile(e.target.files[0]);
                              convertFile(e);
                            }}
                            id="fileData"
                          />
                          {/* show Loading on file Uploda */}
                          {file && <LoaderSplash />}
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 100,
                            }}
                            className="w-100 h-100">
                            <div className="h-100 w-100 bg-light">
                              <div className="py-4 text-center">
                                <h4>Drag and drop or Click To Add File.</h4>
                                <img src="/images/upload-cloud-folder.png" alt="" width={200} style={{ objectFit: "contain" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="input-group-append item-center text-center">
                          <Button
                            variant="outlined"
                            color="success"
                            className="rounded-3 mt-3 text-capitalize"
                            size="large"
                            type="button"
                            onClick={setStudentData}
                          >
                            <FileUploadTwoTone /> Upload Data
                          </Button>
                        </div> */}
                      </div>
                    ) : (
                      <BulkDataFormat data={fileData} setFileData={setFileData} setFile={setFile} upload={setStudentData} />
                    )}
                  </div>
                )}
              </div>
              <div hidden={!dataSaved || !dataSaved} className="container text-center item-center m-2 p-2">
                <p className=" text-decoration-underline lh-1"> Download the Data in Excel File </p>
                <p className="text-decoration-underline lh-1" style={{ color: "red", fontSize: "15px" }}>
                  {" "}
                  (*Only Available once.){" "}
                </p>
                <Button hidden={!dataSaved?.length} className="rounded border mx-2" color="success" onClick={downloadSavedData}>
                  Registered Data
                </Button>
                <Button
                  hidden={!dataFailed?.length}
                  className="rounded border mx-2"
                  onClick={() => {
                    downloadExcel(dataFailed);
                  }}>
                  Unregistered Data
                </Button>
              </div>
              {/* Table for Student Registered */}
              {dataSaved && !!Object.keys(dataSaved).length && (
                <div className="container mx-auto my-4 align-items-center text-center">
                  <h5 className="font-weight-bold text-center ts-f">
                    {role} Registered {Object.keys(dataSaved).length}{" "}
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
                        dataSaved.map(({ id, first_name, last_name, contact, email, password }) => {
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
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Table For Student Not Registered */}
              {dataFailed && !!Object.keys(dataFailed).length && (
                <div className="container mx-auto my-4 aline-cengter text-center">
                  <h5 className="font-weight-bold text-center">Student Failed To Register</h5>
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
                        dataFailed.map(({ First_Name, Last_Name, Contact, Email, Error }) => {
                          return (
                            <tr>
                              <td>{First_Name}</td>
                              <td>{Last_Name} </td>
                              <td>{Contact}</td>
                              <td>{Email}</td>
                              <td className="text-danger font-weight-bold">{Error}</td>
                            </tr>
                          );
                        })}
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
};
