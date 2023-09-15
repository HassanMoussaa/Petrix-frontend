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
interface DoctorInfoSection2 {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

function DoctorInfoSection2(props: DoctorInfoSection2) {
  const { imageUrl, firstName, lastName } = props;

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
                <Item>xs=8</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={8}>
                <Item>xs=8</Item>
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
                <LocalPhoneOutlinedIcon />
              </Typography>
              <Typography
                sx={{
                  // fontWeight: "bold",
                  //   color: "#16A4C3",
                  fontSize: 20,
                }}
              >
                <EmailOutlinedIcon />
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
            <Typography>NIce bio</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection2;
