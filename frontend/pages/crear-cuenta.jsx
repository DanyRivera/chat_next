import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const CrearCuenta = () => {
    return (
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
                <p className="text-sm text-blue-600">Iniciar Sesión </p>
            </div>

        </Formulario>
    )
}

export default CrearCuenta