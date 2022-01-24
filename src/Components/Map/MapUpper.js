import React from "react";
import { Typography, CardContent, Card } from "@mui/material";
import { red, green, blue, grey } from "@mui/material/colors";
import { STATE_NAMES } from "../../StateName";

export default function MapUpper({ curr, plotBy, data }) {
  const backColor = {
    confirmed: {
      normal: red[100],
      text: red[500],
    },
    active: {
      normal: blue[100],
      text: blue[500],
    },
    recovered: {
      normal: green[100],
      text: green[500],
    },
    deceased: {
      normal: grey[100],
      text: grey[500],
    },
  };
  return (
    <>
      <Card
        variant="button"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          margin: "2px",
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: backColor[plotBy]["text"] }}>
            {STATE_NAMES[curr]}
          </Typography>
          <Typography sx={{ color: backColor[plotBy]["text"] }}>
            {plotBy === "active"
              ? data[curr]["total"]["confirmed"] -
                data[curr]["total"]["recovered"] -
                data[curr]["total"]["deceased"]
              : data[curr]["total"][plotBy]}
          </Typography>
          <Typography
            sx={{ color: backColor[plotBy]["text"] }}
            variant="body2"
            component="p"
          >
            {plotBy}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
