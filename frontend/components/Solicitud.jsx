import useContactos from "../hooks/useContactos"

const Solicitud = ({ solicitud }) => {

    const {aceptarSolicitud, rechazarSolicitud, handleModalEliminarSolicitud} = useContactos();

    return (
        <div className="shadow-xl border rounded-xl lg:flex justify-between items-center md:pl-5 mb-10" >

            <p className="text-center my-4 text-2xl font-bold md:ml-5">{solicitud.De.nombre}</p>
            <p className="text-center mx-2 md:mx-0 my-2 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>{solicitud.De.email}</p>
            <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>{solicitud.De.telefono}</p>

            <div className="m-5 flex flex-col justify-center gap-5 md:flex-row">
                <button
                    className="bg-green-600 py-3 px-10 text-white rounded-md outline-none"
                    onClick={() => aceptarSolicitud(solicitud._id)}
                >Aceptar</button>
                <button
                    className="bg-yellow-600 py-3 px-10 text-white rounded-md outline-none"
                    onClick={() => rechazarSolicitud(solicitud._id)}
                >Rechazar</button>
                <button
                    className="bg-red-600 py-3 px-10 text-white rounded-md outline-none"
                    onClick={() => handleModalEliminarSolicitud(solicitud)}
                >Eliminar</button>
            </div>

        </div>
    )
}

export default Solicitud