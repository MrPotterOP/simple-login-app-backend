import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, min: 4, max: 30, required: true},
    email: {type: String, min: 6, required: true, unique: true},
    password: {type: String, min: 6, required: true}
});

const user = new mongoose.model("user", userSchema);

export default user;