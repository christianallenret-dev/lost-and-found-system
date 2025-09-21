import HomePage from "./HomePage"
import './Login.css'
import logo from '../img/lost-and-found.png'
import bg from '../img/lostnfound-bg.jpg'
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission to authenticate user
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const payload = {username: username.trim(), password: password.trim()};
            console.log('Sending:', payload);

            // Send POST request to backend login endpoint
            const response = await axios.post('http://localhost:8081/users', payload);
            console.log('Response', response.data);

            // Check if login was successful
            if (response.data.message === 'Login Successfully') {
                localStorage.setItem('id', response.data.id); // Store user ID in localStorage
                navigate('/home'); // Redirect to Home Page
            } else {
                setError('Login Failed: No Record');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.response?.data?.message || 'Error connecting to server');
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    // Toggle password visibility between text and password input types
    const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    return <>
    <div className="row">
        <nav className="navbar bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{fontSize: '2.5em'}}>
                <img src={logo} alt="Logo" width="64" height="64" className="d-inline-block align-text-top"/>
                Bootstrap
                </a>
            </div>
        </nav>
    </div>

    <div className="container">
        <div className="row justify-content-end align-items-center">
            <div className="col-8">
                <img src={bg} width="700" height="750"/>
            </div>
            <div className="col">
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                        <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputUsername" onChange={e => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <input type={showPassword ? 'text' : 'password'} class="form-control" id="inputPassword3" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-10 offset-sm-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck1" checked={showPassword} onChange={toggleShowPassword}/>
                            <label class="form-check-label" for="gridCheck1" htmlFor="showPassword">
                            Show Password
                            </label>
                        </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
    </div>

    <div className="row align-items-end">
        <nav class="navbar bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" style={{fontSize: '2.5em'}}>
                <img src={logo} alt="Logo" width="72" height="72" class="d-inline-block align-text-top"/>
                </a>
            </div>
        </nav>
    </div>
    </>
}

export default Login