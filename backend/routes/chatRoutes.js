import express from "express";
import {
    crearChat,
    accederChat,
    vaciarChat,
    eliminarChat
} from "../controllers/chatController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post('/', checkAuth, crearChat);
router.post('/access', checkAuth, accederChat);
router.route('/:id').put(checkAuth, vaciarChat).delete(checkAuth, eliminarChat);

export default router;