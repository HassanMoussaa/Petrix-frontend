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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Pet {
  id: number;
  name: string;
  breed: string;
  photo_url: string | null;
  createdAt: string;
}

interface BookingFormProps {
  loginError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  petsList: Pet[];
}

function BookingForm(props: BookingFormProps) {
  const { handleSubmit, loginError, petsList } = props;
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        {/* Clinics */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 120, mt: 15, maxHeight: 50 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Clinics
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Clinics"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        {/* Date */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 120, mt: 5, maxHeight: 50 }}
        >
          <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Date"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        {/* Pets */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 120, mt: 5, maxHeight: 50 }}
        >
          <InputLabel id="demo-simple-select-standard-label">Pets</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Pets"
          >
            {petsList.map((pet) => (
              <MenuItem key={pet.id} value={pet.name}>
                {pet.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  );
}

export default BookingForm;
