const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yana.10022003",
    database: "nodejs"
});
//module.exports = connection;
connection.connect(function (error) {
    if (error) throw error
    else console.log('connected to the database successfully!');
})
app.get("/",function (req,res){
    res.sendFile(__dirname + "/")
});

app.post("/",encoder,function (req,res){
    let username = req.body.username;
    let password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",
       [username,password],
       function (error,results,fields){
               if (results.length > 0){
                   res.redirect("/chooser");
               }
               else {
                    res.redirect("/");
               }
               res.end();
   })
})

app.get("/chooser",function (req,res){
    res.sendFile(__dirname + "/chooser.html");
})

app.listen("4000");
//module.exports = app;
