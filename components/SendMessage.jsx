import useChat from "../hooks/useChat";
import { obtenerHora, generarId } from "../helpers";

const SendMessage = () => {

    const { personaActual, mensaje, handleClickpersona, handleSubmitMensaje, handleChangeMensaje } = useChat();

    return (
        <div className='md:flex md:gap-3 md:items-center py-4 md:pl-4 w-full absolute bottom-0'>

            <div className='flex gap-3 md:w-1/8 p-2 md:p-0 md:bg-transparent'>

                <button
                    className={`${personaActual === 2 ? 'bg-green-600 text-white' : 'text-green-600 bg-slate-100 md:bg-transparent'} border-2 border-green-600 rounded-full`}
                    type='button'
                    onClick={() => handleClickpersona(2)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>

                <button
                    className={`${personaActual === 1 ? 'bg-blue-600 text-white' : 'text-blue-600 bg-slate-100 md:bg-transparent'} border-2 border-blue-600 rounded-full`}
                    type='button'
                    onClick={() => handleClickpersona(1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>

            </div>

            <div className='w-full w-7/8 mt-3 px-2 md:mt-0 md:mr-5 relative'>
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
                        className='text-slate-500 font-bold absolute right-6 top-3 cursor-pointer'
                    />
                </form>
            </div>
        </div>
    )
}

export default SendMessage