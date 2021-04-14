import React from 'react';
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar container">
            <div className="logo"></div>
            <ul>
                <li className="selected">
                    HOME
                </li>
                <li>
                    ABOUT 
                </li>
            </ul>

            <button className="btn btn-primary text-secondary">Contacts</button>
        </nav>
    )
}

export default Navbar;