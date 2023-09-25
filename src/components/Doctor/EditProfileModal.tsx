import React, { useState } from "react";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { petSpecialties } from "../../utils/petSpecialties";
import { SelectChangeEvent } from "@mui/material/Select";

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
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  profile: string;
  phone: string;
  specialties: Specialty[];
  availability: {
    days: number[];
    start_time: string;
    end_time: string;
  };
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
  } = props;

  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string[]>(
    specialties.map((speciality) => speciality.speciality)
  );

  // const [updatedSpecialties, setUpdatedSpecialties] =
  //   useState<Specialty[]>(specialties);
  const [updatedAvailability, setUpdatedAvailability] = useState(availability);
  const [selectedDays, setSelectedDays] = useState<number[]>(availability.days);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/users/updateDoctorProfile",
        {
          profile: updatedProfile,
          phone: updatedPhone,
          specialties: selectedSpeciality,
          availability: {
            days: selectedDays,
            start_time: updatedAvailability.start_time,
            end_time: updatedAvailability.end_time,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

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
      // Show a toast message or prevent further selection
      // For example, you can set an error state or display a message
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
        <TextField
          label="Start Time"
          fullWidth
          value={updatedAvailability.start_time}
          onChange={(e) =>
            setUpdatedAvailability({
              ...updatedAvailability,
              start_time: e.target.value,
            })
          }
        />
        <TextField
          label="End Time"
          fullWidth
          value={updatedAvailability.end_time}
          onChange={(e) =>
            setUpdatedAvailability({
              ...updatedAvailability,
              end_time: e.target.value,
            })
          }
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
