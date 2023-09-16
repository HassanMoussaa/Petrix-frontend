import React from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

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

interface AppointmentsCardsProps {
  appointments: Appointment[];
  appointmentType: "accepted" | "rejected" | "pending";
}

function AppointmentsCards(props: AppointmentsCardsProps) {
  const { appointments, appointmentType } = props;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const acceptAppointment = async (appointmentId: number) => {
    try {
      const response = await axios.put(
        getAPIBaseURL() + "/doctors/acceptAppointment",
        {
          appointmentId,
          config,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const rejectAppointment = async (appointmentId: number) => {
    try {
      const response = await axios.put(
        getAPIBaseURL() + "/doctors/rejectAppointment",
        {
          appointmentId,
          config,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {appointments.map((appointment) => (
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
              <Typography variant="subtitle1">Notification-Type</Typography>
              <Typography variant="body2">
                You have an upcoming appointment with{" "}
                {`${appointment.petOwner.firstName} ${appointment.petOwner.lastName}`}
                on {appointment.date} at {appointment.start_time}.
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
                  variant="contained"
                  color="secondary"
                  onClick={() => rejectAppointment(appointment.id)}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default AppointmentsCards;
