import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const router = useRouter();

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
                // router.push('/chats');

            } catch (error) {
                setAuth({})
            }

            setCargando(false);

        }
        autenticarUsuario();

    }, [])

    const handleChangeMensaje = obj => {
        // setMensaje(obj);
    }

    const handleSubmitMensaje = e => {
        // e.preventDefault();
        // setChat(chat.mensajes.push(mensaje))
        // setMensaje({});
    }


    return (
        <AuthContext.Provider
            value={{
                alerta,
                auth,
                cargando,
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