import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlerware.js"


const router = Router()


// method ho jaye lakin jane se pehle ek baar milte hue jayee usi ko to middleware khte haa

router.route("/register").post(
    upload.fields([
        {
            name: "avatar" ,
            maxCount: 1
        },
        {name: "coverImage" , maxCount: 1}
    ]), 
    registerUser
)
// router.route("/login").post(login)

export default router 