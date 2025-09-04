import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Collapse, Divider, Drawer, Paper, useMediaQuery } from "@mui/material";
import { Chat, ClearOutlined, ExitToAppOutlined, ExpandLess, ExpandLessTwoTone, ExpandMore, Group, YouTube } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useRoutes from "hooks/useRoutes";
import { useGlobalContext } from "global/context";
import { Badge } from "react-bootstrap";
const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    marginRight: 5,
    paddingBottom: 7,
    color: "#000000",
    borderRadius: "0px 35px 35px 0px",
    fontSize: "5px !important",
  },
  "&.Mui-selected, &.Mui-focusVisible": {
    backgroundColor: "#2e8b57 !important",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 10,
    color: "#000000",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px !important",
  },
});
const ColoredListComp = ({ children }) => {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: false,
            },
          },
        },
        palette: {
          mode: "dark",
          primary: { main: "#ffffff" },
          background: { paper: "#fff" },
        },
      })}>
      <Paper elevation={0} sx={{ maxWidth: 280 }}>
        <FireNav component="nav">{children}</FireNav>
      </Paper>
    </ThemeProvider>
  );
};
const DrawerItem = ({ drawerDetail, navigate, pathname, userData }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <NavLink to={!drawerDetail?.subList && drawerDetail?.path}>
        <ListItemButton
          disablePadding
          disableRipple
          disableTouchRipple
          selected={pathname === drawerDetail?.path}
          onClick={drawerDetail?.subList && handleClick}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgb(255, 149, 2, 0.2)",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "rgb(255, 149, 2, 0.2)",
            },
          }}>
          <ListItemIcon className="">{drawerDetail?.icon}</ListItemIcon>
          <ListItemText primary={drawerDetail?.title} secondary={drawerDetail?.badge && <Badge bg={drawerDetail?.badge?.color}>{drawerDetail?.badge?.text}</Badge>} />
          {drawerDetail?.subList ? open ? <ExpandLessTwoTone sx={{ fontSize: 45 }} /> : <ExpandMore sx={{ fontSize: 45 }} /> : ""}
        </ListItemButton>
      </NavLink>
      {drawerDetail?.subList && (
        <Collapse in={open} key={''} timeout="auto" unmountOnExit style={{ backgroundColor: "#f8f9fa" }}>
          <List component="div">
            {drawerDetail?.subList.map((subDrawerDetail, index) => {
              if (subDrawerDetail.roles.includes(userData?.role))
                return (
                  <NavLink to={subDrawerDetail?.path}>
                    <ListItemButton
                      disablePadding
                      disableRipple
                      disableTouchRipple
                      selected={pathname === subDrawerDetail?.path}
                      sx={{
                        pl: 4,
                        "&.Mui-selected": {
                          backgroundColor: "rgb(255, 149, 2, 0.2)",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "rgb(255, 149, 2, 0.2)",
                        },
                      }}>
                      <ListItemIcon className="">{subDrawerDetail?.icon}</ListItemIcon>
                      <ListItemText primary={<span className="font-sm ">{subDrawerDetail?.title}</span>} />
                    </ListItemButton>
                  </NavLink>
                );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};
const MegaDrawerItem = ({ drawerDetail, navigate, pathname }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleNavigation = () => {
    navigate(drawerDetail?.path);
  };
  const handleSubNavigation = (path) => {
    navigate(path);
  };
  return (
    <>
      <ListItemButton disablePadding selected={pathname === drawerDetail?.path} onClick={drawerDetail?.links ? handleClick : handleNavigation}>
        <ListItemIcon>{drawerDetail?.icon}</ListItemIcon>
        <ListItemText primary={drawerDetail?.title} />
        {drawerDetail?.links ? open ? <ExpandLess /> : <ExpandMore /> : ""}
      </ListItemButton>
      {drawerDetail?.links && (
        <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: "#f8f9fa" }}>
          <List component="div" disablePadding>
            {drawerDetail?.links.map((subDrawerDetail, index) => {
              return (
                <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => handleSubNavigation(subDrawerDetail?.path)} selected={pathname === subDrawerDetail?.path}>
                  <ListItemIcon>{subDrawerDetail?.icon}</ListItemIcon>
                  <ListItemText primary={<span className="font-sm">{subDrawerDetail?.name}</span>} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};
export const SidePanel = (props) => {
  const { window, drawerWidth, setDrawerWidth, handleDrawerToggle, mobileOpen } = props;
  const { userData, logoutHandler, token } = useGlobalContext();
  const tokenn = localStorage.getItem("token",token)
  // console.log(tokenn)
  const navigate = useNavigate();
  const { MegaMenuArr } = useRoutes();
  const { pathname } = useLocation();
  const SizeMobile = useMediaQuery("(max-width:700px)");
  React.useEffect(() => {
    if (mobileOpen) {
      setDrawerWidth(280);
    } else {
      setDrawerWidth(0);
    }
  }, [mobileOpen]);
  const { sideDrawer } = useRoutes();
  const drawer = (
    <div className="h-100">
      <ListItemButton component="div" disableRipple className="border-bottom rounded-0 mb-3 py-2 me-0 mt-1">
        <ListItemText
          sx={{ my: 0 }}
          primary={<b className="text-capitalize">{userData?.role}</b>}
          secondary={<span className="text-secondary">{userData?.email}</span>}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
        <ListItemIcon className="bg-warning bg-opacity-25 p-2 border border-2 fw-bold border-primary text-primary me-0 rounded" onClick={handleDrawerToggle}>
          <ClearOutlined fontSize="25"/>
        </ListItemIcon>
      </ListItemButton>
      {sideDrawer.map((drawerDetail, drawerIndex) => {
        if (drawerDetail.roles.includes(userData?.role)) {
          return <DrawerItem key={drawerIndex} userData={userData} drawerDetail={drawerDetail} navigate={navigate} pathname={pathname} />;
        }
      })}
      {SizeMobile && (
        <>
          <ListItemButton disablePadding onClick={() => navigate("/courses")}>
            <ListItemIcon>
              <YouTube />
            </ListItemIcon>
            <ListItemText primary={"Our Courses"} />
          </ListItemButton>
          {MegaMenuArr?.map((megaItem, index) => {
            return <MegaDrawerItem key={index} drawerDetail={megaItem} navigate={navigate} pathname={pathname} />;
          })}
          <ListItemButton disablePadding onClick={() => navigate("/community")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={"Community"} />
          </ListItemButton>
          <ListItemButton disablePadding onClick={() => navigate("/contact")}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary={"Contact Us"} />
          </ListItemButton>
        </>
      )}
      <Divider className="border-white" />
      {token && (
        <ListItemButton disablePadding onClick={() => logoutHandler()}>
          <ListItemIcon>
            <ExitToAppOutlined color="error" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      )}
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <ColoredListComp>
        {SizeMobile && (
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            className="p-2"
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
              "& .MuiListItemButton-root": {
                paddingTop: 0.7,
                paddingBottom: 0.7,
                color: "#000000",
                borderRadius: "0px 35px 35px 0px",
                fontSize: "5px !important",
              },
              "& .MuiListItemIcon-root": {
                minWidth: 0,
                marginRight: 2,
              },
              "& .MuiSvgIcon-root": {
                fontSize: "17px !important",
                color: "#000",
              },
            }}>
            {drawer}
          </Drawer>
        )}
      </ColoredListComp>
      <ColoredListComp>
        <Drawer
          variant="persistent"
          open={mobileOpen}
          anchor="left"
          onClose={handleDrawerToggle}
          className="p-2"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </ColoredListComp>
    </>
  );
};
