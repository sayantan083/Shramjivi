import React, { useState, useEffect } from 'react'
// import Ecard from './Ecard'
import classes from './dashboard.module.css'
import Myprofile from './Myprofile'
import WorkerForm from './worker'
import { Redirect } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import UserContext from "../UserContext";
function Dashboard(props){
    return (
      <UserContext.Consumer>
        {
          (user) => {
            return (
              <div className={classes.mgrid} >
                <div className={classes.lgrid}>
                  <Myprofile  user={user}/>
                </div>
                <div className={classes.rgrid}>
                  <WorkerForm user = {user}/>
                </div>

              </div>);

          }
        }
      </UserContext.Consumer>
    )
}

export default Dashboard;
