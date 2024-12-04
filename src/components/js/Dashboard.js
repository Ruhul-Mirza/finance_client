import React, { useContext, useEffect ,useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/Context';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
        if (!token) {
          console.log("Token not found");
          return;
        }
      
        const res = await fetch("/validuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add the "Bearer " prefix
          },
        });
      
        const data = await res.json();
        console.log("API Response:", data);  // Check the response data
      
        if (data.status === 401 || !data) {
          console.log("User not valid");
        } else {
          console.log("User verified");
          setLoginData(data);
          history("/dash");  // Navigate to dashboard
        }
      };
      
      

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        // <>
        //     {
        //         data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        //             <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
        //             <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
        //         </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
        //             Loading... &nbsp;
        //             <CircularProgress />
        //         </Box>
        //     }

        // </>
        <>
        <div>{logindata && logindata.ValidUserOne.fname ? (
          logindata.ValidUserOne.fname
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
        <NavLink to="/expense"><button>Expenses</button></NavLink>
        </>
    )
}

export default Dashboard