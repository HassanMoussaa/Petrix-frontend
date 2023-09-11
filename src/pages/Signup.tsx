import { useState } from "react";
import getAPIBaseURL from "../APIBaseURL";
import axios from "axios";
import SignupForm from "../components/PetOwner/PetOwnerSignupForm";

function Signup() {
 

//   //check if user already logged in
//   let login_status = JSON.parse(localStorage.getItem("login"));
//   if (login_status && login_status.login) {
//     if (login_status.is_admin) {
//       history.push("/admin/home");
//     } else {
//       history.push("/");
//     }
//   }


  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
 


   const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    setPasswordMatch(true);
    setEmailUsedError(false);
   

    event.preventDefault();
    const signup_data = new FormData(event.currentTarget);
    const firstName = signup_data.get("firstName");
    const lastName = signup_data.get("lastName");
    const email = signup_data.get("email");
    const password = signup_data.get("password");
    const confirm_password = signup_data.get("confirm_password");

    if (password !== confirm_password) {
      setPasswordMatch(false);
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
      };

      try {
        let response = await axios.post(getAPIBaseURL() + "/user/signup", data);

        if (response.status === 201) {
          setSignUpError(false);
        
        } else {
          console.log("Something went wrong!");
          setSignUpError(true);
        }
      } catch (error:any) {
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
    
      <SignupForm
        signUpError={signUpError}
        setSignUpError={setSignUpError}
        emailUsedError={emailUsedError}
        setEmailUsedError={setEmailUsedError}
        passwordMatch={passwordMatch}
        handleSubmit={handleSubmit}
      />
    
  );
}

export default Signup;