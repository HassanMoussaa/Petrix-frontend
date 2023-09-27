import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { styled } from "styled-components";

interface ResponsiveAppBarProps {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
  const { imageUrl, firstName, lastName } = props;
  const navigate = useNavigate();
  const login_status = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "")
    : "";

  const user_type = login_status?.user_type ?? null;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavClick = (route: string) => {
    const loginData = localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login") || "")
      : "";

    if (!loginData) {
      navigate("/login");
    } else {
      navigate(route);
    }
    setAnchorElNav(null);
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setAnchorElUser(null);
  };

  const handleProfileNavigation = () => {
    if (user_type === 2) {
      navigate("/myProfile_doctor");
    } else {
      navigate("/myProfile_petOwner");
    }
  };

  return (
    <AppBar position="static" elevation={0} style={{ background: "#F3F5F8" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"}>
            <Box
              component="img"
              src={process.env.PUBLIC_URL + "/images/Petrix-nav-logo.svg"}
              alt="logo"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="primary"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
                justifyContent: "center",
              }}
              style={{ justifyContent: "center" }}
            >
              {ROUTES.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleNavClick(page.route as string)}
                >
                  <CustomLink to={page.route as string}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </CustomLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/"}>
            <Box
              component="img"
              src={process.env.PUBLIC_URL + "/images/Petrix-nav-logo.png"}
              alt="logo"
              sx={{ display: { xs: "flex", md: "none" }, mr: 40 }}
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {ROUTES.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleNavClick(page.route as string)}
                sx={{ my: 2, color: "black", display: "block" }}
                // TODO: make current page bold
              >
                <CustomLink to={page.route as string}>{page.name}</CustomLink>
              </Button>
            ))}
          </Box>

          <div>
            {login_status ? (
              <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                <Typography
                  style={{ color: "#000", alignItems: "center" }}
                  fontSize={16}
                  sx={{
                    display: { xs: "flex" },
                    fontWeight: "bold",
                    mr: 1,
                  }}
                >
                  {firstName + lastName}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={imageUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  <MenuItem onClick={handleProfileNavigation}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Tooltip title="Meyawwwoo">
                <IconButton sx={{ p: 0 }}>
                  <Link to={"/login"}>
                    <Button
                      variant="contained"
                      style={{ background: "#FA6900" }}
                      sx={{ borderRadius: "20px" }}
                    >
                      SIGN IN
                    </Button>
                  </Link>
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;
`;
