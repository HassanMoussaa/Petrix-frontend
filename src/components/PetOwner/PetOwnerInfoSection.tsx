import React, { useEffect, useState } from "react";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

import {
  Grid,
  Rating,
  Box,
  Button,
  Typography,
  Fab,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  OutlinedInput,
  FormControl,
  Badge,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ChangeProfilePhoto from "../Doctor/ChangeProfilePhoto";
import { countries } from "../../utils/countries";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
interface PetOwnerInfoSectionProps {
  firstName: string;
  lastName: string;
  imageUrl: string | undefined;
  city: string;
  country: string;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function PetOwnerInfoSection(props: PetOwnerInfoSectionProps) {
  const { imageUrl, firstName, lastName, setNewImageUrl, city, country } =
    props;
  // const value = 4.5;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  return (
    <Grid container sx={{ display: { xs: "flex" }, ml: 10, mt: 10, gap: 5 }}>
      <Grid md={3} sx={{ display: { md: "flex" } }}>
        <div>
          <Badge
            badgeContent={
              <ChangeProfilePhoto setNewImageUrl={setNewImageUrl} />
            }
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="user_profile_picture"
              src={imageUrl}
              sx={{
                height: "300px !important",
                width: "300px !important",
              }}
              variant="square"
            />
          </Badge>
        </div>
      </Grid>
      <Grid
        container
        md={4}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          gap: 5,
        }}
      >
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 28,
            }}
          >
            Dr {firstName} {lastName}
          </Typography>
          <Grid
            sx={{
              display: { xs: "flex" },
              alignItems: { xs: "center" },
            }}
          >
            <LocationOnOutlinedIcon />
            {city}-{country}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#16A4C3",
              borderRadius: 3,
              maxWidth: 100,
              height: 50,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            size="large"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            href="/appointments"
            sx={{
              bgcolor: "#000",
              borderRadius: 3,
              maxWidth: 150,
              height: 50,
              "&:hover": {
                backgroundColor: "#16A4C3",
              },
            }}
            size="large"
          >
            Appointments
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PetOwnerInfoSection;
