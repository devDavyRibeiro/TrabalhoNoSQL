import express from "express"

const router = express.Router()

router.get("/", (req,res)=>{
    req.body
}) //listagem pets

router.get("/nome") //listagem nome

router.get("/:id") 

router.post("/") 

router.put("/:id") 

router.delete("/:id")

export default router