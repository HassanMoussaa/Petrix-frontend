import { Link } from "react-router-dom";
import "./footer.css";
import {
  Grid,
  Box,
  Typography,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
interface FooterProps {
  userType: "petOwner" | "doctor" | "user";
}

function Footer(props: FooterProps) {
  const { userType } = props;
  const renderUserLinks = () => {
    if (userType === "petOwner") {
      return (
        <>
          <Link to="/ai_classification" className="footerLink">
            AI Classification
          </Link>
          <Link to="/ai_assistant" className="footerLink">
            AI Assistant
          </Link>
          <Link to="/doctors_near_you" className="footerLink">
            Doctors Near You
          </Link>
        </>
      );
    } else if (userType === "doctor") {
      return (
        <>
          <Link to="/customized_pages" className="footerLink">
            Customized Pages
          </Link>
          <Link to="/ai_assistant" className="footerLink">
            AI Assistant
          </Link>
          <Link to="/handle_bookings" className="footerLink">
            Handle Bookings
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/ai_classification" className="footerLink">
            AI Classification
          </Link>
          <Link to="/ai_assistant" className="footerLink">
            AI Assistant
          </Link>
          <Link to="/customized_pages" className="footerLink">
            Customized Pages
          </Link>
          <Link to="/doctors_near_you" className="footerLink">
            Doctors Near You
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <Grid
        className="footer"
        container
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          gap={20}
        >
          {renderUserLinks()}
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          className="footerLink"
          mb={5}
        >
          {/* <Link to="/">PETRIX</Link> */}
          <Link to={"/"}>
            <Box
              component="img"
              src={process.env.PUBLIC_URL + "/images/PetrixMainLogo.svg"}
              alt="logo"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
