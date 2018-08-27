const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {passport} = require('./config/passport');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const db = "mongodb://name:12345bb@ds145921.mlab.com:45921/homeexpenses";
const port = process.env.port || 3001;
const {categories, expenses, users} = require('./config/models');


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(db,  { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log('Successfully connected');
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
                res.send('User registered successfully! Please check your email and confirm registration!')
                console.log("User successfully registered, confirm registration: " + `http://localhost:3000/emailverify/${user.email}/${user.verifyKey}`)
            })
        }
    })
});
app.post('/signin', (req, res) => {
    users.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
        if(err) res.json({type: false, data: "Error occured: " + err});
        if(user) {
            if(user.verifyKey) res.send("User with this email is not verified");
            let {email, _id} = user;
            jwt.sign({email, _id}, 'secret', (err, token) => {
                user.save(err=>{if(err) console.log(err)})
                res.json({token, user})
            })
        }else res.send('Incorrect email/password')
    });
});
app.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => res.send(req.user));
app.post('/verify', (req, res) => {
    users.findOne({email: req.body.email}, (err, user) => {
        if(err) res.json({type: false, data: "Error occured: " + err});
        if(!user) res.send('Incorrect email / verification code');
        else {
            if(req.body.verifyKey === user.verifyKey && user.verified === false) {
                console.log("совпали ключи верификации");
                let {email, _id} = user;
                jwt.sign({email, _id}, 'secret', (err, token) => {
                    user.verified = true;
                    user.verifyKey = 0;
                    user.save(err => {
                        if(err) res.json({type: false, data: "Error occured: " + err});
                        res.json({token, user})
                    })
                })
            }else res.send('Incorrect email / verification code')
        }
    });
});

app.get('/categories', passport.authenticate('jwt', {session: false}), (req, res) => {
    categories.find({userID: req.user._id}, (err, categories) => {
        if (err) return console.error(err);
        res.send(categories)
    });
});
app.post('/categories', passport.authenticate('jwt', {session: false}), (req, res) => {
    let category = new categories (req.body);
    category.save().then(item => res.send(item));
});
app.post('/categories/rename', passport.authenticate('jwt', {session: false}), (req, res) => {
    categories.findByIdAndUpdate(req.body.id, { name: req.body.name }, { new: true }, (err, category) => {
        if (err) throw err;
        res.send(category)
    })
});
app.post('/categories/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.body.arrSub.length>0){
        req.body.arrSub.forEach(item => {
            categories.findByIdAndUpdate(item, { isSub: false }, { new: true }, err => {if (err) throw err})
        });
    }
    categories.updateMany({parentID: req.body.id}, { parentID: "0", isSub: false }, { new: true }, err => {if (err) throw err});
    categories.findOneAndRemove({_id: req.body.id}, (err, category) =>{
        if(err) return console.log(err);
        res.send(category._id)
    });
});
app.post('/categories/move', passport.authenticate('jwt', {session: false}), (req, res) => {
    categories.findByIdAndUpdate(req.body.current._id, { location: req.body.swap.location }, { new: true }, err => {if (err) throw err});
    categories.findByIdAndUpdate(req.body.swap._id, { location: req.body.current.location }, { new: true }, err => {if (err) throw err});
    res.json(req.body);
});
app.post('/sub', passport.authenticate('jwt', {session: false}), (req, res) => {
    categories.findByIdAndUpdate(req.body.subFromID, { isSub: true }, { new: true }, err => {if (err) throw err});
    let category = new categories (req.body);
    category.save().then(item => res.send(item));
});
app.post('/sub/remove', passport.authenticate('jwt', {session: false}), (req, res) => {
    categories.findByIdAndUpdate(req.body._id, { isSub: false, parentID: "0" }, { new: true }, err => {if (err) throw err});
    categories.findByIdAndUpdate(req.body.subFromID, { isSub: false }, { new: true }, err => {if (err) throw err});
    res.json(req.body);
});

app.post('/expenses', passport.authenticate('jwt', {session: false}), (req, res) => {
    let expense = new expenses (req.body);
    expense.save().then(item => res.send(item));
});
app.get('/expenses', passport.authenticate('jwt', {session: false}), (req, res) => {
    expenses.find({userID: req.user._id}, (err, expenses) => {
        if (err) return console.error(err);
        res.send(expenses)
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db, (err) => {
    if (err) return console.log(err);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
