import { useState } from "react";
import Link from "next/link";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";
import Alerta from "../components/Alerta";

const CrearCuenta = () => {

    const {alerta, setAlerta} = useAuth();

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, telefono, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: 'El password no es el mismo',
                error: true
            });
            return;
        }

        if(password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, mínimo 6 caracteres',
                error: true
            })
            return;
        }

        try {

            const {data} = await clienteAxios.post('/usuarios', {
                nombre,
                email,
                password,
                telefono
            })

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('');
            setTelefono('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');

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

        <div className="flex h-screen pt-8 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">

            <Formulario
                titulo="Crea una Cuenta"
                valueBtnSubmit="Crear"
                handleSubmit={handleSubmit}
            >

                {alerta.msg && <Alerta alerta={alerta} />}

                <Campo
                    label="Nombre"
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    setState={setNombre}
                />

                <Campo
                    label="Teléfono"
                    id="telefono"
                    type="tel"
                    placeholder="Tu telefono"
                    value={telefono}
                    setState={setTelefono}
                />

                <Campo
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    setState={setEmail}
                />

                <Campo
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Crea una password"
                    value={password}
                    setState={setPassword}
                />

                <Campo
                    label="Repite tu Password"
                    id="password"
                    type="password"
                    placeholder="Repite tu password aquí"
                    value={repetirPassword}
                    setState={setRepetirPassword}
                />

                <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-4 md:justify-between md:items-center">
                    <Link href="/login" >
                        <p className="text-sm text-blue-600 cursor-pointer">Iniciar Sesión</p>
                    </Link>
                </div>

            </Formulario>
        </div>

    )
}

export default CrearCuenta