import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BASE_API_URL, GET_ALL_USER_API_ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";
import { UserList } from "./UserList";

export const Users = () => {
  const url = `${BASE_API_URL}${GET_ALL_USER_API_ENDPOINT}`;
  const { data: users, isPending, error } = useFetch(url);
  return (
    <>
      {isPending && <div>Fetching Users...</div>}
      {error && <div>{error}</div>}
      {users && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <UserList {...user} key={user._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Users;
