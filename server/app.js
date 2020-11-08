const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    let text = req.body.text;
    let phoneNumber = req.body.phoneNumber;
    switch (text) {
        case "":
            res.send("CON Hello from ShramJivi\n 1. Get jobs\n 2. Make status active \n 3. Make status inactive");
            break;
        case "1":

            res.send("END Jobs are sent");
            break;
        case "2":
            res.send("END Your status is now active");
            break;
        case "3":
            res.send("END Your status is now inactive");
            break;
        default:
            res.send("You have entered wrong choice");
            break;
    }
    console.log(req.body.phoneNumber);
    res.end("END Hello ");

}).listen(1337, '127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');
