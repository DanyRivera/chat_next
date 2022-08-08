

const Formulario = (props) => {
    return (

        <div className="p-3 md:p-5 w-full md:w-2/3 lg:w-1/3 md:rounded-lg md:shadow-md md:bg-white">

            <h1 className="font-bold text-3xl text-center my-4 text-blue-600">{props.titulo}</h1>

            <form
                onSubmit={props.handleSubmit}
            >

                {props.children}

                <input
                    type="submit"
                    value={props.valueBtnSubmit}
                    className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-3 rounded-sm cursor-pointer"
                />

            </form>

        </div>

    )
}

export default Formulario