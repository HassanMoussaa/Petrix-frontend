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
import { useLocation } from "react-router-dom";

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

function Ai_results() {
  const [userInfo, setUserInfo] = useState<DoctorInfo>();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();
  const [sucessAlertOpen, setSucessAlertOpen] = useState<boolean>(false);
  const [newImageUrl, setNewImageUrl] = useState(userInfo?.photoUrl);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };
  const userType = login_status.user_type;
  const [error, setError] = useState(Boolean);

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

  // Ai results
  const location = useLocation();
  const { selectedImage, classificationResults } = location.state;

  useEffect(() => {
    fetchmyProfile();
    // fetchDoctorProfile();
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

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center" sx={{ mt: 5, mb: 4 }}>
            <Typography variant="h4">Results</Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            {classificationResults && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                }}
              >
                <Typography variant="h5" textAlign="center">
                  Breed
                </Typography>
                <Typography textAlign="center" variant="body1">
                  {JSON.parse(classificationResults)?.[0]?.label}
                </Typography>
                <Box
                  textAlign="center"
                  sx={{ display: "flex", gap: 3, justifyContent: "center" }}
                >
                  <Button variant="outlined">Button 1</Button>
                  <Button variant="outlined">Button 2</Button>
                  <Button variant="outlined">Button 3</Button>
                </Box>
              </Box>
            )}
          </Grid>

          <Grid item xs={6}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "80%" }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Ai_results;
