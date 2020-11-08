import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../firebase';
import firebase from "firebase"
import classes from './login.module.css';
function Login(props) {

  const handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = document.getElementById("phone").value;
    firebase
      .auth()
      .signInWithPhoneNumber("+91" + number, recaptcha)
      .then(function (e) {
        var code = prompt('Enter the OTP', '');
        if (code === null) return;
        return e.confirm(code);
      })
      .then(function (result) {
        alert("Number verified successfully");


        
        return firebase
          .database()
          .ref("/userdetail/" + number)
          .once("value")


      }).then((data) => {
        console.log(data.val());
        if(data.val()==null){
          //put
           firebase.database().ref("/userdetail/" + number).update({phone:number}).then((res)=>{
            localStorage.setItem('user', JSON.stringify(number));
            props.setUser({phone:number});
          });
        }
        
        localStorage.setItem('user', JSON.stringify(number));
        props.setUser(data.val());
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className={classes.back}>

      <h1 className={classes.heading}>ShramJivi</h1>

      <div className={classes.loginpage}>

        <div class="form-group" >

          <label >LOGIN</label>
          <input type="tel" id="phone" name="phone" pattern="[7-9]{1}[0-9]{9}" required class="form-control" aria-describedby="emailHelp" placeholder="Enter Your Phone Number"
          />
          <label></label>
          <div id="recaptcha"></div>
          <Button onClick={handleClick}>Verify Phone Number</Button>
        </div>



      </div>
    </div>
  )
}
export default Login;