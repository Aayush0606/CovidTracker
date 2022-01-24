import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Navbar() {
  return (
    <>
      <AppBar sx={{ backgroundColor: "#272727" }} position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h5">CovidTracker</Typography>
          </Box>
          <Link
            href="https://github.com/Aayush0606/CovidTracker"
            target="_blank"
            color="inherit"
          >
            <IconButton color="inherit">
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
