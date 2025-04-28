import express from "express"
import { getAgendas,putEstadia,postEstadia, deleteEstadia, getAgendaByID} from "../controllers/agendas.js";
import { validateAgenda } from "../middlewares/validarEstadia.js";

const router = express.Router();

router.get("/",getAgendas) //listagem geral 

router.get("/:id", getAgendaByID) 

//router.post("/") // criação
router.post("/",validateAgenda ,postEstadia)

router.put("/:id",validateAgenda ,putEstadia) //atualização

router.delete("/:id", deleteEstadia); // DELETE 

export default router;