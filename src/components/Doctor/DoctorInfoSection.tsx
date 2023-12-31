import React, { useEffect, useState } from "react";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";

import { Grid, Rating, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ChangeProfilePhoto from "./ChangeProfilePhoto";
import EditProfileModal from "./EditProfileModal";

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
interface Availability {
  day: number;
  start_time: string;
  end_time: string;
}
interface DoctorInfoSection {
  firstName: string;
  lastName: string;
  imageUrl: string | undefined;
  averageRate: number;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  isOwnProfile: boolean;
  docId: number;
  check_if_followed: boolean;
  followerCount: number;
  phoneNum: string;
  profileBio: string;
  specialityList: Specialty[];
  availabilityList: Availability[];
  fetchDoctorProfile: () => void;
}

function DoctorInfoSection(props: DoctorInfoSection) {
  const {
    imageUrl,
    firstName,
    lastName,
    averageRate,
    setNewImageUrl,
    isOwnProfile,
    docId,
    check_if_followed,
    followerCount,
    phoneNum,
    profileBio,
    specialityList,
    availabilityList,
    fetchDoctorProfile,
  } = props;

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  const user_type = login_status.user_type;
  config = { headers: { Authorization: `Bearer ${token}` } };

  // logic for follow feature
  const [isFollowed, setIsFollowed] = useState(check_if_followed);
  const [followersCountIncrementer, setFollowersCountIncrementer] =
    useState(followerCount);

  async function followUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/users/follow`,
        { followed_user_id: docId },
        config
      );

      setIsFollowed(true);
      setFollowersCountIncrementer(
        (followersCountIncrementer) => followersCountIncrementer + 1
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function unFollowUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/users/unfollow`,
        { unfollowed_user_id: docId },
        config
      );

      setIsFollowed(false);
      setFollowersCountIncrementer(
        (followersCountIncrementer) => followersCountIncrementer - 1
      );
    } catch (error) {
      console.log(error);
    }
  }

  //work for edit button
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <Grid
      container
      sx={{
        display: { xs: "flex" },
        mt: 10,
        width: "90%",
        justifyContent: "space-between",
      }}
      className="infoSection1"
    >
      <Grid
        container
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          gap: 2,
        }}
        md={6}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Dr {firstName} {lastName}
        </Typography>

        <Rating name="read-only" value={averageRate} precision={0.5} readOnly />
      </Grid>
      <Grid
        container
        sx={{
          display: {
            xs: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          },
          gap: 2,
        }}
        md={5}
      >
        {isOwnProfile ? (
          <>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#16A4C3",
                borderRadius: 3,
                maxWidth: 100,
                fontWeight: "bold",
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
            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              firstName={firstName}
              lastName={lastName}
              profile={profileBio}
              phone={phoneNum}
              specialties={specialityList}
              availability={availabilityList}
              fetchDoctorProfile={fetchDoctorProfile}
            />
            <Button
              variant="contained"
              href="/appointments"
              sx={{
                bgcolor: "#000",
                borderRadius: 3,
                fontWeight: "bold",
                maxWidth: 150,
                height: 50,
                "&:hover": {
                  backgroundColor: "#16A4C3",
                },
              }}
              size="large"
            >
              Appointments
            </Button>
          </>
        ) : (
          <>
            {/* Rendering different buttons for non-own profiles */}

            {isFollowed ? (
              <Button
                onClick={unFollowUser}
                variant="contained"
                sx={{ borderRadius: 3, fontWeight: "bold", height: 50 }}
                color="error"
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={followUser}
                variant="contained"
                sx={{ backgroundColor: "#16A4C3", height: 50, borderRadius: 3 }}
              >
                Follow
              </Button>
            )}
            {user_type === 1 && (
              <Button
                variant="contained"
                href={`/book_appointment/${docId}`}
                sx={{
                  bgcolor: "#000",
                  fontWeight: "bold",
                  borderRadius: 3,
                  maxWidth: 250,
                  height: 50,
                  "&:hover": {
                    backgroundColor: "#16A4C3",
                  },
                }}
                size="large"
              >
                Book Appointment
              </Button>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection;
