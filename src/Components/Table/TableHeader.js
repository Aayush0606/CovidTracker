import React from "react";
import { TableCell, TableRow, TableHead, TableSortLabel } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function TableHeader({ order, orderBy, sortSetter }) {
  const tableHeader = [
    "State/Ut",
    "Confirmed",
    "Active",
    "Recovered",
    "Deceased",
  ];

  return (
    <>
      <TableHead>
        <TableRow>
          {tableHeader.map((key) => (
            <TableCell
              sx={{
                backgroundColor: grey[800],
                fontSize: 14,
                color: "pink",
              }}
              align="center"
              key={key}
              sortDirection={orderBy === key ? order : false}
            >
              <TableSortLabel
                sx={{ ":hover": { color: "black" } }}
                active={orderBy === key}
                direction={orderBy === key ? order : "asc"}
                onClick={() => sortSetter(key)}
              >
                {key}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
