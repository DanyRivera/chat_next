import express from "express";
import {
    crearMensaje,
    eliminarMensaje
} from "../controllers/mensajeController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').post(checkAuth, crearMensaje).delete(checkAuth, eliminarMensaje)

export default router;