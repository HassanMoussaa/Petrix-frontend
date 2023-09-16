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
import { Link } from "react-router-dom";

interface ResponsiveAppBarProps {
  firstName: string;
  lastName: string;
  imageUrl: string;
  pageTitle: string;
}

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
  const { imageUrl, firstName, lastName, pageTitle } = props;

  const login_status = localStorage.getItem("login");

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [pageTitle];
  const settings = ["Profile", "Dashboard", "Logout"];
  return (
    <AppBar position="static" elevation={0} style={{ background: "#F3F5F8" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={process.env.PUBLIC_URL + "/images/Petrix-nav-logo.svg"}
            alt="logo"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          />

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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                justifyContent: "center",
              }}
              style={{ justifyContent: "center" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            src={process.env.PUBLIC_URL + "/images/Petrix-nav-logo.png"}
            alt="logo"
            sx={{ display: { xs: "flex", md: "none" }, mr: 40 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
                // TODO: make current page bold
              >
                {page}
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
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
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