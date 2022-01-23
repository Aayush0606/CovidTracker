import React, { useState } from "react";
import MapBuilder from "./MapBuilder";
import MapTop from "./MapTop";

export default function MapDisplay() {
  const [plotBy, setPlotBy] = useState("confirmed");
  const plotSetter = (value) => {
    setPlotBy(value);
  };
  return (
    <>
      <MapTop plotSetter={plotSetter} />
      <MapBuilder plotBy={plotBy} />
    </>
  );
}
