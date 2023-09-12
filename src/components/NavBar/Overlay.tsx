import React from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import "./overlay.css";
function Overlay(props: any) {
  const { children } = props;

  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/signin.png"
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box className="overlayContainer">{children}</Box>
    </div>
  );
}

export default Overlay;
