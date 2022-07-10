import express from "express";
import {
    enviarSolicitud,
    aceptarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudes,
    eliminarSolicitud,
    eliminarSolicitudes,
    buscarContacto,
    eliminarContacto,
    obtenerContactos
} from "../controllers/solicitudController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').post(checkAuth, enviarSolicitud).get(checkAuth, obtenerSolicitudes);
router.get('/aceptar/:id', checkAuth, aceptarSolicitud);
router.get('/rechazar/:id', checkAuth, rechazarSolicitud);
router.delete('/eliminar/:id', checkAuth, eliminarSolicitud);
router.delete('/eliminar', checkAuth, eliminarSolicitudes);

router.route('/contactos').post(checkAuth, buscarContacto).get(checkAuth, obtenerContactos);
router.route('/contactos/:id').delete(checkAuth, eliminarContacto);

export default router;