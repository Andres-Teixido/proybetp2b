const mongodb = require('mongodb');
const connection = require('./connectionMongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

async function getAllUsers(){
    const connectionMongo = await connection.getConnection();

    const users = await connectionMongo.db('sample_betp2')
                        .collection('users')
                        .find()
                        .toArray();
    return users;
}

async function getUser(id){
    const connectionMongo = await connection.getConnection();

    const user = await connectionMongo.db('sample_betp2')
                        .collection('users')
                        .findOne({_id: mongodb.ObjectID(id)});
    return user;
}

async function pushUser(user){
    const connectionMongo = await connection.getConnection();
    user.password = await bcrypt.hash(user.password, 8);   
    console.log(user); 

    const result = await connectionMongo.db('sample_betp2')
                        .collection('users')
                        .insertOne(user);
    return result ;
}

async function findByCredentials(email, password) {
    const connectionMongo = await connection.getConnection();

    const user = await connectionMongo.db('sample_betp2')
                        .collection('users')
                        .findOne({email: email});
    if(!user){
        throw new Error('Error al loguearse');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Error al loguearse');
    }

    return user;
}

async function generateAuthToken(user){
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET, {expiresIn: '1h'});
    return token;
}

module.exports = {getAllUsers, getUser, pushUser, findByCredentials, generateAuthToken};