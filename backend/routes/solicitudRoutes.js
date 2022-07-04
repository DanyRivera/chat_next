import express from "express";
import {
    enviarSolicitud,
    aceptarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudes,
    eliminarSolicitud,
    eliminarSolicitudes
} from "../controllers/solicitudController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').post(checkAuth, enviarSolicitud).get(checkAuth, obtenerSolicitudes);
router.get('/aceptar/:id', checkAuth, aceptarSolicitud);
router.get('/rechazar/:id', checkAuth, rechazarSolicitud);
router.delete('/eliminar/:id', checkAuth, eliminarSolicitud);
router.delete('/eliminar', checkAuth, eliminarSolicitudes);

export default router;