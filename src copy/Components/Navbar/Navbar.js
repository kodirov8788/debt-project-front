import React from 'react';
import "./Navbar.css"

function Navbar() {
    return (
        <div className='Navbar'>
            <div className="logo">
                <h1>Qarz Daftari</h1>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <a href="home">Home</a>
                    </li>
                    <li>
                        <a href="home">Blog</a>
                    </li>
                    <li>
                        <a href="home">About</a>
                    </li>
                    <li>
                        <a href="home">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar