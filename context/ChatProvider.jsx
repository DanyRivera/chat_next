import { useState, createContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [personaActual, setPersonaActual] = useState(1);
    const [mensaje, setMensaje] = useState({});
    const [chat, setChat] = useState([]);

    const handleClickpersona = persona => {
        setPersonaActual(persona);
    }

    const handleChangeMensaje = msg => {
        setMensaje(msg);
    }

    const handleSubmitMensaje = e => {
        e.preventDefault();
        setChat([...chat, mensaje])
        setMensaje({});
    }

    const handleClickBorrarChat = () => {
        setChat([]);
        setMensaje({});
    }

    return (
        <ChatContext.Provider
            value={{
                personaActual,
                mensaje,
                chat,
                handleClickpersona,
                handleChangeMensaje,
                handleSubmitMensaje,
                handleClickBorrarChat
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