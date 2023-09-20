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
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

interface Pet {
  id: number;
  name: string;
  breed: string;
  photo_url: string | null;
  createdAt: string;
}

interface clinicLocation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
interface BookingFormProps {
  loginError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  petsList: Pet[];
  clinicLocationsList: clinicLocation[];
  docId: number;
}

function BookingForm(props: BookingFormProps) {
  const { handleSubmit, loginError, petsList, clinicLocationsList, docId } =
    props;
  // correct initial value
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [age, setAge] = React.useState("");

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  async function fetchAvailableSlots() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/petOwners/availableSlots",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            docId: docId,
            // @ts-ignore
            date: moment(value).format("MM-DD-YYYY"),
          },
        }
      );
      setAvailableSlots(response.data.availableSlots);
      console.log("Available Slots:", response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  }

  useEffect(() => {
    fetchAvailableSlots();
  }, [value]);

  return (
    <div>
      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        {/* Clinics */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 200, mt: 15, maxHeight: 50 }}
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
            {clinicLocationsList.map((clinic) => (
              <MenuItem key={clinic.id} value={clinic.name}>
                {clinic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Pets */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 200, mt: 5, maxHeight: 50 }}
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

        {/* Date */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 200, mt: 5, maxHeight: 50 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={value}
              format="YYYY-DD-MM"
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </FormControl>

        {/* Available Time Slots */}
        <FormControl
          variant="standard"
          sx={{ m: 1, maxWidth: 200, mt: 5, maxHeight: 50 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Available Time Slots
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            label="Available Time Slots"
          >
            {availableSlots.map((slot, index) => (
              <MenuItem key={index} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  );
}

export default BookingForm;
