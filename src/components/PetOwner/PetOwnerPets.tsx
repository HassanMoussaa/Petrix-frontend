import React from "react";
import { Typography, Avatar } from "@mui/material";
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
        maxHeight: "500px",
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
            padding: "8px",
            borderBottom:
              index < petList.length - 1 ? "1px solid #ccc" : "none",
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
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 1,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default PetOwnerPets;
