import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
export default function Nav() {
    return (
        <div>
            <nav className='nav1'>
                <div className='navlogo'>
                    <h3><Link to="/" style={{ color: "rgb(216, 211, 211)" }}>Social Coder</Link></h3>
                </div>
                <div className="nav-links">
                    <button className='Reg'><Link to="/Register" >Sign up</Link></button>
                    <button className='Log'><Link to="/Login" style={{ color: "white" }}> Login</Link></button>
                </div>
            </nav>
        </div>
    )
}
