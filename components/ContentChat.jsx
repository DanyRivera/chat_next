import useChat from '../hooks/useChat';
import SendMessage from '../components/SendMessage';
import Message from './Message';

const ContentChat = () => {

    const { chat } = useChat();

    return (
        <>
            <main className='h-[600px] overflow-y-scroll'>

                {chat.map(mensaje => (
                    <Message 
                        key={mensaje.id}
                        mensaje={mensaje}
                    /> 
                ))}

            </main>

            <SendMessage />

        </>
    )
}

export default ContentChat