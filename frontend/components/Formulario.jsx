

const Formulario = (props) => {
    return (
        <div>
            <div className="flex h-screen pt-28 md:pt-0 md:flex-col justify-center md:items-center bg-slate-100">

                <div className="p-3 md:p-5 w-full md:w-1/3 md:rounded-lg md:shadow-md md:bg-white">

                    <h1 className="font-bold text-3xl text-center my-4 text-blue-600">{props.titulo}</h1>

                    <form>

                        {props.children}

                        <input
                            type="submit"
                            value={props.valueBtnSubmit}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-3 rounded-sm cursor-pointer"
                        />

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Formulario