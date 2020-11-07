import React, {useState, useEffect} from 'react'
import Ecard from './Ecard'
import classes from './dashboard.module.css'
import Myprofile from './Myprofile'
import WorkerForm from './worker'
import {Redirect} from "react-router-dom"
import { Spinner } from 'react-bootstrap'

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }
  componentDidMount(){
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({user:foundUser});
      // console.log(foundUser);
    }
  }
  
  render(){
    
    return (
      <div className={classes.mgrid} >
        <div className={classes.lgrid}>
          <Myprofile  user={this.state.user}/>
        </div>
        <div className={classes.rgrid}>
          <WorkerForm user = {this.state.user}/>
        </div>
  
      </div>
    )
  }
}

export default Dashboard;
