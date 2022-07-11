import Layout from "../layout/Layout";

const contactos = () => {

  const arr = [2,1,3,4,5]

  return (
    <Layout
      titulo="Contactos"
    >

      <h1 className="text-center my-10 text-3xl md:m-10 text-blue-600 font-bold">Tus Contactos</h1>


      {arr.length === 0 ? (
        <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes contactos aún!</p>
      ) : (
        <div className="mx-7 mb-14 md:mx-16 grid md:grid-cols-4 gap-14">

          {arr.map(contacto => (
          <div className="shadow-xl border rounded-xl">
            <p className="text-center my-4 text-2xl font-bold">Nombre</p>
            <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>correo@correo.com</p>
            <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>222222</p>
            <div className="m-5 flex flex-col  justify-center gap-5">
              <button
                className="bg-blue-600 py-3 px-10 text-white rounded-md"
              >Chat</button>
              <button
                className="bg-red-600 py-3 px-10 text-white rounded-md"
              >Eliminar</button>
            </div>
          </div>
          ))}

        </div>

      )}

    </Layout>
  )
}

export default contactos