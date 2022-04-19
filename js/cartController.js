

// Toasts - asignación e inicialización

const toast = document.getElementById('liveToast');
const showToast = new bootstrap.Toast(toast);

const updateToastWithProductInfo = (product) => {
    now = luxon.DateTime.now();
    document.getElementById('time').innerHTML = now.toLocaleString(luxon.DateTime.TIME_24_WITH_SECONDS);
    document.getElementById('toast-body').innerHTML = `Agregaste ${product.name} a tu carrito  <div class="mt-2 pt-2 border-top">
    <button onclick="location.href='cart.html'" href="cart.html" class="btn-primary">Ir al carrito</button>
</div>`
}

const noStockToast = document.getElementById('noStockToast');
const showNoStockToast = new bootstrap.Toast(noStockToast);

const updateToastWithNoStockInfo = (product) => {
    now = luxon.DateTime.now();
    document.getElementById('noStockTime').innerHTML = now.toLocaleString(luxon.DateTime.TIME_24_WITH_SECONDS);
    document.getElementById('noStock-toast-body').innerHTML = `No hay stock de ${product.name} disponible`
}



// Agregar y quitar del carrito

// Esta función es la que efectivamente agrega un producto al carrito. Primero verifica si el producto ya está en el carrito. Si ya está, solo aumenta en uno la cantidad. Sólo hace el push en el caso de que el objeto producto no esté en el carrito
function addToCart(productId) {
    const productAlreadyInCart = cart.find(product => product.id == productId); 
    const productInCatalog = catalog.find(product => product.id == productId); 
    const productToAdd = productAlreadyInCart || productInCatalog; 
    if ( productToAdd.stock > productToAdd.amountInCart) { // ¿hay stock?
        productToAdd.amountInCart++;
        updateToastWithProductInfo(productToAdd);
        showToast.show();
        productAlreadyInCart == undefined && cart.push(productToAdd); 
        localStorage.setItem('cart', JSON.stringify(cart)); // Actualizo el carrito en storage
        document.getElementById('amountOfProducts').innerHTML = getAmountOfProductsInCart();
        updateCatalog(); 
    } else {
        updateToastWithNoStockInfo(productInCatalog); 
        showNoStockToast.show(); 
    }
}

// Función para quitar un producto del carrito
function removeFromCart(productId) {
    const productToRemove = cart.find(product => product.id == productId); // Busco en el cart el producto que hay que sacar
    productToRemove.amountInCart--;
    productToRemove.amountInCart == 0 && cart.splice(cart.indexOf(productToRemove), 1); // Hago el splice solo si el amountInCart quedó en 0
    document.getElementById('amountOfProducts').innerHTML = getAmountOfProductsInCart(); // Actualizo el html con la cantidad de productos
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizo el storage con los cambios en el cart
    updateCatalog(); // actualizo los productos del catálogo con los cambios
}