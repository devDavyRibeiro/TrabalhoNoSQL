import express from "express";
import {getPets, getPetID, postPet, deletePet} from "../controllers/pet.js"; //Importar as funções dentro da controller pet

const router = express.Router()

//Depois de definir o caminho, só chamar o nome da função que você irá usar. EX: getPets irá puxar todo mundo que tiver na collection pet, mas também pode ser deletePet, e assim por diante
router.get("/", getPets)  //listagem total
// router.get("/nome") //listagem por nome

router.get("/:id",getPetID) // listagem por ID

router.post("/",postPet) // criação

// router.put("/:id") //atualização

 router.delete("/:id", deletePet) // exclusão

export default router