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
import BackButton from "../../components/BackButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

  // work for time calc
  dayjs.extend(relativeTime);

  function formatTimestamp(timestamp: string) {
    const now = dayjs();
    const commentTime = dayjs(timestamp);
    const diffInMinutes = now.diff(commentTime, "minutes");

    if (diffInMinutes < 0.5) {
      return `Just now`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = now.diff(commentTime, "hours");
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = now.diff(commentTime, "days");
      return `${diffInDays} days ago`;
    }
  }
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
      <BackButton />
      {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "white",
                border: 1,
                borderRadius: "8px",
                borderColor: "#A7A7A7",
              }}
            >
              <Typography variant="h4" sx={{ paddingBottom: 2 }}>
                {selectedPost.title}
              </Typography>
              <Typography variant="body1">{selectedPost.body}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      {selectedPost && (
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Add a Comment</Typography>
            <Grid sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Add a Comment"
                multiline
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                // color="primary"
                onClick={handleAddComment}
                sx={{
                  mt: 2,
                  background: "#16A4C3",
                  width: "200px",
                  height: "50px",
                  alignSelf: "center",
                }}
              >
                Add Comment
              </Button>
            </Grid>
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
                border: "1px solid",
                borderColor: "#A7A7A7",
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
                          <Typography variant="caption">
                            {formatTimestamp(comment.createdAt)}
                          </Typography>
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
              sx={{ mt: 2, borderColor: "#16A4C3", color: "#16A4C3" }}
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
