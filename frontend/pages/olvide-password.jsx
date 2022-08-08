import { useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {

    const {alerta, setAlerta} = useAuth();

    const [email, setEmail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '') {
            setAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return;
        }

        try {

            const {data} = await clienteAxios.post('/usuarios/reset-password', {
                email
            });

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({});
            }, 10000);
            
        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }

    }



    return (
        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
            <Formulario
                titulo="Te Enviaremos las Intrucciones"
                valueBtnSubmit="Enviar"
                handleSubmit={handleSubmit}
            >

                {alerta.msg && <Alerta alerta={alerta} />}

                <Campo
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    setState={setEmail}
                />

                <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-4 md:justify-between md:items-center">
                    <button
                        className="text-sm text-blue-600 flex justify-start"
                        onClick={e => handleSubmit}
                    >Reenviar Email</button>
                </div>

            </Formulario>
        </div>

    )
}

export default OlvidePassword