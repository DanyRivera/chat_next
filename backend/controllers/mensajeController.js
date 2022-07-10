import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import Mensaje from "../models/Mensaje.js";

const crearMensaje = async (req, res) => {

    const { contenido, chat } = req.body;

    //Verificar el id Chat
    if (!mongoose.Types.ObjectId.isValid(chat)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const chatUsuario = await Chat.findById(chat);

    //Verificar que el chat exista
    if (!chatUsuario) {
        const error = new Error("Ese chat no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que el usuario registrado este en ese chat
    if (!chatUsuario.usuarios.includes(req.usuario._id.toString())) {
        const error = new Error("No perteneces a este chat");
        return res.status(401).json({ msg: error.message })
    }

    //Verificar que no este vacio el contenido del mensaje
    if (contenido.length === 0) {
        const error = new Error("No puedes enviar un mensaje vacio");
        return res.status(403).json({ msg: error.message })
    }

    try {

        const newMessage = new Mensaje(req.body);
        newMessage.autor = req.usuario._id;
        chatUsuario.mensajes.push(newMessage._id);

        await Promise.all([
            newMessage.save(),
            chatUsuario.save()
        ]);

        res.json(newMessage);

    } catch (error) {
        console.log(error);
    }

}

const eliminarMensaje = async (req, res) => {

    const { mensaje } = req.body;

    //Verificar el id Chat
    if (!mongoose.Types.ObjectId.isValid(mensaje)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    const mensajeEliminar = await Mensaje.findById(mensaje);

    //Verificar que el chat exista
    if (!mensajeEliminar) {
        const error = new Error("Ese mensaje no existe");
        return res.status(404).json({ msg: error.message })
    }

    const chatMensaje = await Chat.findById(mensajeEliminar.chat);

    //Verificar si estas autorizado para eliminar el mensaje
    if(!chatMensaje.usuarios.includes(req.usuario._id.toString())) {
        const error = new Error("No puedes eliminar este mensaje")
        return res.status(403).json({ msg: error.message })
    }

    if(!chatMensaje.mensajes.includes(mensajeEliminar._id.toString())) {
        const error = new Error("Ese mensaje no pertenece a ese chat")
        return res.status(403).json({ msg: error.message })
    }

    try {

        const mensajesActualizados = chatMensaje.mensajes.filter(msg => msg._id.toString() !== mensaje.toString());
        chatMensaje.mensajes = mensajesActualizados;

        await Promise.all([
            mensajeEliminar.deleteOne(),
            chatMensaje.save()
        ]);

        res.json({msg: "El mesanje se eliminó correctamente"})

    } catch (error) {
        console.log(error);
    }
}

export {
    crearMensaje,
    eliminarMensaje
}