import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const OlvidePassword = () => {
    return (
        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
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
        </div>

    )
}

export default OlvidePassword