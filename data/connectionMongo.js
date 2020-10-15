// mongodb+srv://admin:betp2b@cluster0.7et2f.mongodb.net/sample_betp2b?retryWrites=true&w=majority
const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const dotent = require('dotenv').config();

// TODO: cambiar por variables de entorno
const uriMongo = process.env.URIMONGO;
console.log(uriMongo);

const client = new mongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser: true });

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.red(err)));
}

module.exports = {getConnection};

