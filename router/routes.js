import express from "express";

//Controllers
import postRegister from "../controllers/postRegister.js";
import postLogin from "../controllers/postLogin.js";
import getHomePage from "../controllers/getHomePage.js";

//Middlewares
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();



router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/homepage", checkToken, getHomePage);
router.get("/test", (req, res)=>{res.json({msg: "Server Running."})});


export default router;