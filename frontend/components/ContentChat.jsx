import useAuth from '../hooks/useAuth';
import Message from './Message';

const ContentChat = () => {

    const { chat } = useAuth();

    return (
        <>
            <main className='md:h-[70vh] overflow-y-scroll'>

                <div className='pt-5'>
                    {chat.mensajes.map(mensaje => (
                        <Message
                            key={mensaje._id}
                            mensaje={mensaje}
                        />
                    ))}
                </div>

            </main>

        </>
    )
}

export default ContentChat