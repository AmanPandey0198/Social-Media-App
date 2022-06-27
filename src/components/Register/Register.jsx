import React, { useRef, useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
    var nameref = useRef();
    var emailref = useRef();
    var passref = useRef();
    var [image, setImage] = useState();
    // var [profile, setProfile] = useState();
    var Register_details = () => {

        if (emailref.current.value !== '' && passref.current.value !== '' && emailref.current.value.length >= 5 && passref.current.value.length >= 5 && nameref.current.value !== "") {
            axios.post("https://social-coderr.herokuapp.com/data/postdata", {
                name: nameref.current.value,
                email: emailref.current.value,
                pass: passref.current.value,
            }).then((res) => {
                //  console.log(res.data.insertedId);
                var data = new FormData();
                data.append("Image", res.data.insertedId);
                data.append("Image", image[0]);
                if (data != null) {
                    axios.post('https://social-coderr.herokuapp.com/data/upload', data).then((res) => {

                        console.log(res.data);
                        // setProfile(res.data);
                    }, (err) => {

                        console.log(err);
                    })

                }
                alert("You have successully registered");
            }, (err) => {
                console.log(err);
            })
        }
        else {
            alert("Please provide correct details");
        }
    }


    return (
        <div className='Register'>
            <h1>Register</h1>
            <h6>Join me and my freinds on this great application</h6>
            <input placeholder="Name" ref={nameref} /><br />
            <input placeholder="Email" ref={emailref} /><br />
            <input placeholder="Password" ref={passref} type={'password'} /><br />
            <span>Select a profile pic</span>
            <input type="file" accept="image/*" onChange={(event) => {
                //    console.log(event.target.files);
                setImage(event.target.files);
            }} style={{ color: "white", }} />
            {/* {profile != null ?
                <img src={`//localhost:5000/${profile.filename}`} id='register_img' alt='' /> : ""} */}
            {/* <button onClick={imageUpload}>Upload</button ><br /> */}



            <button onClick={Register_details}><Link to="/">Sign up</Link></button> <br />
            <span style={{ color: "grey" }}>Already hava an account?</span><Link to="/login"><span style={{ color: "white" }}>Login</span></Link>
        </div>
    )
}
export default Register;