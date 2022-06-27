import React, { useState, useEffect } from 'react'
import './singlepost.css'
import logo from './emptyprofilepic.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import { Oval } from 'react-loader-spinner'

export default function Singlepost(props) {

    const [data, setData] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [image, setImage] = useState();
    const [isliked, setIsLiked] = useState(false);
    const [isdisliked, setIsdisliked] = useState(false);
    //const [flag, setFlag] = useState(true);

    useEffect(() => {
        sendReq();
    }, [])
    // componentDidMount(() => { sendReq() });
    function sendReq() {
        axios.get(`https://social-coderr.herokuapp.com/data/getOne/${props.id}`).then((res) => {
            //  console.log(res.data);
            setData(res.data);
            setLike(false);
            setDislike(false);
        }, (err) => {
            console.log(err);
        })
        axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${props.userid}`).then((res) => {
            setImage(res.data);
            // console.log(res.data);
        }, (err) => {
            console.log(err);
        })
    }
    // setTimeout(1000, useEffect());
    async function handlelike() {
        if (!like && !isliked) {
            var setlike = data.like;
            setlike++;
            await axios.put(`https://social-coderr.herokuapp.com/data/updatelike/${props.id}`, {}, {
                params: {
                    like: setlike
                }
            }).then((res) => {
                // console.log(res);
                setLike(true);
                setIsLiked(true);
                setIsdisliked(true);
                //   localStorage.setItem("like", true);
            }, (err) => {
                console.log(err);
            })
            sendReq();
        }
    }

    async function handledislike() {
        if (!dislike && !isdisliked) {
            var setdislike = data.dislike;
            setdislike++;
            await axios.put(`https://social-coderr.herokuapp.com/data/updatedislike/${props.id}`, {}, {
                params: {
                    dislike: setdislike,
                }
            }).then((res) => {
                // console.log(res);
                setDislike(true);
                setIsLiked(true);
                setIsdisliked(true);
                // localStorage.setItem("dislike", true);
            }, (err) => {
                console.log(err);
            })
            sendReq();
            //  console.log(image)
        }
    }
    return (
        <div className="singlepost">
            <div className="singlepostLeft">
                {/* {image != "" ? <img src={`//social-coderr.herokuapp.com/${image.profile.filename}`} alt='' /> : <img src={logo} alt='' />} */}
                {image !== "" && image !== undefined ? <img src={`//social-coderr.herokuapp.com/${image.profile.filename}`} alt="" /> : <img src={logo} alt="" />}
                <p>{props.name}</p>
            </div>
            <div className='singlepost2'>
                {/* {setFlag(false)} */}
                <div className='singlepost3'>{props.post}</div>
                <h6>{props.date}</h6>
                <div className='singlepostButtons'>
                    <div className='likedislike'>
                        {like === false ?

                            <button className="button0" onClick={handlelike}>

                                <span>{data.like}</span>
                                <span>< ThumbUpAltIcon style={{ color: "white" }} /></span>

                            </button> : <Oval height={30} color='blue' />}
                        {dislike === false ?
                            <button className="button2" onClick={handledislike}>
                                <span>{data.dislike}</span>
                                <span>< ThumbDownAltIcon style={{ color: "white" }} /></span>
                            </button> : <Oval height={30} color='blue' />}
                    </div>
                    <button className="button3"> <Link to={`/Discussion/${props.id}`}>Discussion</Link></button>
                    {/* {console.log(props.login.name, props.name)} */}
                    {props.login.name === props.name ? <button className="button2" onClick={() => { props.deletepost(props.id) }}>Delete</button> : ""}

                </div>
            </div>
        </div>
    )
}
