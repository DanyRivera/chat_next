
const Message = ({ mensaje }) => {
  return (
    <div className={`${mensaje.persona === 1 ? 'mr-2 flex justify-end' : 'ml-3'}`}>

      <div className={`${mensaje.persona === 1 ? 'bg-blue-600 redondo1' : 'bg-green-600 redondo2'} w-64 md:w-1/4 mb-10`}>
        <div className='md:gap-8 p-3'>
          <p className=' text-white text-lg'>{mensaje.contenido}</p>
          <p className='flex justify-end mt-2 text-sm text-white'>{mensaje.hora}</p>
        </div>
      </div>

    </div>
  )
}

export default Message