import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "./loginForm.css";

interface LoginFormProps {
  loginError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

function LoginForm(props: LoginFormProps) {
  const { handleSubmit, loginError } = props;

  return (
    <Grid
      container
      className="main-container"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box style={{ backgroundColor: "#F3F5F8" }} className="formBox">
        <div className="signin_logo">
          <img
            src={process.env.PUBLIC_URL + "/images/petrix-logo.png"}
            alt="logo"
          ></img>
        </div>
        <Typography sx={{ mb: 5 }} style={{ textAlign: "center" }}>
          <b>SIGN IN</b>
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mb: 5 }}
          className="formBox_fields"
        >
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Wrong Credentials! Try again.
            </Alert>
          )}

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            className="input_login_field"
            autoComplete="email"
            inputProps={{
              type: "email",
              maxLength: 100,
            }}
          />

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            name="password"
            className="input_login_field"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              minLength: 6,
            }}
          />

          <Button
            type="submit"
            fullWidth
            className="button_login_field"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SIGN IN
          </Button>
        </Box>
        <Link
          to={"/signup"}
          style={{ color: "#1976d2" }}
          className="create_account_but"
        >
          Create Account
        </Link>
      </Box>
    </Grid>
  );
}

export default LoginForm;
