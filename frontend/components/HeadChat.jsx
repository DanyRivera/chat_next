import useChat from "../hooks/useChat"

const HeadChat = () => {

    const { chat, vaciarChat, setChatMovil } = useChat();

    return (
        <div className="flex justify-between items-center mb-1 px-6 py-4 bg-slate-100 shadow-md">
            <div className="flex items-center gap-3">
                <button
                    className="text-blue-600 md:hidden"
                    onClick={() => setChatMovil(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
                <div className="border border-slate-400 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div className="text-lg text-slate-500">
                    {chat?.nombre}
                </div>
            </div>

            <button
                onClick={vaciarChat}
                className="outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

        </div>
    )
}

export default HeadChat