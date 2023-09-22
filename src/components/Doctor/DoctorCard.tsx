import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

interface DoctorInfo {
  firstName: string;
  id: number;
  lastName: string;
  photoUrl: string | undefined;
  country: string;
  city: string;
}

interface DoctorCardProps {
  doctor: DoctorInfo;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const { id, firstName, lastName, city, country, photoUrl } = doctor;
  const navigate = useNavigate();

  return (
    <Card sx={{ display: "flex", width: "100%", p: 1, border: 1 }}>
      <CardMedia
        component="img"
        image={photoUrl}
        alt={`${firstName} ${lastName}`}
        style={{
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          // marginTop: "5px",
        }}
        sx={{ mt: 1 }}
      />

      <CardContent sx={{ display: "flex", width: "100%" }}>
        <Box
          textAlign="center"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${city}, ${country}`}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            sx={{ background: "#16A4C3" }}
            onClick={() => {
              navigate("/profile", {
                state: {
                  id,
                },
              });
            }}
          >
            Visit Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DoctorCard;
