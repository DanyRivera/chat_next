import useChat from '../hooks/useChat';
import Message from './Message';

const ContentChat = () => {

    const { chat } = useChat();

    return (
        <>
            <main className='md:h-[75vh] overflow-y-scroll'>

                <div className='pt-5'>
                    {chat.map(mensaje => (
                        <Message
                            key={mensaje.id}
                            mensaje={mensaje}
                        />
                    ))}
                </div>

            </main>

        </>
    )
}

export default ContentChat