const socket = io()

const formProduct = document.getElementById("formProducto")

formProduct.addEventListener('submit', (e) =>{
    e.preventDefault()
    const prodsIterator = new FormData(e.target) //Transforma un objeto HTML en un objeto iterator
    const prod = Object.fromEntries(prodsIterator) //Transforma de un objeto iterator a un objeto simple
    console.log(prod)
    socket.emit("nuevoProducto", { prod } )
})