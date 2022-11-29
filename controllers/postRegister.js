import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const postRegister = (req, res)=>{
    const {name, email, password} = req.body;


    //Functional Components

    const genToken = (doc)=>{
        jwt.sign({name: doc.name, email: doc.email, id: doc._id}, process.env.JWTSECRET, {expiresIn: "3d"}, (err, token)=>{
            if(err){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else if(!token){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else {
                res.json({token: `Bearer ${token}`});
            }
        });
    }



    // Main JS

    if(!name || !email || !password){
        return res.status(401).json({msg: "Fill All The Fields Properly."});
    }else{

        user.findOne({email}, (err, doc)=>{
            if(doc){
                return res.status(401).json({msg: "Email Already Exists."});
            }else if(err){
                return res.status(501).json({msg: "Something Went Wrong."});
            }else{

                bcrypt.hash(password, 8, (e, hash)=>{
                    if(e){
                        return res.status(501).json({msg: "Something Went Wrong."});
                    }else if(!hash){
                        return res.status(501).json({msg: "Something Went Wrong."});
                    }else {
                        user.create({name, email, password: hash}, (er, docc)=>{
                            if(er){
                                return res.status(401).json({msg: "Invalid Input Provided."});
                            }else if(!docc){
                                return res.status(401).json({msg: "Invalid Input Provided."});
                            }else {
                                genToken(docc);
                            }
                        })
                    }
                })
            }
        })


    }
}


export default postRegister;