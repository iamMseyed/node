const express = require("express")
const app = express()
const port = 8080

app.get('/',(req,res)=>{
    res.send("This is the home page")
})

app.get('/about', (req,res)=>{
    if(Object.keys(req.query).length==2)
        res.send(`This is the about page, ${req.query.name} (${req.query.age})`)
    else
        res.send("This is about page")
    ;
})

app.listen(port,()=>console.log("Server Started!"))