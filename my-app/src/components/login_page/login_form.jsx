import React, { useState } from "react";
import './login_form.css';
import '../userinfo/userinfo'
import Navbar from '../navbar/navbar';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
//import ResetP from "../resetP/resetp";
import { NavLink, useNavigate } from "react-router-dom";

const Login_from = () => {
    const [input, setInput] = useState({
        userid: "",
        password: ""
    });

    const [error, setError] = useState(""); 
    // const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!validateUsername(input.userid)) {
                setError("Invalid userid format");
                return;
            }
            if (!validatePassword(input.password)) {
                setError("Invalid password format");
                return;
            }
            const response = await axios.post("http://localhost:8800/Backend/auth/checkAdminLogin", input);
            if (response.status === 200) {
           //setIsLoggedIn(true);
                navigate("/homepage");

            }
            if(response.status === 201)
            {
                navigate("/userinfo")
            }
        } catch (err) {
            setError("Invalid userid or password"); 
        }
    };

  
    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const validateUsername = (userid) => {
        const regex = /^[a-zA-Z0-9_@]+$/; 
        return regex.test(userid);
    };

   
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
        return regex.test(password);
    };

    return (
        <div>
            <div>< Navbar className="nav"/></div>
        <div className="wrapper">
             
            <form>
                <h1>LOGIN</h1>
                <div className="Input-box">
                    <input type='text' name="userid" onChange={handleChange} placeholder="Userid" required />
                    <FaUser className="icon" />
                </div>
                <div className="Input-box">
                    <input type='Password' name="password" onChange={handleChange} placeholder="Password" required />
                    <RiLockPasswordFill className="icon" />
                </div>
                <div className="check">
                   
                    <NavLink to="/resetp" className="nav">Forgot password</NavLink>
                </div>
                <button onClick={handleClick} type="submit">Login</button>
                {error && <div className="error">{error}</div>} {/* Display error message */}
                <div className="register-link">
                    <p>Don't have an account?</p><NavLink to="/register" className="nav">Register</NavLink>
                </div>
                {//isLoggedIn && <button onClick={handleLogout}>Logout</button>} 
                }
            </form>
        </div>
        </div>
    );
};

export default Login_from;

















// import React, { useState } from "react";
// import './login_form.css';
// import '../userinfo/userinfo'
// import Navbar from '../navbar/navbar';
// import { FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import axios from "axios";
// //import ResetP from "../resetP/resetp";
// import { NavLink, useNavigate } from "react-router-dom";

// const Login_from = () => {
//     const [input, setInput] = useState({
//         userid: "",
//         password: ""
//     });

//     const [error, setError] = useState(""); 
//     // const [isLoggedIn, setIsLoggedIn] = useState(false); 
//     const navigate = useNavigate();

//     const handleClick = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8800/Backend/auth/login", input);
//             if (response.status === 200) {
//            //setIsLoggedIn(true);
//                 navigate("/homepage");

//             }
//             if(response.status === 201)
//             {
//                 navigate("/userinfo")
//             }
//         } catch (err) {
//             setError("Invalid username or password"); // Set error message
//         }
//     };

  
//     const handleChange = (e) => {
//         setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     return (
//         <div>
//             <div>< Navbar className="nav"/></div>
//         <div className="wrapper">
             
//             <form>
//                 <h1>LOGIN</h1>
//                 <div className="Input-box">
//                     <input type='text' name="userid" onChange={handleChange} placeholder="Userid" required />
//                     <FaUser className="icon" />
//                 </div>
//                 <div className="Input-box">
//                     <input type='Password' name="password" onChange={handleChange} placeholder="Password" required />
//                     <RiLockPasswordFill className="icon" />
//                 </div>
//                 <div className="check">
                   
//                     <NavLink to="/resetp" className="nav">Forgot password</NavLink>
//                 </div>
//                 <button onClick={handleClick} type="submit">Login</button>
//                 {error && <div className="error">{error}</div>} {/* Display error message */}
//                 <div className="register-link">
//                     <p>Don't have an account?</p><NavLink to="/register" className="nav">Register</NavLink>
//                 </div>
//                 {//isLoggedIn && <button onClick={handleLogout}>Logout</button>} {/* Render logout button if user is logged in */
//                 }
//             </form>
//         </div>
//         </div>
//     );
// };

// export default Login_from;
