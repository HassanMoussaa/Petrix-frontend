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
  Typography,
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
  petsList: Pet[];
  clinicLocationsList: clinicLocation[];
  docId: number;
  setSucessAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface availableSlot {
  start: string;
  end: string;
}

function BookingForm(props: BookingFormProps) {
  const { petsList, clinicLocationsList, docId, setSucessAlertOpen } = props;

  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  //   const [age, setAge] = React.useState("");

  const [selectedPet, setSelectedPet] = React.useState<string>("");

  const [availableSlots, setAvailableSlots] = useState<availableSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value);
  //   };

  async function fetchAvailableSlots() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/petOwners/availableSlots",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            docId: docId,
            date: date ? date.format("MM-DD-YYYY") : "",
          },
        }
      );
      setAvailableSlots(response.data.availableSlots);
      console.log("Available Slots:", response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedPet === "") {
      console.error("Please select a pet.");
      return;
    }

    const selectedDate = date ? date.format("MM-DD-YYYY") : "";
    const selectedTime = selectedTimeSlot;

    const requestBody = {
      doctorId: docId,
      petId: selectedPet,
      date: selectedDate,
      start_time: selectedTime,
    };
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/petOwners/appointment",
        requestBody,
        config
      );

      if (response.status === 201) {
        console.log("Appointment created successfully!");
        setSucessAlertOpen(true);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  useEffect(() => {
    fetchAvailableSlots();
  }, [date]);

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          {/* Clinics
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
          </FormControl> */}

          {/* Pets */}
          <FormControl
            variant="standard"
            sx={{ m: 1, maxWidth: 200, mt: 5, maxHeight: 50 }}
          >
            <InputLabel id="demo-simple-select-standard-label">Pets</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedPet}
              onChange={(event) => setSelectedPet(event.target.value as string)}
              label="Pets"
              required={true}
            >
              {petsList.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
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
                value={date}
                format="MM-DD-YYYY"
                onChange={(newValue) => setDate(newValue)}
                disablePast={true}
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
              onChange={(event) =>
                setSelectedTimeSlot(event.target.value as string)
              }
              required={true}
              label="Available Time Slots"
            >
              {availableSlots.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No available slots found.
                </Typography>
              ) : (
                availableSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot.start}>
                    {slot.start}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        {/* Book Appointment Button */}
        <Button
          variant="contained"
          type="submit"
          sx={{ m: 2, mt: 10, backgroundColor: "#16A4C3" }}
        >
          Book Appointment
        </Button>
      </Box>
    </div>
  );
}

export default BookingForm;
