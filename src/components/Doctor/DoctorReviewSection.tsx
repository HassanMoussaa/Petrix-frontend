import React from "react";
import { Grid, Paper, Typography, Box, Rating } from "@mui/material";

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
    <Paper
      elevation={3}
      sx={{ p: 2, maxHeight: 350, overflowX: "hidden", overflowY: "auto" }}
    >
      <Grid container spacing={2}>
        {reviewList.map((review) => (
          <Grid item key={review.id} xs={12} sx={{ mb: 1 }}>
            <Box display="flex" alignItems="center">
              <img
                src={
                  review.petOwner.photoUrl ||
                  "http://127.0.0.1:8000/images/default_profile_picture.jpg"
                }
                alt={`${review.petOwner.firstName} ${review.petOwner.lastName}`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              <Typography variant="h6">{`${review.petOwner.firstName} ${review.petOwner.lastName}`}</Typography>
              <Typography variant="h6" style={{ marginLeft: "auto" }}>
                <Rating
                  name="read-only"
                  value={review.rate}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            </Box>
            <Typography>{review.body}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default DoctorReviewSection;
