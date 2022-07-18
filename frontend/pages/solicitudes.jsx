import Layout from "../layout/Layout"

const solicitudes = () => {

  const arr = [2, 1, 3]

  const usuario = {
    _id: "62c256724a6583724fa19489",
    nombre: "Dany",
    email: "correo@correo.com",
    telefono: "2222222",
    solicitudes: [
      {
        _id: "62c5f4cee754329a0c918781",
        estado: "Pendiente",
        De: {

          _id: "62c24f959be95e04cec48c7b",
          nombre: "Luis",
          email: "correo3@correo.com",
          telefono: "5555555"

        }
      },
      {
        _id: "62c7adf85116e98bb3c8ad3a",
        estado: "Pendiente",
        De: {
          _id: "62c24f6c9be95e04cec48c72",
          nombre: "Jose",
          email: "correo2@correo.com",
          telefono: "55555555"
        }
      }
    ],
    contactos: []
  }

  return (
    <Layout
      titulo="Solicitudes"
    >

      <div className="text-center my-6 md:flex justify-between items-center md:mx-10">
        <h1 className="my-10 text-3xl text-blue-600 font-bold">Tus Solicitudes</h1>
        <button
          className="outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {usuario.solicitudes.length === 0 ? (
        <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes solicitudes aún!</p>
      ) : (
        <div className="mx-7 mb-14 md:mx-10">

          {usuario.solicitudes.map(solicitud => (
            <div className="shadow-xl border rounded-xl md:flex justify-between items-center md:pl-5 mb-10">

              <p className="text-center my-4 text-2xl font-bold md:ml-5">{solicitud.De.nombre}</p>
              <p className="text-center mx-2 md:mx-0 my-2 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>{solicitud.De.email}</p>
              <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>{solicitud.De.telefono}</p>

              <div className="m-5 flex flex-col justify-center gap-5 md:flex-row">
                <button
                  className="bg-green-600 py-3 px-10 text-white rounded-md outline-none"
                >Aceptar</button>
                <button
                  className="bg-yellow-600 py-3 px-10 text-white rounded-md outline-none"
                >Rechazar</button>
                <button
                  className="bg-red-600 py-3 px-10 text-white rounded-md outline-none"
                >Eliminar</button>
              </div>

            </div>
          ))}

        </div>

      )}

    </Layout>
  )
}

export default solicitudes