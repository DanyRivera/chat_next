import { useRouter } from "next/router";
import Head from 'next/head';

const Layout = (props) => {

    const router = useRouter();
    console.log(router);

    const secciones = [
        { id: 1, nombre: "Chats", url: "/chats" },
        { id: 2, nombre: "Contactos", url: "/contactos" },
        { id: 3, nombre: "Solicitudes", url: "/solicitudes" },
    ]

    return (
        <>
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
                            className={`${router.pathname === seccion.url ? 'bg-blue-600 border-blue-600 text-white' : 'border-b md:border-r'} flex justify-center gap-1 p-5 w-full md:py-8 `}
                            onClick={() => router.push(seccion.url)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p>{seccion.nombre}</p>
                        </button>

                    ))}
                </div>

                <div className=''>
                    {props.children}
                </div>

            </header>
        </>
    )
}

export default Layout