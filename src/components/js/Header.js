import React from "react";
import { useContext } from "react";
import { LoginContext } from "../context/Context";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

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

  const logOut =async () => {
    let token = localStorage.getItem("userdatatoken")
    if (!token) {
      return navigate("*")
    }
    const res = await fetch("/logout",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token,
        "Accept":"application/json",
    },
    crendential:"include"
    })
    const data = await res.json();
    if(data.status == 201){
        console.log("logout")
        localStorage.removeItem("userdatatoken")
        setLoginData(false)
        navigate("/")
    }else{
        console.log("error")
    }
  }

  const redirectError = () => {
    navigate("*");
  };

  const redirectHome =()=>{
    navigate("/home")
  }
  return (
    <>
      <div>
        <span>
          {loginData && loginData.ValidUser ? (
            <Avatar
              style={{ background: "red", color: "white" }}
              onClick={handleClick}
            >
              {loginData.ValidUser.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar style={{ background: "blue" }} onClick={handleClick} />
          )}
        </span>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {loginData.ValidUser ? (
          <>
            <MenuItem
              onClick={() => {
                redirectHome();
                handleClose();
              }}
            >
              Profile
            </MenuItem>

            <MenuItem onClick={()=>{

            logOut()
                handleClose()
                }}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                redirectError();
                handleClose();
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