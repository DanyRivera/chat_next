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

            accederChat(data._id);
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
                accederChat(data[0]._id)
            } else {
                const chatActivo = data.find(chatState => chat._id === chatState._id);
                accederChat(chatActivo._id)
            }



        } catch (error) {
            console.log(error);
        }

        setCargando(false)

    }

    const cambiarChat = chatId => {
        // const chatActivo = chats.find(chatState => chatState._id === chatId);
        // setChat(chatActivo);
        accederChat(chatId);
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

            const chatsActualizados = chats.filter(chatState => chatState._id !== chat._id);
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

            const { data } = await clienteAxios(`/chats/${chat._id}`, config);

            const chatActualizado = { ...chat };
            chatActualizado.mensajes = [];
            setChat(chatActualizado);

        } catch (error) {
            console.log(error);
        }
    }



    //SOCKET.IO
    const handleMensaje = mensaje => {
        console.log(mensaje);
        const chatActualizado = { ...chat };
        chatActualizado.mensajes = [...chatActualizado.mensajes, mensaje];
        setChat(chatActualizado)
    }

    //TODO: Arreglar el problema del state de chats y chat
    //TODO: Arreglar el problema de crear un chat y asignarselo al otro usuaruio
    //TODO: Arreglar el problma de vaciar y elimar chats
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
                handleMensaje
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