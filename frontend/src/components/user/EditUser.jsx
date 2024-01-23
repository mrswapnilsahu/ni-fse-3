import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BASE_API_URL,
  EDIT_USER_API_ENDPOINT,
  GET_USER_API_ENDPOINT,
} from "../../constants";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = () => {
  const url = `${BASE_API_URL}${GET_USER_API_ENDPOINT}`;
  const { id } = useParams();
  const { data: editUser, isPending, error } = useFetch(url + id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setUser(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const url = `${BASE_API_URL}${EDIT_USER_API_ENDPOINT}${id}`;
    setLoading(true);
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      setLoading(false);
      navigate("/users");
    });
  };

  return (
    <>
      {isPending && <div>Fetching User Details...</div>}
      {error && <div>{error}</div>}
      {user && (
        <div>
          <Typography variant="h4">Update User</Typography>
          <br />
          <form onSubmit={handleUpdate}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={user?.firstName}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={user?.lastName}
                fullWidth
                required
              />
            </Stack>
            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              name="email"
              onChange={handleChange}
              value={user?.email}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="phone"
              variant="outlined"
              color="secondary"
              label="phone"
              name="phone"
              onChange={handleChange}
              value={user?.phone}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            {!loading && (
              <Button variant="outlined" color="secondary" type="submit">
                Update Details
              </Button>
            )}
            {loading && (
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                disabled
              >
                Updating User Details
              </Button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
