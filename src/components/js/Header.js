import React from "react";
import { useContext } from "react";
import { LoginContext } from "../context/Context";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo2.jpeg";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    let token = localStorage.getItem("userdatatoken");
    if (!token) {
      return navigate("*");
    }
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      crendential: "include",
    });
    const data = await res.json();
    if (data.status == 201) {
      console.log("logout");
      localStorage.removeItem("userdatatoken");
      setLoginData(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const redirectError = () => {
    navigate("*");
  };

  const redirectHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "#faf5f1",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo Section */}
        {/* <span
          style={{
            display: "inline-block",
            background: "transparent",
            mixBlendMode: "multiply",
          }}
        >
          <img
            src={logo}
            alt="Budget Logo"
            height="80px"
            style={{ marginTop: "20px" }}
          />
        </span> */}

        {/* "Budget Buddy" Text */}
        <span
          style={{
            fontSize: "36px",
            letterSpacing: "5px",
            textShadow: "2px 2px 6px #a41f13",
            fontWeight: "400",
            color: "#a41f13",
          }}
        >
          BUDGET BUDDY
        </span>

        {/* Avatar Section */}
        <span>
          {loginData && loginData.ValidUser ? (
            <Avatar
              style={{
                background: "#a41f13",
                color: "#faf5f1",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              {loginData.ValidUser.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              style={{
                background: "#a41f13",
                cursor: "pointer",
              }}
              onClick={handleClick}
            />
          )}
        </span>
      </div>

      {/* Dropdown Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        {loginData.ValidUser ? (
          <>
            <MenuItem
              onClick={() => {
                redirectHome();
                handleClose();
              }}
              style={{
                color: "#a41f13",
                fontWeight: "bold",
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                logOut();
                handleClose();
              }}
              style={{
                color: "#a41f13",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center", 
              }}
            >
              Logout
              <ExitToAppIcon style={{ marginLeft: "8px" }} />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                redirectError();
                handleClose();
              }}
              style={{
                color: "#a41f13",
                fontWeight: "bold",
              }}
            >
              Profile
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Header;
