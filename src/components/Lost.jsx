import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Lost({handleLogout}) {
    const location = useLocation();
    const { user } = location.state || {}; // safely access user

    return <>
    <NavBar user={user} handleLogout={handleLogout} />

    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    </>
}

export default Lost