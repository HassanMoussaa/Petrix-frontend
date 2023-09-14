import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface BasicCardProps {
  imageUrl: string;
  // body: string;
  rate: number;
  title: string;
  onClick?: () => void;
}

export default function BasicCard(props: BasicCardProps) {
  const { imageUrl, rate, title, onClick } = props;

  const navigate = useNavigate();
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }

    navigate("/");
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
      <CardContent>
        <Box
          component="img"
          src={process.env.PUBLIC_URL + `/images/${imageUrl}`}
          alt="logo"
          sx={{
            display: {
              xs: "flex",
            },
            margin: "0 auto",
            width: "40%",

            borderRadius: 100,
          }}
        />

        <Typography sx={{ mb: 1.5, mt: 1.5 }} align="center">
          <b>{title}</b>
        </Typography>
        <Typography align="center">{rate}</Typography>
        {/* <Typography align="center">{body}f</Typography> */}
      </CardContent>
    </Card>
  );
}
