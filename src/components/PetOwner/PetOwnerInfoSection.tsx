import React, { useState } from "react";
import { Grid, Button, Typography, Badge, Avatar } from "@mui/material";
import ChangeProfilePhoto from "../Doctor/ChangeProfilePhoto";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditProfileModel_PO from "./EditProfileModel_PO";
interface PetOwnerInfoSectionProps {
  firstName: string;
  lastName: string;
  imageUrl: string | undefined;
  city: string;
  country: string;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  phoneNum: string;
  profileBio: string;
  fetchPetOwnerProfile: () => void;
}

function PetOwnerInfoSection(props: PetOwnerInfoSectionProps) {
  const {
    imageUrl,
    firstName,
    lastName,
    setNewImageUrl,
    city,
    country,
    phoneNum,
    profileBio,
    fetchPetOwnerProfile,
  } = props;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <Grid
      container
      sx={{ display: { xs: "flex" }, ml: 10, mt: 10, gap: 13, width: "80%" }}
    >
      <Grid md={3} sx={{ display: { md: "flex" } }}>
        <div>
          <Badge
            badgeContent={
              <ChangeProfilePhoto setNewImageUrl={setNewImageUrl} />
            }
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="user_profile_picture"
              src={imageUrl}
              sx={{
                height: "300px !important",
                width: "300px !important",
              }}
              variant="square"
            />
          </Badge>
        </div>
      </Grid>
      <Grid
        container
        md={4}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          gap: 5,
        }}
      >
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 28,
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Grid
            sx={{
              display: { xs: "flex" },
              alignItems: { xs: "center" },
            }}
          >
            <LocationOnOutlinedIcon />
            {city}-{country}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#16A4C3",
              borderRadius: 3,
              maxWidth: 100,
              height: 50,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            size="large"
            onClick={handleEditClick}
          >
            Edit
          </Button>

          {/* Edit Profile Modal */}
          <EditProfileModel_PO
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            profile={profileBio}
            phone={phoneNum}
            city={city}
            country={country}
            fetchPetOwnerProfile={fetchPetOwnerProfile}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PetOwnerInfoSection;
