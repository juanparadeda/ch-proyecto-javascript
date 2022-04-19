// función de búsqueda. Además de buscar, dispara la generación de links a la página de producto
function searchProducts(products) {
    const searchString = document.getElementById('searchString').value;
    let searchResults = [];
    products.forEach(product => {
        if (product.name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(product);
        } else product.description.toLowerCase().match(searchString.trim().toLowerCase()) && searchResults.push(product);
    })
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}

