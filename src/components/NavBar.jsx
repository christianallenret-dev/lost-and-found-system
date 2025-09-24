import logo from '../img/lost-and-found.png'
import { Link } from 'react-router-dom';

function NavBar({user, handleLogout}) {
    if (!user) {
        return <p>Loading...</p>; // Handle the case where user data isn't available yet
    }

    return <>
    <div className='row'>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img src={logo} alt="" width={42} height={42} style={{maxWidth: '100%'}}/>
                <p style={{fontSize: '2em'} }>Lost and Found</p>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link active" to="/lost" state={{user}}>Lost</Link>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" href="/report-lost">Report Lost</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" href="/found">Found</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" href="/report-found">Report Found</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.username}
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <Link className="dropdown-item" to="/profile" state={{user}}>
                            Profile
                            </Link></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#" onClick={handleLogout}>Log Out</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
    </>
}

export default NavBar