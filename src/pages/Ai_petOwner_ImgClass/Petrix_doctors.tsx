import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import "./petrix_doctors.css";

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
import { Link, useNavigate } from "react-router-dom";
import DoctorCard from "../../components/Doctor/DoctorCard";
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

function Petrix_doctors() {
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

  const location = useLocation();
  const breed = location.state?.breed;

  const [keyword, setKeyword] = useState("s");

  //   search logic
  const [searchResults, setSearchResults] = useState<DoctorInfo[]>([]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        getAPIBaseURL() + `/users/search/${keyword}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            userTypeId: 2,
            breed,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchmyProfile();
    // fetchDoctorProfile();

    fetchSearchResults();
  }, []);

  return (
    <div>
      {userInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"Recommended Doctors "}
        />
      )}
      <Container>
        {searchResults.length === 0 ? (
          <div className="noDrs">No recommended doctors</div>
        ) : (
          searchResults.map((doctor) => (
            <Grid container spacing={2} mt={10} ml={4}>
              <Grid item xs={12} md={10} key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </Grid>
            </Grid>
          ))
        )}
      </Container>
    </div>
  );
}

export default Petrix_doctors;
