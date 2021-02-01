import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
function OrderedList({ orderedList, getOrderedList }) {
  useEffect(() => {
    // getOrderedList();
  },[]);

  function getFormattedDate(dateString) {
    let date = new Date(dateString);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  if (
    Object.keys(orderedList).length === 0 &&
    orderedList.constructor === Object
  ) {
    return (
      <div>
        <h1>There is no Order history for this list</h1>
      </div>
    );
  } else {
    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByTeam = groupBy(orderedList, "addedon");
    // console.log(groubedByTeam)
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Item</StyledTableCell>
            <StyledTableCell align="center">Addedby</StyledTableCell>
            <StyledTableCell align="center">Added On</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.item}
              </StyledTableCell>
              <StyledTableCell align="center">{row.addedby}</StyledTableCell>

              <StyledTableCell align="center">
                {getFormattedDate(row.addedon)}
              </StyledTableCell>
              {/* <StyledTableCell align="right">
                        {row.protein}
                      </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderedList;
