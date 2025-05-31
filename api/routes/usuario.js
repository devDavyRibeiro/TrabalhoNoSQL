import express from "express";
import { postUsuario, deleteUsuario, getListUsuario, putUsuario, getById } from "../controllers/usuario.js";
import { validateUsuario } from "../middlewares/validarUsuario.js";

const router = express.Router()

router.get('/', getListUsuario);

router.get('/:id', getById)

router.post("/", validateUsuario, postUsuario) // criação

router.post("/login",)

router.put("/:id",validateUsuario, putUsuario) //atualização

router.delete("/:id", deleteUsuario) // exclusão

export default router