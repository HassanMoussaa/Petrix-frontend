import React, { useEffect, useState } from "react";
import { Grid, Typography, Alert } from "@mui/material";
import getAPIBaseURL from "../../../APIBaseURL";
import DoctorCard from "./DoctorCard";
import axios from "axios";

interface Doctor {
  id: number;
  photoUrl: string;
  firstName: string;
  lastName: string;
  appointmentCount: number;
  averageRate: number;
  rate: number;
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
    <Grid container sx={{ flexDirection: "column" }}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ mb: 3 }}
          fontSize={32}
        >
          <b>Top Doctors</b>
        </Typography>
      </Grid>

      {error ? (
        <Grid item xs={12}>
          <Alert severity="error">Error fetching data from the server</Alert>
        </Grid>
      ) : (
        <div
          style={{
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0 auto",
            }}
          >
            {topDoctors.length > 0 &&
              topDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={{
                    minWidth: "200px",
                    margin: "8px",
                  }}
                >
                  <DoctorCard
                    imageUrl={doctor.photoUrl}
                    rate={doctor.averageRate}
                    appointmentCount={doctor.appointmentCount}
                    title={doctor.firstName + doctor.lastName}
                    id={doctor.id}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </Grid>
  );
}

export default TopDoctors;
