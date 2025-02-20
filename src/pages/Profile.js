import { useEffect, useState } from "react";
import AuthService from "../AuthService";
import "./styles/Profile.css"
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";


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

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete your account?")){
            if(window.confirm("Are you really sure? This action cannot be undone")) {
                try {
                    AuthService.logout();
                    await axios.delete(`/users/${id}`);
                } catch (error) {
                    console.log("Encountered an error when deleting account: ", error);
                    alert("Account deletion failed!");
                }
            }
        }
        
    }

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
                    <div>
                        <button className="save-button">Edit</button> <button className="save-button" onClick={ () => handleDelete(user.id)}>Delete Account</button>
                    </div>
                </div>
            </form>
            )}
        </div>
    
    )
}