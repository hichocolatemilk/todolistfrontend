import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "./Cookie";

export default function Appbar() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    checkStorage();
  }, [isLogged]);

  let navigate = useNavigate();

  const checkStorage = () => {
    if (localStorage.getItem("accesstoken")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };

  const onLogin = () => {
    navigate("/Login");
  };
  const onLogout = () => {
    localStorage.removeItem("accesstoken");
    removeCookie("accesstoken");
    setLogged(false);
    window.location.reload();
  };

  const onHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onHome}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoList
          </Typography>{" "}
          {!isLogged ? (
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
          ) : (
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
