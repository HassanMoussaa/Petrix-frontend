import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../components/User/LoginForm";
import getAPIBaseURL from "../APIBaseURL";

const Signin = () => {

  const [error,setError]=useState("")
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");
   

      try {
      const response = await axios.post(getAPIBaseURL() + "/users/login", {
        email,
        password,
      });

      localStorage.setItem("jwt_token", response.data.token);
      console.log(response)
    } catch (error:any)
     {
      setError(error.response.data.message);
      console.error("An error occurred during login:", error);
    }
  };

//   const signUp = () => {
//     navigate("/signup");
//   };

  return (
    <LoginForm handleSubmit={handleSubmit}/>
  );
};

export default Signin;
