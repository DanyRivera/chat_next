import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

const VistaChat = ({chatObj}) => {

    const {chat, cambiarChat} = useChat();

    return (
        <div 
            className={`${chat._id === chatObj._id ? 'bg-blue-600' : 'bg-white'} flex justify-between px-4 py-5 cursor-pointer`}
            onClick={cambiarChat}
        >
            <div className='flex items-center gap-2'>
                <div className={`${chat._id === chatObj._id ? 'border-white text-white' : 'border-slate-400 text-slate-500'} border  rounded-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <p className={`${chat._id === chatObj._id && 'text-white'}`}>{chatObj.nombre}</p>
            </div>
            <button
                className="outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={`${chat._id === chatObj._id ? 'text-white' : 'text-blue-600'} h-5 w-5 `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    )
}

export default VistaChat