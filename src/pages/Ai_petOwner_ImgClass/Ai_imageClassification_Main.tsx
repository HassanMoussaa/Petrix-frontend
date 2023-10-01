import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import {
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HfInference } from "@huggingface/inference";
import BackButton from "../../components/BackButton";
import CircularProgress from "@mui/material/CircularProgress";

interface UserType {
  id: number;
  type: string;
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
}

function Ai_imageClassification_Main() {
  const [userInfo, setUserInfo] = useState<DoctorInfo>();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  const [newImageUrl, setNewImageUrl] = useState(userInfo?.photoUrl);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };
  const userType = login_status.user_type;
  const [error, setError] = useState(Boolean);
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string>("");

  async function fetchmyProfile() {
    try {
      let apiEndpoint;

      if (userType === 1) {
        apiEndpoint = `/petOwners/myProfile/`;
      } else if (userType === 2) {
        apiEndpoint = `/doctors/myProfile/`;
      }

      const response = await axios.get(getAPIBaseURL() + apiEndpoint, config);

      setUserInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  async function fetchDoctorProfile() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + `/users/doctorProfile/${8}`,
        config
      );

      setDoctorInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }

  // AI Logic

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    const files = e.target.files;

    if (file) {
      if (files && files.length > 0) {
        setSelectedImageFile(files[0]);
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setSelectedImage(event?.target?.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async (): Promise<void> => {
    if (!selectedImage) {
      setLoading(false);
      setAlertMessage("Please select an image !");
      setAlertOpen(true);
      return;
    }
    setLoading(true);
    // Convert the Data URL to a Blob
    const blobData = dataURLtoBlob(selectedImage);

    const inference = new HfInference("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");
    const res = await inference.imageClassification({
      data: blobData,
      model: "microsoft/resnet-50",
    });
    setLoading(false);
    navigate("/ai_results", {
      state: {
        selectedImage,
        classificationResults: JSON.parse(JSON.stringify(res)),
        selectedImageFile,
      },
    });
  };

  // Function to convert Data URL to Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const parts = dataURL.split(",");
    const contentTypeMatch = parts[0].match(/:(.*?);/);
    const contentType = contentTypeMatch
      ? contentTypeMatch[1]
      : "application/octet-stream";

    const base64Data = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(base64Data.length);
    const view = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64Data.length; i++) {
      view[i] = base64Data.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: contentType });
  };

  useEffect(() => {
    fetchmyProfile();
  }, []);

  return (
    <div>
      {userInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"AI CLASSIFICATION"}
        />
      )}
      <BackButton />
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Add A Photo Of Your Pet</Typography>
          </Grid>

          {selectedImage && (
            <Grid item xs={12} textAlign="center" style={{ marginTop: "20px" }}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            </Grid>
          )}

          <Grid item xs={6} textAlign="center">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </Grid>

          <Grid item xs={6} textAlign="center">
            {selectedImageFile &&
              (!loading ? (
                <Button
                  variant="outlined"
                  sx={{ color: "#212121" }}
                  onClick={classifyImage}
                >
                  Classify Image
                </Button>
              ) : (
                <CircularProgress size={24} />
              ))}
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Ai_imageClassification_Main;
