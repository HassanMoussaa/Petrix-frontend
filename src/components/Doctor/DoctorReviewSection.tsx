import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

interface Review {
  id: number;
  body: string;
  rate: number;
  createdAt: string;
  petOwner: {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  };
}

interface DoctorReviewSectionProps {
  reviewList: Review[];
}

function DoctorReviewSection(props: DoctorReviewSectionProps) {
  const { reviewList } = props;

  return (
    <Grid container spacing={2}>
      {reviewList.map((review) => (
        <Grid item key={review.id} xs={12}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <Box display="flex" alignItems="center">
              <img
                src={review.petOwner.photoUrl || "/default-user-image.jpg"}
                alt={`${review.petOwner.firstName} ${review.petOwner.lastName}`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              <Typography variant="h6">{`${review.petOwner.firstName} ${review.petOwner.lastName}`}</Typography>
              <Typography
                variant="h6"
                style={{ marginLeft: "auto" }}
              >{`Rating: ${review.rate}`}</Typography>
            </Box>
            <Typography>{review.body}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default DoctorReviewSection;
