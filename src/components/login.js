import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase';
import classes from './login.module.css';
function Login(props) {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const { register, handleSubmit } = useForm();
  function onSubmitForm(formData) {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      console.log(formData.phone);
      const usersRef = firebase.database().ref('userdetail/'+formData.phone);
      usersRef.update(formData)
      localStorage.setItem('user', JSON.stringify(formData));
      // console.log(formData);
      props.setSection("home");
    } else {
      console.log(formData);
      return;
    }

  }

  const handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = document.getElementById("phone").value;
    firebase.auth().signInWithPhoneNumber("+91" + number, recaptcha).then(function (e) {
      var code = prompt('Enter the OTP', '');
      if (code === null) return;
      e.confirm(code).then(function (result) {
        console.log(result);
        setisLoggedIn(true);
        console.log("verified");
       // document.querySelector('label').textContent += result.user.phoneNumber + "Number Verified";
       alert("Number verified successfully");
      }).catch(function (error) {
        console.error(error);
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className={classes.back}>
       
    <h1 className={classes.heading}>Kaam Dhandha</h1>
    
    <div className={classes.loginpage}> 
    
      <form onSubmit={handleSubmit(onSubmitForm)} className={classes.form}>
        <div class="form-group" >
          
          <label >LOGIN</label>
          <input type="tel" id="phone" name="phone" pattern="[7-9]{1}[0-9]{9}" required class="form-control" aria-describedby="emailHelp" placeholder="Enter Your Phone Number"
            ref={register({ required: true, minLength: 10 })} />
          <label></label>
          <div id="recaptcha"></div>
          <Button onClick={handleClick}>Verify Phone Number</Button>
        </div>
        


        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}
export default Login;