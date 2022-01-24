import React from "react";
import { Typography, CardContent, Card } from "@mui/material";
import { red, green, blue, grey } from "@mui/material/colors";

export default function TopDiv({
  heading,
  subHeading,
  number,
  plotSetter,
  plotBy,
}) {
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
    <Card
      variant="button"
      onClick={() => plotSetter(heading)}
      elevation={0}
      sx={{
        backgroundColor:
          plotBy === heading ? backColor[heading]["normal"] : "transparent",
        margin: "2px",
        ":hover": {
          backgroundColor: backColor[heading]["normal"],
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: backColor[heading]["text"] }}>
          {heading}
        </Typography>
        <Typography sx={{ color: backColor[heading]["text"] }}>
          +{subHeading}
        </Typography>
        <Typography
          sx={{ color: backColor[heading]["text"] }}
          variant="body2"
          component="p"
        >
          {number}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
