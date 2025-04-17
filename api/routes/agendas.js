import express from "express"
import { getAgendaById, getAgendas } from "../controllers/agendas.js";

const router = express.Router();

router.get("/", getAgendas) //listagem geral 

router.get("/:id", getAgendaById) // listagem por ID

//router.post("/") // criação

//router.put("/:id") //atualização

//router.delete("/:id") // exclusão

export default router;