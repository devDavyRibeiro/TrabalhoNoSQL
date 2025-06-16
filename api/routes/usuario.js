import express from "express";
import { postUsuario, deleteUsuario, getListUsuario, putUsuario, getById, efetuaLogin } from "../controllers/usuario.js";
import { validateUsuario, valideLogin } from "../middlewares/validarUsuario.js";

const router = express.Router()

router.get('/', getListUsuario);

router.get('/:id', getById)

router.post("/", validateUsuario,valideLogin, postUsuario) // criação

router.post("/login",efetuaLogin)

router.put("/:id",validateUsuario, putUsuario) //atualização

router.delete("/:id", deleteUsuario) // exclusão

export default router