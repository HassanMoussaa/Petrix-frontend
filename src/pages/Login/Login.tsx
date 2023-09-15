import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import LoginForm from "../../components/User/LoginForm";
import getAPIBaseURL from "../../APIBaseURL";
import Overlay from "../../components/NavBar/Overlay";

const Signin = () => {
  const [error, setError] = useState(Boolean);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");

    try {
      const response = await axios.post(getAPIBaseURL() + "/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const JWT_token = response.data.token;
        const userType = response.data.user_type;
        const { user_id, firstName, lastName, user_profile_picture, user_bio } =
          response.data.user;

        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: JWT_token,
            user_type: userType,
            user_id,
            firstName,
            lastName,
            user_profile_picture,
            user_bio,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error) {
        if (error.response && error.response.status === 401) {
          console.log("Wrong Credentials!");
        }
        console.log(error);
      }
      setError(true);
    }
  };

  return (
    <Overlay>
      <LoginForm handleSubmit={handleSubmit} loginError={error} />
    </Overlay>
  );
};

export default Signin;
