export const formatearDinero = cantidad => {
    return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        }
    )
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date (+fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}
