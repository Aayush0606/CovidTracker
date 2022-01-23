import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function MapTop({ plotSetter }) {
  const tableHeader = ["confirmed", "active", "recovered", "deceased"];
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {tableHeader.map((key) => (
        <Button onClick={() => plotSetter(key)}>{key}</Button>
      ))}
    </ButtonGroup>
  );
}
