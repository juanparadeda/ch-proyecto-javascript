// Este archivo solo interactúa con la página accesories.html . Esencialmente, del catálogo filtra los accesorios y los publica. Luego se define la función búsqueda para la barra de búsqueda

const accesoriesCatalog = filterCategory(catalog, 'accesorio')
cardHTMLGenerator(accesoriesCatalog);
addProductPagesLinks();

let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProducts);
function searchProducts() {
    let searchString = document.getElementById('searchString').value;
    searchResults = [];
    for (let i = 0; i < accesoriesCatalog.length; i++) {
        if (accesoriesCatalog[i].name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(accesoriesCatalog[i]);
        } else if (accesoriesCatalog[i].description.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(accesoriesCatalog[i]);
        }
    }
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}