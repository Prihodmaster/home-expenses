const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const db = "mongodb://name:12345bb@ds145921.mlab.com:45921/homeexpenses";
const port = 3001;


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

mongoose.connect(db, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
const categoriesSchema = mongoose.Schema({
    userID: String,
    location: Number,
    parentID: Number,
    children: Boolean,
    date: String,
    name: String,
    description: String,
    valueUAH: Number

});
const dashboardsSchema = mongoose.Schema({
    date: String,
    name: String,
    valueUAH: String,
    description: String,
    subCategories: [{name: String}],
    parentID: Number

});
const usersSchema = mongoose.Schema({
    email: String,
    verifyKey: Number,
    password: String,
    token: String,
    verified: Boolean
});

const categories = mongoose.model('categories', categoriesSchema);
const dashboards = mongoose.model('dashboards', dashboardsSchema);
const users = mongoose.model('users', usersSchema);

app.use(cors());
app.post('/categories', (req, res) => {
    let category = new categories (req.body);
    category.save().then(item => res.send(item));
});
app.get('/categories', (req, res) => {
    categories.find(function (err, categories) {
        if (err) return console.error(err);
        res.send(categories)
    });
});
app.get('/expenses/collections/dashboards', (req, res) => {
    dashboards.find(function (err, dashboards) {
        if (err) return console.error(err);
        console.log(dashboards);
        res.send(dashboards)
    });
});
app.post('/expenses/collections/dashboards', (req, res) => {
    let dashboard = new dashboards (req.body);
    dashboard.save();
    res.send(req.body);
});



app.post('/signup', (req, res) => {
    users.findOne({email: req.body.email}, (err, user) => {
        if (err) {res.json({type: false, data: "Error occured: " + err})}
        if(user) res.send('user with this email already exists');
        if(!user) {
            let user = new users({
                email: req.body.email,
                password: req.body.password,
                verified: false,
                verifyKey: Math.round(1000 + Math.random()*9999999)
            });
            user.save().then(() => {
                console.log("User successfully registered, confirm registration: " + `http://localhost:3000/emailverify/${user.email}/${user.verifyKey}`)
            });
        }
    });




});
app.post('/verify', (req, res) => {
    users.findOne({email: req.body.email}, (err, user) => {
        if(err) res.json({type: false, data: "Error occured: " + err});
        if(!user) res.send('Incorrect email / verification code');
        if(req.body.verifyKey === user.verifyKey && user.verified === false) {
            console.log("совпали ключи верификации");
            const payload = {
                id: user._id,
                email: user.email
            };
            jwt.sign(payload, 'secret', (err, token) => {
                user.verified = true;
                user.verifyKey = 0;
                user.save(err => {
                    if(err) res.json({type: false, data: "Error occured: " + err});
                    res.json({token, user})
                })
            })
        }
    });
});
app.post('/signin', (req, res) => {
    users.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
        if(err) res.json({type: false, data: "Error occured: " + err});
        if(!user) res.send('Incorrect email/password');
        if(user) {
            if(user.verifyKey) res.json({user});
            jwt.sign(user.email, 'secret', (err, token) => {
                    res.json({token, user})
            })
        }
    });
});




app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
