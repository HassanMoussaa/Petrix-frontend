import { Link } from "react-router-dom";
import "./footer.css";
import { Grid, Box } from "@mui/material";
interface FooterProps {
  userType: "petOwner" | "doctor" | "user";
}

function Footer(props: FooterProps) {
  const { userType } = props;
  const renderUserLinks = () => {
    if (userType === "petOwner") {
      return (
        <>
          <Link to="/ai_imageClassification" className="footerLink">
            AI Classification
          </Link>
          <Link to="/chatbot" className="footerLink">
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
          <Link to="/myProfile_doctor" className="footerLink">
            Customized Pages
          </Link>
          <Link to="/chatbot" className="footerLink">
            AI Assistant
          </Link>
          <Link to="/myProfile_doctor" className="footerLink">
            Handle Bookings
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/ai_imageClassification" className="footerLink">
            AI Classification
          </Link>
          <Link to="/chatbot" className="footerLink">
            AI Assistant
          </Link>
          <Link to="/myProfile_petOwner" className="footerLink">
            Customized Pages
          </Link>
          <Link to="/doctors-near-you" className="footerLink">
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
          sx={{ position: "relative" }}
        >
          {/* Add your image here */}
          <Box
            component="img"
            src={process.env.PUBLIC_URL + "/images/Claws_footer.svg"}
            alt="logo"
            sx={{
              height: "auto",
              opacity: "0.5",
              position: "absolute",
              top: -30,
              left: 0,
            }}
          />
          {/* Mirror the image */}
          <Box
            component="img"
            src={process.env.PUBLIC_URL + "/images/Claws_footer.svg"}
            alt="logo"
            sx={{
              height: "auto",
              opacity: "0.5",
              position: "absolute",
              top: -30,
              right: 0,
              transform: "scaleX(-1)",
            }}
          />
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
