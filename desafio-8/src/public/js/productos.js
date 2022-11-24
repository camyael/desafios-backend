const prodArray = document.getElementById('productos-tiemporeal')

const socket = io()

socket.on('products', data => {
    prodArray.innerHTML = ''
    
    if(data.length === 0) {
        prodArray.innerHTML = `<p>No hay productos actualmente</p>`
    } else {
        data.forEach(prod => {
            prodArray.innerHTML += `
            <div>
                <p>Producto: ${prod.title}, precio: $${prod.price}</p>
               
                <a href= /products/${prod.id}>Ver más</a>
            </div>
        `
        });
    }
})