const fetch = require('node-fetch');
const dotenv = require('dotenv').config();

async function getTotals(){
    const options = {
        headers: {
            "x-rapidapi-key": process.env.KEYRAPIDAPI
        }
    };
    let data = await fetch("https://covid-19-data.p.rapidapi.com/totals", options);
    data = await data.json();

    return data;
}

module.exports = {getTotals};