import React from "react";
import {
  Grid,
  Rating,
  Box,
  Button,
  Typography,
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
} from "@mui/material";

interface DoctorInfoSection2 {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

function DoctorInfoSection2(props: DoctorInfoSection2) {
  const { imageUrl, firstName, lastName } = props;

  return (
    <Grid
      container
      sx={{
        display: { xs: "flex" },
        ml: 10,
        mt: 5,
        flexDirection: { xs: "column" },
      }}
    >
      <Grid
        container
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
        }}
      >
        <Grid container>
          <Typography
            sx={{
              // fontWeight: "bold",
              color: "#16A4C3",
              fontSize: 20,
            }}
          >
            Speciality
          </Typography>
        </Grid>
        <Grid container>
          <Typography
            sx={{
              // fontWeight: "bold",
              color: "#16A4C3",
              fontSize: 20,
            }}
          >
            Contact Info
          </Typography>
        </Grid>
        <Grid container>
          <Typography
            sx={{
              // fontWeight: "bold",
              color: "#16A4C3",
              fontSize: 20,
            }}
          >
            Profile Bio
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection2;
