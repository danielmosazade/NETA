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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import type { CartItem } from "../context/CartContext"; // type-only import

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  
  const { cart } = useContext(CartContext);
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

  // חישוב מספר הפריטים בעגלה
  const cartItemCount: number = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

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

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
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

              {/* כפתור עגלת קניות עם Badge */}
              <IconButton color="inherit" onClick={() => navigate("/cart")}>
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

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

        {/* תפריט לנייד */}
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
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                  <MenuItem key="hello">שלום, {user.name}</MenuItem>,
                  <MenuItem key="cart" onClick={() => navigate("/cart")}>
                    עגלת קניות ({cartItemCount})
                  </MenuItem>,
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
