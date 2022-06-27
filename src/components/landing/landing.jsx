import React from 'react'
import "./landing.css"
import { Link } from "react-router-dom"
function Landing() {
    return (
        <div>
            <div className="main">
                <div className="main2">
                    <h4>Social Coder</h4>
                    <h6>A fun place for developers and freinds to share ideas on technology.Plenty of cool discussions!</h6>
                    <div>
                        <button className="button-1"><Link to="/Register">Register</Link></button>
                        <button className="button-2"><Link to="/Login">Login</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;