import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { LoginContext } from '../context/Context'
import ExpenseTable from '../Expense/ExpenseTable';

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
<div className=' bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
  <div className="space-y-4  md:space-y-6 lg:space-y-8 text-center">
    <h1 className="text-5xl pt-12 lg:pt-16 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 drop-shadow-lg">
      {loginData && loginData.ValidUser ? (
        `Welcome, ${loginData.ValidUser.fname.charAt(0).toUpperCase() + loginData.ValidUser.fname.slice(1)}` // Capitalize first letter of name
      ) : (
        "Welcome to Budget Buddy" // If not logged in, show a default welcome message
      )}
    </h1>
    <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium tracking-wide transition-all duration-300 ease-in-out hover:text-gray-800">
      Take control of your finances with smart insights and tracking. Start now!
    </p>
  </div>

  <ExpenseTable />
</div>




  )
}

export default Home