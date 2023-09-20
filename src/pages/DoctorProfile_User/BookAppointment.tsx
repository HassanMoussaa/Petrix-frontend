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
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");

    try {
      const response = await axios.post(getAPIBaseURL() + "/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const JWT_token = response.data.token;
        const userType = response.data.user_type;
        const { user_id, firstName, lastName, user_profile_picture, user_bio } =
          response.data.user;

        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: JWT_token,
            user_type: userType,
            user_id,
            firstName,
            lastName,
            user_profile_picture,
            user_bio,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error) {
        if (error.response && error.response.status === 401) {
          console.log("Wrong Credentials!");
        }
        console.log(error);
      }
      setError(true);
    }
  };

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
                handleSubmit={handleSubmit}
                loginError={error}
                petsList={userInfo.pets}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} className="time-slots-box">
              {/* Section of small boxes for available time slots */}
              {/* You can design this section later */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BookAppointment;
