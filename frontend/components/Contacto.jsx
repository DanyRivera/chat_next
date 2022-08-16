import { useRouter } from "next/router";
import useContactos from "../hooks/useContactos"
import useChat from "../hooks/useChat";
import useAuth from "../hooks/useAuth";

const Contacto = ({ contacto }) => {

    const {handleModalEliminarContacto} = useContactos();
    const {crearChat} = useChat();
    const {auth} = useAuth();

    const handleChat = () => {

        crearChat([
            auth._id,
            contacto._id
        ])

    }

    return (
        <div className="shadow-xl border rounded-xl px-2 md:px-0">
            <p className="text-center my-4 text-2xl font-bold">{contacto.nombre}</p>
            <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>{contacto.email}</p>
            <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>{contacto.telefono}</p>
            <div className="m-5 flex flex-col  justify-center gap-5">
                <button
                    className="bg-blue-600 py-3 px-10 text-white rounded-md outline-none"
                    onClick={handleChat}
                >Chat</button>
                <button
                    className="bg-red-600 py-3 px-10 text-white rounded-md outline-none"
                    onClick={() => handleModalEliminarContacto(contacto)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Contacto