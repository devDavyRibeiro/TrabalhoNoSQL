import express from "express"
import { getAgendas2,putEstadia2,postEstadia2, deleteEstadia2} from "../controllers/agendas2.js";
import { getAgendabyID2 } from "../controllers/agendas2.js";
import { validateAgenda } from "../middlewares/validarEstadia.js";

const router = express.Router();

router.get("/",getAgendas2) //listagem geral 

router.get("/:id", getAgendabyID2) 

//router.post("/") // criação
router.post("/",validateAgenda ,postEstadia2)

router.put("/:id",validateAgenda ,putEstadia2) //atualização

router.delete("/:id", deleteEstadia2); // DELETE 

export default router;