import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import getAPIBaseURL from "../../../APIBaseURL";
import DoctorCard from "./DoctorCard";
import axios from "axios";

interface Doctor {
  id: number;
  photoUrl: string;
  firstName: string;
  lastName: string;
  appointmentCount: number;
  // rate: string;
}

function TopDoctors() {
  const [topDoctors, setTopDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAPIBaseURL() + "/users/topDoctors");
        setTopDoctors(response.data);
        console.log(response.data);
        console.log(topDoctors);
      } catch (error: any) {
        setError(error);
        console.error("Error fetching top doctors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">
          <b>Top Doctors</b>
        </Typography>
      </Grid>
      {/* {topDoctors.map((doctor) => doctor.body)} */}

      {error ? (
        <Grid item xs={12}>
          <Alert severity="error">Error fetching data from the server</Alert>
        </Grid>
      ) : (
        <Grid container xs={12} sx={{ overflowX: "auto" }}>
          {topDoctors.length > 0 &&
            topDoctors.map((doctor) => (
              <Grid item key={doctor.id} xs={3} md={2} sx={{ p: 2 }}>
                <DoctorCard
                  imageUrl={doctor.photoUrl}
                  rate={doctor.appointmentCount}
                  title={doctor.firstName + doctor.lastName}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Grid>
  );
}

export default TopDoctors;
