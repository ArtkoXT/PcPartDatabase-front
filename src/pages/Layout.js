import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import './Layout.css'

const Layout = () => {

    const loggedIn = false;

    const navLinks = [
        { to: "/", label: "Home", icon: {} },
        { to: "/cpus/all", label: "CPUs", icon: faMicrochip },
        { to: "/graphic cards/all", label: "Graphic Cards", icon: {} },
        { to: "/motherboards/all", label: "Motherboards", icon: {} },
        { to: "/memory/all", label: "Memory", icon: {} },
        { to: "/forum", label: "Forum", icon: {} },
    ];

    return (
        <div >
            <nav className="nav-bar">
                <span className="title-bar">
                    
                    <Link to="/" className="title"><FontAwesomeIcon icon={faDatabase} /> PcPartDatabase</Link>
                    {loggedIn ?
                      null
                    :
                    <>
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
                    </> 
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

export default Layout