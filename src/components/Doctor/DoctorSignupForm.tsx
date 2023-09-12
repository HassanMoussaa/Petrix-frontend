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
import { petSpecialties } from "../../utils/petSpecialties";
import { SelectChangeEvent } from "@mui/material/Select";

interface SignupFormProps {
  signUpError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setSignUpError: React.Dispatch<React.SetStateAction<boolean>>;
  emailUsedError: boolean;
  setEmailUsedError: React.Dispatch<React.SetStateAction<boolean>>;
  passwordMatch: boolean;
}

function DoctorSignupForm(props: SignupFormProps) {
  const {
    signUpError,
    setSignUpError,
    emailUsedError,
    setEmailUsedError,
    passwordMatch,
    handleSubmit,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSpeciality, setSelectedSpeciality] = useState<string[]>([""]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  const handleChangeSpeciality = (
    event: SelectChangeEvent<typeof petSpecialties>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSpeciality(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Typography
          id="transition-modal-title"
          sx={{ mb: 5 }}
          style={{ textAlign: "center" }}
        >
          Create a New Account
        </Typography>

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

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          <TextField
            sx={{ mb: 3 }}
            required
            id="firstName"
            name="firstName"
            label="firstName"
            placeholder="firstName"
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
            autoComplete="current-password"
            sx={{ mb: 3 }}
          />

          {!passwordMatch && (
            <Typography sx={{ mb: 2 }}>Passwords didn't match!</Typography>
          )}

          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
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

          {/* <FormLabel component="legend">Gender</FormLabel> */}
          {/* <RadioGroup row aria-label="gender" name="gender" defaultValue="0">
            <FormControlLabel
              value="0"
              control={<Radio />}
              label={<Typography style={{ color: "#212529" }}>Male</Typography>}
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label={
                <Typography style={{ color: "#212529" }}>Female</Typography>
              }
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={
                <Typography style={{ color: "#212529" }}>Other</Typography>
              }
            />
          </RadioGroup> */}

          <TextField
            required
            fullWidth
            name="city"
            label="city"
            type="city"
            id="city"
            autoComplete="city"
            sx={{ mb: 3 }}
          />

          <InputLabel id="speciality">Speciality</InputLabel>
          <Select
            labelId="speciality"
            id="speciality"
            multiple
            value={selectedSpeciality}
            onChange={handleChangeSpeciality}
            required
            sx={{ mb: 3 }}
          >
            {petSpecialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign Up
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          <Typography style={{ color: "#212529" }}>
            Already have an account?
          </Typography>

          <Link to={"/login"} style={{ color: "#1976d2" }}>
            Log in
          </Link>
        </Grid>
      </Box>
    </Grid>
  );
}

export default DoctorSignupForm;
