import {
  Avatar,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import { apiAuth } from "../../../api";
import {
  Delete,
  LocationCity,
  MenuOutlined,
  SearchTwoTone,
} from "@mui/icons-material";
import {
  postAffiliateInstitute,
  deleteAffiliateInstitute,
} from "./APIHandleFunction";
import useError from "hooks/useError";
import AdminInstituteRegistration from "./AdminInstituteRegistration";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import { DeleteInstitute } from "components/ui/deleteUserModal/DeleteUser";

const heads = [
  { name: "logo", sort: "logo" },
  { name: "Institution Name", sort: "institution_name" },
  { name: "Representative", sort: "first_name" },
  { name: "Email", sort: "email" },
  { name: "Contact", sort: "contact" },
  { name: "Date of Join", sort: "createdAt" },
  { name: "status", sort: "status" },
];
// comment

export default function InstituteDataTable() {
  const { ErrorResponder } = useError();
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("id");
  const [sortPar, setSortPar] = React.useState(false);
  const [update, setUpdate] = React.useState(0);
  // const anchorRef = React.useRef < HTMLDivElement > null;
  const { adminRoles } = useGlobalContext();
  const navigate = useNavigate();
  console.log(data, "dataList===>");
  const handleSort = (arg) => {
    if (arg === sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  };
  async function reload() {
    // console.log(
    //   "limit",
    //   limit,
    //   "sort",
    //   sort,
    //   "sort",
    //   sortPar,
    //   "offset",
    //   offset
    // );
    try {
      const res = await apiAuth.get(
        `admin?data=institutions&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`
      );
      if (res.status === 200) {
        setData(res?.data);
        // console.log(res?.data);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  }
  async function clearReload() {
    // console.log(
    //   "limit",
    //   limit,
    //   "sort",
    //   sort,
    //   "sort",
    //   sortPar,
    //   "offset",
    //   offset
    // );

    try {
      const res = await apiAuth.get(
        `admin?data=institutions&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`
      );
      if (res.status === 200) {
        setData(res?.data);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  }
  const activate = async (instituteId, email, status) => {
    const formData = new FormData();
    formData.append("instituteId", instituteId);
    formData.append("email", email);
    if (status === "active") {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Deactivate this Institute!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Deactivate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(
                `admin/institute?req_type=deactivate`,
                formData
              );
              if (res.status === 200) {
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
        // const res = await apiAuth.post(`admin/institute?req_type=activate`, formData);
        // if (res.status == 200) {
        //   reload();
        //   toast.success("Institute Activated Successfully");
        // }

        Swal.fire({
          title: "Are you sure?",
          text: "You wanted to Activate this Institute!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Activate it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await apiAuth.post(
                `admin/institute?req_type=activate`,
                formData
              );
              if (res.status === 200) {
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
        // console.log(error);
        // pop2.error({ desc: "Something Went Wrong" });
      }
    }
  };
  const handlePaginationNext = () => {
    // console.log("sort", sort);
    // console.log(typeof offset, typeof limit);

    let increment = Number(offset) + Number(limit);
    console.log(increment);

    if (increment < data?.count) {
      setOffset(increment);
      console.log("Pagination to next page " + offset);
    }
  };
  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    console.log(decrement);

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
  React.useEffect(() => {
    reload();
  }, [update, limit, offset, sort, sortPar]);

  //=============================================
  //Delete Institute Data Handler
  //============================================

  const handleDeleteInstitute = async (e, id) => {
    e.preventDefault();
    try {
      await DeleteInstitute(id);
      reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            label={"Type Something here... "}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter") reload();
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
        <div hidden={!(adminRoles() === 1)} className="col-3 ">
          <AdminInstituteRegistration />
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
                        {sort === head.sort && sortPar === true && (
                          <ArrowDropUpIcon sx={{ color: "green" }} />
                        )}
                        {sort === head.sort && sortPar === false && (
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
              return (
                <tr key={i} className="border-bottom">
                  <td className="p-2" width={50}>
                    <Avatar
                      alt={row.first_name}
                      src={row?.logo}
                      sx={{ width: 36, height: 36, backgroundColor: "grey" }}
                    >
                      <LocationCity />
                    </Avatar>
                  </td>
                  <NavLink to={`/admin/institutes/${row.id}`}>
                    <td className="p-3" style={{ width: 200 }}>
                      {row.institution_name}
                    </td>
                  </NavLink>
                  <td className="p-3" style={{ width: 200 }}>
                    {row.title} {row.first_name} {row.last_name}
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
                    {moment(row.createdAt).format("MMM Do YY")}
                  </td>
                  <td className="p-3" style={{ width: 150 }}>
                    <span
                      className={`${
                        row.status === "active" ? "bg-success" : "bg-danger"
                      } p-1 px-3 rounded-pill text-white`}
                    >
                      {row.status ? row.status : "Inactive"}
                    </span>
                  </td>
                  <td hidden={adminRoles() === 5}>
                    {/* <Tooltip placement="top" title={row.status !== "active" ? "Mark Active" : "Mark Inactive"}>
                      <IconButton
                        size="small"
                        variant="outlined"
                        color={row.status == "active" ? "error" : "success"}
                        onClick={() => activate(row.id, row.email, row.status)}
                      >
                        {row.status == "active" ? <Cancel /> : <Verified />}
                      </IconButton>
                    </Tooltip> */}
                    {/* <div className="d-flex h-100">
                      <div className="dropdown">
                        <button
                          className="btn border-0 p-0 mx-2"

                          data-bs-toggle="dropdown"

                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button type="button" onClick={() => activate(row.id, row.email, row.status)} className="dropdown-item">
                              {row.status == "active"
                                ? "Mark Inactive"
                                : "Mark Active"}

                            </button>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <div className="d-flex h-100">
                      <div class="dropdown ">
                        <IconButton
                          color="standard"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <MenuOutlined />
                        </IconButton>
                        <ul className="dropdown-menu border rounded-4 p-3 shadow">
                          <li className="dropdown-item w-100 p-0">
                            <button
                              className="btn btn-outline-primary w-100"
                              onClick={() =>
                                navigate(
                                  `/admin/editdetail/institute/${row.id}`
                                )
                              }
                            >
                              Edit Details
                            </button>
                          </li>
                          <li li className="dropdown-item w-100 p-0 mt-1">
                            <button
                              className="btn btn-outline-danger w-100"
                              onClick={(e) =>
                                handleDeleteInstitute(e, `${row.id}`)
                              }
                            >
                              Delete
                            </button>
                          </li>
                          <li className="dropdown-item w-100 p-0 mt-1">
                            <button
                              className="btn btn-outline-primary w-100"
                              type="button"
                              onClick={() =>
                                activate(row.id, row.email, row.status)
                              }
                            >
                              {row.status === "active"
                                ? "Mark Inactive"
                                : "Mark Active"}
                            </button>
                          </li>
                          <li className="dropdown-item w-100 p-0 mt-1">
                            {row?.InstituteAffiliateId === row?.id ? (
                              <button
                                onClick={() => {
                                  deleteAffiliateInstitute(
                                    row?.AffiliateId,
                                    () => {
                                      setUpdate(update + 1);
                                    }
                                  );
                                }}
                                className="btn btn-outline-primary w-100"
                              >
                                Remove from Affiliate
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  postAffiliateInstitute(row?.id, () => {
                                    setUpdate(update + 1);
                                  });
                                }}
                                className="btn btn-outline-primary w-100"
                              >
                                Mark as Affiliate
                              </button>
                            )}
                          </li>
                          {/* <li > <Button fullwidth color="error" className="dropdown-item w-100 p-2 my-2 " variant="outlined" type="button" onClick={()=>deleteInstitute(row?.id)}> Delete Institute </Button> </li> */}
                          {/* <li><button class="dropdown-item" type="button" ></button></li> */}
                          {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
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
                disabled={Number(offset) < Number(limit) ? true : false}
                onClick={handlePaginationPrev}
                className="text-capitalize h-100 mx-2"
              >
                prev
              </Button>
              <ButtonBase>{offset ? offset / limit + 1 : 1}</ButtonBase>
              <Button
                size="small"
                onClick={handlePaginationNext}
                disabled={
                  Number(offset) + Number(limit) + 1 > data.count ? true : false
                }
                variant="outlined"
                className="text-capitalize h-100 ms-2"
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
