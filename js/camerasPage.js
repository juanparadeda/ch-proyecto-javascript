const camerasCatalog = filterCategory(catalog, 'camara')
cardHTMLGenerator(camerasCatalog);
addProductPagesLinks();

let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProducts);
function searchProducts() {
    let searchString = document.getElementById('searchString').value;
    searchResults = [];
    for (let i = 0; i < camerasCatalog.length; i++) {
        if (camerasCatalog[i].name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(camerasCatalog[i]);
        } else if (camerasCatalog[i].description.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(camerasCatalog[i]);
        }
    }
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}