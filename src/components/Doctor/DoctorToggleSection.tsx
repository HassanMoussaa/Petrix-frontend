import React from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  IconButton, // Import IconButton
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

interface DoctorToggleSection {
  postList: Post[];
}

function DoctorToggleSection(props: DoctorToggleSection) {
  const { postList } = props;

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
            {postList.map((post) => (
              <Grid item key={post.id} xs={12}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{post.body}</Typography>
                  <Typography variant="caption">{post.createdAt}</Typography>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <IconButton>
                      <FavoriteBorderOutlined />
                    </IconButton>
                    <IconButton>
                      <ChatBubbleOutlineOutlined />
                    </IconButton>
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

export default DoctorToggleSection;
