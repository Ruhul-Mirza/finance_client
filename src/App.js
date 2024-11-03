import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/js/Login";
import Register from "./components/js/Register";
import Home from "./components/js/Home";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Error from "./components/js/Error";
import Header from "./components/js/Header";
import { LoginContext } from "./components/context/Context";
import Expense from "./components/js/Expense";
import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {
  const [data, setData] = useState(false);
  const { setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const HomeValid = async () => {
    let token = localStorage.getItem("userdatatoken");
    if (!token) {
      setData(true); 
      return navigate("/");
    }
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();
    if (!result || result.status === 401) {
      setData(true); 
      return navigate("/"); 
    } else {
      setLoginData(result);
      setData(true); 
      navigate("/home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
        HomeValid();
        setData(true)
    }, 2000)

}, [])

  return (
    <Provider store={store}>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/expense" element={<Expense/>}></Route>
          </Routes>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </Provider>
  );
}

export default App;
