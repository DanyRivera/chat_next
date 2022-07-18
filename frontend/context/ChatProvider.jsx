import { useState, createContext } from "react";
import dataChats from '../data/chats.json';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [chat, setChat] = useState(dataChats[0]);
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [mensaje, setMensaje] = useState({});

    const handleModificarChat = idChat => {
        const chatActivo = chatsUsuario.find(chat => chat._id === idChat);
        setChat(chatActivo);
    }

    const handleChatsUsuarios = chats => {
        setChatsUsuario(chats);
    }

    const handleChangeMensaje = obj => {
        setMensaje(obj);
    }

    const handleSubmitMensaje = e => {
        // e.preventDefault();
        // setChat(chat.mensajes.push(mensaje))
        // setMensaje({});
    }

    return (
        <ChatContext.Provider
            value={{
                chat,
                chatsUsuario,
                mensaje,
                handleModificarChat,
                handleChatsUsuarios,
                handleChangeMensaje,
                handleSubmitMensaje
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export {
    ChatProvider
}

export default ChatContext;