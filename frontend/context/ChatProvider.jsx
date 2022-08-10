import { createContext, useState } from "react";
import { useRouter } from "next/router";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";


const ChatContext = createContext();

const ChatProvider = (props) => {

    const router = useRouter();

    const [chat, setChat] = useState({});
    const [chats, setChats] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);

    const crearChat = async usuarios => {
        
        try {
            
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/chats', {usuarios}, config);

            setChat(data);
            router.push('/chats');

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerChats = async () => {

        try {
            
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios('/chats', config);

            setChats(data);
            
            if(Object.keys(chat).length === 0) {
                setChat(data[0])
            }

        } catch (error) {
            console.log(error);
        }

    }

    const cambiarChat = () => {
        const chatActivo = chats.find(chatState => chatState._id === chat._id);
        console.log(chatActivo);
        setChat(chatActivo);
    }

    return (
        <ChatContext.Provider
            value={{
                chat,
                chats,
                crearChat,
                obtenerChats,
                cambiarChat
            }}
        >
            {props.children}
        </ChatContext.Provider>
    )
}

export {
    ChatProvider
}

export default ChatContext;