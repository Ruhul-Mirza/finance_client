import React, { useContext, useState } from "react";
import { LoginContext } from "../context/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = useState(null);
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
      credentials: "include",
    });
    const data = await res.json();
    if (data.status === 201) {
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
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-violet-200">
                BUDGET BUDDY
              </span>
              <span className="hidden sm:block text-xs text-indigo-200">
                Track your expenses wisely
              </span>
            </div>

            {/* Profile Button */}
            <button
              onClick={handleClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-700 hover:to-violet-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              {loginData && loginData.ValidUser ? (
                <span className="text-lg font-semibold">
                  {loginData.ValidUser.fname[0].toUpperCase()}
                </span>
              ) : (
                <span className="text-lg font-semibold">?</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "mt-2 shadow-xl rounded-lg border border-gray-100",
          elevation: 0,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {loginData?.ValidUser ? (
          <>
            <MenuItem
              onClick={() => {
                redirectHome();
                handleClose();
              }}
              className="hover:bg-indigo-50 text-gray-700 font-medium"
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                logOut();
                handleClose();
              }}
              className="hover:bg-indigo-50 text-gray-700 font-medium flex items-center space-x-2"
            >
              <span>Logout</span>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              redirectError();
              handleClose();
            }}
            className="hover:bg-indigo-50 text-gray-700 font-medium"
          >
            Profile
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Header;
