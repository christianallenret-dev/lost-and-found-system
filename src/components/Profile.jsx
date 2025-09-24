import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

function Profile({ handleLogout }) {
  const location = useLocation();
  const { user } = location.state || {}; // safely access user

  if (!user) {
    return <p>No user details available. Please try again later.</p>;
  }

  const { first_name, last_name, email, gender, phone_number } = user;

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <div className="container mt-5">
        <h1>Profile Information</h1>
        <div className="card p-4">
          <h3>{first_name} {last_name}</h3>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone_number}</p>
          <p><strong>Gender:</strong> {gender}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
