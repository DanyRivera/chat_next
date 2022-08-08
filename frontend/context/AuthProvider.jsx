import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import clienteAxios from "../config/clienteAxios";
import dataChats from '../data/chats.json';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const router = useRouter();

    const [chat, setChat] = useState(dataChats[0]);
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [mensaje, setMensaje] = useState({});
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});


    useEffect(() => {

        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data } = await clienteAxios('/usuarios/perfil', config);
                setAuth(data);
                router.push('/chats');

            } catch (error) {
                setAuth({})
            }

            setCargando(false);

        }
        autenticarUsuario();

    }, [])

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
        <AuthContext.Provider
            value={{
                chat,
                chatsUsuario,
                mensaje,
                alerta,
                auth,
                cargando,
                handleModificarChat,
                handleChatsUsuarios,
                handleChangeMensaje,
                handleSubmitMensaje,
                setAlerta,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;