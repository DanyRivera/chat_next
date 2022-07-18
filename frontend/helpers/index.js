export const formatearHora = fecha => {
    const hoy = new Date(fecha);
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

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', options);
}

export const formatearFecha2 = fecha => {
    const fechaNueva = new Date(fecha);
    return fechaNueva.toLocaleDateString('es-ES');
}