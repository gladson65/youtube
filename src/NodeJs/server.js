import express from "express";
import mongoose from 'mongoose';
import { userRoutes } from "./Routes/users.routes.js";
import { contentRoutes } from "./Routes/content.routes.js";
import cors from 'cors';


// creating express instance
const app = new express();


// creating server 
app.listen(7100, ()=> {
    console.log("Server is running on Port: 7100")
})

// parse json middleware
app.use(express.json())

// use cors
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
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


// passing app into userRoutes
userRoutes(app);

// passing app into contentRoutes
contentRoutes(app);