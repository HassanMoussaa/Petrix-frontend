import React from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";

interface Pet {
  id: number;
  name: string;
  breed: string;
  photo_url: string | null;
  createdAt: string;
}

interface DoctorToggleSection {
  petList: Pet[];
}

function PetOwnerPets(props: DoctorToggleSection) {
  const { petList } = props;
  const navigate = useNavigate();

  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "500px", // Set a maximum height for the container
      }}
    >
      {petList.map((pet, index) => (
        <div
          key={pet.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            padding: "8px", // Add some padding to create space between pets
            borderBottom:
              index < petList.length - 1 ? "1px solid #ccc" : "none", // Add a bottom border to separate pets
          }}
        >
          <Avatar
            alt={pet.name}
            src={pet.photo_url || undefined}
            sx={{ width: 64, height: 64 }}
          />
          <div>
            <Typography variant="h6">{pet.name}</Typography>
            <Typography variant="body2">{pet.breed}</Typography>
            {/* <Typography variant="caption">{pet.createdAt}</Typography> */}
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 1,
            }}
          >
            {/* <IconButton onClick={() => handleButtonClick(pet.id)}>
              <ChatBubbleOutlineOutlined />
            </IconButton> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetOwnerPets;
