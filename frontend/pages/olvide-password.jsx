import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const OlvidePassword = () => {
    return (
        <Formulario
            titulo="Te Enviaremos las Intrucciones"
            valueBtnSubmit="Enviar"
        >

            <Campo
                label="Email"
                id="email"
                type="email"
                placeholder="Tu email"
            />

            <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-4 md:justify-between md:items-center">
                <p className="text-sm text-blue-600">Reenviar Email</p>
            </div>

        </Formulario>
    )
}

export default OlvidePassword