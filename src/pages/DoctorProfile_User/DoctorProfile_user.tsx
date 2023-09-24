import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import DoctorInfoSection from "../../components/Doctor/DoctorInfoSection";
import DoctorInfoSection2 from "../../components/Doctor/DoctorInfoSection2";
import "./doctorProfile.css";
import { Grid, Box, Tabs, Tab, Zoom } from "@mui/material";
import DoctorToggleSection from "../../components/Doctor/DoctorToggleSection";
import Fab from "@mui/material/Fab";
import { SxProps } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CreateReviewModal from "../../components/Doctor/CreateReviewModal";
import DoctorReviewSection from "../../components/Doctor/DoctorReviewSection";
import { useLocation } from "react-router-dom";
import UserLocation from "../../components/UserLocation/UserLocation";
import { useParams } from "react-router-dom";
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
  is_liked: boolean;
}
interface Review {
  id: number;
  rate: number;
  body: string;
  createdAt: string;
  petOwner: {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  };
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
  specialties: Specialty[];
  userType: UserType;
  posts: Post[];
  doctorReviews: Review[];
  averageRate: number;
  check_if_followed: boolean;
  followerCount: number;
  clinicLocations: {
    latitude: number;
    longitude: number;
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function DoctorProfile_user() {
  const params = useParams();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();
  const [userInfo, setUserInfo] = useState<DoctorInfo>();

  const [reviews, setReviews] = useState<Review[]>(
    doctorInfo?.doctorReviews || []
  );

  const [newImageUrl, setNewImageUrl] = useState(doctorInfo?.photoUrl);
  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const userType = login_status.user_type;
  // For toggle section

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props: TabPanelProps) {
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // fetch section

  async function fetchDoctorProfile() {
    try {
      const docId = params?.id;
      const response = await axios.get(
        getAPIBaseURL() + `/users/doctorProfile/${docId}`,
        config
      );

      setDoctorInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
      setReviews(response.data.doctorReviews);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }

  async function fetchmyProfile() {
    try {
      let apiEndpoint;

      if (userType === 1) {
        apiEndpoint = `/petOwners/myProfile/`;
      } else if (userType === 2) {
        apiEndpoint = `/doctors/myProfile/`;
      }

      const response = await axios.get(getAPIBaseURL() + apiEndpoint, config);

      setUserInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  //create post section

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // section for review edits
  const updateReviews = (newReview: Review) => {
    console.log("hi");
    setReviews([...reviews, newReview]);
  };

  useEffect(() => {
    fetchmyProfile();
    fetchDoctorProfile();
  }, []);

  return (
    <div className="drBody">
      {userInfo && (
        <NavBar
          imageUrl={userInfo.photoUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"Profile"}
        />
      )}
      {doctorInfo && (
        <DoctorInfoSection
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          averageRate={doctorInfo.averageRate}
          isOwnProfile={false}
          docId={doctorInfo.id}
          check_if_followed={doctorInfo.check_if_followed}
          followerCount={doctorInfo.followerCount}
        />
      )}
      <Grid
        container
        sx={{
          display: { xs: "flex" },
          flexWrap: { xs: "inherit" },
        }}
      >
        {doctorInfo && (
          <DoctorInfoSection2
            phoneNum={doctorInfo.phone || ""}
            profileBio={doctorInfo.profile}
            drEmail={doctorInfo.email}
            specialityList={doctorInfo.specialties}
          />
        )}
        <Grid
          container
          ml={23}
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
            position: "relative",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Blog" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
                <Tab label="Location" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {doctorInfo && (
                <DoctorToggleSection postList={doctorInfo.posts} />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {doctorInfo && <DoctorReviewSection reviewList={reviews} />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {doctorInfo?.clinicLocations && (
                <UserLocation
                  location={[
                    doctorInfo?.clinicLocations?.latitude,
                    doctorInfo?.clinicLocations?.longitude,
                  ]}
                />
              )}
            </CustomTabPanel>
            {userType === 1 && (
              <Zoom key="primary" in={value === 1} unmountOnExit>
                <Fab
                  sx={
                    { position: "absolute", bottom: 16, right: 16 } as SxProps
                  }
                  aria-label="Create review"
                  color="primary"
                  onClick={handleOpenModal}
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            )}
            {doctorInfo && (
              <CreateReviewModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                doctorId={doctorInfo.id}
                updateReviews={updateReviews}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DoctorProfile_user;
