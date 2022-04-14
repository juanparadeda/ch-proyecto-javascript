// Carrito -> checkCartInStorage checkea si hay un carrito en storage. Si no hay, devuelve []
function checkCartInStorage() {
    return cartInStorage = JSON.parse(localStorage.getItem('cart')) || [];
}
const cart = checkCartInStorage();


// Función para calcular el TOTAL de productos en el carrito. 
const getAmountOfProductsInCart = () => {
    return cart.reduce((acc, next) => {
        return acc + next.amountInCart;
    },0)
}

// Actualización del badge del ícono del carrito
document.getElementById('amountOfProducts').innerHTML = getAmountOfProductsInCart();




