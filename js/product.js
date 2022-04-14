// Este archivo gestiona la página de cada producto product.html .

// Tomo los datos del producto que capturé en main.js y guardé en local storage. Luego armo la función que genera el html y la llamo
const productOfThisPage = JSON.parse(localStorage.getItem('product'));

const showProduct = () => {
    document.getElementById('productPageTitle').innerHTML = productOfThisPage.name;
    document.getElementById('productPageContainer').innerHTML = `<div class="productPageImage">
    <img src="${productOfThisPage.image} " alt="${productOfThisPage.name}">
</div>
<div class="nextToProductImage">
    <h2 class="productPrice">$ ${productOfThisPage.price}</h2>
    <small>Stock: ${productOfThisPage.stock}</small>
    <button type="button" onclick="addToCart('${productOfThisPage.id}')"  href="#" class="btn btn-primary">Agregar al Carrito</button>
</div>
<p class="productDescription">${productOfThisPage.description}</p>`

}

showProduct();
