import express from "express";
import { 
    registrar,
    autenticar
} from "../controllers/usuarioController.js";

const router = express.Router();

//Registro y Autenticación de Usuarios
router.post('/', registrar); //Registra usuarios
router.post('/login', autenticar); //Autenticar usuarios

export default router;