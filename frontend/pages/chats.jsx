import { useEffect } from 'react';
import { io } from "socket.io-client";
import Layout from '../layout/Layout';
import Chat from '../components/Chat';
import VistaChat from '../components/VistaChat';
import useChat from '../hooks/useChat';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

let socket;

const chats = () => {

    const { obtenerChats, chats, cargando, chatMovil, chat, handleMensaje, handleVaciarChat, handleEliminarChat } = useChat();
    const { auth } = useAuth();

    useEffect(() => {
        obtenerChats();
    }, []);

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
        socket.emit('abrir chat', chat?._id)
    }, [])


    useEffect(() => {
        
        socket.on('mensaje creado', nuevoMensaje => {
            if (nuevoMensaje.chat === chat._id) {
                handleMensaje(nuevoMensaje);
            }
        })

        socket.on('chat vacio', chatObj => {
            if (chatObj._id === chat._id) {
                handleVaciarChat();
            }
        })

        socket.on('chat eliminado', chatObj => {
            if (chatObj._id === chat._id) {
                handleEliminarChat(chatObj);
            }
        })
    })

    return (

        <Layout
            titulo="Chats"
        >
            <section>

                {cargando ? (
                    <Spinner />
                ) : (

                    chats.length > 0 ? (
                        <div className={`${chats.length < 8 ? 'divide-x ' : ''} md:flex md:h-[86vh]`}>

                            <div className={`${chatMovil ? 'hidden' : 'block'} md:block md:w-1/4`}>

                                <h1 className='my-5 ml-5 text-2xl md:text-3xl text-blue-600 font-bold'>Hola {auth.nombre}!</h1>

                                <div className={`${chats.length > 7 ? 'md:h-[76vh] md:overflow-y-scroll' : ''}`}>
                                    {chats.map(chatObj => (
                                        <VistaChat
                                            chatObj={chatObj}
                                            key={chatObj._id}
                                        />
                                    ))}
                                </div>

                            </div>

                            <div className={`${chatMovil ? 'block' : 'hidden'} md:block md:w-3/4`}>
                                <Chat />
                            </div>
                        </div>
                    ) : (
                        <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes chats</p>
                    )

                )}





            </section>



        </Layout>

    )
}

export default chats