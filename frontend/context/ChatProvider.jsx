import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

let socket;

const ChatContext = createContext();

const ChatProvider = (props) => {

    const router = useRouter();

    const [chat, setChat] = useState({});
    const [chats, setChats] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [chatMovil, setChatMovil] = useState(false);

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    }, [])

    const accederChat = async chatId => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/chats/access', {
                id: chatId
            }, config);

            setChat(data);

        } catch (error) {
            console.log(error);
        }
    }

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

            const { data } = await clienteAxios.post('/chats', { usuarios }, config);

            setChat(data)
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

            const { data } = await clienteAxios('/chats', config);

            setChats(data);

            if (Object.keys(chat).length === 0) {
                setChat(data[0])
            } else {
                const chatActivo = data.find(chatState => chat._id === chatState._id);
                setChat(chatActivo)
            }

        } catch (error) {
            console.log(error);
        }

        setCargando(false)

    }

    const cambiarChat = chatId => {
        const chatActivo = chats.find(chat => chat._id === chatId);
        setChat(chatActivo);
        // accederChat(chatId);
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

            const { data } = await clienteAxios.delete(`/chats/${chat._id}`, config);

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            socket.emit('eliminar chat', chat);

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

            const { data } = await clienteAxios.post('/mensajes', {
                contenido: contenido,
                chat: chat._id
            }, config);

            //Socket.io
            socket.emit('crear mensaje', data)

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

            const {data} = await clienteAxios(`/chats/${chat._id}`, config);

            socket.emit('vaciar chat', data);

        } catch (error) {
            console.log(error);
        }
    }



    //SOCKET.IO
    const handleMensaje = mensaje => {
        const chatActualizado = { ...chat };
        chatActualizado.mensajes = [...chatActualizado.mensajes, mensaje];
        accederChat(chatActualizado._id);

        const chatsState = [...chats]; 
        const chatsActualizado = chatsState.map(chat => chat._id === chatActualizado._id ? chatActualizado : chat);
        setChats(chatsActualizado)
    }

    const handleVaciarChat = () => {
        const chatActualizado = { ...chat };
        chatActualizado.mensajes = [];
        setChat(chatActualizado);

        const chatsState = [...chats]; 
        const chatsActualizado = chatsState.map(chat => chat._id === chatActualizado._id ? chatActualizado : chat);
        setChats(chatsActualizado)
    }

    const handleEliminarChat = chatObj => {
        const chatsState = [...chats]; 
        const chatsActualizados = chatsState.filter(chatState => chatState._id !== chatObj._id);
        setChats(chatsActualizados);
        setChatMovil(false);
    }

    //*Dejar el chat funcional
    //TODO: VAciar y eliminar chats con socket.io
    //TODO: Cerrar Sesión


    return (
        <ChatContext.Provider
            value={{
                chat,
                chats,
                cargando,
                chatMovil,
                crearChat,
                obtenerChats,
                cambiarChat,
                eliminarChat,
                submitMensaje,
                vaciarChat,
                setChatMovil,
                handleMensaje,
                handleVaciarChat,
                handleEliminarChat
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