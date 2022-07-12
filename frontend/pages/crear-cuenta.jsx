import Link from "next/link";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const CrearCuenta = () => {
    return (

        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
            <Formulario
                titulo="Crea una Cuenta"
                valueBtnSubmit="Crear"
            >

                <Campo
                    label="Nombre"
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                />

                <Campo
                    label="Teléfono"
                    id="telefono"
                    type="tel"
                    placeholder="Tu telefono"
                />

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
                    placeholder="Crea una password"
                />

                <Campo
                    label="Repite tu Password"
                    id="password"
                    type="password"
                    placeholder="Repite tu password aquí"
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