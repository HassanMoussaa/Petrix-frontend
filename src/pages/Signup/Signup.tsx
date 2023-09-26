import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import PetSignupForm from "../../components/PetOwner/PetOwnerSignupForm";
import DoctorSignupForm from "../../components/Doctor/DoctorSignupForm";
import Overlay from "../../components/NavBar/Overlay";
import { Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./Signup.css";

function Signup() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
  const [userType, setUserType] = useState("petOwner");
  let speciality: FormDataEntryValue;
  const navigate = useNavigate();

  const handleUserTypeChange = (newUserType: string) => {
    if (userType !== newUserType && newUserType) {
      setUserType(newUserType);
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setPasswordMatch(true);
    setEmailUsedError(false);

    event.preventDefault();
    const signup_data = new FormData(event.currentTarget);
    const firstName = signup_data.get("firstName");
    const lastName = signup_data.get("lastName");
    const email = signup_data.get("email");
    const password = signup_data.get("password");
    const confirm_password = signup_data.get("confirm_password");
    const city = signup_data.get("city");
    const country = signup_data.get("country");
    let specialties = [""];
    if (userType === "doctor") {
      const speciality = signup_data.get("speciality") as string;
      specialties = speciality.split(",").filter((sp) => sp !== "");
    }
    if (password !== confirm_password) {
      setPasswordMatch(false);
    } else {
      const data =
        userType === "petOwner"
          ? {
              firstName,
              lastName,
              email,
              password,
              city,
              country,
            }
          : {
              firstName,
              lastName,
              email,
              password,
              city,
              country,
              specialties,
            };

      try {
        let response = await axios.post(
          getAPIBaseURL() +
            (userType == "petOwner"
              ? "/petOwners/register/"
              : "/doctors/register/"),
          data
        );

        if (response?.status === 201) {
          setSignUpError(false);
          navigate("/login");
        } else {
          console.log("Something went wrong!");
          setSignUpError(true);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log("Something went wrong!");
          setSignUpError(true);
        } else if (error.response?.status === 409) {
          let conflict_type = error.response.data.conflict;
          if (conflict_type === "Email") {
            setEmailUsedError(true);
          }
        }
        console.log(error);
      }
    }
  };

  return (
    <Overlay>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ maxHeight: "100vh" }}
      >
        <Box
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          className="formBox_signup"
        >
          <div className="signin_logo">
            <img
              src={process.env.PUBLIC_URL + "/images/PetrixMainLogo.svg"}
              alt="logo"
            ></img>
          </div>
          <ToggleButtonGroup
            className="toggle_container"
            value={userType}
            exclusive
            onChange={(event, newValue) => handleUserTypeChange(newValue)}
            aria-label="User Type"
          >
            <ToggleButton value="petOwner" aria-label="Pet Owner">
              Pet Owner
            </ToggleButton>
            <ToggleButton value="doctor" aria-label="Doctor">
              Doctor
            </ToggleButton>
          </ToggleButtonGroup>
          {userType === "petOwner" ? (
            <PetSignupForm
              signUpError={signUpError}
              setSignUpError={setSignUpError}
              emailUsedError={emailUsedError}
              setEmailUsedError={setEmailUsedError}
              passwordMatch={passwordMatch}
              handleSubmit={handleSubmit}
            />
          ) : (
            <DoctorSignupForm
              signUpError={signUpError}
              setSignUpError={setSignUpError}
              emailUsedError={emailUsedError}
              setEmailUsedError={setEmailUsedError}
              passwordMatch={passwordMatch}
              handleSubmit={handleSubmit}
            />
          )}
        </Box>
      </Grid>
    </Overlay>
  );
}

export default Signup;
