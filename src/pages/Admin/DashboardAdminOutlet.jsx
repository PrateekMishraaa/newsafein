import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const DashboardAdminOutlet = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const { pathname } = useLocation();
  return (
    <div>
      <div className="bg-light p-3" role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" className="text-capitalize text-dark">
          <NavLink underline="hover" color="inherit" to={"/" + pathname.split("/")[1]}>
            {pathname.split("/")[1]}
          </NavLink>
          <NavLink underline="hover" className={"text-dark"} to={pathname}>
            {pathname.split("/")[2]}
          </NavLink>
        </Breadcrumbs>
      </div>
      <div className="container-fluid min-vh-100 p-2">
        {/* Outlet  */}
        <div className="py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminOutlet;
