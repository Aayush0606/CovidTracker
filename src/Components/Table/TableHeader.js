import React from "react";
import { TableCell, TableRow, TableHead, TableSortLabel } from "@mui/material";

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
              align="center"
              key={key}
              sortDirection={orderBy === key ? order : false}
            >
              <TableSortLabel
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
