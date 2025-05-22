import express from "express";
import { postUsuario, deleteUsuario } from "../controllers/usuario.js";
import { validateUsuario } from "../middlewares/validarUsuario.js";

const router = express.Router()


router.post("/", validateUsuario, postUsuario) // criação


//router.put("/:id", putUsuario) //atualização

router.delete("/:id", validateUsuario, deleteUsuario) // exclusão

export default router