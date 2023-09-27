import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./AiChatBot.css";

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
  availabilities: Availability[];
  fetchDoctorProfile: () => void;
}

interface Availability {
  day: number;
  start_time: string;
  end_time: string;
}

function AiChatBot() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState<DoctorInfo>();
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { text: string; role: "user" | "bot" }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const user_id = login_status.user_id;
  const userType = login_status.user_type;

  const docId = params?.id;
  if (user_id == docId) {
    navigate("/myProfile_doctor");
  }

  // fetch section

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
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        getAPIBaseURL() + "/chat/chatgpt/",
        { prompt: userMessage },
        config
      );

      const message = response.data.message;
      if (!message) {
        throw new Error("Network response was not ok");
      }
      setChatHistory([
        ...chatHistory,
        { text: userMessage, role: "user" },
        { text: message, role: "bot" },
      ]);

      setUserMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserMessage(event.target.value);
  };

  useEffect(() => {
    fetchmyProfile();
  }, []);

  return (
    <div>
      {userInfo && (
        <NavBar
          imageUrl={userInfo.photoUrl}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          pageTitle={"ChatBot"}
          setNewImageUrl={() => {}}
        />
      )}
      <div className="chatbot-container">
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="user-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={handleUserMessageChange}
            className="chat-input"
          />
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <button onClick={handleSubmit}>Send</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AiChatBot;
