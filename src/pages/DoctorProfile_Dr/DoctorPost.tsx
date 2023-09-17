import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import "./doctorProfile.css";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

interface UserType {
  id: number;
  type: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
}

interface DoctorInfo {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profile: string;
  phone: string;
  photoUrl: string | null;
  email: string;
  userType: UserType;
  posts: Post[];
}

function DoctorPost() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");

  const token = JSON.parse(localStorage.getItem("login") || "").token;

  const location = useLocation();
  const postId = location.state?.postId;

  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const response = await axios.get(
          getAPIBaseURL() + "/doctors/myProfile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDoctorInfo(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    }

    async function fetchPost() {
      try {
        const response = await axios.get(
          getAPIBaseURL() + `/doctors/post/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSelectedPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchDoctorProfile();
    fetchPost();
  }, [postId]);

  const handleAddComment = async () => {
    if (selectedPost && newComment) {
      try {
        await axios.post(
          getAPIBaseURL() + `/posts/${selectedPost.id}/comments`,
          { text: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="drBody">
      {doctorInfo && (
        <NavBar
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          pageTitle={"Blog Page"}
        />
      )}
      {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, backgroundColor: "white" }}>
              <Typography variant="h4">{selectedPost.title}</Typography>
              <Typography variant="body1">{selectedPost.body}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      {/* {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Comments</Typography>
            {selectedPost.comments.map((comment) => (
              <Paper
                key={comment.id}
                sx={{ p: 2, mt: 2, backgroundColor: "white" }}
              >
                <Typography variant="body1">{comment.text}</Typography>
                <Typography variant="caption">{comment.createdAt}</Typography>
              </Paper>
            ))}
            <TextField
              fullWidth
              variant="outlined"
              label="Add a Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={3}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ mt: 2 }}
            >
              Add Comment
            </Button>
          </Grid>
        </Grid>
      )} */}
    </div>
  );
}

export default DoctorPost;
