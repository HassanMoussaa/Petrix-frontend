import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import { Link } from "react-router-dom";



interface LoginFormProps {
//   loginError: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}


function LoginForm(props:LoginFormProps) {
  const {
    handleSubmit,
  } = props;


  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Typography
          sx={{ mb: 5 }}
          style={{ textAlign: "center" }}
        >
          Log In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          {/* {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Wrong Credentials! Try again.
            </Alert>
          )} */}


          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            // inputProps={{
            //   type: "email",
            //   maxLength: 100,
            // }}
          />

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            name="password"
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          <Link to={"/signup"} style={{ color: "#1976d2" }}>
            Create Account
          </Link>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LoginForm;