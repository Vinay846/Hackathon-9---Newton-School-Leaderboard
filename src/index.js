const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require('./data')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const sanitize = (value, defaultValue)=>{
    if(value === null || value === undefined || isNaN(Number(value))){
        return defaultValue;
    }
    return value;
}

// your code goes here
app.get("/topRankings", (req, res)=>{
    const offset = sanitize(req.query.offset, 0);
    const limit = sanitize(req.query.limit, 20);
    
    res.send(data.filter((ele, idx)=>{
        return idx >= offset && idx < offset + limit;
    }));

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
