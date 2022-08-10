import { useEffect } from "react";
import Link from "next/link";
import Layout from "../layout/Layout";
import Contacto from "../components/Contacto";
import ModalEliminarContacto from "../components/ModalEliminarContacto";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";
import useContactos from "../hooks/useContactos";

const contactos = () => {

  const { obtenerContactos, contactos, cargando, alerta } = useContactos();

  useEffect(() => {
    obtenerContactos();
  }, [])

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

      <div className="w-1/2 mb-10 mx-auto">
        {alerta.msg && <Alerta alerta={alerta} />}
      </div>

      {cargando ? (
        <Spinner />
      ) :
        contactos.length > 0 ? (
          <div className="mx-7 mb-14 md:mx-10 grid md:grid-cols-2 xl:grid-cols-4 gap-14">

            {contactos.map(contacto => (
              <Contacto
                key={contacto._id}
                contacto={contacto}
              />
            ))}

          </div>
        ) : (
          <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes contactos</p>
        )
      }

      <ModalEliminarContacto />

    </Layout>
  )
}

export default contactos