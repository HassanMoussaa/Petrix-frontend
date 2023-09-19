import React from "react";
import { Grid, Paper, Typography, List, IconButton } from "@mui/material";
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
  // const handleButtonClick = (postId: number) => {
  //   navigate(`/post`, { state: { postId } });
  // };
  return (
    <Grid
      container
      sx={{
        display: { xs: "flex" },
        flexDirection: { xs: "column" },
        backgroundColor: "white",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          backgroundColor: "white",
          p: 2,
          gap: 2,
        }}
      >
        <Paper style={{ maxHeight: 500, overflow: "auto", width: "100%" }}>
          <List
            sx={{
              display: { xs: "flex" },
              flexDirection: { xs: "column" },
              backgroundColor: "white",
              gap: 2,
            }}
          >
            {petList.map((pet) => (
              <Grid item key={pet.id} xs={12}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography>{pet.breed}</Typography>
                  <Typography variant="caption">{pet.createdAt}</Typography>
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
                </Paper>
              </Grid>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PetOwnerPets;
