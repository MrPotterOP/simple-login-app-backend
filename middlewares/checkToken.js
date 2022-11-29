import user from "../models/user.js";
import logs from "../models/log.js";
import jwt from "jsonwebtoken";


const checkToken = (req, res, next)=>{
    const rawToken = req.headers.authorization;
    const userAgent = req.headers['user-agent'];

    //Functional Components

    const genLogs = (name)=>{
        logs.create({user: name, userAgent,});
        next();
    }

    const checkUser = (id)=>{
        user.findOne({_id: id}, (err, doc)=>{
            if(err){
                return res.status(501).json({msg: "Something Went Wrong."});
            }else if(!doc){
                return res.status(401).json({msg: "Unuthorized Access."});
            }else{
                req.user = {id: doc._id, name: doc.name}
                genLogs(doc.name);
            }
        })
    }

    //Main Js
    if(!rawToken){
        res.status(401).json({msg: "Access Denied."});
    }else{

        const token = rawToken.split(" ")[1];

        jwt.verify(token, process.env.JWTSECRET, (err, doc)=>{
            if(err){
                return res.status(401).json({msg: "Unuthorized Access."});
            }else if(!doc){
                return res.status(401).json({msg: "Unuthorized Access."});
            }else{
                checkUser(doc.id);
            }
        })
        

    }
}

export default checkToken;