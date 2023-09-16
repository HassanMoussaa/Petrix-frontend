import React from "react";
import {
  Grid,
  Rating,
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  OutlinedInput,
  FormControl,
} from "@mui/material";

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
        border: "solid",
      }}
    >
      <Grid container spacing={2} sx={{ backgroundColor: "white", p: 2 }}>
        {postList.map((post) => (
          <Grid item key={post.id} xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.body}</Typography>
              <Typography variant="caption">{post.createdAt}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default DoctorToggleSection;
