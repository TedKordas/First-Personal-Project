const express = require('express');
const bodyParser = require ('body-parser');
const cors = require ('cors')

const app = new express();
app.use(bodyParser.json());



const port = 3020;

app.get("/", function(req, res) {
    res.send("home");
});

app.listen(port, ()=> {
    console.log("Listening on port", port)
})