import { useRouter } from "next/router";
import RutaPrivada from "../components/RutaPrivada";
import useAuth from "../hooks/useAuth";
import Head from 'next/head';

const Layout = (props) => {

    const router = useRouter();

    const secciones = [
        { id: 1, nombre: "Chats", url: "/chats" },
        { id: 2, nombre: "Contactos", url: "/contactos" },
        { id: 3, nombre: "Solicitudes", url: "/solicitudes" },
    ]


    return (
        <RutaPrivada>
            <Head>
                <title>{props.titulo} | ChatApp</title>
                <meta name="description" content="Chat App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>

                <div className='flex flex-col items-center md:flex-row'>
                    {secciones.map(seccion => (

                        <button
                            key={seccion.id}
                            className={`${router.pathname === seccion.url ? 'bg-blue-600 border-blue-600 text-white' : 'border-b md:border-r'} flex justify-center gap-1 p-5 w-full md:py-8 outline-none`}
                            onClick={() => router.push(seccion.url)}
                        >
                            {seccion.nombre === "Chats" && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            )}

                            {seccion.nombre === "Contactos" && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}

                            {seccion.nombre === "Solicitudes" && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            )}



                            <p>{seccion.nombre}</p>
                        </button>

                    ))}
                </div>

                {props.children}

            </header>
        </RutaPrivada>
    )
}

export default Layout