import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../img/lost-and-found.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function HomePage() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Define an async function to fetch user data from the backend
        const fetchUser = async () => {
            try {
                // Retrieve user ID from localStorage (set during login)
                const id = localStorage.getItem('id');
                if (!id) {
                    navigate('/');
                    return
                }
                // Make API call to fetch user data using the stored ID
                const response = await fetch(`http://localhost:8081/users/${id}`);
                if (!response.ok) throw new Error('Failed to fetch user');
                const data = await response.json();
                setUser(data);
            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/login');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user data available. Please log in.</p>;

    return <>
    <NavBar user={user} handleLogout={handleLogout}/>

    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
    </>
}

export default HomePage