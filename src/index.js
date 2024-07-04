// require('dotenv').config({path: './env' })


import dotenv from "dotenv"

import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants.js" ;
import connectDB from "./db/index.js";
import {app} from './app.js'


dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


/*
// first approach 
import express from "express"


// function connectDB(){}

// connectDB() 

( async () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URI }/${DB_NAME} `)
        app.on("error" , (error)=>{
            console.log("Error connecting to the database" , error );
            throw error 
        })

        app.listen(process.env.PORT , ()=>{
            console.log(`App is listening on the port ${process.env.PORT} `);
        })
    }
    catch(error){
        console.log("Error" , error );
        throw error ;
    }
}) () */
