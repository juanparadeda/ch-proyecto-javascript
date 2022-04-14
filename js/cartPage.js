// Función para calcular el precio del carrito
const getCartPrice = () => {
    return cart.reduce((acc, current) =>{
        return acc + current.price * current.amountInCart;
    },0)
}

// Función para remover un producto del carrito. Elimina el html de la card del carrito, y además llama a la función removeFromCart
const removeProductFromCartPage = (e) =>{
    e.preventDefault();
    const targetId = e.target.parentNode.id;
    const qty = parseInt(document.getElementById(targetId + `Qty`).value);
    for ( i = 0; i < qty; i++) {
        removeFromCart(targetId);
    }
    showCart();
}

// Acá agrego event listeners para TODOS los inputs de cantidad y TODAS las cruces para sacar productos del carrito. Por eso uso ClassName
const qtyOfProductsEvent = document.getElementsByClassName('qtyUpdate');
const removeButton = document.getElementsByClassName('removeFromCartPage');


// Muestro todos los productos que están en el carrito
showCart();
function showCart() {
    let cardsHTML = "";
    for (i = 0; i < cart.length; i++) {
        cardsHTML += `<div id="${cart[i].id}" class="cartCard">
        <div class="cartImg">
            <img src=${cart[i].image} alt=${cart[i].name}>
        </div>
        <h5 class="cartProductName">${cart[i].name}</h5>
        <div class="input-group">
            <label class="input-group-text" for="${cart[i].id}Qty">Cantidad</label>
            
                <input class="qtyUpdate" type="number" id="${cart[i].id}Qty" name="amount" value="${cart[i].amountInCart}" min="1" max="${cart[i].stock}">
            <label class="stockLabel" id="${cart[i].id}Label">Stock: ${cart[i].stock}</label>
        </div>
        <h5 class="cartProductPrice" id="${cart[i].id}QtyPrice">$ ${cart[i].price * cart[i].amountInCart}</h5>
        <button type="button" class=" removeFromCartPage btn-close" id="${cart[i].id}removeButton" aria-label="Close"></button>
    </div>`
    }
    cardsHTML += `<h5 id='cartPrice'>Precio total de tus productos $ ${getCartPrice()}</h5>
    <form class="discountCodeInput" id='discountCodeInput'><input class="col-8" id="discountCode" type="text" placeholder="Ingresá acá tu código de descuento">
    <button type="submit" href="#" class="col-4 btn btn-primary">Verificar</button></form>
    <h5 id="finalPrice">Precio Final de tus productos (+IVA 21%): $ ${getCartPrice()*1.21}</h5>
    <h5 id="discountApplied">No tenés descuentos aplicados</h5>`
    document.getElementById('cartCardsContainer').innerHTML = cardsHTML;
    for (let i = 0; i< removeButton.length; i++) {
        removeButton[i].onclick = removeProductFromCartPage;
    }
    for (let i = 0; i < qtyOfProductsEvent.length; i++) {
        qtyOfProductsEvent[i].onchange = updateQtyProductPrice;
    }
    document.getElementById('discountCodeInput').onsubmit = verifyCode;
}


// función para actualizar las cantidades
function updateQtyProductPrice(e) {
    e.preventDefault();
    const productId = e.target.parentNode.parentNode.id;
    const product = cart.find(product => product.id == productId);
    const qty = document.getElementById(productId+`Qty`).value;
    (qty == '' || qty == '0') && (document.getElementById(productId+`Qty`).value = '1');
    parseInt(qty) > product.stock && (document.getElementById(productId+`Qty`).value = product.stock);
    const qtyValidated = document.getElementById(productId+`Qty`).value;
    const productsToAddOrRemove = parseInt(qtyValidated) - product.amountInCart;
    document.getElementById(product.id+`QtyPrice`).innerHTML = `$ ${product.price * parseInt(qtyValidated)}`;
    if ( productsToAddOrRemove > 0 ){
        for ( let i = 0; i < productsToAddOrRemove; i++){
            addToCart(productId);
        }
    } else {
        for ( let i = 0; i > productsToAddOrRemove; i--){
            removeFromCart(productId);
        }
    }
    document.getElementById('cartPrice').innerHTML = `Precio total de tus productos: $ `+ getCartPrice();
    document.getElementById('finalPrice').innerHTML = `Precio Final de tus productos (+IVA 21%): $ ` + getCartPrice()*1.21;
}


// Función que verifica el código de descuento
function verifyCode() {
    let discountCode = document.getElementById('discountCode').value;
    if (discountCode.trim().toUpperCase() == 'ELFORTINDELINIERS') {
        document.getElementById('discountApplied').innerHTML = `Precio Final por ser hincha de Vélez (-30%): $ ${Math.round((getCartPrice() *1.21 * 0.7))}`
    } else {
        document.getElementById('discountApplied').innerHTML = `Si no sos hincha del Fortín de Liniers, campeón del mundo en 1994, no tenés descuento`
    }
    return false;
}








