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
    const [mensaje, setMensaje] = useState({});

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

            setCargando(true);
            
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
        } finally {
            setCargando(false);
        }

    }

    const cambiarChat = chatId => {
        const chatActivo = chats.find(chatState => chatState._id === chatId);
        setChat(chatActivo);
    }

    const eliminarChat = async chat => {
        try {
            
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/chats/${chat._id}`, config);

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            const chatsState = [...chats];
            const chatsActualizados = chatsState.filter(chatState => chatState._id !== chat._id);
            setChats(chatsActualizados);

        } catch (error) {
            console.log(error);
        }
    } 

    const submitMensaje = async contenido => {
        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/mensajes', {
                contenido: contenido,
                chat: chat._id
            }, config);

            const msg = {
                autor: data.autor,
                contenido: data.contenido,
                hora: data.hora,
                _id: data._id
            }

            const chatActualizado = {...chat};
            chatActualizado.mensajes = [...chatActualizado.mensajes, msg];
            setChat(chatActualizado);

        } catch (error) {
            console.log(error);
        }
    }

    const vaciarChat = async () => {
        try {
            
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios(`/chats/${chat._id}`, config);

            const chatActualizado = {...chat};
            chatActualizado.mensajes = [];
            setChat(chatActualizado);

        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    return (
        <ChatContext.Provider
            value={{
                chat,
                chats,
                cargando,
                mensaje,
                crearChat,
                obtenerChats,
                cambiarChat,
                eliminarChat,
                submitMensaje,
                vaciarChat
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