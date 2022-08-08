import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../../hooks/useAuth";
import Formulario from "../../components/Formulario";
import Campo from "../../components/Campo";
import Alerta from "../../components/Alerta";

const OlvidePassword = () => {

    const { alerta, setAlerta } = useAuth();
    const router = useRouter();
    const { query: { token } } = router

    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    useEffect(() => {

        const comprobarToken = async () => {

            if (router.isReady) {
                try {

                    await clienteAxios(`/usuarios/reset-password/${token}`);
                    setTokenValido(true);
                    setAlerta({})

                } catch (error) {

                    setAlerta({
                        msg: error.response.data.msg,
                        error: true
                    })

                }
            }

        }
        comprobarToken()

    }, [router.isReady])

    const handleSubmit = async e => {
        e.preventDefault();


        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, mínimo 6 caracteres',
                error: true
            })
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'El password no es el mismo',
                error: true
            });
            return;
        }

        try {

            const { data } = await clienteAxios.post(`/usuarios/reset-password/${token}`, {
                password
            })

            setAlerta({
                msg: data.msg,
                error: false
            })

            setPasswordModificado(true);

            setPassword('');
            setRepetirPassword('');

        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }

    }

    return (
        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">

            <div className="mb-10">
                {alerta.msg && <Alerta alerta={alerta} />}
            </div>

            {tokenValido && (
                <Formulario
                    titulo="Tu Nueva Password"
                    valueBtnSubmit="Cambiar"
                    handleSubmit={handleSubmit}
                >

                    <Campo
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Crea una nueva password"
                        value={password}
                        setState={setPassword}
                    />

                    <Campo
                        label="Repite tu Password"
                        id="password"
                        type="password"
                        placeholder="Confirma tu nueva password"
                        value={repetirPassword}
                        setState={setRepetirPassword}
                    />

                    {passwordModificado && (
                        <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-4 md:justify-between md:items-center">
                            <Link href="/login" >
                                <p className="text-sm text-blue-600 cursor-pointer">Iniciar Sesión</p>
                            </Link>
                        </div>
                    )}

                </Formulario>
            )}

        </div>

    )
}

export default OlvidePassword