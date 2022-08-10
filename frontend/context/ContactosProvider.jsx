import { useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";

const ContactosContext = createContext();

const ContactosProvider = (props) => {

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);
    const [contacto, setContacto] = useState({});
    const [solicitudes, setSolicitudes] = useState([]);
    const [modalEliminarSolicitud, setModalEliminarSolicitud] = useState(false);
    const [solicitud, setSolicitud] = useState({});
    const [modalEliminarSolicitudes, setModalEliminarSolicitudes] = useState(false);
    const [contactos, setContactos] = useState([]);
    const [modalEliminarContacto, setModalEliminarContacto] = useState(false);


    const submitContacto = async email => {

        try {

            setCargando(true)

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

            setContacto({});

            setTimeout(() => {
                setAlerta({});
            }, 3000);

        } finally {
            setCargando(false);
        }


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

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setContacto({})


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3500);
        }

    }

    const obtenerSolicitudes = async () => {


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

            toast.success('Solicitud Aceptada Correctamente', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(() => {
                setAlerta({});
            }, 3500);
        }



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

            toast.success('Solicitud Rechazada Correctamente', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
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

            setModalEliminarSolicitud(false);

            const solicitudesState = [...solicitudes];
            const solicitudesActualizadas = solicitudesState.filter(solicitudUsuario => solicitudUsuario._id !== solicitud._id);

            setSolicitudes(solicitudesActualizadas);
            setSolicitud({});

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEliminarSolicitudes = () => {
        setModalEliminarSolicitudes(!modalEliminarSolicitudes);
    }

    const eliminarSolicitudes = async () => {

        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete('/solicitudes/eliminar', config);

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setModalEliminarSolicitudes(false);
            setSolicitudes([]);

        } catch (error) {
            console.log(error);
        }

    }

    const obtenerContactos = async () => {


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

            const { data } = await clienteAxios('/solicitudes/contactos', config);

            setContactos(data);

        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }


    }

    const handleModalEliminarContacto = contacto => {
        setModalEliminarContacto(!modalEliminarContacto);
        setContacto(contacto);
    }

    const eliminarContacto = async () => {

        try {

            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/solicitudes/contactos/${contacto._id}`, config);

            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            const contactosState = [...contactos];
            const contactosActualizados = contactosState.filter(contactoID => contactoID._id !== contacto._id);

            setContactos(contactosActualizados);
            setContacto({});

        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(() => {
                setAlerta({});
            }, 3500);

        }

        setModalEliminarContacto(false);
    }

    

    return (
        <ContactosContext.Provider
            value={{
                contacto,
                alerta,
                cargando,
                solicitudes,
                modalEliminarSolicitud,
                modalEliminarSolicitudes,
                contactos,
                modalEliminarContacto,
                submitContacto,
                setAlerta,
                submitSolicitud,
                obtenerSolicitudes,
                aceptarSolicitud,
                rechazarSolicitud,
                handleModalEliminarSolicitud,
                eliminarSolicitud,
                handleModalEliminarSolicitudes,
                eliminarSolicitudes,
                obtenerContactos,
                handleModalEliminarContacto,
                eliminarContacto
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