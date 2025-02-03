import { useState } from "react";
import axios from '../AxiosConfig';
import "./styles/RegisterPage.css"
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [isFailed, setIsFailed] = useState(false);

    const onSubmit = async (data) => {
            const response = await axios.post('/users/add', data);
            console.log('User created successfully', response.data);

    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(userData);
            alert('User created successfully!')
            navigate("/login")
        } catch (error) {
            setIsFailed(true)
            console.error("Error when submiting form: ", error);
        }
    };

    return (
        <div className="form-container">
            
            <form onSubmit={handleSubmit} className="form">
                <h1 style={{color: '#c4c4c4'}}>Sign up</h1>
                <h2 style={{color: '#c4c4c4'}}>Create an account</h2>
                <div>
                    <label 
                    style={{color: '#c4c4c4', 
                    fontWeight: 'bold'}}
                    >Username:</label>
                    <input className="form-item"
                    id="username"
                    placeholder="Your username"
                    type="text"
                    onChange={ (e) => setUserData({...userData, username: e.target.value})}
                    required>
                    </input>
                </div>
                <div>
                <label 
                    style={{color: '#c4c4c4', 
                    fontWeight: 'bold'}}
                    >Email:</label>
                <input className="form-item"
                id="email"
                placeholder="email@example.com"
                type="text"
                onChange={ (e) => setUserData({...userData, email: e.target.value})}
                required
                ></input>
                </div>
                <div>
                    <label 
                        style={{color: '#c4c4c4', 
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
                <div>
                    <label 
                        style={{color: '#c4c4c4', 
                        fontWeight: 'bold'}}
                        >Repeat password:</label>
                    <input className="form-item"
                    id="repeat-password"
                    type="password"
                    placeholder="********"
                    required
                    ></input>
                </div>
                <p style={isFailed ? {display: 'block', color: 'red'} 
                    : {display: 'none'}
                }>Error: User with that email already exists!</p>
                <button type="submit" className="submit-button">
                    Sign up
                </button>
            </form>
        </div>
    )
}