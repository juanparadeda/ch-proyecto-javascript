// Este archivo solo interactúa con la página accesories.html . Esencialmente, del catálogo filtra los accesorios y los publica. Luego se define la función búsqueda para la barra de búsqueda

const accesoriesCatalog = filterCategory(catalog, 'accesorio')
cardHTMLGenerator(accesoriesCatalog);
addProductPagesLinks();

const searchProductsTrigger = () => searchProducts(accesoriesCatalog)

let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProductsTrigger);