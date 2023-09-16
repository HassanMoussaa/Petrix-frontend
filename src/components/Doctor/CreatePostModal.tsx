import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Modal,
} from "@mui/material";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

interface BasicModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BasicModal(props: BasicModalProps) {
  const { open, setOpen } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = async () => {
    const postData = { title, body };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/doctors/post/",
        postData,
        config
      );

      console.log("Created Post:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <form className="postForm">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              required
            />
            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={body}
              onChange={handleBodyChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}

export default BasicModal;
