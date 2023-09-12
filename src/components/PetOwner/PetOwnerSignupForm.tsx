import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Alert,
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

  const [selectedCountry, setSelectedCountry] = useState<string>("Lebanon");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        className="formBox_signup"
      >
        <div className="signin_logo">
          <img
            src={process.env.PUBLIC_URL + "/images/petrix-logo.png"}
            alt="logo"
          ></img>
        </div>
        {signUpError && (
          <Alert
            severity="error"
            onClose={() => {
              setSignUpError(false);
            }}
            sx={{ mb: 2 }}
          >
            Something went wrong! Try again.
          </Alert>
        )}

        {emailUsedError && (
          <Alert
            severity="error"
            onClose={() => {
              setEmailUsedError(false);
            }}
            sx={{ mb: 2 }}
          >
            Email already used!
          </Alert>
        )}

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
            label="firstName"
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
            label="lastName"
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
          <Select
            name="country"
            labelId="country"
            id="country"
            className="input_signup_field"
            value={selectedCountry}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          >
            {countries.map((country) => (
              <MenuItem key={country.label} value={country.label}>
                {country.label}
              </MenuItem>
            ))}
          </Select>

          <TextField
            required
            fullWidth
            name="city"
            label="city"
            type="city"
            id="city"
            className="input_signup_field"
            autoComplete="city"
            sx={{ mb: 3 }}
          />

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
      </Box>
    </Grid>
  );
}

export default PetSignupForm;
