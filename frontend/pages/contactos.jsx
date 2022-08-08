import Link from "next/link";
import Layout from "../layout/Layout";

const contactos = () => {

  const usuario = {
    _id: "62c256724a6583724fa19489",
    nombre: "Dany",
    email: "correo@correo.com",
    telefono: "2222222",
    solicitudes: [],
    contactos: [
      {
        _id: "62c24f959be95e04cec48c7b",
        nombre: "Luis",
        email: "correo3@correo.com",
        telefono: "5555555"
      },
      {
        _id: "62c24f6c9be95e04cec48c72",
        nombre: "Jose",
        email: "correo2@correo.com",
        telefono: "55555555"
      }
    ]
  }

  return (
    <Layout
      titulo="Contactos"
    >

      <div className="text-center my-8 md:my-3 md:flex justify-between items-center md:mx-10">
        <h1 className="my-10 text-3xl text-blue-600 font-bold">Tus Contactos</h1>
        <Link href="/agregar-contacto" >
          <button
            className="outline-none mx-auto md:mx-0 flex items-center gap-1 bg-green-600 py-3 px-6 text-white rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Agregar
          </button>
        </Link>

      </div>


      {usuario.contactos.length === 0 ? (
        <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes contactos aún!</p>
      ) : (
        <div className="mx-7 mb-14 md:mx-10 grid md:grid-cols-2 xl:grid-cols-4 gap-14">

          {usuario.contactos.map(contacto => (
            <div className="shadow-xl border rounded-xl" key={contacto._id}>
              <p className="text-center my-4 text-2xl font-bold">{contacto.nombre}</p>
              <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Email:{' '}</span>{contacto.email}</p>
              <p className="text-center my-2 text-lg"><span className="font-bold text-blue-600">Teléfono:{' '}</span>{contacto.telefono}</p>
              <div className="m-5 flex flex-col  justify-center gap-5">
                <button
                  className="bg-blue-600 py-3 px-10 text-white rounded-md outline-none"
                >Chat</button>
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

export default contactos