import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface BasicCardProps {
  imageUrl: string;
  body: string;
  title: string;
}

export default function BasicCard(props: BasicCardProps) {
  const { imageUrl, body, title } = props;

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 250 }}>
      <CardContent>
        <Box
          component="img"
          src={process.env.PUBLIC_URL + `/images/${imageUrl}`}
          alt="logo"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {title}
        </Typography>
        <Typography>{body}</Typography>
      </CardContent>
    </Card>
  );
}
