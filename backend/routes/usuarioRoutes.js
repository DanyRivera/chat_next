import express from "express";
import { 
    registrar,
    autenticar,
    resetPassword,
    comprobarToken,
    nuevaPassword,
    perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Registro y Autenticación de Usuarios
router.post('/', registrar); //Registra usuarios
router.post('/login', autenticar); //Autentica usuarios
router.post('/reset-password', resetPassword); //Verifica Usuario y Asigna Token
//Get: Comprueba el token para el password-reset
//Post: Inserta la nueva password
router.route('/reset-password/:token').get(comprobarToken).post(nuevaPassword)

router.get('/perfil', checkAuth, perfil);

export default router;