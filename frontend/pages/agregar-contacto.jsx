import { useState } from "react";
import useContactos from "../hooks/useContactos";
import Layout from "../layout/Layout";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

const AgregarContacto = () => {

    const [emailUsuario, setEmailUsuario] = useState('');
    const { submitContacto, setAlerta, alerta, contacto, cargando, submitSolicitud } = useContactos();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!emailUsuario) {
            setAlerta({
                msg: 'El correo es obligatorio',
                error: true
            })
            return;
        }

        await submitContacto({
            email: emailUsuario
        })

        setEmailUsuario('');

    }

    const {nombre, email, telefono, _id} = contacto; 

    return (
        <Layout
            titulo="Agregar"
        >

            <div className="bg-slate-100 md:h-screen">
                <div className="flex justify-center pt-20">
                    <Formulario
                        titulo="Busca un Usuario"
                        valueBtnSubmit="Buscar"
                        handleSubmit={handleSubmit}
                    >

                        {alerta.msg && <Alerta alerta={alerta} />}

                        <Campo
                            label="Busca por Email"
                            id="email"
                            type="email"
                            placeholder="Email del usuario que deseas agregar"
                            value={emailUsuario}
                            setState={setEmailUsuario}
                        />

                    </Formulario>
                </div>

                <div className="flex justify-center mt-20">
                    <div className="px-5">

                        {contacto._id && (
                            <>
                                <p className="text-3xl text-blue-600 font-bold my-4">Resultados:</p>

                                {cargando ? (
                                    <Spinner />
                                ) : (
                                    <div className="shadow-xl border rounded-xl md:flex items-center md:pl-5 mb-10 gap-14 p-5 md:p-0">

                                    <p className="text-center my-4 md:my-0 text-2xl font-bold">{nombre}</p>
                                    <p className="text-center mx-2 md:mx-0 my-2 md:my-0 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>{email}</p>
                                    <p className="text-center my-2 md:my-0 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>{telefono}</p>

                                    <div className="m-5 flex flex-col justify-center gap-5 md:flex-row">
                                        <button
                                            className="bg-green-600 py-3 md:px-10 text-white rounded-md outline-none"
                                            onClick={() => submitSolicitud(_id)}
                                        >Enviar Solicitud</button>
                                    </div>

                                </div>
                                ) }
                            </>
                        )}


                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AgregarContacto