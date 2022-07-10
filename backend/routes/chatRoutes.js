import express from "express";
import {
    crearChat,
    obtenerChats,
    accederChat,
    vaciarChat,
    eliminarChat
} from "../controllers/chatController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/').post(checkAuth, crearChat).get(checkAuth, obtenerChats);
router.post('/access', checkAuth, accederChat);
router.route('/:id').put(checkAuth, vaciarChat).delete(checkAuth, eliminarChat);

export default router;