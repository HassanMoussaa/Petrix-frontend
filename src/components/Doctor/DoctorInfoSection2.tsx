import React from "react";
import {
  Grid,
  Rating,
  Box,
  Paper,
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
import { styled } from "@mui/material/styles";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

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
interface DoctorInfoSection2 {
  phoneNum: string;
  profileBio: string;
  drEmail: string;
  specialityList: Specialty[];
}

function DoctorInfoSection2(props: DoctorInfoSection2) {
  const { phoneNum, profileBio, drEmail, specialityList } = props;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
  }));
  return (
    <Grid
      container
      md={2.5}
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
          gap: 2,
        }}
      >
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
          }}
        >
          <Typography
            sx={{
              // fontWeight: "bold",
              color: "#16A4C3",
              fontSize: 20,
            }}
          >
            Speciality
          </Typography>

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {specialityList[0] && (
                  <Item>{specialityList[0].speciality}</Item>
                )}
              </Grid>
              <Grid item xs={4}>
                {specialityList[1] && (
                  <Item>{specialityList[1].speciality}</Item>
                )}
              </Grid>
              <Grid item xs={4}>
                {specialityList[2] && (
                  <Item>{specialityList[2].speciality}</Item>
                )}
              </Grid>
              <Grid item xs={8}>
                {specialityList[3] && (
                  <Item>{specialityList[3].speciality}</Item>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
            gap: 3,
          }}
        >
          <Grid
            container
            sx={{
              display: { xs: "flex" },
              flexDirection: { xs: "column" },
              gap: 3,
            }}
          >
            <Grid
              container
              sx={{
                display: { xs: "flex" },
                flexDirection: { xs: "column" },
                gap: 1,
              }}
            >
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
            {/* Group for nb and email */}
            <Grid
              container
              sx={{
                display: { xs: "flex" },
                flexDirection: { xs: "column" },
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  // fontWeight: "bold",
                  //   color: "#16A4C3",
                  fontSize: 20,
                }}
              >
                <LocalPhoneOutlinedIcon />:{phoneNum}
              </Typography>
              <Typography
                sx={{
                  // fontWeight: "bold",
                  //   color: "#16A4C3",
                  fontSize: 20,
                }}
              >
                <EmailOutlinedIcon />:{drEmail}
              </Typography>
            </Grid>
          </Grid>
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
                // fontWeight: "bold",
                color: "#16A4C3",
                fontSize: 20,
              }}
            >
              Profile Bio
            </Typography>
            <Typography>{profileBio}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection2;
