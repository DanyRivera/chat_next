import { useEffect } from "react";
import useContactos from "../hooks/useContactos";
import Layout from "../layout/Layout";
import Solicitud from "../components/Solicitud";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";
import ModalEliminarSolicitud from "../components/ModalEliminarSolicitud";
import ModalEliminarSolicitudes from "../components/ModalEliminarSolicitudes";

const solicitudes = () => {

  const { solicitudes, obtenerSolicitudes, cargando, alerta, handleModalEliminarSolicitudes } = useContactos();

  useEffect(() => {
    obtenerSolicitudes();
  }, [])

  return (
    <Layout
      titulo="Solicitudes"
    >

      <div className="text-center my-6 md:flex justify-between items-center md:mx-10">
        <h1 className="my-10 text-3xl text-blue-600 font-bold">Tus Solicitudes</h1>
        {solicitudes.length > 0 && (
          <button
            className="outline-none"
            onClick={handleModalEliminarSolicitudes}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      <div className="w-1/2 mb-10 mx-auto">
        {alerta.msg && <Alerta alerta={alerta} />}
      </div>

      {cargando ? (
        <Spinner ></Spinner>
      ) :

        solicitudes.length === 0 ? (
          <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes solicitudes</p>
        ) : (
          <div className="mx-7 mb-14 md:mx-10">

            {solicitudes.map(solicitud => (
              <Solicitud
                key={solicitud._id}
                solicitud={solicitud}
              />

            ))}

          </div>

        )

      }

      <ModalEliminarSolicitud />
      <ModalEliminarSolicitudes />

    </Layout>
  )
}

export default solicitudes