import { Outlet } from "react-router-dom";
import { Navbar } from "./components/common/";
import { Box, Toolbar } from "@mui/material";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
