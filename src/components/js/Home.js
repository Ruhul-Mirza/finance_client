import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/Context'

const Home = () => {
  const [data,setData] = useState(false)
  const {loginData,setLoginData} = useContext(LoginContext)
  const navigate = useNavigate()
  const HomeValid = async () => {
    let token = localStorage.getItem("userdatatoken")
    if (!token) {
      return navigate("*")
    }
    const res = await fetch("/validuser",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      }
    })
    const data = await res.json();
    if(!data || data.status==401){
      navigate("*")
    }else{
      setLoginData(data)
      navigate("/home")
    }

  }

  useEffect(() => {
    setTimeout(() => {
        HomeValid();
        setData(true)
    }, 2000)

}, [])


  return (
    <div>{loginData && loginData.ValidUser ? (
      loginData.ValidUser.fname
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
    )}</div>
  )
}

export default Home