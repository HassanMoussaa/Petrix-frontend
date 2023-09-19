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

interface ChangeProfilePhotoProps {
  setNewImageUrl: React.Dispatch<React.SetStateAction<string>>;
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
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  // @ts-ignore

  const handleUploadImage = async (e) => {
    e.preventDefault();
    // @ts-ignore

    const new_profile_picture = new FormData(e.currentTarget);
    const image = new_profile_picture.get("profile_picture");

    const formData = new FormData();
    // @ts-ignore
    formData.append("image", image);

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
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} sx={{ fontSize: "15px !important" }} />

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
          <Typography id="transition-modal-title" sx={{ mb: 5 }}>
            Change Profile Picture
          </Typography>

          <Box component="form" onSubmit={handleUploadImage} sx={{ mb: 5 }}>
            <Typography
              style={{ color: "#000", fontWeight: 700 }}
              sx={{ mb: 1 }}
            >
              Upload Image
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
