import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import "./doctorProfile.css";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
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
  body: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}

interface DoctorInfo {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profile: string;
  phone: string;
  photoUrl: string;
  email: string;
  userType: UserType;
  posts: Post[];
}

function DoctorPost() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [newImageUrl, setNewImageUrl] = useState(doctorInfo?.photoUrl);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const token = JSON.parse(localStorage.getItem("login") || "").token;
  const location = useLocation();
  const postId = location.state?.postId;

  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const userType = login_status.user_type;

  // Pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; //
  const [commentsExpanded, setCommentsExpanded] = useState(false);
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
    async function fetchPetOwnerProfile() {
      try {
        const response = await axios.get(
          getAPIBaseURL() + "/petOwners/myProfile",
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
          getAPIBaseURL() + `/users/post/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSelectedPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    async function fetchPostComments() {
      try {
        const response = await axios.get(
          getAPIBaseURL() + `/users/comments/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostComments(response.data);
      } catch (error) {
        console.error("Error fetching post comments:", error);
      }
    }

    userType === 2 ? fetchDoctorProfile() : fetchPetOwnerProfile();

    fetchPost();
    fetchPostComments();
  }, [postId, currentPage]);

  const totalPages = Math.ceil(postComments.length / commentsPerPage);
  const [displayedCommentsCount, setDisplayedCommentsCount] =
    useState(commentsPerPage);

  const handleShowMoreComments = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const handleAddComment = async () => {
    if (selectedPost && newComment) {
      try {
        const response = await axios.post(
          getAPIBaseURL() + `/users/comment`,
          { body: newComment, postId: selectedPost.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setPostComments([...postComments, response.data.comment]);
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
          imageUrl={doctorInfo.photoUrl}
          setNewImageUrl={setNewImageUrl}
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
      {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Add a Comment</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Add a Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={1}
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
      )}
      {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Comments</Typography>
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              {postComments
                .slice(0, commentsExpanded ? undefined : displayedCommentsCount)
                .map((comment) => (
                  <div key={comment.id} style={{ marginBottom: "16px" }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar src={comment.user.photoUrl} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {comment.user.firstName} {comment.user.lastName}
                        </Typography>
                        <Typography variant="caption">
                          {comment.createdAt}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" style={{ marginTop: "8px" }}>
                      {comment.body}
                    </Typography>
                  </div>
                ))}
            </div>
            <Button
              variant="outlined"
              onClick={handleShowMoreComments}
              sx={{ mt: 2 }}
            >
              {commentsExpanded ? "Hide Comments" : "Show More"}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default DoctorPost;
