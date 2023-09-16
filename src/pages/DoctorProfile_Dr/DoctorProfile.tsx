import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import DoctorInfoSection from "../../components/Doctor/DoctorInfoSection";
import DoctorInfoSection2 from "../../components/Doctor/DoctorInfoSection2";
import "./doctorProfile.css";
import { Grid } from "@mui/material";
import DoctorToggleSection from "../../components/Doctor/DoctorToggleSection";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface Specialty {
  id: number;
  speciality: string;
  User_Specialties: {
    createdAt: string;
    updatedAt: string;
    SpecialtyId: number;
    UserId: number;
  };
}
interface UserType {
  id: number;
  type: string;
}
interface Post {
  id: number;
  title: string;
  body: string;
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
  photoUrl: string | null;
  email: string;
  specialities: Specialty[];
  userType: UserType;
  post: Post[];
}

function DoctorProfile() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  // For toggle section
  const [alignment, setAlignment] = React.useState("Blog");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  async function fetchDoctorProfile() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/doctors/myProfile",
        config
      );

      setDoctorInfo(response.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }
  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return (
    <div className="drBody">
      {doctorInfo && (
        <NavBar
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          pageTitle={"Profile"}
        />
      )}
      {doctorInfo && (
        <DoctorInfoSection
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
        />
      )}
      <Grid
        container
        sx={{
          display: { xs: "flex" },
          flexWrap: { xs: "inherit" },
        }}
      >
        {doctorInfo && (
          <DoctorInfoSection2
            phoneNum={doctorInfo.phone || ""}
            profileBio={doctorInfo.profile}
            drEmail={doctorInfo.email}
            specialityList={doctorInfo.specialities}
          />
        )}
        <Grid
          container
          ml={23}
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Blog">Blog</ToggleButton>
            <ToggleButton value="Review">Review</ToggleButton>
            <ToggleButton value="Location">Location</ToggleButton>
          </ToggleButtonGroup>
          {doctorInfo && <DoctorToggleSection postList={doctorInfo.post} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default DoctorProfile;
