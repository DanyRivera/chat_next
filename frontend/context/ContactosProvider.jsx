import { useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const ContactosContext = createContext();

const ContactosProvider = (props) => {

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [contacto, setContacto] = useState({});
    const [solicitudes, setSolicitudes] = useState([]);

    const submitContacto = async email => {

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

            const { data } = await clienteAxios.post('/solicitudes/contactos', email, config);

            setContacto(data)

        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setContacto({})

            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }
        setCargando(false);

    }

    const submitSolicitud = async id => {

        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/solicitudes', {
                Para: id
            }, config);

            setAlerta({
                msg: data.msg,
                error: false
            })

            setContacto({})

            setTimeout(() => {
                setAlerta({})
            }, 3500);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const obtenerSolicitudes = async () => {

        setCargando(true);

        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/solicitudes', config);
            setSolicitudes(data);

        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }

    }

    return (
        <ContactosContext.Provider
            value={{
                contacto,
                alerta,
                cargando,
                solicitudes,
                submitContacto,
                setAlerta,
                submitSolicitud,
                obtenerSolicitudes
            }}
        >
            {props.children}
        </ContactosContext.Provider>
    )
}

export {
    ContactosProvider
}

export default ContactosContext;