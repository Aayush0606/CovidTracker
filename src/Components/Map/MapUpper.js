import React from "react";
import { Typography, CardContent, Card } from "@mui/material";
import { red, green, blue, grey } from "@mui/material/colors";
import { STATE_NAMES } from "../../StateName";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function MapUpper({ curr, plotBy, data }) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Card
        variant="button"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              color: backColor[plotBy]["text"],
              fontSize: largeScreen ? 23 : 20,
            }}
          >
            {STATE_NAMES[curr]}
          </Typography>
          <Typography
            sx={{
              color: backColor[plotBy]["text"],
              fontSize: largeScreen ? 23 : 20,
            }}
          >
            {plotBy === "active"
              ? (
                  data[curr]["total"]["confirmed"] -
                  data[curr]["total"]["recovered"] -
                  data[curr]["total"]["deceased"]
                ).toLocaleString()
              : data[curr]["total"][plotBy].toLocaleString()}
          </Typography>
          <Typography
            sx={{
              color: backColor[plotBy]["text"],
              fontSize: largeScreen ? 23 : 20,
            }}
            variant="body2"
            component="p"
          >
            {plotBy}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
