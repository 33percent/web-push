const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname,"client")))

app.use(bodyparser.json());

const publicvapidkey = 'BJD2LWCiQK7IHP7-sU1tSLbDU2kdwaA75z73njMFE7wX0CNTHlZDh2vio9g5AW6Mqmai3wPwMbwoRbbbbrhe2Nk';

const privatevapidkey = '7jVQ_BFl_b-L5k6cuvDHI3r1rCjtkQLxhoe6Hz93k_o';

webpush.setVapidDetails('mailto:kumaravel@crayond.com',publicvapidkey,privatevapidkey);
// subscribe route 
app.post('/subscribe',(req,res )=>{

    // get subscription object
    // console.log(req.body)
    const subscription = req.body;

    //send 201 create-resource
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({"title" : 'testing ak'});

    webpush.sendNotification(subscription,payload).catch(err => console.log(err));

})

const port = 1997;

app.listen(port,()=>console.log('success ak '+ port));