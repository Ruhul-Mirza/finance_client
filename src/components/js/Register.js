import React, { useState } from "react";
import {Link} from "react-router-dom";

function Register() {
    const [showPass,setShowPass ] = useState(false)
    const [cPass,setCPass ] = useState(false)
    const [inputVal , setInputValue] = useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
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

    const userData = async (e)=>{
        e.preventDefault();
        const {fname,email,password,cpassword} = inputVal;
        if(fname===""){
            alert("please enter your fullname");
        }else if(email === ""){
            alert("pleaser enter your email");
        }else if(!email.includes("@")){
            alert("please enter a valid email")
        }else if(password === ""){
            alert("password field cannot be empty")
        }else if(password.length < 6){
            alert("password length is too small atleast 8 character required")
        }else if(cpassword===""){
            alert("please confirm your password")
        }else if(password !== cpassword){
            alert("password doesnot match")
        }else{
            const data = await fetch("/register",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:
                JSON.stringify({
                  fname,email,password,cpassword
                })
            })
            const res = await data.json()
            console.log(res)

            setInputValue({...inputVal,email:"",password:""})
            
        }
    }
  return (
    <>
      <div className="form_container">
        <form action="" method="">
          <h1>Welcome Back, Log in</h1>
          <p>Hi, we are glad you are back , please login </p>
          <label htmlFor="fname">Fullname</label>
          <input type="text" name="fname" required id="fname" onChange={setVal} value={inputVal.fname} placeholder="enter your firstname" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required id="email" onChange={setVal} value={inputVal.email} placeholder="enter your email" />
          <div className="form_middle">
            <label htmlFor="password">Password</label>

            <input
            type={!showPass ? "password" : "text"}
              name="password"
              id="password" onChange={setVal}
              placeholder="enter your password"
              required
              value={inputVal.password}
            />
            <div className="showpass" onClick={()=> setShowPass(!showPass)}>{!showPass ? "Show" : "Hide" }</div>
          </div>
          <div className="form_middle">
            <label htmlFor="cpassword">Confirm Password</label>

            <input
            type={!cPass ? "password" : "text"}
              name="cpassword"
              id="cpassword" onChange={setVal}
              value={inputVal.cpassword}
              required
              placeholder="confirm your password"
            />
            <div className="showpass" onClick={()=> setCPass(!cPass)}>{!cPass ? "Show" : "Hide" }</div>
          </div>
          <button className="btn" onClick={userData}>SignUp</button>
          <p>Do you have account <Link to="/">Login</Link></p>
        </form>
      </div>
    </>
  );
}

export default Register;
