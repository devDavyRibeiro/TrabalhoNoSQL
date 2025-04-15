import express from "express";
import {getPets} from "../controllers/pet.js"; //Importar as funções dentro da controller pet

const router = express.Router()

//Depois de definir o caminho, só chamar o nome da função que você irá usar. EX: getPets irá puxar todo mundo que tiver na collection pet, mas também pode ser deletePet, e assim por diante
router.get("/", getPets)  //listagem total
// router.get("/nome") //listagem por nome

// router.get("/:id") // listagem por ID

// router.post("/") // criação

// router.put("/:id") //atualização

// router.delete("/:id") // exclusão

export default router