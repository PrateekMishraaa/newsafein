/*
    ==== Student Bulk Register Data Editer ====
    - Edit and upload data. 
 */
import {
  Cancel,
  CloseOutlined,
  DoneAll,
  RestartAlt,
  Upload,
  UploadFile,
} from "@mui/icons-material";
import { Button, TextField, Tooltip } from "@mui/material";
import { apiJsonAuth } from "api";
import { pop2 } from "utils/Popup";
import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import moment from "moment";
import { IconButton } from "@mui/joy";
// !json[0]?.First_Name && !json[0]?.Last_Name && !json[0]?.Contact && !json[0]?.Email
function BulkDataFormat({ data, setFileData, setFile, upload }) {
  const [dataList, setDataList] = useState(data);
  const [update, setUpdate] = useState();
  const [checkEmails, setCheckEmails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Contact: "",
    DOB: "",
  });
  /*
   return already exists Emails.
   */
  useEffect(() => {
    pop2.loading();
    const emails = [];
    dataList?.map(({ Email }) => {
      emails.push(Email);
    }); // List of uploaded Emails
    apiJsonAuth
      .post("institute/allEmails", emails)
      .then(({ data }) => {
        setCheckEmails(data?.emails); // use in (validateRow) for Emails Validation.
      })
      .catch((err) => {
        console.log(err);
        pop2.error("Something Went Wrong!!");
      });

    // Update File Object On Date Update
    generateAsExcel(dataList);
  }, [dataList, update]);

  /*
   ====checkDublicateEmai====
   - count the each email count in the data.
   - return count of an email which is passed. 
   */
  function checkDublicateEmai(email, data) {
    var count = -1;
    data?.map(({ Email }) => {
      if (email === Email) {
        count += 1;
      }
    });
    return count;
  }

  /*
 ====checkDublicateContact====
 - count the each contact count in the data.
 - return count of an contact which is passed. 
 */
  function checkDublicateContact(contact, data) {
    var count = -1;
    data?.map(({ Contact }) => {
      if (contact === Contact) {
        count += 1;
      }
    });
    return count;
  }

  /* 
  =========deleteData=====
  -- delete singe item (row) from the data
   */
  function deleteData(i) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        let tempdata = dataList;
        delete tempdata[i];
        setDataList(tempdata);
        setUpdate(!update);
        toast.success("Deleted Successfully.");
      }
    });
  }

  /*
   ===generateAsExcel===
   - conver json date to file object. 
   */
  function generateAsExcel(data) {
    try {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
      var xlsblob = new Blob(
        [
          new Uint8Array(
            xlsx.write(workbook, { bookType: "xlsx", type: "array" })
          ),
        ],
        { type: "application/octet-stream" }
      );
      const file = new File([xlsblob], "demo.xlsx", { type: "xlsx" });
      setFile(file); // update file
      // }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  /* 
  =====validateRow====
  - validate fields for each row
   */
  function validateRow(item) {
    if (checkEmails?.includes(item?.Email)) {
      return { message: "Emails Already Exists" };
    } else if (checkDublicateEmai(item?.Email, dataList)) {
      return { message: "Duplicate Email" };
    } else if (checkDublicateContact(item?.Contact, dataList)) {
      return { message: "Duplicate Contact" };
    } else if (!item?.First_name || !item?.Contact || !item?.Email) {
      return { message: "Data Missing" };
    } else if (String(item?.Contact).length != 10 || !Number(item?.Contact)) {
      return { message: "Incorrect Contact" };
    }
    return false;
  }

  /* 
  ====validateAndUpload====
  - upload data when add the is validated.
   */
  function validateAndUpload() {
    var check = true;
    if (dataList.length) {
      dataList?.map((item) => {
        if (validateRow(item)) {
          check = false;
        }
      }); /// validate each item before Upload.
      if (check) {
        upload();
      } else {
        toast.warning("Error In Data");
      }
    } else {
      toast.error("No Data Found!");
    }
  }

  return (
    <div>
      <div className="mb-2">
        <Button
          className="me-2 p-2 px-3"
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            setFileData();
            setFile();
          }}
          startIcon={<Cancel />}
        >
          Cancel
        </Button>
        <Button
          className="p-2 px-3"
          variant="contained"
          color="success"
          size="small"
          onClick={() => {
            validateAndUpload();
          }}
          startIcon={<UploadFile />}
        >
          Upload
        </Button>
      </div>
      <table
        className="table position-relative pb-0 mb-0"
        style={{ fontSize: "15px" }}
      >
        <thead className="bg-light-white2-grad">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First&nbsp;Name</th>
            <th scope="col">Last&nbsp;Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">DOB</th>
            <th scope="col">Error(If&nbsp;Any) </th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataList?.map((item, i) => {
            console.log(item, "item===>");
            return (
              <tr
                key={i + 1}
                title={validateRow(item)?.message}
                className={validateRow(item) ? "table-danger" : ""}
                onDoubleClick={() => {
                  setEdit(i);
                  setEditData(item);
                }}
              >
                <th scope="row">{i + 1}</th>
                {edit === i ? (
                  <>
                    <td>
                      <TextField
                        defaultValue={editData?.First_name}
                        onChange={(e) => {
                          setEditData((prv) => ({
                            ...prv,
                            First_name: e.target.value,
                          }));
                        }}
                        size="small"
                      />
                    </td>
                    <td>
                      <TextField
                        defaultValue={editData?.Last_name}
                        onChange={(e) => {
                          setEditData((prv) => ({
                            ...prv,
                            Last_name: e.target.value,
                          }));
                        }}
                        size="small"
                      />
                    </td>
                    <td>
                      <TextField
                        type="email"
                        defaultValue={editData.Email}
                        onChange={(e) => {
                          setEditData((prv) => ({
                            ...prv,
                            Email: e.target.value,
                          }));
                        }}
                        size="small"
                      />
                    </td>
                    <td>
                      <TextField
                        defaultValue={editData.Contact}
                        onChange={(e) => {
                          setEditData((prv) => ({
                            ...prv,
                            Contact: e.target.value,
                          }));
                        }}
                        size="small"
                      />
                    </td>
                    <td>
                      <TextField
                        defaultValue={moment(editData.DOB, "DD-MM-YYYY").format(
                          "DD-MM-YYYY"
                        )}
                        onChange={(e) => {
                          setEditData((prv) => ({
                            ...prv,
                            DOB: e.target.value,
                          }));
                        }}
                        size="small"
                      />
                    </td>
                    <td>
                      <small>
                        <Tooltip title="Update">
                          <DoneAll
                            sx={{ color: "blue" }}
                            onClick={() => {
                              let tempdata = dataList;
                              tempdata[i] = editData;
                              setDataList(tempdata);
                              setEdit(false);
                              setEdit();
                              setUpdate(!update);
                            }}
                          />
                        </Tooltip>
                      </small>
                    </td>
                    <td>
                      <small>
                        <Tooltip title="Back">
                          <RestartAlt
                            sx={{ color: "black" }}
                            onClick={() => {
                              setEdit(false);
                            }}
                          />
                        </Tooltip>
                      </small>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item?.First_name}</td>
                    <td>{item?.Last_name}</td>
                    <td>{item?.Email}</td>
                    <td>{item?.Contact}</td>
                    <td>
                      {moment(item?.DOB, "DD-MM-YYYY").format("DD-MM-YYYY")}
                    </td>
                    <td>{validateRow(item)?.message}</td>
                    <td className="p-0">
                      <Tooltip title="Edit">
                        <IconButton
                          className="m-2 text-success bg-success bg-opacity-25"
                          onClick={() => {
                            setEdit(i);
                            setEditData(item);
                          }}
                        >
                          {" "}
                          <EditIcon />{" "}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          className="text-danger bg-danger bg-opacity-25"
                          onClick={() => {
                            deleteData(i);
                          }}
                        >
                          {" "}
                          <CloseOutlined />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BulkDataFormat;
