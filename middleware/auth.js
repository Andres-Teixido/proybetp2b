const jwt = require('jsonwebtoken');
const dataUser = require('../data/user');
const dotenv = require('dotenv').config();

async function auth (req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = dataUser.getUser(decoded._id);
        console.log(user);
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

module.exports = auth;