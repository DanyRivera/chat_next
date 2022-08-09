import { useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const ContactosContext = createContext();

const ContactosProvider = (props) => {

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [contacto, setContacto] = useState({});
    const [solicitudes, setSolicitudes] = useState([]);
    const [modalEliminarSolicitud, setModalEliminarSolicitud] = useState(false);
    const [solicitud, setSolicitud] = useState({});

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

    const aceptarSolicitud = async solicitudId => {

        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/solicitudes/aceptar/${solicitudId}`, config);

            const solicitudesState = [...solicitudes];
            const solicitudesActualizadas = solicitudesState.filter(solicitudUsuario => solicitudUsuario._id !== data._id);

            setSolicitudes(solicitudesActualizadas);

            setAlerta({
                msg: 'Solicitud Aceptada Correctamente',
                error: false
            })


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

        setTimeout(() => {
            setAlerta({});
        }, 3500);

    }

    const rechazarSolicitud = async solicitudId => {
        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/solicitudes/rechazar/${solicitudId}`, config);

            const solicitudesState = [...solicitudes];
            const solicitudesActualizadas = solicitudesState.filter(solicitudUsuario => solicitudUsuario._id !== data._id);

            setSolicitudes(solicitudesActualizadas);

            setAlerta({
                msg: 'Solicitud Rechazada Correctamente',
                error: false
            })


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

        setTimeout(() => {
            setAlerta({});
        }, 3500);
    }

    const handleModalEliminarSolicitud = solicitud => {
        setModalEliminarSolicitud(!modalEliminarSolicitud);
        setSolicitud(solicitud);
    }

    const eliminarSolicitud = async () => {
        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/solicitudes/eliminar/${solicitud._id}`, config);  

            setAlerta({
                msg: data.msg,
                error: false
            })

            setModalEliminarSolicitud(false);

            const solicitudesState = [...solicitudes];
            const solicitudesActualizadas = solicitudesState.filter(solicitudUsuario => solicitudUsuario._id !== solicitud._id);

            setSolicitudes(solicitudesActualizadas);
            setSolicitud({});

            setTimeout(() => {
                setAlerta({});
            }, 3500);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ContactosContext.Provider
            value={{
                contacto,
                alerta,
                cargando,
                solicitudes,
                modalEliminarSolicitud,
                submitContacto,
                setAlerta,
                submitSolicitud,
                obtenerSolicitudes,
                aceptarSolicitud,
                rechazarSolicitud,
                handleModalEliminarSolicitud,
                eliminarSolicitud
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