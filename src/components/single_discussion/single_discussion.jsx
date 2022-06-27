import React, { useState, useEffect } from 'react'
import './single_discussion.css'
import logo from './emptyprofilepic.png'
import axios from 'axios';
export default function Single_discussion(props) {
  const [img, setImg] = useState();

  useEffect(() => {
    axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${props.userId}`).then((res) => {
      setImg(res.data);
      //  console.log(5);
    }, (err) => {
      console.log(err);
    })
  }, [])
  return (
    <div>
      <div className="single_discussion">
        <div className='single_discussionLeft'>
          {/* {img != undefined ? <img src={`//localhost:5000/${img.profile.filename}`} alt='' className="image2" /> : <img src={logo} alt='' className="image2" />} */}
          {img !== "" && img !== undefined ? <img src={`//social-coderr.herokuapp.com/${img.profile.filename}`} alt="" /> : <img src={logo} alt="" />}
          {/* {console.log(props.id, props.login.id)} */}
          <p>{props.discuss_name}</p>
        </div>
        <div className='single_discussion2'>
          {console.log(props.userId)}
          <h6 className='singledis'>{props.discuss}</h6>
          <h6 className='singleDate'>{props.date}</h6>
          {props.login.name === props.discuss_name ?
            <button onClick={() => { props.delete(props.id) }}>Delete</button> : ""
          }
        </div>
      </div>
    </div>
  )
}
