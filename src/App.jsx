import HomePage from "./components/HomePage"
import Login from "./components/Login"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'; 
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Lost from "./components/Lost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to home if user is logged in */}
        <Route path="/" element={<Navigate to={localStorage.getItem('id') ? "/home" : "/login"} />}/>

        {/* Login route */}
        <Route 
        path="/login" 
        element={
        <Login/>
        }/>

        {/* Home route wrapped in PrivateRoute to ensure only authenticated users can access it */}
        <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        } />

        <Route
        path="/lost"
        element={
          <PrivateRoute>
            <Lost/>
          </PrivateRoute>
        }/>
        
      </Routes>
    </Router>
  );
}

export default App
