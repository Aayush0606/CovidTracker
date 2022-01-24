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
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { blueGrey, grey } from "@mui/material/colors";

export default function TableBuilder() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "red",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: "white",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: blueGrey[800],
    },
    "&:nth-of-type(even)": {
      backgroundColor: blueGrey[900],
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&$hover:hover": {
      backgroundColor: "pink",
    },
  }));

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
        <Table aria-label="simple table">
          <TableHeader
            order={order}
            orderBy={orderBy}
            sortSetter={sortSetter}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, idx) => (
              <StyledTableRow
                key={row.name}
                sx={{ ":hover": { backgroundColor: grey[500] } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.confirmed.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.active.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.recovered.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.deceased.toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
