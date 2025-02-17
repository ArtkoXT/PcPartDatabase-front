import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../AxiosConfig';
import "./styles/RegisterPage.css"

export default function Login() {

    const [userData, setUserData] = useState({
            email: "",
            password: ""
        });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
         const response = await axios.post('/auth/login', data);
         console.log('Response received', response.data);
         localStorage.setItem("userInfo", JSON.stringify(response.data));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(userData);
            alert('Login successful!')
            navigate("/")
            window.location.reload();
        } catch (error) {
            console.error("Error when submiting credentials: ", error);
            setError("Invalid Email or Password. Please try again.")
        }
    };

    return (
        <div onSubmit={handleSubmit} className="form-container">
            <form className="form">
                <h1 style={{color: '#c4c4c4'}}>Login</h1>
                <h2 style={{color: '#c4c4c4'}}>Sign in to your account</h2>
                { error && <p style={{color: "red"}}>{error}</p>}
                <div>
                    <label 
                    style={{color: 'rgb(196, 196, 196)', 
                    fontWeight: 'bold'}}
                    >Email:</label>
                    <input className="form-item"
                    id="username"
                    placeholder="email@example.com"
                    type="text"
                    onChange={ (e) => setUserData({...userData, email: e.target.value})}
                    required>
                    </input>
                </div>
                <div>
                <label 
                    style={{color: 'rgb(196, 196, 196)', 
                    fontWeight: 'bold'}}
                    >Password:</label>
                <input className="form-item"
                id="password"
                type="password"
                placeholder="********"
                onChange={ (e) => setUserData({...userData, password: e.target.value})}
                required
                ></input>
                </div>
                <button type="submit" className="submit-button">
                    Login
                </button>
            </form>
        </div>
    )
}