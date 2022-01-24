import React from "react";
import { Typography, AppBar, Toolbar, Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Navbar() {
  return (
    <>
      <AppBar sx={{ backgroundColor: "#272727" }} position="static">
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
