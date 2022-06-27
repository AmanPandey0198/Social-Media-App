import React, { useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Login(props) {
    var emailref = useRef();
    var passref = useRef();
    var login = () => {
        if (emailref.current.value !== '' && passref.current.value !== '' && emailref.current.value.length >= 5 && passref.current.value.length >= 5) {
            axios.post("https://social-coderr.herokuapp.com/data/login", {
                email: emailref.current.value,
                pass: passref.current.value
            }).then((res) => {
                console.log(res.data);
                if (Object.keys(res.data).length === 0) {
                    // props.login_details(false);
                    alert("Incorrect details")
                }

                else
                    props.login_details(res.data);
            }, (err) => {
                console.log(err);
            })

            // console.log(emailref.current.value,passref.current.value);

        }
        else {
            alert("Plese provide valid input");
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <h6>Login to this awesome application!</h6>
            <input placeholder="Email" ref={emailref} type='email' /><br />
            <input placeholder="Password" ref={passref} type='passsword' /><br />
            <button onClick={() => { login() }}><Link to="/">Login</Link></button><br />
            <span style={{ color: "grey" }}>Don't hava an account?</span><Link to="/Register"><span style={{ color: "white" }}>Register</span></Link>
        </div>
    )
}

export default Login;