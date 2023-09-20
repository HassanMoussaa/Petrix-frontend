import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Zoom,
  Button,
  Container,
  Paper,
  Alert,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./doctorProfile.css";
import BookingForm from "../../components/User/BookAppointmentSections/BookingForm";

interface UserType {
  id: number;
  type: string;
}

interface Pet {
  id: number;
  name: string;
  breed: string;
  photo_url: string | null;
  createdAt: string;
}

interface clinicLocation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
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
  averageRate: number;
  pets: Pet[];
  clinicLocations: clinicLocation[];
}

function BookAppointment() {
  const [userInfo, setUserInfo] = useState<DoctorInfo>();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();

  const [newImageUrl, setNewImageUrl] = useState(userInfo?.photoUrl);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };
  const userType = login_status.user_type;
  const [error, setError] = useState(Boolean);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchmyProfile();
    fetchDoctorProfile();
  }, []);

  return (
    <div className="drBody">
      {userInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"Book Appointment"}
        />
      )}
      <Container maxWidth="lg" className="appointment-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} className="profile-box">
              {/* Small box for doctor name */}
              <Box sx={{ fontSize: 18, fontWeight: "bold" }}>
                {doctorInfo?.firstName} {doctorInfo?.lastName}
              </Box>
            </Paper>
            {userInfo && doctorInfo && (
              <BookingForm
                petsList={userInfo.pets}
                clinicLocationsList={doctorInfo.clinicLocations}
                docId={doctorInfo.id}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BookAppointment;
