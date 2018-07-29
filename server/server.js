const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const db = "mongodb://name:12345bb@ds145921.mlab.com:45921/homeexpenses";
const port = 3001;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(db, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
const categoriesSchema = mongoose.Schema({
    date: String,
    name: String,
    valueUAH: String,
    description: String,
    subCategories: [{name: String}],
    parentID: Number

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
    password: String,
    repeatPassword: String

});

const categories = mongoose.model('categories', categoriesSchema);
const dashboards = mongoose.model('dashboards', dashboardsSchema);
const user = mongoose.model('user', usersSchema);

app.use(cors());
app.get('/expenses/collections/categories', (req, res) => {
    categories.find(function (err, categories) {
        if (err) return console.error(err);
        console.log(categories);
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
app.post('/expenses/collections/categories', (req, res) => {
    let category = new categories (req.body);
    category.save().then(function(doc){
        res.send(doc);
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


