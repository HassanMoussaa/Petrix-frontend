import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import DoctorInfoSection from "../../components/Doctor/DoctorInfoSection";
import DoctorInfoSection2 from "../../components/Doctor/DoctorInfoSection2";
import "./doctorProfile.css";

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
}

interface DoctorInfo {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profile: string;
  phone: string;
  photoUrl: string | null;
  specialities: Specialty[];
  userType: UserType;
  post: Post[];
}

function DoctorProfile() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  async function fetchDoctorProfile() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/doctors/myProfile",
        config
      );

      setDoctorInfo(response.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }
  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return (
    <div>
      {doctorInfo && (
        <NavBar
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
          pageTitle={"Profile"}
        />
      )}
      {doctorInfo && (
        <DoctorInfoSection
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
        />
      )}
      {doctorInfo && (
        <DoctorInfoSection2
          imageUrl={doctorInfo.photoUrl || ""}
          firstName={doctorInfo.firstName}
          lastName={doctorInfo.lastName}
        />
      )}
    </div>
  );
}

export default DoctorProfile;
