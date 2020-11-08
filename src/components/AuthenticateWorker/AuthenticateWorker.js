import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import firebase from '../../firebase';
import classes from '../Login/login.module.css';
function Workerauthenticate(props) {
    const [isAuthenticate, setisAuthenticate] = useState(false);
    const [phoneno, setPhoneno] = useState();
    const [user, setUser] = useState({});
    const handleClick = () => {
        var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        var number = document.getElementById("phone").value;
        firebase.auth().signInWithPhoneNumber("+91" + number, recaptcha).then(function (e) {
            var code = prompt('Enter the OTP', '');
            if (code === null) return;
            e.confirm(code).then(function (result) {
                console.log(result);
                setisAuthenticate(true);
                setPhoneno(number);
                console.log("verified");
                alert("Number verified successfully");

            }).catch(function (error) {
                console.error(error);
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
    if (isAuthenticate) {
        firebase
            .database()
            .ref("/userdetail/" + phoneno)
            .once("value")
            .then((data) => {
                console.log(data.val());
                setUser(data.val());
                console.log(user);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={classes.back}>

            <h1 className={classes.heading}>ShramJivi</h1>

            <div className={classes.loginpage}>

                <form className={classes.form}>
                    <div className="form-group" >
                        <label >Authenticate Worker</label>
                        <input type="tel" id="phone" name="phone" pattern="[7-9]{1}[0-9]{9}" required className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Phone Number" />
                        <label></label>
                        <div id="recaptcha"></div>
                        <Button onClick={handleClick}>Verify Phone Number</Button>
                    </div>
                </form>
            </div>
            <div className="hello">
                {isAuthenticate
                    ? <div>{user.fullname}</div>
                    : <div></div>

                }


            </div>
        </div>

    )
}
export default Workerauthenticate;