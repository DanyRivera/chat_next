
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-600' : 'bg-green-600'} px-1 md:px-12 text-sm md:text-base text-white text-center py-3 rounded-lg`} >
        {alerta.msg}
    </div>
  )
}

export default Alerta