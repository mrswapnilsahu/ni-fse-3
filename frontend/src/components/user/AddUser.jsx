import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, SAVE_USER_API_ENDPOINT } from "../../constants";

export const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { firstName, lastName, email, phone };
    const url = `${BASE_API_URL}${SAVE_USER_API_ENDPOINT}`;
    setIsPending(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      setIsPending(false);
      navigate("/users");
    });
  };

  return (
    <div>
      <Typography variant="h4">Add User</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="phone"
          variant="outlined"
          color="secondary"
          label="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        {!isPending && (
          <Button variant="outlined" color="secondary" type="submit">
            Register
          </Button>
        )}
        {isPending && (
          <Button variant="outlined" color="secondary" disabled>
            Adding User
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddUser;
