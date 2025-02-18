import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './styles/NavBar.css'
import { useState } from "react";
import AuthService from "../AuthService";
import axios from '../AxiosConfig';

const Layout = () => {

    const user = AuthService.getCurrentUser();

    const handleLogout = async () => {
        await axios.post("/auth/signout", {}, { withCredentials: true });
        AuthService.logout();
    };


    const navLinks = [
        { to: "/", label: "Home", icon: {} },
        { to: "/components/cpus", label: "CPUs", icon: faMicrochip },
        { to: "/components/graphic_cards", label: "Graphic Cards", icon: {} },
        { to: "/components/motherboards", label: "Motherboards", icon: {} },
        { to: "/components/memory", label: "Memory", icon: {} },
        { to: "/forum", label: "Forum", icon: {} },
    ];

    return (
        <div >
            <nav className="nav-bar">
                <span className="title-bar">
                    
                    <Link to="/" className="title"><FontAwesomeIcon icon={faDatabase} /> PcPartDatabase</Link>
                    {user ?
                      <div className="auth-btn-group">
                        <button
                            onClick={handleLogout}
                            className="login-singup-buttons">
                                <FontAwesomeIcon 
                                icon={faArrowRightFromBracket} 
                                style={{color: '#c4c4c4'}} /> Logout
                        </button>
                        <Link
                            to="/profile"
                            className="login-singup-buttons">
                                <FontAwesomeIcon 
                                icon={faUser} 
                                style={{color: '#c4c4c4'}} /> Profile
                        </Link>
                      </div>
                    :
                    <div className="auth-btn-group">
                        <Link 
                            to="/login" 
                            className="login-singup-buttons"> 
                            <FontAwesomeIcon 
                                icon={faRightToBracket} 
                                style={{color: '#c4c4c4'}} /> Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="login-singup-buttons">
                                <FontAwesomeIcon 
                                    icon={faUserPlus} 
                                    style={{color: '#c4c4c4'}} /
                                    > Sign up
                        </Link>
                    </div> 
                    }   
                </span>
                <div className="navbar-buttons">
                    <ul className="bar-list">
                        {navLinks.map( ({to, label, icon})  => (
                            <li key={to}>
                                <div>
                                <Link to={to} className="nav-button">
                                    {label}
                                </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout;