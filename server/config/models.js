const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    userID: String,
    location: Number,
    parentID: String,
    subFromID: String,
    isSub: Boolean,
    name: String
});
const expensesSchema = mongoose.Schema({
    userID: String,
    date: String,
    millisecDate: Number,
    categoryID: String,
    parentID: String,
    name: String,
    valueUAH: String,
    description: String
});
const usersSchema = mongoose.Schema({
    email: String,
    verifyKey: Number,
    password: String,
    verified: Boolean
});

const categories = mongoose.model('categories', categoriesSchema);
const expenses = mongoose.model('expenses', expensesSchema);
const users = mongoose.model('users', usersSchema);

const models = {categories, expenses, users};
module.exports = models;