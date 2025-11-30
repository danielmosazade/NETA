import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#333", boxShadow: 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          חנות אופנה
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/">
            בית
          </Button>
          <Button color="inherit" component={Link} to="/products">
            מוצרים
          </Button>
          <Button color="inherit" component={Link} to="/about">
            אודות
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            צור קשר
          </Button>
          {user ? (
            <>
              <Typography variant="subtitle1" sx={{ my: "auto", mx: 2 }}>
                שלום, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                יציאה
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                התחברות
              </Button>
              <Button color="inherit" component={Link} to="/register">
                הרשמה
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              בית
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/products">
              מוצרים
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/about">
              אודות
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/contact">
              צור קשר
            </MenuItem>
            {user
              ? [
                  <Typography key="username" sx={{ px: 2, py: 1 }}>
                    שלום, {user.name}
                  </Typography>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    יציאה
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    onClick={handleClose}
                    component={Link}
                    to="/login"
                  >
                    התחברות
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={handleClose}
                    component={Link}
                    to="/register"
                  >
                    הרשמה
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
