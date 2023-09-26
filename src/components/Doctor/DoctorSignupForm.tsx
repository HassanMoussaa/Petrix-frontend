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
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { countries } from "../../utils/countries";
import { petSpecialties } from "../../utils/petSpecialties";
import { SelectChangeEvent } from "@mui/material/Select";

// import "../PetOwner/petOwnerSignupForm.css";
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
    const specialities =
      typeof value === "string"
        ? value.split(",").filter((sp) => sp !== "")
        : value.filter((sp) => sp !== "");

    if (specialities.length > 4) {
      console.error("Please select only 4 specialties");
    } else {
      setSelectedSpeciality(specialities);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 5 }}
      className="formBox_fields_signup"
    >
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
        className="input_signup_field"
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
        className="input_signup_field"
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
        className="input_signup_field"
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
        className="input_signup_field"
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
        className="input_signup_field"
      />

      {!passwordMatch && (
        <Typography sx={{ mb: 2 }}>Passwords didn't match!</Typography>
      )}

      <FormControl
        variant="standard"
        sx={{ m: 1, width: "70%", maxHeight: 50 }}
      >
        <InputLabel id="demo-simple-select-standard-label" sx={{ zIndex: 3 }}>
          Country
        </InputLabel>
        <Select
          name="country"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedCountry}
          onChange={handleChange}
          label="country"
          required={true}
          sx={{ backgroundColor: "white" }}
        >
          {countries.map((country) => (
            <MenuItem key={country.label} value={country.label}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        required
        fullWidth
        name="city"
        label="city"
        type="city"
        id="city"
        autoComplete="city"
        sx={{ mb: 3 }}
        className="input_signup_field"
      />

      {/* <InputLabel id="speciality-select-label">Speciality</InputLabel>
      <Select
        className="input_signup_field"
        labelId="speciality-select-label"
        id="speciality"
        multiple
        value={selectedSpeciality}
        onChange={handleChangeSpeciality}
        required
        sx={{ mb: 3 }}
        input={<OutlinedInput label="Speciality" />}
      >
        {petSpecialties.map((specialty) => (
          <MenuItem key={specialty} value={specialty}>
            {specialty}
          </MenuItem>
        ))}
      </Select> */}

      <FormControl
        variant="standard"
        sx={{ m: 1, width: "70%", maxHeight: 50 }}
      >
        <InputLabel id="demo-simple-select-standard-label" sx={{ zIndex: 3 }}>
          Speciality
        </InputLabel>
        <Select
          name="speciality"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          multiple
          value={selectedSpeciality}
          onChange={handleChangeSpeciality}
          label="Speciality"
          required={true}
          sx={{ backgroundColor: "white" }}
        >
          {petSpecialties.map((specialty) => (
            <MenuItem key={specialty} value={specialty}>
              {specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        className="button_signup_field"
      >
        Sign Up
      </Button>
      <Link to={"/login"} style={{ color: "#1976d2" }}>
        <Typography style={{ color: "#212529" }}>
          Already have an account?
        </Typography>
      </Link>
    </Box>
  );
}

export default DoctorSignupForm;
