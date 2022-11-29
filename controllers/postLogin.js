import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import logs from "../models/log.js"; 



const postLogin = (req, res)=>{
    const {email, password} = req.body;
    



    //Functional Components


    const genToken = (doc)=>{
        jwt.sign({name: doc.name, email: doc.email, id: doc._id}, process.env.JWTSECRET, {expiresIn: "3d"}, (err, token)=>{
            if(err){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else if(!token){
                return res.status(403).json({msg: "Unable to Generate Token."});
            }else {
                return res.json({token: `Bearer ${token}`});
            }
        });
    }

    const verifyPassword = (doc)=>{
        bcrypt.compare(password, doc.password, (err, success)=>{
            if(err){
                return res.status(401).json({msg: "Incorrect Password."});
            }else if(!success){
                return res.status(401).json({msg: "Incorrect Password."});
            }else{
                genToken(doc);
            }
        })
    }

    //Main JS
    if(!email || !password){
        return res.status(401).json({msg: "Provide Valid Data."});
    }else{

        user.findOne({email}, (err, doc)=>{
            if(!doc){
                return res.status(404).json({msg: "No User Found With This Email."});
            }else if(err){
                return res.status(501).json({msg: "Something Went Wrong."});
            }else if(doc){

                verifyPassword(doc);

            }
        })

    }
}

export default postLogin;