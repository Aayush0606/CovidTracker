import React from "react";
import { Typography, AppBar, Toolbar, Box, IconButton } from "@mui/material";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h5">CovidTracker</Typography>
          </Box>
          <IconButton color="inherit">
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
