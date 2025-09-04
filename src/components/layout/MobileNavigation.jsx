import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import useRoutes from "hooks/useRoutes";
import { Link } from "react-router-dom";
import { useGlobalContext } from "global/context";

export function MobileNavigation() {
  const [value, setValue] = React.useState("recents");
  const { userData, token } = useGlobalContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {sideDrawer} = useRoutes();
  return (
    <Paper className={`${!token ? "d-none" : "d-sm-none"}`} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 300 }} elevation={3}>
      <BottomNavigation
        sx={{
          bgcolor: "white",
          "& .Mui-selected": {
            "& .MuiBottomNavigationAction-label": {
              fontSize: 12,
              transition: "none",
              fontWeight: "bold",
              lineHeight: "20px",
            },
            "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
              color: (theme) => theme.palette.warning.main,
            },
          },
        }}
        value={value}
        onChange={handleChange}
        className="shadow">
        {sideDrawer?.map((drawerItem) => {
          if (drawerItem.dock && drawerItem.roles.includes(userData?.role)) return <BottomNavigationAction component={Link} to={drawerItem?.path} value={drawerItem?.path} icon={drawerItem?.icon} label={<small className="text-nowrap ">{drawerItem?.title}</small>} disableTouchRipple color="warning" />;
        })}
      </BottomNavigation>
    </Paper>
  );
}
