// función de búsqueda. Además de buscar, dispara la generación de links a la página de producto

function searchProducts(products) {
    let searchString = document.getElementById('searchString').value;
    searchResults = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(products[i]);
        } else if (products[i].description.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(products[i]);
        }
    }
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}