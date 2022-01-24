import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import indiaMap from "./indiaMap.json";
import ReactTooltip from "react-tooltip";
import { red, pink, green, blue, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import MapUpper from "./MapUpper";

export default function MapBuilder({ plotBy }) {
  const [content, setContent] = useState("");
  const [curr, setCurr] = useState("TT");

  const data = useSelector((state) => state.data.value);

  const getMaxValue = () => {
    let max = 0;
    const keys = Object.keys(data);
    if (keys.length > 0) {
      if (plotBy === "active") {
        keys.map((key) => {
          if (key === "TT") {
            return;
          }
          if (
            data[key]["total"]["confirmed"] -
              data[key]["total"]["recovered"] -
              data[key]["total"]["deceased"] >
            max
          ) {
            max =
              data[key]["total"]["confirmed"] -
              data[key]["total"]["recovered"] -
              data[key]["total"]["deceased"];
          }
        });
      } else {
        keys.map((key) => {
          if (key === "TT") {
            return;
          }
          if (data[key]["total"][plotBy] > max) {
            max = data[key]["total"][plotBy];
          }
        });
      }
    }
    return max;
  };

  const colorScaleRed = scaleQuantize()
    .domain([0, getMaxValue()])
    .range([
      red[50],
      red[100],
      red[200],
      red[300],
      red[400],
      red[500],
      red[700],
      red[800],
      red[900],
    ]);

  const colorScaleBlue = scaleQuantize()
    .domain([0, getMaxValue()])
    .range([
      blue[50],
      blue[100],
      blue[200],
      blue[300],
      blue[400],
      blue[500],
      blue[700],
      blue[800],
      blue[900],
    ]);

  const colorScaleGreen = scaleQuantize()
    .domain([0, getMaxValue()])
    .range([
      green[50],
      green[100],
      green[200],
      green[300],
      green[400],
      green[500],
      green[700],
      green[800],
      green[900],
    ]);

  const colorScalegrey = scaleQuantize()
    .domain([0, getMaxValue()])
    .range([grey[200], grey[300], grey[400], grey[500], grey[700]]);

  const colorScale = () => {
    switch (plotBy) {
      case "confirmed": {
        return colorScaleRed;
      }
      case "active": {
        return colorScaleBlue;
      }
      case "recovered": {
        return colorScaleGreen;
      }
      case "deceased": {
        return colorScalegrey;
      }
      default: {
        return colorScaleGreen;
      }
    }
  };

  const strokeColor = {
    confirmed: {
      normal: red["A100"],
      hover: pink["A400"],
    },
    active: {
      normal: blue["A100"],
      hover: blue["A400"],
    },
    recovered: {
      normal: green["A400"],
      hover: green["A700"],
    },
    deceased: {
      normal: grey["A400"],
      hover: grey[900],
    },
  };

  return (
    <>
      <MapUpper curr={curr} plotBy={plotBy} data={data} />

      <ComposableMap
        data-tip=""
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          scale: 1600,
          rotate: [-82.5, -3, 0],
          center: [0, 19],
        }}
        height={850}
      >
        <Geographies geography={indiaMap}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  setContent(geo.properties.name);
                  setCurr(geo.id);
                }}
                onMouseLeave={() => {
                  setContent("");
                }}
                style={{
                  default: {
                    fill: colorScale()(
                      data[geo.id]
                        ? plotBy === "active"
                          ? data[geo.id]["total"]["confirmed"] -
                            data[geo.id]["total"]["recovered"] -
                            data[geo.id]["total"]["deceased"]
                          : data[geo.id]["total"][plotBy] || 0
                        : "#EEE"
                    ),
                    outline: "none",
                    stroke: strokeColor[plotBy].normal,
                    strokeWidth: "2px",
                  },
                  hover: {
                    fill: colorScale()(
                      data[geo.id] ? data[geo.id]["total"][plotBy] || 0 : "#EEE"
                    ),
                    outline: "none",
                    stroke: strokeColor[plotBy].hover,
                    strokeWidth: "3px",
                  },
                  pressed: {
                    fill: colorScale()(
                      data[geo.id] ? data[geo.id]["total"][plotBy] || 0 : "#EEE"
                    ),
                    outline: "none",
                    stroke: strokeColor[plotBy].hover,
                    strokeWidth: "3px",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
}
