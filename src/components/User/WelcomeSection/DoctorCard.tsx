import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface BasicCardProps {
  imageUrl: string;
  rate: number;
  appointmentCount: number;
  title: string;
  onClick?: () => void;
  id: number;
}

export default function BasicCard(props: BasicCardProps) {
  const { imageUrl, rate, title, appointmentCount, onClick, id } = props;

  const navigate = useNavigate();
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }

    let login_status = localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login") || "")
      : "";
    if (login_status) {
      navigate(`/profile/${id}`);
    } else navigate("/login");
  };
  return (
    <Card
      sx={{
        width: 200,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        mb: 10,
      }}
      onClick={handleCardClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={imageUrl}
          sx={{ width: 90, height: 90 }}
        />
        <Typography sx={{ mb: 1.5, mt: 1.5 }} align="center">
          <b>{title}</b>
        </Typography>
        <Grid>
          <Rating name="read-only" value={rate} precision={0.5} readOnly />

          <Typography align="center" fontSize={10} color={"#A4A1A1"}>
            {appointmentCount === 0
              ? "No Appointments"
              : `Appointments: ${appointmentCount}`}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
