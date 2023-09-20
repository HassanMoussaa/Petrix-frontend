import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { Grid, Box, Tabs, Tab, Zoom } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./doctorProfile.css";

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
  averageRate: number;
}

function BookAppointment() {
  const [userInfo, setUserInfo] = useState<DoctorInfo>();
  const [newImageUrl, setNewImageUrl] = useState(userInfo?.photoUrl);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };
  const userType = login_status.user_type;

  async function fetchmyProfile() {
    try {
      let apiEndpoint;

      if (userType === 1) {
        apiEndpoint = `/petOwner/myProfile/`;
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
  useEffect(() => {
    fetchmyProfile();
  }, []);

  return (
    <div className="drBody">
      {userInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"Profile"}
        />
      )}
    </div>
  );
}

export default BookAppointment;
