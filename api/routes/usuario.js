import express from "express";
import { postUsuario, deleteUsuario, getListUsuario, putUsuario, getById, efetuaLogin } from "../controllers/usuario.js";
import { validateUsuario } from "../middlewares/validarUsuario.js";
import auth from "../middlewares/auth.js";

const router = express.Router()

router.use(auth);

router.get('/', getListUsuario);

router.get('/:id', getById)

router.post("/", validateUsuario, postUsuario) // criação

router.post("/login",efetuaLogin)

router.put("/:id",validateUsuario, putUsuario) //atualização

router.delete("/:id", deleteUsuario) // exclusão

export default router