import {
  Avatar,
  Button,
  ButtonBase,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Popup } from "utils/Popup";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as React from "react";
import { apiAuth } from "../../../api";
import {
  Delete,
  Person2,
  SearchTwoTone,
} from "@mui/icons-material";
import useError from "hooks/useError";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import { useNavigate } from "react-router-dom";
import { DeleteUsers } from "components/ui/deleteUserModal/DeleteUser";
const heads = [
  { name: "id", sort: "id" },
  { name: "Student Name", sort: "first_name" },
  { name: "Institute Name", sort: "instituteId" },
  { name: "Guardian Name", sort: "father_name" },
  { name: "email", sort: "email" },
  { name: "contact", sort: "contact" },
  { name: "Joining Date", sort: "createdAt" },
  { name: "status", sort: "status" },
];
export default function StudentDataTable() {
  const { ErrorResponder } = useError();
  const [data, setData] = React.useState([]);
  const [roleList, setRoleList] = React.useState([
    "student",
    "teacher",
    "coordinator",
  ]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [role, setRole] = React.useState("student");
  const [sort, setSort] = React.useState("createdAt");
  const [sortPar, setSortPar] = React.useState(true);
  const { adminRoles } = useGlobalContext();
  const navigate = useNavigate();
  async function reload() {
    try {
      const res = await apiAuth.get(
        `admin?data=students&role=${role}&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`
      );
      console.log("response", res);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }
  async function clearReload() {
    try {
      const res = await apiAuth.get(
        `admin?data=students&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`
      );
      console.log("response", res);
      if (res.status == 200) {
        setData(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }

  const activate = async (studentId, email, status) => {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("email", email);
    if (status == "active") {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Deactivate this Student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Deactivate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(
                `admin/student?req_type=deactivate`,
                formData
              );
              if (res.status == 200) {
                Swal.fire({
                  title: res.data.message,
                  icon: "success",
                });
                reload();
              }
            } catch (error) {
              Swal.fire({
                width: 400,
                title: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Something Went Wrong Check your Network Connection",
                icon: "error",
              });
            }
          }
        });
      } catch (error) {
        ErrorResponder(error);
        // pop2.error({ title: "Something Went Wrong" });
      }
    } else {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Activate this Student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Activate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(
                `admin/student?req_type=activate`,
                formData
              );
              if (res.status == 200) {
                Swal.fire({
                  title: res.data.message,
                  icon: "success",
                });
                reload();
              }
            } catch (error) {
              Swal.fire({
                width: 400,
                title: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Something Went Wrong Check your Network Connection",
                icon: "error",
              });
            }
          }
        });
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };

  React.useEffect(() => {
    reload("clear");
  }, [offset, sort, sortPar, limit, role]);
  const handleSort = (arg) => {
    if (arg == sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  };

  //====================================
  //Delete User handler
  //====================================
  const handleDeleteUser = async (e, id) => {
    e.preventDefault();
    try {
      await DeleteUsers(id);
      reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePaginationNext = () => {
    let increment = Number(offset) + Number(limit);
    console.log("Clicked");
    if (increment < data?.count) {
      setOffset(increment);
      console.log("Pagination to next page " + offset);
    }
    console.log(offset);
  };

  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    if (decrement > 0) {
      setOffset(decrement);
      console.log("Pagination to prev page " + offset);
    } else {
      setOffset(0);
    }
  };
  const clearSearch = () => {
    setSearch("");
    clearReload();
  };
  return (
    <div>
      <h5 className="text-capitalize">{role} Data</h5>
      <div className="row">
        <div className="col-lg-8">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            label={"Type Something here... "}
            fullWidth
            onKeyDown={(e) => {
              if (e.key == "Enter") reload();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {search.length ? (
                    <Button color="error" onClick={clearSearch}>
                      <Delete /> clear
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button onClick={reload}>
                    <SearchTwoTone /> Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="col">
          <select
            name="role-select"
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select py-3 rounded-0 text-capitalize"
          >
            {roleList.map((role) => {
              return <option value={role}>{role}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light ">
              {heads.map((head, i) => {
                return (
                  <th scope="col">
                    <ButtonBase
                      onClick={() => handleSort(head.sort)}
                      onDoubleClick={() => setSort(null)}
                      className="fw-semibold text-capitalize p-2"
                    >
                      <div className="d-flex align-items-center">
                        <span className="text-nowrap">{head.name}</span>
                        {sort === head.sort && sortPar == true && (
                          <ArrowDropUpIcon sx={{ color: "green" }} />
                        )}
                        {sort === head.sort && sortPar == false && (
                          <ArrowDropDownIcon sx={{ color: "tomato" }} />
                        )}
                      </div>
                    </ButtonBase>
                  </th>
                );
              })}
              <th
                hidden={adminRoles() === 5}
                scope="col"
                className="fw-semibold text-capitalize p-3"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((row, i) => {
              if (i === 0) {
                console.log(row);
              }
              return (
                <tr key={i} className="border-bottom">
                  <td className="p-2" width={50}>
                    <Avatar
                      alt={row.first_name}
                      src={row?.profile}
                      sx={{ width: 36, height: 36, backgroundColor: "grey" }}
                    >
                      <Person2 />
                    </Avatar>
                  </td>
                  <td className="p-3" style={{ width: 200 }}>
                    {row?.title} {row?.first_name} {row?.last_name}
                  </td>
                  <td className="p-3" style={{ width: 200 }}>
                    {row?.institution_name
                      ? row?.institution_name
                      : "No Institute"}
                  </td>
                  <td className="p-3 " style={{ width: 200 }}>
                    <span>{row?.father_name}</span>
                  </td>
                  <td
                    className="p-3 text-wrap"
                    style={{ width: "200 !important" }}
                  >
                    {row.email}
                  </td>
                  <td className="p-3" style={{ width: 150 }}>
                    {row.contact}
                  </td>
                  <td className="p-3" style={{ width: 150 }}>
                    {row.createdAt && moment(row.createdAt).calendar()}
                  </td>
                  <td className="p-3" style={{ width: 150 }}>
                    <span
                      className={`${
                        row.status == "active" ? "bg-success" : "bg-danger"
                      } p-1 px-3 rounded-pill text-white`}
                    >
                      {row.status ? row.status : "Inactive"}
                    </span>
                  </td>
                  <td hidden={adminRoles() === 5}>
                    <div className="d-flex h-100">
                      <div className="dropdown">
                        <button
                          className="btn border-0 p-0 mx-2"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu border rounded-4 p-3 shadow">
                          <li>
                            <button
                              className="btn  btn-outline-primary w-100"
                              onClick={() =>
                                navigate(`/admin/editdetail/users/${row.id}`)
                              }
                            >
                              Edit Details
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="btn btn-outline-danger w-100 my-2"
                              onClick={(e) => handleDeleteUser(e, `${row.id}`)}
                            >
                              Delete User
                            </button>
                          </li>
                          <li>
                            <Button
                              onClick={() =>
                                activate(row.id, row.email, row.status)
                              }
                              variant="outlined"
                              className="dropdown-item w-100 p-2 my-2"
                            >
                              {row.status == "active"
                                ? "Mark Inactive"
                                : "Mark Active"}
                            </Button>
                          </li>
                          {/* <li > <Button fullwidth color="error" className="dropdown-item w-100 p-2 my-2 " variant="outlined" type="button" onClick={()=>deleteStudent(row?.id)}> Delete Student </Button> </li> */}
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bg-light p-3">
          <div className="d-flex justify-content-between">
            <span className="text-dark">
              Showing {data?.result?.length} out of {data?.count}
            </span>
            <div className="d-flex align-items-center">
              <select
                name="limit"
                value={limit}
                className="form-select"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
              <Button
                size="small"
                variant="outlined"
                onClick={handlePaginationPrev}
                className="text-capitalize h-100 mx-2"
                disabled={Number(offset) < Number(limit) ? true : false}
              >
                prev
              </Button>
              <ButtonBase>{offset ? offset / limit + 1 : 1}</ButtonBase>
              <Button
                size="small"
                onClick={handlePaginationNext}
                variant="outlined"
                className="text-capitalize h-100 ms-2"
                disabled={
                  Number(offset) + Number(limit) + 1 > data.count ? true : false
                }
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
