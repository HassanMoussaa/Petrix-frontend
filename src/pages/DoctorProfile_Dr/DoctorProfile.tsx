import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import DoctorInfoSection from "../../components/Doctor/DoctorInfoSection";
import DoctorInfoSection2 from "../../components/Doctor/DoctorInfoSection2";
import "./doctorProfile.css";
import { Grid, Box, Tabs, Tab, Zoom } from "@mui/material";
import DoctorToggleSection from "../../components/Doctor/DoctorToggleSection";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Fab from "@mui/material/Fab";
import { SxProps } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CreatePostModal from "../../components/Doctor/CreatePostModal";
import DoctorReviewSection from "../../components/Doctor/DoctorReviewSection";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";

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
function DoctorProfile() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();
  const [newImageUrl, setNewImageUrl] = useState(doctorInfo?.photoUrl);
  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

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
      const response = await axios.get(
        getAPIBaseURL() + "/doctors/myProfile",
        config
      );

      setDoctorInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }

  //create post section

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  // maps Sections

  const [location, setLocation] = useState(
    doctorInfo?.clinicLocations
      ? [
          doctorInfo?.clinicLocations?.latitude,
          doctorInfo?.clinicLocations?.longitude,
        ]
      : [33.8938, 35.5018]
  );

  return (
    <div className="drBody">
      {doctorInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
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
          isOwnProfile={true}
          docId={doctorInfo.id}
          check_if_followed={doctorInfo.check_if_followed}
          followerCount={doctorInfo.followerCount}
          phoneNum={doctorInfo.phone || ""}
          profileBio={doctorInfo.profile}
          specialityList={doctorInfo.specialties}
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
              {doctorInfo && (
                <DoctorReviewSection reviewList={doctorInfo.doctorReviews} />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <GoogleMaps location={location} setLocation={setLocation} />
            </CustomTabPanel>
            <Zoom key="primary" in={value === 0} unmountOnExit>
              <Fab
                sx={
                  {
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                  } as SxProps
                }
                aria-label="Create post"
                color="primary"
                onClick={handleOpenModal}
              >
                <AddIcon />
              </Fab>
            </Zoom>
            <CreatePostModal open={isModalOpen} setOpen={setIsModalOpen} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DoctorProfile;
