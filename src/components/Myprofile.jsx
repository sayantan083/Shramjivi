import React,{useState,useEffect} from 'react';
import { Fragment } from 'react';
import classes from './Myprofile.module.css'
import { Button } from 'react-bootstrap';
// import { Redirect } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import firebase from "../firebase";

function Ecard(props) {
  const [jobs,setJobs] = useState([]);
  const [user, setUser]  =useState({});
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      firebase
      .database()
      .ref("/userdetail/"+foundUser.phone)
      .once("value")
      .then((data)=>{
        console.log(data.val());
        setUser(data.val());
      })
      .catch((err)=>{
        console.log(err)
      })
      let jobsdemo = [];
    firebase.database().ref('jobs').once("value").then(function(snapshot){
     snapshot.forEach((data)=>{
          const jobObj = data.val();
          if(jobObj.phone===foundUser.phone)
            jobsdemo.push(jobObj);
        })
    }).then(()=>{console.log(jobsdemo);setJobs(jobsdemo)});
    }
    
    
    
},[]);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
  }
  function showPosition(position) {
    console.log(position);
    alert(position.coords.latitude + " " + position.coords.longitude);
  }
  

    return (
    <Fragment>

      <div className={classes.card}>
        <div className={classes.content}>
        <img src="https://img.icons8.com/plasticine/100/000000/user-male-circle.png"/>

          <h3>{user.fullname?user.fullname.toUpperCase():""}</h3>
          <h5>{user.phone} </h5>
          
          <h5> {user.address?user.address.toUpperCase():""} </h5>
          <div className={classes.profilebutton}>

          <Link to="/postjob"><Button variant="info" >Add New jobs</Button></Link>
          <Link to="/allpost"><Button variant="info" >All posted jobs</Button></Link>
          </div>
          
          
          <br/>
          <h4>My posts </h4>
          <br/>
          <hr></hr>
          <div className={classes.alljob}>
            {
              jobs.map((job) => {
                return <div>
                  <h6>Job title : {job.title}</h6>
                  <h6>DESCRIPTION : {job.description}</h6>
                  <hr></hr>
                </div>;
              })
            }
          </div>
        </div>
      </div>


    </Fragment>
  );
}

export default Ecard;


