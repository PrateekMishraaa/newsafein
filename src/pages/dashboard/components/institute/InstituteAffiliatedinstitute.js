import React, { useEffect, useState } from "react";
import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import AffiliationRegistrationForm from "./component/AffiliationRegistrationForm";
import { Clear, FilePresentTwoTone, FileUploadTwoTone, LocationCity, Search, } from "@mui/icons-material";
import { Avatar, Button, IconButton, InputAdornment, TextField, Tooltip, } from "@mui/material";
import * as xlsx from "xlsx";
import { Popup } from "utils/Popup";
import CloseIcon from "@mui/icons-material/Close";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import useError from "hooks/useError";

function InstituteAffiliatedinstitute() {
  const [affiliated,] = useOutletContext();
  const { ErrorResponder } = useError();
  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState();
  const [fileData, setFileData] = React.useState();
  const [dataSaved, setDataSaved] = React.useState();
  const [dataFailed, setDataFailed] = React.useState();
  const { token } = useGlobalContext();
  let [allAffiliated, setAllAffiliated] = useState([]);
  let [searchTerms, setSearchTerms] = useState("");
  let [limit, setLimit] = useState(15);
  let [update, setUpdate] = useState(0);

  async function getAffiliatedFromInstituions() {
    try {
      const res = await apiAuth.get(
        `institute/institutes-affiliated?id= ${affiliated[0]?.id}&limit=${limit}&search=${searchTerms}`
      );
      setAllAffiliated(res?.data?.result);
    } catch (error) {
      ErrorResponder(error);
    }
  }
  const setInstituteData = async (e) => {
    e.preventDefault();
    if (file && token) {
      try {
        const formData = new FormData();
        formData.append("file", file, file.originalname)
        const responce = await apiJsonAuth.post("institute/bulkregister?affiliate_id=" + affiliated[0]?.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          }
        });
        console.log(responce);
        Popup("success", responce?.data?.message);
        if (responce.data.dataSaved) {
          setDataSaved(responce?.data?.dataSaved);
          setUpdate(update + 1);
        }
        if (responce.data.dataFailed) {

          setDataFailed(responce?.data?.dataFailed);
        }
      } catch (error) {
        console.log("failed Data", error)
        ErrorResponder(error);
      }
    } else {
      Popup("warning", "File Not Found!");
    }
  }
  const convertFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      let fileType = file?.name.split(".").slice(-1);
      // console.log(fileType[0]);
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
          const workbook = xlsx.read(data, { type: "buffer" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = xlsx.utils.sheet_to_json(worksheet);

          if (json.length === 0) {
            Popup("error", "Data Not Found");
          } else if (json.length > 1000) {
            Popup("error", "Exceed data !!! \n Data Limit : 1000");
          } else if (
            !json[0]?.first_name &&
            !json[0]?.first_name &&
            !json[0]?.email &&
            !json[0]?.contact_no &&
            !json[0]?.institution_name &&
            !json[0]?.institution_address
          ) {
            Popup("error", "File Format Incorrect");
          } else {
            setFileData(json);
            console.log("Data is done")
          }
        };
      } else {
        Popup("error", "File Format is not Suported!!");
      }
    }
  };
  function handleClose() {
    setDataSaved(false);
    setDataFailed(false);
    setFileData(false);
    setFileName(false);
    setFile();
  }
  function downloadSavedData() {
    let savelist = [];
    dataSaved.map((data) => {
      savelist.push({
        id: data?.id,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        contact_no: data?.contact_no,
        institution_name: data?.institution_name,
        institution_address: data?.institution_address,
        district: data?.district,
        state: data?.state,
        pincode: data?.pincode
      }
      )
    })
    downloadExcel(savelist);

  }
  const downloadExcel = (data) => {
    if (data) {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
      xlsx.writeFile(workbook, "SampleData.xlsx")
    }
  }
  useEffect(() => {
    if (token) {
      if (affiliated[0]?.id) {
        getAffiliatedFromInstituions();
      }
    }
  }, [affiliated[0]?.id, limit, update]);
  return (
    <>
      <div className="container">
        <div className="row g-2">
          <div className="col-12 col-lg-6 rounded">
            <TextField
              onChange={(e) => setSearchTerms(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getAffiliatedFromInstituions();
                }
              }}
              value={searchTerms}
              label="Search Institute Name Here...."
              fullWidth
              sx={{ borderRadius: 10 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {searchTerms.length ? (
                      <IconButton
                        sx={{
                          background: "red",
                          color: "white",
                          margin: "20px",
                        }}
                        onClick={() => {
                          setSearchTerms("");
                          getAffiliatedFromInstituions();
                          console.log("Clicked");
                        }}
                      >
                        <Clear />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    <IconButton
                      sx={{ background: "orange", color: "white" }}
                      onClick={() => {
                        getAffiliatedFromInstituions();
                      }}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>

          <div className="col-3 text-end">
            {affiliated ? (
              <Button
                type="button"
                variant="outlined"
                color="success"
                className="text-capitalize py-2 rounded-3 h-100 px-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <FilePresentTwoTone />
                Insitute Bulk Register
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="col-3" >
            {affiliated ?
              <AffiliationRegistrationForm />
              : ""}
          </div>


          {/* <div>
            {affiliated ? <p className='pt-4 font-ubd fs-5 text-bolder'> This Institute is affiliated with ID:-{affiliated[0]?.id}</p> : <p className='pt-4 font-ubd fs-6'>Not Affiliation</p>}
          </div> */}
        </div>
        {/* <!-- Modal --> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h1
                  className="modal-title font-weight-bold fs-5"
                  id="exampleModalLabel"
                >
                  Institute Bulk Register
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
                <div className="container">
                  {!dataSaved && (
                    <div>
                      <div className="container mx-auto">
                        <div className="text-center item-center text-danger">
                          <span className="font-weight-bold text-decoration-underline">
                            NOTE
                          </span>
                          <br />
                          <span>
                            1. Only the Provided Format is allowed for file
                            upload.<br /> 2. Data limit is 1000 Users per Upload. {" "}
                          </span>{" "}
                          <br />
                        </div>{" "}
                        <Tooltip title="Use Provided file format to upload the student details">
                          <Button
                            variant="outlined"
                            color="error"
                            href="https://yuva.s3.ap-south-1.amazonaws.com/1678947478606Institute%20Bulk%20Register.xlsx"
                            target="_blank"
                          >
                            Template Sheet
                          </Button>
                        </Tooltip>
                        <div
                          className="border rounded-3 mt-4"
                          style={{ position: "relative", overflow: "hidden" }}
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
                              setFileData(); setFile(); e.target.value = null;
                            }}
                            onChange={(e) => { setFile(e.target.files[0]); convertFile(e); }}
                            id="fileData"
                          />
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
                              {fileData ? (
                                <div className="py-4 text-center position-relative">
                                  <h4>{fileName}</h4>
                                  <img
                                    src="/images/file-uploaded-img.png"
                                    alt=""
                                    width={200}
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              ) : (
                                <div className="py-4 text-center">
                                  <h4>Drag and drop or Click To Add File.</h4>
                                  <img
                                    src="/images/upload-cloud-folder.png"
                                    alt=""
                                    width={100}
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="input-group-append item-center text-center">
                          <Button
                            variant="outlined"
                            color="success"
                            className="rounded-3 mt-3 text-capitalize"
                            size="large"
                            type="button"
                            onClick={setInstituteData}
                          >
                            <FileUploadTwoTone /> Upload Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div hidden={!dataSaved || !dataSaved} className="container text-center item-center m-2 p-2" >
                  <p className=" text-decoration-underline lh-1" > Download the Data in Excel File </p>
                  <p className="text-decoration-underline lh-1" style={{ color: "red", fontSize: "15px" }} > (*Only Available once.) </p>
                  <Button hidden={!dataSaved?.length} className="rounded border mx-2" color="success" onClick={downloadSavedData} >Registered Data</Button>
                  <Button hidden={!dataFailed?.length} className="rounded border mx-2" onClick={() => { downloadExcel(dataFailed); }} >Unregistered Data</Button>
                </div>
                {/* Table for Institute Registered */}

                {dataSaved && !!Object.keys(dataSaved).length && (
                  <div className="container mx-auto my-4 align-items-center text-center">
                    <h5 className="font-weight-bold text-center">
                      Institute Registered {Object.keys(dataSaved).length}{" "}
                    </h5>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Institute ID</th>
                          <th>Affiliate ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Contact No</th>
                          <th>Email</th>
                          <th>institution_name</th>
                          <th>Institution_Address</th>
                          <th>state</th>
                          <th>pincode</th>
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
                              institution_name,
                              institution_address,
                              affiliate_id,
                              state,
                              pincode,
                              password,
                            }) => {
                              {
                                /* console.log(dataSaved) */
                              }
                              return (
                                <tr>
                                  <td>{id}</td>
                                  <td>{affiliate_id}</td>
                                  <td>{first_name}</td>
                                  <td>{last_name} </td>
                                  <td>{contact}</td>
                                  <td>{email}</td>
                                  <td>{institution_name}</td>
                                  <td>{institution_address}</td>
                                  <td>{state}</td>
                                  <td>{pincode}</td>
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
                      Institute Failed To Register
                    </h5>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Affiliate ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Contact No</th>
                          <th>Email</th>
                          <th>institution_name</th>
                          <th>Institution_Address</th>
                          <th>state</th>
                          <th>pincode</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataFailed &&
                          dataFailed.map(
                            ({
                              first_name,
                              last_name,
                              contact_no,
                              email,
                              institution_name,
                              institution_address,
                              affiliate_id,
                              state,
                              pincode,
                              Error,
                            }) => {
                              console.log(dataFailed);
                              return (
                                <tr>
                                  <td>{affiliate_id}</td>
                                  <td>{first_name}</td>
                                  <td>{last_name} </td>
                                  <td>{contact_no}</td>
                                  <td>{email}</td>
                                  <td>{institution_name}</td>
                                  <td>{institution_address}</td>
                                  <td>{state}</td>
                                  <td>{pincode}</td>
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
                <hr />
                {/* <div className="container text-center">
                  <a
                    href="https://yuva.s3.ap-south-1.amazonaws.com/1678435451621Student_Data_format.xlsx"
                    target="_blank"
                    data-bs-toggle="tooltipe"
                    title="Use Provided file format to upload the student details"
                  >
                    *File format for Bulk Upload
                  </a>
                </div> */}
              </div>
              {/* <div className="modal-footer h-10">
                <button type="button" className="btn btn-success m-0 px-4 py-2" data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Done
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* <button type="button" class="btn btn-primary" >
          Launch static backdrop modal
        </button> */}







        <div className="container">

          <div className="d-flex justify-content-end m-3 w-40">
            {/* <p className="" style={{margin:"0"}}>AFFILIATED ID:{" "}<span>{affiliated[0]?.id}</span></p> */}

            {/* s */}
            {allAffiliated.length ?
              <select
                id="limit"
                defaultValue={""}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLimit(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value={""} disabled> List Count </option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="40">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select> : ""}

          </div>
          <table class="table table-striped">
            <thead className="bg-grey">
              <tr>
                <th scope="col">LOGO</th>
                <th scope="col">ID</th>
                {/* <th scope="col">AFFILIATED ID</th> */}
                <th scope="col">INSTITUTION ID</th>
                <th scope="col">EMAIL</th>
                <th scope="col">CONTACT</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allAffiliated?.map((data) => {
                {
                  /* console.log(data) */
                }
                return (
                  <>
                    <tr>
                      <td className="p-2" width={50}>
                        <Avatar alt={data?.first_name} src={data?.logo} sx={{ width: 36, height: 36, backgroundColor: "orange" }}>
                          <LocationCity />
                        </Avatar>
                      </td>
                      <th scope="row">{data?.id}</th>
                      {/* <td>{data?.affiliate_id}</td> */}

                      <td>
                        <NavLink
                          to={`/dashboard/affiliate-institutes/${data?.id}`}
                        >
                          {data?.institution_name}{" "}
                        </NavLink>
                      </td>

                      <td>{data?.email}</td>
                      <td>{data?.contact}</td>
                      <td>
                        <Tooltip title="Remove from Affiliate">
                          <IconButton
                            sx={{ color: "tomato" }}
                            onClick={async () => {
                              // Updation("delete", undefined,ele?.id);
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You wanted to remove this institute!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, remove it!",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  try {
                                    const res = await apiAuth.put(
                                      `institute/institutes-affiliated?id=${data?.affiliate_id}&instituteId=${data?.id}`
                                    );
                                    if (res.status == 200) {
                                      Swal.fire({
                                        title: res.data.message,
                                        icon: "success",
                                      });
                                      setUpdate(update + 1);
                                    }
                                  } catch (error) {
                                    ErrorResponder(error);
                                    // Swal.fire({
                                    //   width: 400,
                                    //   title: error?.response?.data?.message
                                    //     ? error?.response?.data?.message
                                    //     : "Something Went Wrong Check  your Network Connection",
                                    //   icon: "error",
                                    // });
                                  }
                                }
                              });
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InstituteAffiliatedinstitute;
