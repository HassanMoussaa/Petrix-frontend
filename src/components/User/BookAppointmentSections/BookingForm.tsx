import React, { useEffect, useState } from "react";

import axios from "axios";
import getAPIBaseURL from "../../../APIBaseURL";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Zoom,
  Button,
  Container,
  Paper,
  Alert,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./doctorProfile.css";

interface BookingFormProps {
  loginError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

function BookingForm(props: BookingFormProps) {
  const { handleSubmit, loginError } = props;

  return (
    <Paper elevation={3} className="options-box">
      {/* Select options */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 5 }}
        className="formBox_fields"
      >
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Wrong Credentials! Try again.
          </Alert>
        )}

        <TextField
          sx={{ mb: 3 }}
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          className="input_login_field"
          autoComplete="email"
          inputProps={{
            type: "email",
            maxLength: 100,
          }}
        />

        <TextField
          sx={{ mb: 3 }}
          required
          fullWidth
          name="password"
          className="input_login_field"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          inputProps={{
            minLength: 6,
          }}
        />

        <Button
          type="submit"
          fullWidth
          className="button_login_field"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          SIGN IN
        </Button>
      </Box>
    </Paper>
  );
}

export default BookingForm;
