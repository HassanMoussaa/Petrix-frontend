import React, { ReactElement } from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import "./overlay.css";

interface OverlayProps {
  children: ReactElement;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
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
};

export default Overlay;
