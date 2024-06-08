export const formatoDinero = (cantidad) => {
    return Number(cantidad).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}