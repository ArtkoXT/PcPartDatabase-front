import "./styles/RegisterPage.css"

export default function Login() {

    const handleSubmit = (data) => {
        
    }

    return (
        <div onSubmit={handleSubmit} className="form-container">
            <form className="form">
                <h1 style={{color: 'rgb(196, 196, 196)'}}>Login</h1>
                <h2 style={{color: 'rgb(196, 196, 196)'}}>Sign in to your account</h2>
                <div>
                    <label 
                    style={{color: 'rgb(196, 196, 196)', 
                    fontWeight: 'bold'}}
                    >Email:</label>
                    <input className="form-item"
                    id="username"
                    placeholder="email@example.com"
                    type="text"
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