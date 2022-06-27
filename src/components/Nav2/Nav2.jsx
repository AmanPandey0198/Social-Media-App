import React from 'react'
import { Link } from 'react-router-dom'
import './Nav2.css'
export default function Nav2(props) {
    return (
        <div >
            <nav className="nav2">
                <div>
                    <h3><Link to="/">Social-Coder</Link></h3>
                </div>

                <div>
                    <button onClick={() => { props.logout() }}><Link to="/"> Logout</Link></button>
                </div>
            </nav>
        </div>
    )
}
