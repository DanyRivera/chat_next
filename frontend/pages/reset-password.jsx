import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const OlvidePassword = () => {
    return (
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
    )
}

export default OlvidePassword