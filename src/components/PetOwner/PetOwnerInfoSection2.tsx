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
interface PetOwnerInfoSection2Props {
  phoneNum: string;
  profileBio: string;
  drEmail: string;
}

function PetOwnerInfoSection2(props: PetOwnerInfoSection2Props) {
  const { phoneNum, profileBio, drEmail } = props;

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
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#16A4C3",
          fontSize: 20,
        }}
      >
        Profile Bio
      </Typography>
      <Typography>{profileBio}</Typography>
    </Grid>
  );
}

export default PetOwnerInfoSection2;
