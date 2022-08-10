import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";
import Alerta from "../components/Alerta";

const login = () => {

    const router = useRouter();

    const {alerta, setAlerta, setAuth} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        
        if([email, password].includes('')) {
            setAlerta({
                msg: "Los campos son obligatorios",
                error: true
            })
            return;
        }

        try {
            
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password
            })

            localStorage.setItem('token', data.token);
            setAuth(data);
            router.reload();
            setAlerta({});

        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }

        setTimeout(() => {
            setAlerta({})
        }, 35000);
    }

    return (

        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
            <Formulario
                titulo="Inicia Sesión"
                valueBtnSubmit="Inicia Sesión"
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

                <Campo
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Tu password"
                    value={password}
                    setState={setPassword}
                />

                <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-4 md:justify-between md:items-center">
                    <Link href="/olvide-password">
                        <p className="text-sm cursor-pointer text-blue-600">Olvidé mi password</p>
                    </Link>
                    <Link href="/crear-cuenta">
                        <p className="text-sm cursor-pointer text-blue-600">Crear Cuenta</p>
                    </Link>
                </div>

            </Formulario>
        </div>

    )
}

export default login