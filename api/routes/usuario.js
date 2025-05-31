import express from "express";
import { postUsuario } from "../controllers/usuario";
import { deleteUsuario } from "../controllers/usuario";
import { validateUsuario } from "../middlewares/validarUsuario";
im
const router = express.Router()


router.post("/", validateUsuario, postUsuario) // criação
router.post("/login",)

//router.put("/:id", putUsuario) //atualização

router.delete("/:id", validateUsuario, deleteUsuario) // exclusão