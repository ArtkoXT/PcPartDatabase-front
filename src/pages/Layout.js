import { Outlet, Link } from "react-router-dom";
import './Layout.css'

const Layout = () => {

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/cpus/all", label: "CPUs" },
        { to: "/graphic cards/all", label: "Graphic Cards" },
        { to: "/motherboards/all", label: "Motherboards" },
        { to: "/memory/all", label: "Memory" },
        { to: "/forum", label: "Forum" },
    ];

    return (
        <div >
            <nav className="nav-bar">
                <span className="title-bar">
                    <Link to="/" className="title">PcPartDatabase</Link>
                    <Link to="/login" className="login-singup-buttons">Login</Link>
                    <Link to="/register" className="login-singup-buttons">Sign up</Link>
                </span>
                <div className="navbar-buttons">
                    <ul className="bar-list">
                        {navLinks.map( ({to, label})  => (
                            <li key={to}>
                                <Link to={to} className="nav-button">
                                    {label}
                                </Link>
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