import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "global/context";
import { Footer, MobileNavigation, NavigationBar, SidePanel } from "components/layout";
import SchoolSafetyChatWidget from "components/SchoolSafetyRAG";

function Layout(props) {
  const [drawerWidth, setDrawerWidth] = React.useState(0);
  const { token } = useGlobalContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <div className="d-flex">
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 100 }}>
          <SidePanel drawerWidth={drawerWidth} setDrawerWidth={setDrawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </Box>
        <Box
          component="main"
          className={`${drawerWidth ? "border-start" : ""}`}
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)`, overflowY: "auto" },
          }}>
          <NavigationBar handleDrawerToggle={handleDrawerToggle} />
          <ToastContainer position="bottom-right" limit={3} autoClose={3000} />
          <Toaster position="bottom-right" />
          <div className="min-vh-100">{props.children}</div>
          <MobileNavigation />
          <Footer />
          <SchoolSafetyChatWidget />
        </Box>
      </div>
    </div>
  );
}

export default Layout;
