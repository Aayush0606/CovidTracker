import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import TableHeader from "./TableHeader";
import { useSelector } from "react-redux";
import { STATE_NAMES } from "../../StateName";

export default function TableBuilder() {
  const data = useSelector((state) => state.data.value);
  function createData(name, confirmed, active, recovered, deceased) {
    return { name, confirmed, active, recovered, deceased };
  }

  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Confirmed");

  const sortSetter = (value) => {
    const isAsc = orderBy === value && order === "asc";
    setOrderBy(value);
    setOrder(isAsc ? "desc" : "asc");
  };

  function descendingComparator(a, b, orderBy) {
    orderBy = orderBy === "State/Ut" ? "name" : orderBy.toLowerCase();
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  useEffect(() => {
    let dataArr = [];
    if (data !== {}) {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        if (key === "TT") {
          return;
        }
        dataArr.push(
          createData(
            STATE_NAMES[key],
            data[key]["total"]["confirmed"],
            data[key]["total"]["confirmed"] -
              data[key]["total"]["recovered"] -
              data[key]["total"]["deceased"],
            data[key]["total"]["recovered"],
            data[key]["total"]["deceased"]
          )
        );
      });
      setRows(dataArr);
    }
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            order={order}
            orderBy={orderBy}
            sortSetter={sortSetter}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, idx) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.confirmed}</TableCell>
                <TableCell align="center">{row.active}</TableCell>
                <TableCell align="center">{row.recovered}</TableCell>
                <TableCell align="center">{row.deceased}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
