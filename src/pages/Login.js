import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";

const Login = () => {
    
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        if(event.target.name == 'email'){
            setEmail(event.target.value)
        } else if (event.target.name == 'password') {
            setPassword(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await signin(email, password);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h1>
                    Login to
                    <Link to="/">
                        Chatty
                    </Link>
                </h1>
                <p>
                    Fill in the form below to login to your account.
                </p>
                <div>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        type="password"
                    />
                </div>
                <div>
                    {error ? (
                        <p>{error}</p>
                    ) : null}
                    <button type="submit">Login</button>
                </div>
                <hr />
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;