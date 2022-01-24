import React from "react";
import { Typography, CardContent, Card } from "@mui/material";
import { red, green, blue, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

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

  const CardContentNoPadding = styled(CardContent)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
  }));

  return (
    <Card
      variant="button"
      onClick={() => plotSetter(heading)}
      elevation={0}
      sx={{
        backgroundColor:
          plotBy === heading ? backColor[heading]["normal"] : "transparent",
        ":hover": {
          backgroundColor: backColor[heading]["normal"],
          cursor: "pointer",
        },
      }}
    >
      <CardContentNoPadding>
        <Typography
          sx={{ color: backColor[heading]["text"], textAlign: "center" }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{ color: backColor[heading]["text"], textAlign: "center" }}
        >
          +{subHeading.toLocaleString()}
        </Typography>
        <Typography
          sx={{ color: backColor[heading]["text"], textAlign: "center" }}
          variant="body2"
          component="p"
        >
          {number.toLocaleString()}
          <br />
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
}
