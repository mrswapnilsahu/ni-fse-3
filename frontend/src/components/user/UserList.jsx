import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const UserList = ({ _id, firstName, lastName, email, phone }) => {
  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        {firstName}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {lastName}
      </TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{phone}</TableCell>
      <TableCell align="right">
        <Button color="primary" variant="contained">
          <Link to={`/edit/${_id}`} style={{ color: "#fff", textDecoration: "none" }}>Edit</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserList;
