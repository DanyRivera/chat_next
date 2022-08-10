import { useEffect } from 'react';
import Layout from '../layout/Layout';
import Chat from '../components/Chat';
import VistaChat from '../components/VistaChat';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import dataChats from '../data/chats.json';

const chats = () => {

    const { obtenerChats, chats } = useChat();

    useEffect(() => {
        obtenerChats()
    }, [])

    return (

        <Layout
            titulo="Chats"
        >
            <section>

                {chats.length > 0 ? (
                    <div className={`${chats.length < 8 ? 'divide-x ' : ''} md:flex h-[86vh]`}>

                        <div className='md:w-1/4'>

                            <h1 className='my-5 ml-5 text-2xl md:text-3xl text-blue-600 font-bold'>Tus Chats</h1>

                            <div className={`${chats.length > 7 ? 'md:h-[76vh] md:overflow-y-scroll' : ''}`}>
                                {chats.map(chatObj => (
                                    <VistaChat
                                        chatObj={chatObj}
                                        key={chatObj._id}
                                    />
                                ))}
                            </div>

                        </div>

                        <div className='hidden md:block md:w-3/4'>
                            <Chat />
                        </div>
                    </div>
                ) : (
                    <p className="text-center my-24 text-2xl md:m-36 text-blue-600 font-bold">No tienes chats</p>
                )}



            </section>



        </Layout>

    )
}

export default chats