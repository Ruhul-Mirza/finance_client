import React, { useState } from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate()
    const [showPass,setShowPass ] = useState(false)
    const [inputVal , setInputValue] = useState({
        email:"",
        password:""
    })
    const setVal = (e)=>{
        const {name ,value } = e.target;
        setInputValue(()=>{
            return{
                ...inputVal,
                [name]:value
            }
        
        })
    }

    const loginUser = async (e) => {
      e.preventDefault();
      const { email, password } = inputVal;
    
      if (email === "") {
        alert("Please enter your email");
      } else if (!email.includes("@")) {
        alert("Please enter a valid email");
      } else if (password === "") {
        alert("Password field cannot be empty");
      } else if (password.length < 6) {
        alert("Password length is too small, at least 6 characters required");
      } else {
        try {
          const data = await fetch("/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          const res = await data.json();
          
          if (res.status === 200) {
            localStorage.setItem("userdatatoken", res.result.token);
            navigate("/home");
            setInputValue({ ...inputVal, email: "", password: "" });
          } else {
            // Handle error cases
            alert(res.error || "An error occurred");
          }
        } catch (error) {
          // Catch any other errors like network issues
          console.error(error);
          alert("An unexpected error occurred");
        }
      }
    };
      
  return (
    <>
      <div className="form_container">
        <form>
          <h1>Welcome Back, Log in</h1>
          <p>Hi, we are glad you are back , please login </p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={setVal} value={inputVal.email} placeholder="enter your email" />
          <div className="form_middle">
            <label htmlFor="password">Password</label>

            <input
            type={!showPass ? "password" : "text"}
              name="password"
              id="password"
              onChange={setVal}
              value={inputVal.password}
              placeholder="enter your password"
            />
            <div className="showpass" onClick={()=> setShowPass(!showPass)}>{!showPass ? "Show" : "Hide" }</div>
          </div>
          <NavLink to={"/forgot-password"}><button className="btn" >Forgot Password</button></NavLink>
          <button className="btn" onClick={loginUser}>Login</button>
          <p>Didn't have account <Link to="/register">Signup</Link></p>
        </form>
      </div>
    </>
  );
}

export default Login;
