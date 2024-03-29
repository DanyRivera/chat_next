import { formatearHora, formatearFecha2 } from "../helpers"
import useAuth from "../hooks/useAuth"

const Message = ({ mensaje }) => {

  const { auth } = useAuth();

  return (
    <div className={`${mensaje.autor === auth._id ? 'mr-2 flex justify-end' : 'ml-3'}`}>

      <div className={`${mensaje.autor === auth._id ? 'bg-blue-600 redondo1 ml-12 md:w-1/3' : 'bg-green-600 redondo2 mr-12 w-3/4 md:w-1/3'} mb-10`}>
        <div className='md:gap-8 p-3'>
          <p className=' text-white text-lg'>{mensaje.contenido}</p>
          <p className='flex justify-end mt-2 text-sm text-white'>{`${formatearHora(mensaje.hora)} - ${formatearFecha2(mensaje.hora)}`}</p>
        </div>
      </div>

    </div>
  )
}

export default Message