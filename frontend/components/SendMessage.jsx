import { useEffect } from "react";
import useChat from "../hooks/useChat";

const SendMessage = () => {

    const { chat, mensaje, handleSubmitMensaje, handleChangeMensaje } = useChat();

    useEffect(() => {
        handleChangeMensaje({});
    }, [chat])
    
    
    return (

        <div className=' mt-3 px-2 md:mt-0 md:mr-5 relative'>
            <form
                onSubmit={handleSubmitMensaje}
            >
                <input
                    type="text"
                    placeholder='Type a Mesage'
                    className='w-full py-3 px-3 rounded-full bg-slate-100 outline-none'
                    value={mensaje?.contenido || ''}
                    onChange={e => handleChangeMensaje({
                        chat: chat._id,
                        contenido: e.target.value,
                    })}
                />

                <input
                    type="submit"
                    value="Send"
                    className='text-blue-600 font-bold absolute right-6 top-3 cursor-pointer'
                />
            </form>
        </div>
    )
}

export default SendMessage