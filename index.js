const http = require('http');

const myServer = http.createServer( (req, res)=>{
    console.log("Request Received")
})