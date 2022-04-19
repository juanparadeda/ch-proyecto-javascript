// Este archivo interactúa con la página cameras.html . Esencialmente, toma del catálogo todos los productos con la categoría 'camara', y los publica. La búsqueda la llama limitada dentro del catálogo ya filtrado por cámaras

const camerasCatalog = filterCategory(catalog, 'camara')
cardHTMLGenerator(camerasCatalog);
addProductPagesLinks();

const searchProductsTrigger = () => searchProducts(camerasCatalog)

let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProductsTrigger);

