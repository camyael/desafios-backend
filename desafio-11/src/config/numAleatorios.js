const numeroRandomArray = ( num ) => { // Recibe dos números enteros y devuelve un número entero al azar entre ellos
    const numero = Math.floor(Math.random() * num + 1)
    return numero
}

const numerosAleatorios = (array, cant = 200) => {
    for (let i = 1; i < cant; i++) {
        const numeroArray = numeroRandomArray(1000)
        array[numeroArray]++
    }
    // console.log(array)
    return array
}

process.on('message', msg => { //el on escucha un evento (que en este caso es message)
    const { array, cant } = msg
    let aleatorios
    if(!cant) aleatorios = numerosAleatorios(array)
    else aleatorios = numerosAleatorios(array, cant)
    process.send(aleatorios)
}) 