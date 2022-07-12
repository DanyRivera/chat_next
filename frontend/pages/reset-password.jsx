import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const OlvidePassword = () => {
    return (
        <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">
            <Formulario
                titulo="Tu Nueva Password"
                valueBtnSubmit="Cambiar"
            >

                <Campo
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Crea una nueva password"
                />

                <Campo
                    label="Repite tu Password"
                    id="password"
                    type="password"
                    placeholder="Confirma tu nueva password"
                />

            </Formulario>
        </div>

    )
}

export default OlvidePassword