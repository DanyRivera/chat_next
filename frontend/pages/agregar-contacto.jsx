import Layout from "../layout/Layout";
import Formulario from "../components/Formulario";
import Campo from "../components/Campo";

const AgregarContacto = () => {
    return (
        <Layout
            titulo="Agregar"
        >

            <div className="bg-slate-100 h-[90vh]">
                <div className="flex justify-center pt-20">
                    <Formulario
                        titulo="Busca un Usuario"
                        valueBtnSubmit="Buscar"
                    >

                        <Campo
                            label="Busca por Email"
                            id="email"
                            type="email"
                            placeholder="Email del usuario que deseas agregar"
                        />

                    </Formulario>
                </div>

                <div className="flex justify-center mt-20">
                    <div>
                        <p className="text-3xl text-blue-600 font-bold my-4">Resultados:</p>

                        <div className="shadow-xl border rounded-xl md:flex items-center md:pl-5 mb-10 gap-14 p-5 md:p-0">

                            <p className="text-center my-4 md:my-0 text-2xl font-bold">Nombre</p>
                            <p className="text-center mx-2 md:mx-0 my-2 md:my-0 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>correo@correo.com</p>
                            <p className="text-center my-2 md:my-0 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>222222</p>

                            <div className="m-5 flex flex-col justify-center gap-5 md:flex-row">
                                <button
                                    className="bg-green-600 py-3 px-10 text-white rounded-md outline-none"
                                >Enviar Solicitud</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AgregarContacto