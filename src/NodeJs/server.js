import express from "express";
import mongoose from 'mongoose';


// creating express instance
const app = new express();


// creating server 
app.listen(7100, ()=> {
    console.log("Server is running on Port: 7100")
})

// database connection
mongoose.connect("mongodb://localhost:27017");

// check database connection
const db = mongoose.connection;

db.on('open', ()=> {
    console.log("Database connection is successfull");
})

db.on('error', ()=> {
    console.log("Database connection is not successfull");
})
