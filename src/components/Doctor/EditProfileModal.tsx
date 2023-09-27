import React, { useState } from "react";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { petSpecialties } from "../../utils/petSpecialties";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const daysOfWeek = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 7, label: "Sunday" },
];

interface Specialty {
  id: number;
  speciality: string;
  User_Specialties: {
    createdAt: string;
    updatedAt: string;
    SpecialtyId: number;
    UserId: number;
  };
}

interface Availability {
  day: number;
  start_time: string;
  end_time: string;
}
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  profile: string;
  phone: string;
  specialties: Specialty[];
  availability: Availability[];
  fetchDoctorProfile: () => void;
}

function EditProfileModal(props: EditProfileModalProps) {
  const {
    isOpen,
    onClose,
    firstName,
    lastName,
    profile,
    phone,
    specialties,
    availability,
    fetchDoctorProfile,
  } = props;

  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string[]>(
    specialties.map((speciality) => speciality.speciality)
  );

  const [selectedAvailability, setSelectedAvailability] = useState<number[]>(
    availability.map((availability) => availability.day)
  );

  const [selectedDays, setSelectedDays] = useState<number[]>(
    availability.map((availability) => availability.day)
  );

  const [startTime, setStartTime] = useState<Dayjs>(
    availability[0]
      ? dayjs(availability[0].start_time, "HH:mm:ss")
      : dayjs("09:00", "HH:mm")
  );

  const [endTime, setEndTime] = useState<Dayjs>(
    availability[0]
      ? dayjs(availability[0].end_time, "HH:mm:ss")
      : dayjs("18:00", "HH:mm")
  );

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/doctors/updateProfile",
        {
          profile: updatedProfile,
          phone: updatedPhone,
          specialties: selectedSpeciality,
          availability: {
            days: selectedAvailability,
            start_time: startTime.format("HH:mm:ss"),
            end_time: endTime.format("HH:mm:ss"),
          },
        },
        config
      );

      console.log("Profile updated successfully:", response.data);
      fetchDoctorProfile();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChangeSpeciality = (
    event: SelectChangeEvent<typeof petSpecialties>
  ) => {
    const {
      target: { value },
    } = event;

    if (value.length > 4) {
      console.error("Please select only 4 specialties");
    } else {
      setSelectedSpeciality(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleDayChange = (dayId: number) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((id) => id !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      //   sx={{ display: "flex", flexDirection: "column", gap: 5 }}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <TextField
          label="Profile Bio"
          fullWidth
          multiline
          value={updatedProfile}
          onChange={(e) => setUpdatedProfile(e.target.value)}
          sx={{ mt: 1 }}
          inputProps={{ maxLength: 150 }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={updatedPhone}
          onChange={(e) => setUpdatedPhone(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="specialties-label">Specialties</InputLabel>
          <Select
            labelId="specialties-label"
            id="specialties"
            multiple
            value={selectedSpeciality}
            onChange={handleChangeSpeciality}
          >
            {petSpecialties.map((specialty) => (
              <MenuItem
                key={specialty}
                value={specialty}
                selected={
                  specialties.filter((s) => s.speciality == specialty)
                    .length !== 0
                }
              >
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>Availability</InputLabel>
          </Grid>
          {daysOfWeek.map((day) => (
            <Grid item xs={4} key={day.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedDays.includes(day.id)}
                    onChange={() => handleDayChange(day.id)}
                  />
                }
                label={day.label}
              />
            </Grid>
          ))}
        </Grid>
        {/* <TextField
          label="Start Time"
          fullWidth
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          label="End Time"
          fullWidth
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Start Time">
            <DigitalClock
              ampm={false}
              timeStep={60}
              value={startTime}
              onChange={(newTime) => {
                if (newTime !== null) {
                  setStartTime(newTime);
                } else {
                  setStartTime(dayjs("09:00", "HH:mm"));
                }
              }}
            />
          </DemoItem>

          <DemoItem label="End Time">
            <DigitalClock
              ampm={false}
              timeStep={60}
              value={endTime}
              onChange={(newTime) => {
                if (newTime !== null) {
                  setEndTime(newTime);
                } else {
                  setEndTime(dayjs("18:00", "HH:mm"));
                }
              }}
            />
          </DemoItem>
        </LocalizationProvider>

        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
