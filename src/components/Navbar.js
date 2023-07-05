import React from 'react'
import { Link, useLocation} from "react-router-dom";

const Navbar = () => {

    let location = useLocation();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CloudNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-grid gap-1 d-md-flex justify-content-md-end" role="search">
                        <Link className="btn btn-light me-md-1 btn-sm" to='/login' role='button'>Login</Link>
                        <Link className="btn btn-light btn-sm" to='/signup' role='button'>Sign Up</Link>
                    </form> : <button className="btn btn-light btn-sm" onClick={handleLogout}>Log Out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
