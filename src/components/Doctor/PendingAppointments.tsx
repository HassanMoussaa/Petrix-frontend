import React from "react";
import Appointments from "../../pages/Appointments_Dr/Appointments";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";

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

interface PendingAppointmentsProps {
  pendingAppointments: Appointment[];
  acceptedAppointments: Appointment[];
}

function PendingAppointments(props: PendingAppointmentsProps) {
  const { pendingAppointments, acceptedAppointments } = props;
  return (
    <Grid container spacing={2}>
      {acceptedAppointments.map((appointment) => (
        <Grid item key={appointment.id} xs={12}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: "white" }}>
            <Typography variant="subtitle1">Notification-Type</Typography>
            <Typography variant="body2">
              You have an upcoming appointment with{" "}
              {`${appointment.petOwner.firstName} ${appointment.petOwner.lastName}`}{" "}
              on {appointment.date} at {appointment.start_time}.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                // onClick={() => onAccept(appointment.id)}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                // onClick={() => onReject(appointment.id)}
              >
                Reject
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default PendingAppointments;
