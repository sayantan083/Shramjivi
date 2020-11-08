import React, { useState } from "react";
import "./searchWorker.css";
import firebase from '../../firebase';
import { Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
export default function SearchWorker(props) {
    const [name, setName] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const changeSearch = (e) => {
        setName(e.target.value.toLowerCase());

    }

    const handleRoles = (e) => {
        let temp = roles;
        let isPresent = temp.filter((role) => {
            return role === e.target.value;
        })

        if (isPresent.length == 0) {
            console.log(e.target.value);
            temp.push(e.target.value);
            console.log(temp);
        } else {
            temp = temp.filter((role) => {
                return role !== e.target.value;
            })
        }

        setRoles(temp);
    }
    React.useEffect(() => {
        let usersdemo = [];
        firebase.database().ref('userdetail').once("value").then(function (snapshot) {
            snapshot.forEach((data) => {
                usersdemo.push(data.val());
                console.log(data.val());
            })
        }).then(() => { setUsers(usersdemo) });


    }, []);

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

    console.log(users);
    return (
        <div class="background">

            <div className="search">

                <input id="searchbar" placeholder="Search by Profession or Name OR STATE" type="text" onChange={changeSearch} />
                <IconButton onClick={getLocation} aria-label="location">
                    <LocationOnTwoToneIcon />
                </IconButton>
            </div>

            {/* <Button variant="info" className="col" onClick={getLocation} >Search By location</Button> */}
            {/* <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0"> Job Prefrences</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" onChange={handleRoles} name="role"  id="gridRadios1" value="Daily Wage Worker" />
                <label class="form-check-label" for="gridRadios1">
                  Daily Wage Worker
          </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="role" onChange={handleRoles} id="gridRadios2" value="Maid" />
                <label class="form-check-label" for="gridRadios2">
                  Maid
          </label>
              </div>
              <div class="form-check disabled">
                <input class="form-check-input" type="checkbox" name="role" onChange={handleRoles} id="gridRadios3" value="Cooking Assistant" />
                <label class="form-check-label" for="gridRadios3">
                  Cooking assistant (Worker)
          </label>
              </div>
            </div>
          </div>
        </fieldset> */}

            <table id="allUsers" class="customers">
                <th>Name</th>
                <th>Phone No.</th>
                <th>Profession</th>
                <th>State</th>

                {users
                    .filter((user) => {
                        if (user.fullname)
                            return user.fullname.toLowerCase().includes(name)
                                // || 
                                //  user.state.toLowerCase().includes(name)

                                ||
                                user.role.filter((role) => {
                                    return role.toLowerCase().includes(name)
                                }).length != 0;



                        return false;
                    })
                    .map((user, idx) => {
                        return (

                            <tr className="user-card" key={user.phone}>
                                <td><h5>{user.fullname}</h5></td>
                                <td><h5>{user.phone}</h5></td>
                                <td className="">
                                    {user.role ? user.role
                                        .map((bubble) => {
                                            return <div className="bubble">{bubble}</div>
                                        })
                                        : (<></>)}
                                </td>
                                <td><h5>{user.state}</h5></td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )


}