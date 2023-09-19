import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Fab,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

interface ChangeProfilePhotoProps {
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ChangeProfilePhoto(props: ChangeProfilePhotoProps) {
  const { setNewImageUrl } = props;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };
  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post(
          getAPIBaseURL() + "/users/profilePicture",
          formData,
          config
        );
        console.log("r", response);

        setNewImageUrl(response.data);
        handleClose();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <div>
      <EditIcon
        onClick={handleOpen}
        sx={{
          fontSize: "15px !important",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box component="form" onSubmit={handleUploadImage} sx={{ mb: 5 }}>
            <Typography
              sx={{
                textAlign: "end",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <CloseIcon onClick={handleClose} />
            </Typography>

            <Typography
              style={{ color: "#000", fontWeight: 700 }}
              sx={{ mb: 1, textAlign: "center" }}
            >
              Change Profile Picture
            </Typography>
            <input
              type="file"
              required
              name="profile_picture"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: "100%" }}
                className="selectedImage_profile"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Image
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ChangeProfilePhoto;
