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
// your code goes here
app.get("/topRankings", (req, res)=>{
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    
    if(isNaN(offset) || offset < 0){
        offset = 0;
    }if(isNaN(limit) || limit < 0){
        limit = 20;
    }
    let toSend = [];
    for(let i=offset; i<limit+offset; i++){
        // toSend.push(i);
        toSend.push(data[i]);
    }

    res.send(toSend);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
