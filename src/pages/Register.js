import "./styles/RegisterPage.css"

export default function Register() {

    return (
        <div className="form-container">
            
            <form className="form">
                <h1 style={{color: 'rgb(196, 196, 196)'}}>Sign up</h1>
                <h2 style={{color: 'rgb(196, 196, 196)'}}>Create an account</h2>
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
                    >Email:</label>
                <input className="form-item"
                id="email"
                placeholder="email@mail.com"
                type="text"
                required
                ></input>
                </div>
                <div>
                    <label 
                        style={{color: 'rgb(196, 196, 196)', 
                        fontWeight: 'bold'}}
                        >Password</label>
                    <input className="form-item"
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    ></input>
                </div>
                <div>
                    <label 
                        style={{color: 'rgb(196, 196, 196)', 
                        fontWeight: 'bold'}}
                        >Repeat password</label>
                    <input className="form-item"
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    ></input>
                </div>
                <button type="submit" className="submit-button">
                    Sign up
                </button>
            </form>
        </div>
    )
}