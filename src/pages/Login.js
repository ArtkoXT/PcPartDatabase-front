import "./styles/RegisterPage.css"

export default function Login() {

    return (
        <div className="form-container">
            <form className="form">
                <h1 style={{color: 'rgb(196, 196, 196)'}}>Login</h1>
                <h2 style={{color: 'rgb(196, 196, 196)'}}>Sign in to your account</h2>
                <div>
                    <label 
                    style={{color: 'rgb(196, 196, 196)', 
                    fontWeight: 'bold'}}
                    >Username:</label>
                    <input className="form-item"
                    id="username"
                    placeholder="Your username"
                    type="text"
                    required>
                    </input>
                </div>
                <div>
                <label 
                    style={{color: 'rgb(196, 196, 196)', 
                    fontWeight: 'bold'}}
                    >Password</label>
                <input className="form-item"
                id="password"
                type="password"
                placeholder="Your password"
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