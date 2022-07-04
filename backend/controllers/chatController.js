import Chat from "../models/Chat.js";

const crearChat = async (req, res) => {

    //Verificar que el chat no exista
    //Verificar que los dos usuarios existan
    //Verificar que uno de los usuarios sea el que esta autenticado
    //Verificar que los dos se tengan mutuamente como contacto

    // const chat = await Chat.create(req.body);
}

const accederChat = async (req, res) => { }
const vaciarChat = async (req, res) => { }
const eliminarChat = async (req, res) => { }

export {
    crearChat,
    accederChat,
    vaciarChat,
    eliminarChat
}