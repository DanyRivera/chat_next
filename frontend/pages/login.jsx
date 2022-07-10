import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const login = () => {

    return (

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
                <p className="text-sm text-blue-600">Olvidé mi password</p>
                <p className="text-sm text-blue-600">Crear Cuenta</p>
            </div>

        </Formulario>

    )
}

export default login