export const formatoDinero = (cantidad) => {
    return Number(cantidad).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

export const formatoFecha = (fecha) => {
    const nueva = new Date(fecha)
    const opciones = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }
    return nueva.toLocaleDateString('es-ES', opciones)
}