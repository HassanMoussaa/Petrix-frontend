import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./appointments.css";
import PendingAppointments from "../../components/Doctor/PendingAppointments";

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

interface Appointment {
  date: number;
  id: number;
  petOwnerId: number;
  start_time: number;
  petOwner: {
    firstName: string;
    lastName: string;
  };
}

function Appointments() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  // For toggle section
  const [alignment, setAlignment] = React.useState("Pending");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );
  const [acceptedAppointments, setAcceptedAppointments] = useState<
    Appointment[]
  >([]);

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

  async function fetchPendingAppointments() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/doctors/appointments",
        config
      );

      setPendingAppointments(response.data);
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    }
  }

  async function fetchAcceptedAppointments() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/doctors/acceptedAppointments",
        config
      );

      setAcceptedAppointments(response.data);
    } catch (error) {
      console.error("Error fetching accepted appointments:", error);
    }
  }

  useEffect(() => {
    fetchDoctorProfile();
    fetchPendingAppointments();
    fetchAcceptedAppointments();
  }, []);

  return (
    <div className="drBody">
      {doctorInfo && (
        <NavBar
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          pageTitle={"Appointments"}
        />
      )}
      <Grid
        container
        ml={23}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          mt: 5,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Blog">Pending</ToggleButton>
          <ToggleButton value="Review">Accepetd</ToggleButton>
          <ToggleButton value="Location">Declined</ToggleButton>
        </ToggleButtonGroup>

        <PendingAppointments
          pendingAppointments={pendingAppointments}
          acceptedAppointments={acceptedAppointments}
        />
      </Grid>
    </div>
  );
}

export default Appointments;
