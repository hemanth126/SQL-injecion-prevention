import React ,{useState}from "react";
import './navbar.css';
import { NavLink } from "react-router-dom";


const Navbar = () =>{
  //  const location = useLocation();

//   // Check if the current location is the login page
//   const isLoginPage = location.pathname === "/login";

//   // Add a class based on whether it's the login page or not
//   const navbarClass = isLoginPage ? "navbar active" : "navbar";

    const [menuOpen,setMenuOpen]=useState(false);
    return(
        <nav>
            <NavLink to ='/' className="title">website</NavLink>
             <div className="menu" onClick={() => {
                setMenuOpen(!menuOpen);
               }  }>
                <span>   </span>
                <span>   </span>
                <span>   </span>
            </div>
            <ul className={menuOpen ? "open":"" }>
                <li><NavLink to="/Login_form">Login</NavLink></li>
                {
            // <li><NavLink to="/homepage"></NavLink></li>
        }

                <li><NavLink to="/register"></NavLink></li>
            </ul>
        </nav>
    );
}
export default Navbar;