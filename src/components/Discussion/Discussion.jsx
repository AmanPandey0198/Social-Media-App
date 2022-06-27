import React, { useState, useRef, useEffect } from 'react'
import './Discussion.css'
import logo from './emptyprofilepic.png'
import Singlediscussion from '../single_discussion/single_discussion'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';

export default function Discussion(props) {
  var [discuss, setDiscuss] = useState([]);
  var [data, setData] = useState([]);
  var discussref = useRef();
  var { id } = useParams();
  var [img, setImg] = useState([]);
  useEffect(() => {
    sendReq();
    // document.getElementById("post_button").value = "";
  }, [])
  var sendReq = async () => {

    await axios.get(`https://social-coderr.herokuapp.com/data/getOne/${id}`).then((res) => {
      // console.log(res.data);
      //  f = true;
      setData(res.data);
      axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${res.data.id}`).then((res) => {
        setImg(res.data);
        //  console.log(5);
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    })
    axios.get(`https://social-coderr.herokuapp.com/data/getdiscussdetails/${id}`).then((res) => {
      //  res.data.reverse();
      setDiscuss(res.data)
    }, (err) => {
      console.log(err);
    }
    )

  }
  var discuss_details = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var new_date = `${day}-${month}-${year}`;
    discussref.current.value === "" ? alert("empty discussion") : discuss_details2(new_date);
    //  sendReq();
  }
  async function discuss_details2(new_date) {
    await axios.post("https://social-coderr.herokuapp.com/data/discuss_details", {
      discuss: discussref.current.value,
      date: new_date,
      name: props.login.name,
      post_id: id,
      userId: props.login._id,
    }).then((res) => {
      // console.log([res.data]);

    }, (err) => {
      console.log(err);
    }
    )

    sendReq();
    document.getElementById("text1").value = "";
    // window.location.reload();
  }
  function handleDelete(id) {
    //  console.log(id);
    axios.delete(`https://social-coderr.herokuapp.com/data/discuss_delete/${id}`).then((res) => {
      console.log(res)
      //  window.location.reload();
      sendReq();
    }, (err) => {
      console.log(err)
    })

  }
  return (
    <div className="discussion1">
      <Link to="/"> <button className="disbutton">BACK</button></Link>
      <div className="discussion2">
        <div className="discussion-flex">
          <div className='discussion-flex-left'>

            {/* {img !== "" && img !== undefined ? <img src={`//social-coderr.herokuapp.com/${img.profile.filename}`} alt="" /> : <img src={logo} alt="" />} */}
            <img src={logo} alt="" className='image1' />
            <p className='discuss_name'>{data.name}</p>
          </div>
          <div className='discussion-flex-right'>
            <p className='dispost'>{data.post}</p>
            <p className='discuss_date'>{data.date}</p>
          </div>
        </div>
        {/* {console.log(props.login._id)} */}
        <div className='discussionTop'>
          {props.image !== null && props.image !== undefined ? <img src={`//social-coderr.herokuapp.com/${props.image.profile.filename}`} alt='' className="image2" /> : <img src={logo} alt='' className="image2" />}
          <div>
            <textarea placeholder="What's on your mind!" ref={discussref} id='text1' /><br />
            <button className="post_button" onClick={discuss_details} >Comment</button>
          </div>
        </div>
      </div>
      {

        discuss.map((i, c) => {
          return (
            < Singlediscussion key={c} discuss={i.discuss} date={i.date} login={props.login} id={i._id} delete={handleDelete} discuss_name={i.name} userId={i.userId} />
          )
        })
      }

    </div>
  )
}
