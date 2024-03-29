import { useState } from "react";
import useChat from "../hooks/useChat";

const SendMessage = () => {

    const [contenido, setContenido] = useState('');
    const { submitMensaje } = useChat();

    const handleSubmitMensaje = async e => {
        e.preventDefault();
        await submitMensaje(contenido);
        setContenido('');
    }

    return (

        <div className='mt-3 px-2 md:mt-0 md:mr-5 md:relative fixed w-full'>
            <form
                onSubmit={handleSubmitMensaje}
            >
                <input
                    type="text"
                    placeholder='Type a Mesage'
                    className='w-full py-3 px-3 rounded-full bg-slate-100 outline-none'
                    value={contenido}
                    onChange={e => setContenido(e.target.value)}
                />

                <input
                    type="submit"
                    value="Send"
                    className='text-blue-600 font-bold absolute right-6 top-3 cursor-pointer outline-none'
                />
            </form>
        </div>
    )
}

export default SendMessage