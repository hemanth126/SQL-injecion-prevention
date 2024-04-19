import express from "express";
const ap=express()

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cors from "cors"
// ap.get("/val",(req,res)=>{
//     res.json("hello")
// })
ap.use(express.json())
ap.use(cors(
    {
        origin:"http://localhost:3000",
    }
))
ap.use("/Backend/user",userRoutes)
ap.use("/Backend/auth",authRoutes)

ap.listen(8800,()=>{
    console.log("connected");
})