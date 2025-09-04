import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  ButtonBase,
  InputAdornment,
  TextField,
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { Delete, LocationCity, SearchTwoTone } from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';

function States() {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("createdAt");
  const [sortPar, setSortPar] = React.useState(true);
  const [stateWiseData, setStateWiseData] = useState();
  const { adminRoles } = useGlobalContext();

  useEffect(() => {
    async function fetchStates() {
      try {
        const result = await apiAuth.get(`/public/adminState`);
        // console.log("LINK Response", result.data);
        setStateWiseData(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchStates();
  }, [sort])


  const handleSort = (arg) => {
    if (arg == sort) {
      setSortPar(!sortPar);
    } else {
      setSort(arg);
    }
  }
  const clearSearch = () => {
    setSearch("");

  };



  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <span className="form-label text-dark">Search</span>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            label={"Type Something here... "}
            fullWidth
            // onKeyDown={(e) => {
            //   if (e.key == "Enter") reload();
            // }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {search.length ? (
                    <Button color="error">
                      <Delete /> clear
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button >
                    <SearchTwoTone /> Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light text-center ">
              <th scope="col"> ID </th>
              <th scope="col"> State Name </th>
              <th scope="col"> Qoute </th>
              <th scope="col"> Youtube Video Link </th>
            </tr>
          </thead>
          <tbody>
            {stateWiseData ? stateWiseData.map((state) => {
              return (
                <tr className="border-bottom">
                  <td className="p-2" >
                    <Avatar
                      sx={{ width: 36, height: 36, backgroundColor: "orange" }}
                    >
                      <LocationCity sx={{ fontSize: "small" }} />{state.id}
                    </Avatar>
                  </td>
                  {/* {adminRoles() !== 3 ? */}
                    <td className="p-3" >

                      <NavLink to={(!adminRoles() === 1) ? '/dashboard/states/' + state.state : "#"}  >
                        {state?.state}
                      </NavLink>
                    </td>
                    {/* : <td  className="p-3"> {state?.state}</td>} */}
                  <td className="p-3" >
                    <small><i>{state?.qoute || "-"}</i><br /> <strong>{state?.qouteBy}</strong>  </small>
                  </td>
                  <td
                    className="p-3 text-center  text-wrap">
                    {state?.link && <a href={state?.link || "--"} target="_blank" className='text-truncate w-50' ><LinkIcon /></a>}
                  </td>
                </tr>
              )
            }) : ""}
          </tbody>
        </table>
        <div className="bg-light p-3">
          <div className="d-flex justify-content-between">
            <span className="text-dark">
              Showing Data out of Data
            </span>
            <div className="d-flex align-items-center">
              <select
                name="limit"

                className="form-select"
                onChange={"name"}
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

                className="text-capitalize h-100 mx-2"
              >
                prev
              </Button>
              <ButtonBase></ButtonBase>
              <Button
                size="small"

                variant="outlined"
                className="text-capitalize h-100 ms-2"
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default States
