import IndexController from "./app/controller/IndexController";
import { Router } from "express";
import JogoController from "./app/controller/JogoController";

const router = Router()

router.get("/" , IndexController.index)

router.get("/iffg" , JogoController.jogo)

export default router