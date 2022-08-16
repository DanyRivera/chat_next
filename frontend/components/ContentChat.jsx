import { useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import Message from './Message';

const ContentChat = () => {

    const ultimoMensaje = useRef(null);

    const { chat } = useChat();

    useEffect(() => {
        ultimoMensaje.current?.scrollIntoView();
    })

    console.log(chat);

    return (
        <main className='md:h-[70vh] overflow-y-scroll'>

            <div className='pt-5 h-[55vh]'>
                {/* {chat.mensajes.map(mensaje => (
                    <Message
                        key={mensaje._id}
                        mensaje={mensaje}
                    />
                ))} */}

                <div ref={ultimoMensaje} ></div>
            </div>

        </main>

    )
}

export default ContentChat