const productCardCreator = (products) => {
    let HTML = '';
    products.forEach((product) =>
        HTML += `<div data-productid="${product.id}" class="card" style="width: 18rem;">
        <a href="#" class="productLink">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        </a>
        <div class="card-body">
        <h5 class="productLink cardTitleStyle card-title">${product.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Precio $ ${product.price}</li>  
        </ul>
        <div class="card-body">
            <button onclick="addToCart('${product.id}')" href="#" class="btn btn-primary">Agregar al Carrito</button>
        </div>
    </div>`
    )
    return HTML;
}


function cardHTMLGenerator(products) {
    let cardsHTML = productCardCreator(products);
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