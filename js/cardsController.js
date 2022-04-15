function cardHTMLGenerator(products) {
    let cardsHTML = "";
    for (let i = 0; i < products.length; i++) {
        cardsHTML += `<div data-productid="${products[i].id}" class="card" style="width: 18rem;">
        <a href="#" class="productLink">
        <img src="${products[i].image}" class="card-img-top" alt="${products[i].name}">
        </a>
        <div class="card-body">
        <h5 class="productLink cardTitleStyle card-title">${products[i].name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Precio $ ${products[i].price}</li>
            <li class="list-group-item">Envío a zona AMBA $ 1500</li>
            <li class="list-group-item">Envío al interior $ 5000</li>   
        </ul>
        <div class="card-body">
            <button onclick="addToCart('${products[i].id}')" href="#" class="btn btn-primary">Agregar al Carrito</button>
        </div>
    </div>    `
    }
    document.getElementById("cardContainer").innerHTML = cardsHTML;
}

function filterCategory(products, categoryToFilter) {
    let filteredProducts = [];
    products.forEach( product => {
        product.category.indexOf(categoryToFilter) != -1 ? filteredProducts.push(product) : false;
    })
    return filteredProducts;
}
const goToProductPage = (e) => {
    e.preventDefault();
    const product = catalog.find(productInCatalog => productInCatalog.id == e.target.parentNode.parentNode.dataset.productid.toString());
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = 'product.html'
}

const addProductPagesLinks = () => {
    const links = document.getElementsByClassName('productLink');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = goToProductPage;
    }
}