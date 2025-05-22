import express from "express";
import { postUsuario } from "../controllers/usuario";
import { deleteUsuario } from "../controllers/usuario";
import { validateUsuario } from "../middlewares/validarUsuario";

const router = express.Router()


router.post("/", validateUsuario, postUsuario) // criação


//router.put("/:id", putUsuario) //atualização

router.delete("/:id", validateUsuario, deleteUsuario) // exclusão