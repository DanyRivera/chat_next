import Link from "next/link";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const login = () => {

    return (

        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
            <Formulario
                titulo="Inicia Sesión"
                valueBtnSubmit="Inicia Sesión"
            >

                <Campo
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Tu email"
                />

                <Campo
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Tu password"
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