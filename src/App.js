import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyData } from "./Redux/Feature/CovidData";
import Navbar from "./Components/Navbar/Navbar";
import TableBuilder from "./Components/Table/TableBuilder";
import MapDisplay from "./Components/Map/MapDisplay";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function App() {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyData());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: largeScreen ? "row" : "column",
        }}
      >
        <Box>
          <MapDisplay />
        </Box>
      </Box>
    </>
  );
}

{
  /* <Box>
          <TableBuilder />
        </Box> */
}
