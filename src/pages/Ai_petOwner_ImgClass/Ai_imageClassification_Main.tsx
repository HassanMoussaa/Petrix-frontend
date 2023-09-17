import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
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
  photoUrl: string | null;
  email: string;
  userType: UserType;
}

function Ai_imageClassification_Main() {
  const [petOwnerInfo, setPetOwnerInfo] = useState<DoctorInfo | null>(null);
  const token = JSON.parse(localStorage.getItem("login") || "").token;
  const location = useLocation();
  const postId = location.state?.postId;

  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const response = await axios.get(
          getAPIBaseURL() + "/petOwners/myProfile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPetOwnerInfo(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    }
    fetchDoctorProfile();
  }, [postId]);

  return (
    <div>
      {petOwnerInfo && (
        <NavBar
          imageUrl={petOwnerInfo.photoUrl || ""}
          firstName={petOwnerInfo.firstName}
          lastName={petOwnerInfo.lastName}
          pageTitle={"AI CLASSIFICATION"}
        />
      )}
    </div>
  );
}

export default Ai_imageClassification_Main;
