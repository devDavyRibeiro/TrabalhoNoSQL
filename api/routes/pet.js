import express from "express"
import { getPets } from "../controllers/pet"
const router = express.Router()

router.get("/", getPets) //listagem geral 
router.get("/nome") //listagem por nome

router.get("/:id") // listagem por ID

router.post("/") // criação

router.put("/:id") //atualização

router.delete("/:id") // exclusão

export default router