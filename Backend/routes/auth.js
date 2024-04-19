// import express from "express";
// import {checkAdminLogin,register} from "../control/auth.js";


// const router=express.Router()

// router.post("/checkAdminLogin",checkAdminLogin)
// router.post("/register",register)

// export default router





import express from "express";
import {login,register} from "../control/auth.js";


const router=express.Router()

router.post("/login",login)
router.post("/register",register)

export default router


