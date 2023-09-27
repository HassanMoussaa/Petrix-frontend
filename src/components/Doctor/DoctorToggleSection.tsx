import React, { useEffect, useState } from "react";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import dayjs from "dayjs";

import { Grid, Box, Typography, List, IconButton } from "@mui/material";
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  is_liked: boolean;
}

interface DoctorToggleSection {
  postList: Post[];
}

interface LikeStatus {
  [postId: number]: boolean;
}

function DoctorToggleSection(props: DoctorToggleSection) {
  const { postList } = props;
  const navigate = useNavigate();
  const dayjs = require("dayjs");

  const handleButtonClick = (postId: number) => {
    navigate(`/post`, { state: { postId } });
  };

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  // logic for like feature

  // const [likersCountIncrementer, setLikersCountIncrementerr] =
  //   useState(followerCount);

  const initialLikeStatus: LikeStatus = postList.reduce<LikeStatus>(
    (likeStatus, post) => {
      likeStatus[post.id] = post.is_liked;
      return likeStatus;
    },
    {}
  );
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(initialLikeStatus);

  async function likeUser(id: number) {
    try {
      await axios.post(
        getAPIBaseURL() + `/users/like`,
        { post_id: id },
        config
      );

      // Update the like status for the specific post
      setLikeStatus((prevLikeStatus) => ({
        ...prevLikeStatus,
        [id]: true,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function unLikeUser(id: number) {
    try {
      await axios.post(
        getAPIBaseURL() + `/users/unlike`,
        { post_id: id },
        config
      );

      // Update the like status for the specific post
      setLikeStatus((prevLikeStatus) => ({
        ...prevLikeStatus,
        [id]: false,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="scrollable-container"
      style={{ maxHeight: "500px", overflow: "auto" }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "white",
          p: 2,
          gap: 2,
          border: 1,
          borderRadius: "16px",
          borderColor: "#A7A7A7",
        }}
        className="scrollable-content"
      >
        <List sx={{ gap: 2 }}>
          {postList.map((post) => (
            <Grid item key={post.id} className="post-item" width={"100%"}>
              <div className="post-div">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontSize: "30px" }}>
                    {post.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    alignSelf={"flex-start"}
                    sx={{ color: "gray", fontSize: 9 }}
                  >
                    {dayjs(post.createdAt).format("MMMM DD, YYYY HH:mm A")}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }}>{post.body}</Typography>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: 1,
                    marginBottom: "10px",
                  }}
                >
                  {likeStatus[post.id] ? (
                    <IconButton
                      onClick={() => unLikeUser(post.id)}
                      color="error"
                    >
                      <FavoriteBorderOutlined />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => likeUser(post.id)}>
                      <FavoriteBorderOutlined />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleButtonClick(post.id)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                </div>
              </div>
            </Grid>
          ))}
        </List>
      </Grid>
    </div>
  );
}

export default DoctorToggleSection;
