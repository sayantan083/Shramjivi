import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import firebase from "../firebase"
import classes from './worker.module.css';
import UserContext from "../UserContext"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// var stateData = require('./state.json')
export default function WorkerForm(props) {
//   const [user, setUser] = useState({});
  const [phone, setPhone] = useState();
  const {register,handleSubmit}=useForm();
  function onSubmitForm(data){
    console.log(data);
    
    data["phone"]=phone;
    firebase.database().ref("/userdetail/"+phone).update(data).then((data) => {
      console.log(data.toString());
  }).catch(() => { }).finally(() => { 
    // toast("Profile Updated");
    console.log("posted job") });

  }

  return (

    <UserContext.Consumer>
        {
            (user)=>{
                setPhone(user.phone)
                return (
                    <div  className={classes.back}>
      {/* <ToastContainer /> */}
      <form onSubmit={handleSubmit(onSubmitForm)}>
      <div class="form-group row">
          <label class="col-sm-2 col-form-label">Full Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="fullname" ref={register} placeholder="Enter your full name" defaultValue={user.fullname} />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Phone No</label>
          <div class="col-sm-10">
            <p>{phone}</p>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <div class="form-check form-check-inline">
              <input class="form-check-input" ref={register} type="radio" name="Gender" id="inlineRadio1" value="Male" />
              <label class="form-check-label" for="inlineRadio1">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" ref={register} type="radio" name="Gender" id="inlineRadio2" value="Female" />
              <label class="form-check-label" for="inlineRadio2">Female</label>
            </div>
          </div>

        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">State</label>
            <div class="col-sm-10" >
              <select class="form-control form-control-sm" name="state" ref={register} defaultValue={user.stateData} >
               {/* {
                 stateData.map((data)=>{
                   return <option>{data}</option>
                 })
               }
             */}
              </select>

            </div>
          </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
            <input type="tel" name="address" ref={register} class="form-control" defaultValue={user.address} id="inputPassword3" placeholder="Enter Address" />
          </div> 
        </div>

        

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Aadhar Card No</label>
          <div class="col-sm-10">
            <input type="tel" class="form-control" name="adhaar" defaultValue={user.adhaar} ref={register} id="inputPassword3" placeholder="Enter Aadhar Card No" />
          </div>
        </div>


        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0"> Job Prefrences</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios1" value="Daily Wage Worker" checked />
                <label class="form-check-label" for="gridRadios1">
                  Daily Wage Worker
          </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios2" value="Maid" />
                <label class="form-check-label" for="gridRadios2">
                  Maid
          </label>
              </div>
              <div class="form-check disabled">
                <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios3" value="Cooking Assistant" />
                <label class="form-check-label" for="gridRadios3">
                  Cooking assistant (Worker)
          </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="form-group row">
          <div class="col-sm-10">
            <button  type="submit" class="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </form>
    </div>
                )
            }
        }
    </UserContext.Consumer>
  )
}