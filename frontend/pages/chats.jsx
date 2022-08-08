import { useEffect } from 'react';
import Layout from '../layout/Layout';
import Chat from '../components/Chat';
import VistaChat from '../components/VistaChat';
import useAuth from '../hooks/useAuth';
import dataChats from '../data/chats.json';

const chats = () => {

    const {chatsUsuario, handleChatsUsuarios} = useAuth();

    useEffect(() => {
        handleChatsUsuarios(dataChats);
    }, [])
    
    return (        

        <Layout
            titulo="Chats"
        >
            <section>

                <div className={`${chatsUsuario.length < 8 ? 'divide-x ' : ''} md:flex h-[86vh]`}>

                    <div className='md:w-1/4'>

                        <h1 className='my-5 ml-5 text-2xl md:text-3xl text-blue-600 font-bold'>Tus Chats</h1>

                        <div className={`${chatsUsuario.length > 7 ? 'md:h-[76vh] md:overflow-y-scroll' : ''}`}>
                            {chatsUsuario.map(chatObj => (
                                <VistaChat
                                    key={chatObj._id}
                                    nombre={chatObj.nombre}
                                    id={chatObj._id}
                                />
                            ))}
                        </div>

                    </div>

                    <div className='hidden md:block md:w-3/4'>
                        <Chat/>
                    </div>
                </div>

            </section>



        </Layout>

    )
}

export default chats