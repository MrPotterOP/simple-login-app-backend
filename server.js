import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/routes.js";

dotenv.config();
const App = express();

App.use(cors());
App.use(express.json());
App.use("/api/", router);

//Database Connection.
mongoose.connect(process.env.MONGOURL, {useUnifiedTopology: true, useNewUrlParser: true}, (err, success) =>{
    if(err){
        throw err;
    }else {
        console.log("Connected to Database");
    }
});

//Backend Server
App.listen(process.env.PORT || 4000, ()=>{
    console.log("Backend Sever Running on 4000");
});