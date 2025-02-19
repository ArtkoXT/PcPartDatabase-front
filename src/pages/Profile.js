import { useEffect, useState } from "react";
import AuthService from "../AuthService";
import "./styles/Profile.css"
import { useNavigate } from "react-router-dom";


export default function Profile() {

    const navigate = useNavigate();

    const user = AuthService.getCurrentUser();

    const [ userData, setUserData] = useState({});

    useEffect( () => {
        if( user ) {
        setUserData(user)
        console.log(userData)
        } else {
            navigate("/unauthorized")
        }

    }, [])

    const roleMapping = {
        ROLE_USER: "User",
        ROLE_MODERATOR: "Moderator",
        ROLE_ADMIN: "Admin",
    }

    return (

        <div className="page-container">
            {user &&(
            <form className="profile-container">
                <h1 style={{color: '#c4c4c4'}}>Your Profile</h1>
                <div className="profile-items">
                    <div className="text-container">
                        <div>Username</div>
                        <div className="input-field-container">
                            <input 
                                className="profile-input-field"
                                id="username"
                                type="text"
                                disabled
                                value={user.username}
                                />
                        </div>
                    </div>
                    <div className="text-container">
                        <div>Email</div>
                        <input 
                            className="profile-input-field"
                            id="email"
                            type="text"
                            disabled
                            value={user.email}
                            />
                    </div>
                    <div className="text-container">
                        <span>Your roles: </span> <span style={{fontWeight:'initial'}}>{user.roles.map( (role) => (roleMapping[role]))}</span>
                    </div>
                </div>
            </form>
            )}
        </div>
    
    )
}