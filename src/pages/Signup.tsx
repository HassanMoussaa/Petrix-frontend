import { useState } from "react";
import getAPIBaseURL from "../APIBaseURL";
import axios from "axios";
import PetSignupForm from "../components/PetOwner/PetOwnerSignupForm";
import DoctorSignupForm from "../components/Doctor/DoctorSignupForm";

function Signup() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
  const [userType, setUserType] = useState("petOwner");
  let speciality: FormDataEntryValue;

  const handleUserTypeChange = (newUserType: string) => {
    setUserType(newUserType);
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

    if (userType === "doctor") {
      const speciality = signup_data.get("speciality");
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
              speciality,
            };

      try {
        let response = await axios.post(
          getAPIBaseURL() +
            (userType == "petOwner"
              ? "/petOwners/register/"
              : "/doctors/register/"),
          data
        );

        if (response.status === 201) {
          setSignUpError(false);
        } else {
          console.log("Something went wrong!");
          setSignUpError(true);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log("Something went wrong!");
          setSignUpError(true);
        } else if (error.response.status === 409) {
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
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="petOwner"
            checked={userType === "petOwner"}
            onChange={() => handleUserTypeChange("petOwner")}
          />
          Pet Owner
        </label>
        <label>
          <input
            type="radio"
            value="doctor"
            checked={userType === "doctor"}
            onChange={() => handleUserTypeChange("doctor")}
          />
          Doctor
        </label>
      </div>

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
    </div>
  );
}

export default Signup;
