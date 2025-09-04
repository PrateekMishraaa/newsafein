import {
  Button,
  ButtonBase,
  Tooltip,
} from "@mui/material";
import { Popup } from "utils/Popup";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as React from "react";
import { apiAuth } from "../../../api";
import { Delete, SearchTwoTone } from "@mui/icons-material";
import { deleteCertificateById } from "components/ui/deleteUserModal/DeleteUser";
const heads = [
  { name: "Student Name", sort: "first_name" },
  { name: "Course Name", sort: "course_name" },
  { name: "Certificate Key", sort: "certificate_key" },
  { name: "Institute Name", sort: "institution_name" },
  // { name: "Institute Address", sort: "institution_address" },
  { name: "Assigned Date", sort: "createdAt" },
  // { name: "Accredited By", sort: "accredited_by" },
];
const Certificates = () => {
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("createdAt");
  const [sortPar, setSortPar] = React.useState(true);
  async function reload() {
    try {
      const res = await apiAuth.get(
        `admin/certificate?data=students&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=${search}`
      );
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
        `admin/certificate?data=students&limit=${limit}&sort=${sort}&sortattr=${sortPar}&offset=${offset}&search=`
      );
      if (res.status == 200) {
        setData(res?.data);
        console.log(res?.data);
      }
    } catch (error) {
      Popup("error", "Something went wrong");
    }
  }

  //===================================
  //Handle Delete Certififate
  //===================================
  const handleDeleteCertificate = async (e, id) => {
    e.preventDefault();
    try {
      await deleteCertificateById(id);
      reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  React.useEffect(() => {
    reload("clear");
  }, [offset, sort, sortPar, limit]);

  const handleSort = (arg) => {
    if (arg == sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  };

  const handlePaginationNext = () => {
    let increment = Number(offset) + Number(limit);
    if (increment < data?.count) {
      setOffset(increment);
    }
  };
  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    if (decrement > 0) {
      setOffset(decrement);
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
      <div className="d-flex align-items-center">
        <h4>Certificates</h4>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="input-group">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder={"Type Something here... "}
              fullWidth
              onKeyDown={(e) => {
                if (e.key == "Enter") reload();
              }}
            />
            {Boolean(search.length) && (
              <button className="btn btn-outline-danger" onClick={clearSearch}>
                <Delete className="fs-6" /> clear
              </button>
            )}

            <button className="btn btn-primary" onClick={reload}>
              <SearchTwoTone className="fs-6" /> Search
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light">
              <th scope="col">Certificates</th>
              {heads.map((head, i) => {
                return (
                  <th scope="col">
                    <ButtonBase
                      onClick={() => handleSort(head.sort)}
                      onDoubleClick={() => setSort(null)}
                      className="text-capitalize p-2"
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((row, i) => {
              return (
                <tr key={i} className="border-bottom">
                  <td>
                    <Tooltip title="Click Here to Download">
                      <a download href={row?.img}>
                        <img src={row?.img} width={80} />
                      </a>
                    </Tooltip>
                  </td>
                  <td className="p-1">
                    {row?.title} {row?.first_name} {row?.last_name}
                  </td>
                  <td className="p-1">{row?.course_name}</td>
                  <td className="p-1">{row?.certificate_key}</td>
                  <td
                    className="p-1 text-wrap"
                    style={{ width: "200 !important" }}
                  >
                    {row.institution_name}
                  </td>
                  <td className="p-1" style={{ width: 150 }}>
                    {row.createdAt && moment(row.createdAt).format("MMM Do YY")}
                  </td>
                  <td>
                    <div className="d-flex h-100">
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-dark"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li className="dropdown-item">
                            <button
                              className="btn btn-outline-danger w-100"
                              onClick={(e) =>
                                handleDeleteCertificate(e, `${row.id}`)
                              }
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </li>
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
};

export default Certificates;
