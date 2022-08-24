import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import Mensaje from "../models/Mensaje.js";
import Solicitud from "../models/Solicitud.js";
import Usuario from "../models/Usuario.js";

const crearChat = async (req, res) => {

    const { usuarios, nombre } = req.body;
    const contactosId = usuarios.filter(contacto => contacto.toString() !== req.usuario._id.toString())

    const [chat, usuariosArr, solicitudes] = await Promise.all([
        Chat.findOne({
            usuarios
        }),
        Usuario.find({ _id: usuarios }),
        Solicitud.find({ Para: req.usuario._id }).where("De").equals(contactosId)
    ])

    const contactos = usuariosArr.filter(usuario => usuario._id.toString() !== req.usuario._id.toString());

    //Verificar que el chat no exista
    if (chat) {

        if (!chat.usuarios.includes(req.usuario._id)) {
            const error = new Error("No puedes abrir este chat");
            return res.status(401).json({ msg: error.message })
        }

        contactos.length === 1 ? chat.nombre = contactos[0].nombre : null;

        return res.json(chat);
    }

    //Verificar que sean minimo dos usuarios
    if (usuarios.length < 2) {
        const error = new Error("Para crear un chat se necesitan mínimo dos personas");
        return res.status(401).json({ msg: error.message })
    }

    //Verificar que si es un grupo tenga un nombre
    if (usuarios.length > 2 && nombre === undefined) {
        const error = new Error("Para crear un grupo se necesita un nombre de grupo");
        return res.status(401).json({ msg: error.message })
    }

    //Verificar que los dos usuarios existan
    if (usuarios.length !== usuariosArr.length) {
        const error = new Error("No todos los usuarios existen");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que uno de los usuarios sea el que esta autenticado
    if (!usuarios.includes(req.usuario._id.toString())) {
        const error = new Error("No puedes crear este chat");
        return res.status(401).json({ msg: error.message })
    }

    //Verificar que los dos se tengan mutuamente como contacto
    const solicitudesAceptadas = solicitudes.filter(solicitud => solicitud.estado === "Aceptada");

    // if (solicitudesAceptadas.length !== contactosId.length) {
    //     const error = new Error("Algun usuario del chat no lo tienes como contacto o el no te tiene como contacto");
    //     return res.status(401).json({ msg: error.message })
    // }

    //Crear el Chat
    try {

        const chat = new Chat(req.body);
        chat.usuarios.length > 2 ? chat.esGrupo = true : null;
        contactos.length > 1 ? chat.nombre = nombre : null;

        await chat.save();

        res.json(chat);

    } catch (error) {
        console.log(error);
    }

}

const obtenerChats = async (req, res) => {

    const chats = await Chat.find({ usuarios: req.usuario._id }).populate('mensajes').populate("usuarios", {
        nombre: 1
    });

    const chatsArr = chats.map(chat => {

        if(chat.nombre === '') {

            const contactos = chat.usuarios.filter(usuario => usuario._id.toString() !== req.usuario._id.toString());
            contactos.length === 1 ? chat.nombre = contactos[0].nombre : null;

        }

        return chats;

    });

    // console.log(chatsArr[0]);

    if(chatsArr.length > 0) {
        res.json(chatsArr[0]);

    } else {
        res.json(chatsArr);
    }

}

const accederChat = async (req, res) => {

    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que el chat exista 
    const chat = await Chat.findById(id)
        .populate("usuarios", {
            nombre: 1
        })
        .populate("mensajes", {
            contenido: 1,
            hora: 1,
            autor: 1
        });
    
    if (!chat) {
        const error = new Error("Ese chat no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que el que está autenticado este en usuarios del chat
    const usuarioChat = chat.usuarios.filter(usuario => usuario._id.toString() === req.usuario._id.toString());

    if (usuarioChat.length === 0) {
        const error = new Error("No puedes accerder a este chat");
        return res.status(403).json({ msg: error.message })
    }

    const contactos = chat.usuarios.filter(usuario => usuario._id.toString() !== req.usuario._id.toString());
    contactos.length === 1 ? chat.nombre = contactos[0].nombre : null;

    res.json(chat);

}
const vaciarChat = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que el chat exista 
    const chat = await Chat.findById(id);
    if (!chat) {
        const error = new Error("Ese chat no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que el que está autenticado este en usuarios del chat
    if (!chat.usuarios.includes(req.usuario._id.toString())) {
        const error = new Error("No puedes vaciar este chat");
        return res.status(403).json({ msg: error.message })
    }

    try {

        chat.mensajes = [];

        await Promise.all([
            chat.save(),
            Mensaje.deleteMany({
                chat: id
            })
    
        ])

        res.json(chat)

    } catch (error) {
        console.log(error);
    }

}

const eliminarChat = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(400).json({ msg: error.message })
    }

    //Verificar que el chat exista 
    const chat = await Chat.findById(id);
    if (!chat) {
        const error = new Error("Ese chat no existe");
        return res.status(404).json({ msg: error.message })
    }

    //Verificar que el que está autenticado este en usuarios del chat
    if (!chat.usuarios.includes(req.usuario._id.toString())) {
        const error = new Error("No puedes eliminar este chat");
        return res.status(403).json({ msg: error.message })
    }

    try {

        await chat.deleteOne();
        res.json({ msg: "El chat se elimino correctamente" })

    } catch (error) {
        console.log(error)
    }
}

export {
    crearChat,
    obtenerChats,
    accederChat,
    vaciarChat,
    eliminarChat
}