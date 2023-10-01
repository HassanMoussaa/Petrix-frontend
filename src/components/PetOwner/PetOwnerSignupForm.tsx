import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { countries } from "../../utils/countries";
import { SelectChangeEvent } from "@mui/material/Select";
import "./petOwnerSignupForm.css";

interface SignupFormProps {
  signUpError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setSignUpError: React.Dispatch<React.SetStateAction<boolean>>;
  emailUsedError: boolean;
  setEmailUsedError: React.Dispatch<React.SetStateAction<boolean>>;
  passwordMatch: boolean;
}

function PetSignupForm(props: SignupFormProps) {
  const {
    signUpError,
    setSignUpError,
    emailUsedError,
    setEmailUsedError,
    passwordMatch,
    handleSubmit,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 5 }}
      className="formBox_fields_signup"
    >
      <TextField
        sx={{ mb: 3 }}
        required
        id="firstName"
        name="firstName"
        label="First name"
        placeholder="firstName"
        className="input_signup_field"
        inputProps={{
          minLength: 2,
        }}
      />
      <TextField
        sx={{ mb: 3 }}
        required
        id="lastName"
        name="lastName"
        label="Last name"
        placeholder="lastName"
        className="input_signup_field"
        inputProps={{
          minLength: 2,
        }}
      />

      <TextField
        sx={{ mb: 3 }}
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        className="input_signup_field"
        inputProps={{
          type: "email",
          maxLength: 100,
        }}
      />

      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        className="input_signup_field"
        sx={{ mb: 3 }}
        inputProps={{
          minLength: 6,
        }}
      />

      <TextField
        required
        fullWidth
        name="confirm_password"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        className="input_signup_field"
        autoComplete="current-password"
        sx={{ mb: 3 }}
      />

      {!passwordMatch && (
        <Typography sx={{ mb: 2 }}>Passwords didn't match!</Typography>
      )}
      <FormControl sx={{ width: "70%", marginBottom: "13px", maxHeight: 50 }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{ zIndex: 3 }}>
          Country*
        </InputLabel>
        <Select
          name="country"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedCountry}
          onChange={handleChange}
          label="country"
          required={true}
          sx={{
            backgroundColor: "white",
            borderBottom: 0,
            border: "20px",
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country.label} value={country.label}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, width: "70%", maxHeight: 50 }}>
        <TextField
          required
          fullWidth
          name="city"
          label="City"
          type="city"
          id="city"
          className="input_signup_field_updated_city"
          autoComplete="city"
          sx={{ mb: 3 }}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="button_signup_field"
        sx={{ mt: 3, mb: 1 }}
      >
        Sign Up
      </Button>
      <Typography
        style={{ color: "#212529" }}
        className="already_have_account_btn"
      >
        <Link to={"/login"}> Already have an account?</Link>
      </Typography>
    </Box>
  );
}

export default PetSignupForm;
