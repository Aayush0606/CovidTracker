import React, { useState } from "react";
import { Box } from "@mui/material";
import MapBuilder from "./MapBuilder";
import MapTop from "./MapTop";

export default function MapDisplay() {
  const [plotBy, setPlotBy] = useState("confirmed");

  const plotSetter = (value) => {
    setPlotBy(value);
  };
  return (
    <Box sx={{ minWidth: "50vw" }}>
      <Box>
        <MapTop plotSetter={plotSetter} plotBy={plotBy} />
      </Box>
      <Box>
        <MapBuilder plotBy={plotBy} />
      </Box>
    </Box>
  );
}
