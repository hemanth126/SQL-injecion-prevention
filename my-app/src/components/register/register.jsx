import React, { useState } from "react";
import './register.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdMapsHomeWork } from "react-icons/md";


const Register = () => {
    const [input, setInput] = useState({
        userid: "",
        password: "",
        email: "",
        usernamefull: "",
        userdob:"",
        useredu: "", 
        useradd: "" 
    });

    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Validation checks for username and password
            // ...

            const response = await axios.post("http://localhost:8800/Backend/auth/register", input);
            if (response.status === 200) {
                navigate("/Login_form");
            }
        } catch (err) {
            setError("Registration failed");
        }
    };

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="wrapper">
            <form>
                <h1>REGISTER</h1>
                <div className="Input-box">
                    <input type='text' name="userid" onChange={handleChange} placeholder="userid" required />
                    <FaUser className="icon" />
                </div>

                <div className="Input-box">
                    <input type='text' name="usernamefull" onChange={handleChange} placeholder="username" required />
                    <FaUser className="icon" />
                </div>
                <div className="Input-box">
                    <input type='Password' name="password" onChange={handleChange} placeholder="password" required />
                    <RiLockPasswordFill className="icon" />
                </div>
                <div className="Input-box">
                    <input type='email' name="email" onChange={handleChange} placeholder="email" required />
                    <HiOutlineMail className="icon" />
                </div>
                <div className="Input-box">
                    <input type='date' name="userdob" onChange={handleChange} placeholder="dob" required />
                    <LiaBirthdayCakeSolid  className="icon"/>
                </div>

                <div className="Input-box">
                    <input type='text' name="useredu" onChange={handleChange} placeholder="education" required />
                    <MdOutlineCastForEducation className="icon" />

                </div>
                <div className="Input-box">
                    <input type='text' name="useradd" onChange={handleChange} placeholder="address" required />
                    <MdMapsHomeWork className="icon"/>
                </div>
                <button onClick={handleClick} type="submit">Register</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default Register;
