import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import PetOwnerInfoSection2 from "../../components/PetOwner/PetOwnerInfoSection2";
import "./petOwnerProfile.css";
import { Grid, Box, Tabs, Tab, Zoom } from "@mui/material";
import PetOwnerPets from "../../components/PetOwner/PetOwnerPets";
import PetOwnerInfoSection from "../../components/PetOwner/PetOwnerInfoSection";
import BackButton from "../../components/BackButton";

interface UserType {
  id: number;
  type: string;
}
interface Pet {
  id: number;
  name: string;
  breed: string;
  photo_url: string | null;
  createdAt: string;
}

interface petOwnerInfo {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profile: string;
  phone: string;
  photoUrl: string;
  email: string;
  userType: UserType;
  pets: Pet[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function PetOwnerProfile() {
  const [petOwnerInfo, setPetOwnerInfo] = useState<petOwnerInfo>();
  const [newImageUrl, setNewImageUrl] = useState(petOwnerInfo?.photoUrl);
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

  async function fetchPetOwnerProfile() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/petOwners/myProfile",
        config
      );

      setPetOwnerInfo(response.data);
      setNewImageUrl(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchPetOwnerProfile();
  }, []);

  return (
    <div className="drBody">
      {petOwnerInfo && (
        <NavBar
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={petOwnerInfo.firstName}
          lastName={petOwnerInfo.lastName}
          pageTitle={"Profile"}
        />
      )}
      <BackButton />
      {petOwnerInfo && (
        <PetOwnerInfoSection
          imageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          firstName={petOwnerInfo.firstName}
          lastName={petOwnerInfo.lastName}
          city={petOwnerInfo.city}
          country={petOwnerInfo.country}
          phoneNum={petOwnerInfo.phone || ""}
          profileBio={petOwnerInfo.profile}
          fetchPetOwnerProfile={fetchPetOwnerProfile}
        />
      )}
      <Grid
        container
        sx={{
          display: { xs: "flex" },
          flexWrap: { xs: "inherit" },
        }}
      >
        {petOwnerInfo && (
          <PetOwnerInfoSection2
            phoneNum={petOwnerInfo.phone || ""}
            profileBio={petOwnerInfo.profile}
            drEmail={petOwnerInfo.email}
          />
        )}
        <Grid
          container
          ml={23}
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Animals" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {petOwnerInfo && <PetOwnerPets petList={petOwnerInfo.pets} />}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default PetOwnerProfile;
