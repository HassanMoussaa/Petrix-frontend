import React from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

interface Appointment {
  date: string;
  id: number;
  petOwnerId: number;
  start_time: string;
  petOwner: {
    firstName: string;
    lastName: string;
  };
}

interface AppointmentsCardsProps {
  appointments: Appointment[];
  appointmentType: "accepted" | "pending";
  removeAppointment: (appointmentId: number) => void;
  fetchPendingAppointments: () => void;
  fetchAcceptedAppointments: () => void;
}

function AppointmentsCards(props: AppointmentsCardsProps) {
  const {
    appointments,
    appointmentType,
    removeAppointment,
    fetchPendingAppointments,
    fetchAcceptedAppointments,
  } = props;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const acceptAppointment = async (appointmentId: number) => {
    try {
      const response = await axios.put(
        getAPIBaseURL() + "/doctors/acceptAppointment",
        { appointmentId },
        config
      );
      console.log(response.data.message);
      removeAppointment(appointmentId);
      fetchPendingAppointments();
      fetchAcceptedAppointments();
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const rejectAppointment = async (appointmentId: number) => {
    try {
      const response = await axios.put(
        getAPIBaseURL() + "/doctors/rejectAppointment",

        { appointmentId },
        config
      );
      console.log(response.data.message);
      removeAppointment(appointmentId);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  function formatDate(inputDate: string) {
    const dateParts = inputDate.split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1].padStart(2, "0");
      const day = dateParts[2].padStart(2, "0");
      return `${day}/${month}/${year}`;
    }
    return "Invalid Date";
  }

  function formatTime(inputTime: string) {
    const timeParts = inputTime.split(":");
    if (timeParts.length === 3) {
      let hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${hours}:${formattedMinutes} ${ampm}`;
    }
    return "Invalid Time";
  }
  return (
    <Grid container spacing={2}>
      {appointments.length === 0 ? (
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ mt: 15, mr: 15, fontSize: 30 }}>
            No Pending Appointments
          </Typography>
        </Grid>
      ) : (
        appointments.map((appointment) => (
          <Grid item key={appointment.id} xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: "white",
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid>
                <Typography variant="subtitle1">
                  {appointmentType == "accepted"
                    ? `${appointment.petOwner.firstName} 
                      ${appointment.petOwner.lastName} <> ${formatDate(
                        appointment.date
                      )}`
                    : `${appointment.petOwner.firstName} 
                      ${appointment.petOwner.lastName} <> ${formatDate(
                        appointment.date
                      )}`}
                </Typography>
                <Typography variant="body2">
                  You have an upcoming appointment with{" "}
                  {
                    <b>
                      {appointment.petOwner.firstName}{" "}
                      {appointment.petOwner.lastName}{" "}
                    </b>
                  }
                  on <b>{formatDate(appointment.date)}</b> at{" "}
                  <b>{formatTime(appointment.start_time)}</b>.
                </Typography>
              </Grid>
              {appointmentType === "pending" && (
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => acceptAppointment(appointment.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => rejectAppointment(appointment.id)}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default AppointmentsCards;
