import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import { Grid, Box, Tabs, Tab } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./appointments.css";
import AppointmentsCards from "../../components/Doctor/AppointmentsCards";
import BackButton from "../../components/BackButton";

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
  photoUrl: string;
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Appointments() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [newImageUrl, setNewImageUrl] = useState(doctorInfo?.photoUrl);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

  // logic to clean state after action
  const removeAppointment = (appointmentId: number) => {
    setPendingAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  useEffect(() => {
    fetchDoctorProfile();
    fetchPendingAppointments();
    fetchAcceptedAppointments();
  }, []);

  return (
    <div className="drBody">
      {doctorInfo && (
        <NavBar
          imageUrl={doctorInfo.photoUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          pageTitle={"Appointments"}
        />
      )}
      <BackButton />
      <Grid
        container
        ml={23}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          mt: 5,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Accepetd" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <AppointmentsCards
              appointments={pendingAppointments}
              appointmentType="pending"
              removeAppointment={removeAppointment}
              fetchPendingAppointments={fetchPendingAppointments}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AppointmentsCards
              appointments={acceptedAppointments}
              appointmentType="accepted"
              removeAppointment={removeAppointment}
              fetchPendingAppointments={fetchPendingAppointments}
            />
          </CustomTabPanel>
        </Box>
      </Grid>
    </div>
  );
}

export default Appointments;
