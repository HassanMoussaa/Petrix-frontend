import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Modal,
  Rating,
} from "@mui/material";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

interface Review {
  id: number;
  rate: number;
  body: string;
  createdAt: string;
  petOwner: {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  };
}
interface CreateReviewModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doctorId: number;
  updateReviews: (newReview: Review) => void;
}

function CreateReviewModal(props: CreateReviewModalProps) {
  const { open, setOpen, doctorId, updateReviews } = props;
  const [body, setBody] = useState("");
  const [rate, setRate] = React.useState<number | null>(0);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleClose = () => {
    setOpen(false);
    setBody("");
    setRate(0);
  };

  const handleCreateRate = async () => {
    const postData = { rate, body };

    try {
      const response = await axios.post(
        getAPIBaseURL() + `/petOwners/review/${doctorId}`,
        postData,
        config
      );

      console.log("Created Post:", response.data);
      setOpen(false);
      setBody("");
      setRate(0);
      updateReviews(response.data.review);
    } catch (error: any) {
      console.error("Error creating post:", error);
    }
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
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <form className="postForm">
            <Rating
              name="simple-controlled"
              value={rate}
              precision={0.5}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
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
          <Button onClick={handleCreateRate} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}

export default CreateReviewModal;
