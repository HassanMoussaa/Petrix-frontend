import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import { countries } from "../../utils/countries";
import { SelectChangeEvent } from "@mui/material/Select";
import getAPIBaseURL from "../../APIBaseURL";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: string;
  phone: string;
  city: string;
  country: string;
  fetchPetOwnerProfile: () => void;
}

function EditProfileModel_PO(props: EditProfileModalProps) {
  const {
    profile,
    phone,
    city,
    country,
    fetchPetOwnerProfile,
    isOpen,
    onClose,
  } = props;

  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [updatedCity, setUpdatedCity] = useState(city);
  const [updatedCountry, setUpdatedCountry] = useState(country);

  const [selectedCountry, setSelectedCountry] = useState<string>(country);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/petOwners//update_profile",
        {
          profile: updatedProfile,
          phone: updatedPhone,
          city: updatedCity,
          country: selectedCountry,
        },
        config
      );

      if (response.status === 201) {
        console.log("Profile updated successfully");
        onClose();
        fetchPetOwnerProfile();
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Profile Bio"
          fullWidth
          multiline
          value={updatedProfile}
          onChange={(e) => setUpdatedProfile(e.target.value)}
          margin="normal"
          inputProps={{ maxLength: 150 }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={updatedPhone}
          onChange={(e) => setUpdatedPhone(e.target.value)}
          margin="normal"
        />

        <TextField
          label="City"
          fullWidth
          value={updatedCity}
          onChange={(e) => setUpdatedCity(e.target.value)}
          margin="normal"
        />

        <FormControl
          variant="standard"
          sx={{ m: 1, width: "100%", maxHeight: 50 }}
        >
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={selectedCountry}
            onChange={handleChange}
            label="Country"
            required={true}
            sx={{ backgroundColor: "white" }}
          >
            {countries.map((country) => (
              <MenuItem key={country.label} value={country.label}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              // color="secondary"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModel_PO;
