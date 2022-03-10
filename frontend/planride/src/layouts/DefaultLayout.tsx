import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
// components
import Navbar from "./Navbar";
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DefaultLayout: React.FC = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = ['Products', 'Pricing', 'Blog'];

  return (
    <>
      <RootStyle>
        <Navbar onOpenSidebar={() => true} />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    </>
  );
};

export default DefaultLayout;
