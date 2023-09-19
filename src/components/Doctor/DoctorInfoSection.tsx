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
import ChangeProfilePhoto from "./ChangeProfilePhoto";

interface DoctorInfoSection {
  firstName: string;
  lastName: string;
  imageUrl: string | undefined;
  averageRate: number;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  isOwnProfile: boolean;
}

function DoctorInfoSection(props: DoctorInfoSection) {
  const {
    imageUrl,
    firstName,
    lastName,
    averageRate,
    setNewImageUrl,
    isOwnProfile,
  } = props;
  // const value = 4.5;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  return (
    <Grid container sx={{ display: { xs: "flex" }, ml: 10, mt: 10, gap: 5 }}>
      <Grid md={3} sx={{ display: { md: "flex" } }}>
        <div>
          {isOwnProfile ? (
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
          ) : (
            <Avatar
              alt="user_profile_picture"
              src={imageUrl}
              sx={{
                height: "300px !important",
                width: "300px !important",
              }}
              variant="square"
            />
          )}
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

          <Rating
            name="read-only"
            value={averageRate}
            precision={0.5}
            readOnly
          />
        </Grid>
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            gap: 2,
          }}
        >
          {isOwnProfile ? (
            <>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#16A4C3",
                  borderRadius: 3,
                  maxWidth: 100,
                  fontWeight: "bold",
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
                  fontWeight: "bold",
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
            </>
          ) : (
            <>
              {/* Rendering different buttons for non-own profiles */}

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#16A4C3",
                  borderRadius: 3,
                  fontWeight: "bold",
                  maxWidth: 100,
                  height: 50,
                  fontSize: 12,
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
                size="large"
              >
                Follow
              </Button>
              <Button
                variant="contained"
                href="/appointments"
                sx={{
                  bgcolor: "#000",
                  fontSize: 12,
                  fontWeight: "bold",
                  borderRadius: 3,
                  maxWidth: 200,
                  height: 50,
                  "&:hover": {
                    backgroundColor: "#16A4C3",
                  },
                }}
                size="large"
              >
                Book Appointment
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection;
