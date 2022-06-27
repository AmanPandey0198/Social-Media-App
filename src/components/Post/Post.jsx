import React, { useState, useRef, useEffect } from 'react'
import './Post.css'
import logo from './emptyprofilepic.png'
import Singlepost from '../singlepost/singlepost'
import axios from 'axios';
import { Oval } from 'react-loader-spinner'

export default function Post(props) {

    var [data, setData] = useState([]);
    var postref = useRef();
    var [post, setPost] = useState(false);
    // var [img, setImage] = useState();
    // var [pro, setPro] = useState(false);
    useEffect(() => {
        sendReq()
    }, [])

    var sendReq = () => {
        axios.get('https://social-coderr.herokuapp.com/data/getpost').then((res) => {
            // console.log(res.data[0]._id);
            // res.data.sort(function (a, b) { return b.date - a.date });
            res.data.reverse();
            setData(res.data);
            setPost(false);
            // console.log(props.login._id, res.data.id);

        }, (err) => {
            console.log(err);
        })
        //   console.log(data.length);
        // axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${props.login._id}`).then((res) => {
        //     setImage(res.data);
        //     // console.log(img);
        //     // setPro(true);
        //     // if (res.data !== "")
        //     //   //  console.log(res.data, 6);

        // }, (err) => {
        //     console.log(err);
        // })
        // setTimeout(() => {
        //     console.log(img, 6)
        // }, 6000)
        // setTimeout(() => {
        //     console.log(img, 7)
        // }, 7000)
        // setTimeout(() => {
        //     console.log(img, 8)
        // }, 8000)
        // setTimeout(() => {
        //     console.log(img, 9)
        // }, 9000)
        // setTimeout(() => {
        //     console.log(img, 10)
        // }, 15000)
    }

    var Post_details = async () => {

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var new_date = `${day}/${month}/${year}`;
        if (postref.current.value !== "") {
            setPost(true);
            await axios.post("https://social-coderr.herokuapp.com/data/post_details", {
                post: postref.current.value,
                date: new_date,
                name: props.login.name,
                like: 0,
                dislike: 0,
                id: props.login._id,
            }).then((res) => {
                console.log(res.data);
            }, (err) => {
                console.log(err);
            }
            )
            // setInterval(() => { sendReq() }, 3000);
            sendReq();
            window.location.reload();
        }
        else {
            alert("empty post")
        }
        document.getElementById("text").value = "";
    }

    function handledelete(id) {
        axios.delete(`https://social-coderr.herokuapp.com/data/delete/${id}`).then((res) => {
            console.log(res)
            sendReq();
            window.location.reload();
        }, (err) => {
            console.log(err)
        })
        //  console.log(id);
    }

    return (
        <div className='postContainer'>
            <div className="post">
                <h1>Welcome to the thriving tech community!</h1>
                <h6>Discuss the latest on technology and trends. Be civil and supportive!</h6>
                <div className='textarea'>
                    {/* {console.log(props)} */}
                    {props.image !== "" && props.image !== undefined ? <img src={`//social-coderr.herokuapp.com/${props.image.profile.filename}`} alt="" /> : <img src={logo} alt="" />}
                    {/* {img !== "" && img !== undefined ? console.log(img, 1) : console.log(2)} */}
                    <textarea placeholder="What's on your mind!" ref={postref} id='text' /><br />
                </div>
                {post === false ?
                    <button className="post_button" onClick={Post_details}>Post</button> : <Oval height={30} />
                }
            </div>
            {
                data.map((i, c) => {
                    return (
                        < Singlepost key={c} post={i.post} date={i.date} deletepost={handledelete} id={i._id} name={i.name} login={props.login} userid={i.id} />
                    )
                })
            }

        </div>
    )
}
