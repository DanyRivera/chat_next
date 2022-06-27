export const obtenerHora = () => {
    const hoy = new Date();
    const hora = hoy.getHours();
    const minutes = hoy.getMinutes();

    if(hora >= 0 && hora < 12) {
        return `${hora}:${minutes} am`
    } else {
        return `${hora}:${minutes} pm`
    }

}

export const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
}