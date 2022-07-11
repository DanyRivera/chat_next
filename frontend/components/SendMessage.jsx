import useChat from "../hooks/useChat";
import { obtenerHora, generarId } from "../helpers";

const SendMessage = () => {

    const { personaActual, mensaje, handleClickpersona, handleSubmitMensaje, handleChangeMensaje } = useChat();

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
                        contenido: e.target.value,
                        persona: personaActual,
                        hora: obtenerHora(),
                        id: generarId()
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