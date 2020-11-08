const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyAg9wWi7OccQPxDYWWKIeNMdcOvds-3_iE",
    authDomain: "workout-clock.firebaseapp.com",
    databaseURL: "https://workout-clock.firebaseio.com",
    projectId: "workout-clock",
    storageBucket: "workout-clock.appspot.com",
    messagingSenderId: "563160271644",
    appId: "1:563160271644:web:c939c10fd327bd27d508d9"
};
firebase.initializeApp(firebaseConfig);
function addJob(params) {
    let job = {
        "title": "this",
        "desc": "descrip"
    }
    firebase.database().ref("/Data/").push(job).then((data) => {
        console.log(data.toString());
    }).catch(() => { }).finally(() => { console.log("posted job") });
}
//addJob();
function sendJobs(phoneNumber) {
    //firebase.database().
    firebase.database().ref("/job").orderByPriority()
    firebase.database().ref("/Data/")
        //.limitToLast(10)
        .once("value")
        .then((data) => {

            console.log(data.val());
        })
        .catch(() => { }).finally(() => { });
    console.log("jobs sent");

}
//sendJobs();
async function statusActive(phoneNumber) {
    firebase.database().ref("/Data/" + phoneNumber).
        update({ status: "active" }).
        then((data) => {
            console.log(data.toString());
        })
        .finally(() => {
            console.log("active status"); return;
        })
        .catch(() => { })
    //console.log("active status");
}
function statusInActive(phoneNumber) {
    firebase.database().ref("/Data/" + phoneNumber).update({ status: "active" }).then((data) => {
        console.log(data.toString());
    }).catch(() => { }).finally(() => { console.log("inactive status"); return; });

}

module.exports.sendJobs = sendJobs;
module.exports.statusActive = statusActive;
module.exports.statusInActive = statusInActive;
