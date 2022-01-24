import React, { useState } from "react";
import { Box } from "@mui/material";
import MapBuilder from "./MapBuilder";
import MapTop from "./MapTop";
import ReactTooltip from "react-tooltip";

export default function MapDisplay() {
  const [content, setContent] = useState("");
  const [plotBy, setPlotBy] = useState("confirmed");

  const plotSetter = (value) => {
    setPlotBy(value);
  };
  return (
    <Box sx={{ minWidth: "50vw" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MapTop plotSetter={plotSetter} plotBy={plotBy} />
      </Box>
      <div data-tip="">
        <MapBuilder plotBy={plotBy} content={content} setContent={setContent} />
      </div>
      <ReactTooltip>{content}</ReactTooltip>s
    </Box>
  );
}
