import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPass, setShowPass] = useState(false);
  const [cPass, setCPass] = useState(false);
  const [inputVal, setInputValue] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInputValue(() => {
      return {
        ...inputVal,
        [name]: value
      };
    });
  };

  const userData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inputVal;

    if (fname === "") {
      alert("Please enter your fullname");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email");
    } else if (password === "") {
      alert("Password field cannot be empty");
    } else if (password.length < 6) {
      alert("Password length is too small, at least 6 characters required");
    } else if (cpassword === "") {
      alert("Please confirm your password");
    } else if (password !== cpassword) {
      alert("Passwords do not match");
    } else {
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        })
      });
      const res = await data.json();
      alert("User Successfully registered")

      setInputValue({ ...inputVal, fname: "", email: "", password: "", cpassword: ""});
    }
  };

  return (
    <>
      <div className="form_container">
        <form action="" method="">
          <h1>Welcome Back, Log in</h1>
          <p>Hi, we are glad you are back, please log in</p>
          <label htmlFor="fname">Fullname</label>
          <input
            type="text"
            name="fname"
            required
            id="fname"
            onChange={setVal}
            value={inputVal.fname}
            placeholder="Enter your firstname"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            id="email"
            onChange={setVal}
            value={inputVal.email}
            placeholder="Enter your email"
          />
          <div className="form_middle">
            <label htmlFor="password">Password</label>
            <input
              type={!showPass ? "password" : "text"}
              name="password"
              id="password"
              onChange={setVal}
              placeholder="Enter your password"
              required
              value={inputVal.password}
            />
            <div className="showpass" onClick={() => setShowPass(!showPass)}>
              {!showPass ? "Show" : "Hide"}
            </div>
          </div>
          <div className="form_middle">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type={!cPass ? "password" : "text"}
              name="cpassword"
              id="cpassword"
              onChange={setVal}
              value={inputVal.cpassword}
              required
              placeholder="Confirm your password"
            />
            <div className="showpass" onClick={() => setCPass(!cPass)}>
              {!cPass ? "Show" : "Hide"}
            </div>
          </div>
          <button className="btn" onClick={userData}>
            SignUp
          </button>
          <p>
            Do you have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
