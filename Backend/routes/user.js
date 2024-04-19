import express from "express";
import {getUser} from "../control/user.js";


const router=express.Router()

router.get("/getUser",getUser)


export default router;
