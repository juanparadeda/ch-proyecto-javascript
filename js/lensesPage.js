const lensesCatalog = filterCategory(catalog, 'lente')
cardHTMLGenerator(lensesCatalog);
addProductPagesLinks();

let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProducts);
function searchProducts() {
    let searchString = document.getElementById('searchString').value;
    searchResults = [];
    for (let i = 0; i < lensesCatalog.length; i++) {
        if (lensesCatalog[i].name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(lensesCatalog[i]);
        } else if (lensesCatalog[i].description.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(lensesCatalog[i]);
        }
    }
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}