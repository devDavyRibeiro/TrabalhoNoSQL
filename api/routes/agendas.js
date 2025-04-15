import express from "express"

const router = express.Router();

router.get("/") //listagem geral 

router.get("/:id") // listagem por ID

router.post("/") // criação

router.put("/:id") //atualização

router.delete("/:id") // exclusão