import { Button } from "@mui/material";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import RegisterAsk from "pages/Auth/logincomps/RegisterAsk";
import useRoutes from "hooks/useRoutes";
import { MegaMenu, AvatarMenu } from "./navbar";
import {Menu} from "@mui/icons-material";

export const NavigationBar = ({ handleDrawerToggle }) => {
  const { token } = useGlobalContext();
  const { pathname } = useLocation();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setState({ ...state, [anchor]: open });
  };
  const [solutionCollapse, setSolutionCollapse] = useState(false);
  const [aboutCollapse, setAboutCollapse] = useState(false);
  useEffect(() => {
    toggleDrawer("left", false)();
    setAboutCollapse(false);
    setSolutionCollapse(false);
  }, [pathname]);
  // For Register Button
  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const handleClose = () => setshowRegisterPopup(false);
  const handleShow = () => setshowRegisterPopup(true);
  useEffect(() => {
    const menuTrigger = document.querySelector(".mega-link1");
    const menuContent = document.querySelector(".collapse1");
    const menuTrigger2 = document.querySelector(".mega-link2");
    const menuContent2 = document.querySelector(".collapse2");
    menuTrigger.addEventListener("mouseenter", function () {
      setAboutCollapse(false);
      setSolutionCollapse(true);
    });

    menuTrigger.addEventListener("mouseleave", function () {
      menuContent.addEventListener("mouseleave", function () {
        setSolutionCollapse(false);
      });
    });
    menuTrigger2.addEventListener("mouseenter", function () {
      setSolutionCollapse(false);
      setAboutCollapse(true);
    });
    menuTrigger2.addEventListener("mouseleave", function () {
      menuContent2.addEventListener("mouseleave", function () {
        setAboutCollapse(false);
      });
    });
    const simpleLinks = document.querySelectorAll(".simple-link");
    simpleLinks.forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        setAboutCollapse(false);
        setSolutionCollapse(false);
      });
    });
  });

  const { MegaMenuArr } = useRoutes({ solutionCollapse, setSolutionCollapse, aboutCollapse, setAboutCollapse });
  return (
    <>
      <nav className={`navbar py-1 navbar-expand-lg bg-white w-100 ${token ? "logged-navbar" : ""}`}>
        <div className="container justify-content-between align-items-center">
          <div className="navbar-brand align-items-center d-flex">
            <button onClick={handleDrawerToggle} className={`btn btn-primary me-2 text-primary p-1 px-2 ${!token && "d-lg-none"}`}>
              <Menu className="text-white"/>
            </button>
            <NavLink className="me-0 mb-2" to={"/"}>
              <img style={{ height: 40, zIndex: 100 }} className="" src={"/logo.png"} alt="safeinschool" />
            </NavLink>
          </div>
          <div className="collapse navbar-collapse pb-0" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto align-items-center justify-content-start">
              <li className="nav-item">
                <NavLink className="nav-link text-dark text-capitalize mega-link1" to="/learning">
                  Solutions <i className="bi bi-chevron-down text-primary"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark text-capitalize simple-link" to="/community">
                  Community
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark text-capitalize simple-link" to="/courses">
                  Courses
                </NavLink>
              </li>
              <li className="nav-item mega-item">
                <NavLink className="nav-link text-dark text-capitalize mega-link2" data-bs-toggle="collapse" to="/about" role="button">
                  About&nbsp;Us <i className="bi bi-chevron-down text-primary"></i>
                </NavLink>
              </li>
              <li className="nav-item text-dark">
                <NavLink className="nav-link text-dark text-capitalize simple-link" to="/contact">
                  Contact&nbsp;Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            {/* <SearchItem /> */}
            {/* <IconButton  className="mx-2">
              <Badge badgeContent={4} color="success">
                <Notifications color="warning" />
              </Badge>
            </IconButton> */}
            {token ? (
              <>
                <AvatarMenu handleDrawerToggle={handleDrawerToggle} />
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={handleShow} color="warning" className="text-initial py-2 rounded-pill px-3">
                  Register
                </Button>
                <NavLink to={"/login"}>
                  <Button variant="contained" color="warning" className="text-capitalize py-2 ms-1 rounded-pill px-3">
                    Login
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Mega Menu Container */}
      <div className="p-relative megamenu w-100 border-2 border-black">
        {/* Solutions Navs  */}
        {MegaMenuArr?.map((megaItem, index) => {
          return <MegaMenu data={megaItem} key={index} />;
        })}
      </div>
      {showRegisterPopup && <RegisterAsk handleClose={handleClose} />}
    </>
  );
};
